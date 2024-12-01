
export async function POST(request) {
  // Parse the JSON data from the request
  const data = await request.json();
  const { ip, ipLatitude, ipLongitude, gpsLatitude, gpsLongitude } = data;
    console.log('IP Address:', ip);
    console.log('IP-Based Latitude/Longitude:', ipLatitude, ipLongitude);
    console.log('GPS-Based Latitude/Longitude:', gpsLatitude, gpsLongitude);
  // Return a response indicating success
  return new Response(JSON.stringify({ message: 'Details logged successfully!' }), {
    status: 200,
  });
}
