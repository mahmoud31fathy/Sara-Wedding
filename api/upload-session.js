import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileName, mimeType } = req.body;

    if (!fileName || !mimeType) {
      return res.status(400).json({ error: 'fileName and mimeType are required' });
    }

    const IMAGES_FOLDER_ID = process.env.VITE_DRIVE_IMAGES_FOLDER_ID;
    const VIDEOS_FOLDER_ID = process.env.VITE_DRIVE_VIDEOS_FOLDER_ID;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken || !IMAGES_FOLDER_ID || !VIDEOS_FOLDER_ID) {
      return res.status(500).json({ error: 'Server configuration error: missing OAuth credentials' });
    }

    const auth = new google.auth.OAuth2(clientId, clientSecret);
    auth.setCredentials({ refresh_token: refreshToken });

    const { token } = await auth.getAccessToken();

    const isVideo = mimeType.startsWith('video/');
    const folderId = isVideo ? VIDEOS_FOLDER_ID : IMAGES_FOLDER_ID;

    const metadata = {
      name: fileName,
      parents: [folderId],
    };

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id,name,mimeType,webViewLink,thumbnailLink', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Upload-Content-Type': mimeType,
        'Origin': req.headers.origin || 'http://localhost:5173', // CRITICAL: Forward the origin for CORS
      },
      body: JSON.stringify(metadata),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google API error: ${errorText}`);
    }

    const uploadUrl = response.headers.get('location');

    if (!uploadUrl) {
      throw new Error('No resumable upload URL returned from Google');
    }

    res.status(200).json({ uploadUrl });
  } catch (error) {
    console.error('Upload session error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
