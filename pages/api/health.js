export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    service: 'africa-markett',
    env: process.env.NODE_ENV,
    time: new Date().toISOString(),
  });
}
