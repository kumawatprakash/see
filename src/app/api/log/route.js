// api/log.js (Next.js API route)
export async function POST(request) {
  try {
    // Get IP address from the request headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : request.socket.remoteAddress;

    // Check if the IP is a local IP (localhost or reserved)
    if (ip === '127.0.0.1' || ip === '::1') {
      console.log('Localhost IP detected, skipping geolocation.');
      return new Response(
        JSON.stringify({ message: 'Localhost IP detected, skipping geolocation.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Step 2: Fetch the geolocation data based on the IP (using ip-api or any other service)
    const geoResponse = await fetch(`http://ip-api.com/json/${ip}`);
    if (!geoResponse.ok) {
      // If the response is not OK, log the error and return a failure response
      console.error('Geo-location service failed:', geoResponse.statusText);
      return new Response(
        JSON.stringify({ message: 'Geo-location service failed' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const geoData = await geoResponse.json();

    // Check if the geoData is valid
    if (geoData.status !== 'success') {
      console.error('Geo-location data not valid:', geoData);
      return new Response(
        JSON.stringify({ message: 'Failed to get valid geo-location data' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Extract latitude, longitude, and city from the geolocation data
    const latitude = geoData.lat || 'Unknown';
    const longitude = geoData.lon || 'Unknown';
    const city = geoData.city || 'Unknown';

    // Log the details
    console.log('Client IP:', ip);
    console.log('City:', city);
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);

    // Respond with success
    return new Response(
      JSON.stringify({
        ip,
        city,
        latitude,
        longitude
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error logging details:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to log details', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
