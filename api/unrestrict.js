// Vercel serverless function
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { link } = req.body;
  const API_TOKEN = 'FVNOULQD3PGSR6IE4SK7SEC3V3DMMVMJ5TZBBL4U7ZYGS3J2RKTA';

  try {
    const response = await fetch('https://api.real-debrid.com/rest/1.0/unrestrict/link', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ link })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error });
    }

    return res.status(200).json({
      filename: data.filename,
      download: data.download
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}
