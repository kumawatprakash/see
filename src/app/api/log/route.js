export default function handler(req, res) {
  if (req.method === 'POST') {
    const { ip, ipLatitude, ipLongitude, gpsLatitude, gpsLongitude } = req.body;
    console.log('IP Address:', ip);
    console.log('IP-Based Latitude/Longitude:', ipLatitude, ipLongitude);
    console.log('GPS-Based Latitude/Longitude:', gpsLatitude, gpsLongitude);
    res.status(200).json({ message: 'Location logged successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
