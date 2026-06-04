import { google } from 'googleapis';
import http from 'http';
import open from 'open';
import fs from 'fs';
import path from 'path';

// Load credentials.json
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

if (!fs.existsSync(CREDENTIALS_PATH)) {
  console.log('\n❌ ERROR: credentials.json not found!');
  console.log('Please download the OAuth Client ID JSON file from Google Cloud Console,');
  console.log('rename it to "credentials.json", and place it in this folder.');
  process.exit(1);
}

const keys = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
const client_id = keys.installed?.client_id || keys.web?.client_id;
const client_secret = keys.installed?.client_secret || keys.web?.client_secret;

if (!client_id || !client_secret) {
  console.log('\n❌ ERROR: Invalid credentials.json format.');
  process.exit(1);
}

const PORT = 3002;
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`;

const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  REDIRECT_URI
);

// We need full drive access to upload and read files
const SCOPES = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly'
];

async function authenticate() {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      try {
        if (req.url.indexOf('/oauth2callback') > -1) {
          const qs = new URL(req.url, `http://localhost:${PORT}`).searchParams;
          const code = qs.get('code');
          res.end('Authentication successful! You can close this window now.');
          server.destroy();
          const { tokens } = await oauth2Client.getToken(code);
          resolve(tokens);
        }
      } catch (e) {
        reject(e);
      }
    });

    // Handle destroying connections so server can close immediately
    const connections = new Set();
    server.on('connection', (conn) => {
      connections.add(conn);
      conn.on('close', () => connections.delete(conn));
    });
    server.destroy = () => {
      for (const conn of connections) conn.destroy();
      server.close();
    };

    server.listen(PORT, () => {
      const authorizeUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent' // Force to get refresh token
      });
      console.log('\n✅ Opening your browser to authorize Google Drive...');
      open(authorizeUrl, { wait: false }).catch(() => {
        console.log('\nCould not open browser automatically. Please open this URL:');
        console.log(authorizeUrl);
      });
    });
  });
}

async function run() {
  console.log('Starting Google OAuth flow...');
  try {
    const tokens = await authenticate();
    console.log('\n=============================================');
    console.log('🎉 SUCCESS! Here are your Environment Variables:\n');
    console.log(`GOOGLE_CLIENT_ID="${client_id}"`);
    console.log(`GOOGLE_CLIENT_SECRET="${client_secret}"`);
    console.log(`GOOGLE_REFRESH_TOKEN="${tokens.refresh_token}"`);
    console.log('\n=============================================');
    console.log('Add these to your .env.local file AND to the Vercel Dashboard!');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ ERROR:', err);
    process.exit(1);
  }
}

run();
