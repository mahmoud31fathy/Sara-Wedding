import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const IMAGES_FOLDER_ID = process.env.VITE_DRIVE_IMAGES_FOLDER_ID;
    const VIDEOS_FOLDER_ID = process.env.VITE_DRIVE_VIDEOS_FOLDER_ID;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken || !IMAGES_FOLDER_ID || !VIDEOS_FOLDER_ID) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const auth = new google.auth.OAuth2(clientId, clientSecret);
    auth.setCredentials({ refresh_token: refreshToken });

    const drive = google.drive({ version: 'v3', auth });

    // Fetch images
    const imagesRes = await drive.files.list({
      q: `'${IMAGES_FOLDER_ID}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, thumbnailLink, webContentLink, webViewLink, createdTime)',
      orderBy: 'createdTime desc',
      pageSize: 50,
    });

    // Fetch videos
    const videosRes = await drive.files.list({
      q: `'${VIDEOS_FOLDER_ID}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, thumbnailLink, webContentLink, webViewLink, createdTime)',
      orderBy: 'createdTime desc',
      pageSize: 50,
    });

    const media = [
      ...(imagesRes.data.files || []).map(f => ({ ...f, type: 'image' })),
      ...(videosRes.data.files || []).map(f => ({ ...f, type: 'video' }))
    ].sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());

    res.status(200).json({ media });
  } catch (error) {
    console.error('Media fetch error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
