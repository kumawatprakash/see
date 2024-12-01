import Cors from 'cors';

// Initialize the CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'], // Allow specific HTTP methods
  origin: '*', // Allow all origins, or specify a domain like 'http://example.com'
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export async function POST(req, res) {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  try {
    const data = await req.json();
    const { ip, ipLatitude, ipLongitude, gpsLatitude, gpsLongitude, city } = data;

    // Log the details
    console.log('IP Address:', ip);
    console.log('IP-Based Latitude/Longitude:', ipLatitude, ipLongitude);
    console.log('City (IP-Based):', city || 'Not Provided');
    console.log('GPS-Based Latitude/Longitude:', gpsLatitude || 'Not Available', gpsLongitude || 'Not Available');

    // Respond with success
    return res.status(200).json({
      message: 'Details logged successfully!',
      data: {
        ip,
        ipLatitude,
        ipLongitude,
        gpsLatitude: gpsLatitude || 'Not Available',
        gpsLongitude: gpsLongitude || 'Not Available',
        city: city || 'Not Provided',
      },
    });
  } catch (error) {
    console.error('Error logging details:', error);
    return res.status(500).json({ message: 'Failed to log details', error: error.message });
  }
}
