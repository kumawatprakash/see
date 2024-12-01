// export async function POST(request) {
//   try {
//     // Parse the JSON data from the request
//     const data = await request.json();
//     const { ip, ipLatitude, ipLongitude, gpsLatitude, gpsLongitude, city } = data;

//     // Log the details
//     console.log('IP Address:', ip);
//     console.log('IP-Based Latitude/Longitude:', ipLatitude, ipLongitude);
//     console.log('City (IP-Based):', city || 'Not Provided');
//     console.log('GPS-Based Latitude/Longitude:', gpsLatitude || 'Not Available', gpsLongitude || 'Not Available');

//     // Respond with success
//     return new Response(
//       JSON.stringify({
//         message: 'Details logged successfully!',
//         data: {
//           ip,
//           ipLatitude,
//           ipLongitude,
//           gpsLatitude: gpsLatitude || 'Not Available',
//           gpsLongitude: gpsLongitude || 'Not Available',
//           city: city || 'Not Provided',
//         },
//       }),
//       { status: 200, headers: { 'Content-Type': 'application/json' } }
//     );
//   } catch (error) {
//     console.error('Error logging details:', error);

//     // Respond with an error
//     return new Response(
//       JSON.stringify({ message: 'Failed to log details', error: error.message }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }
export async function POST(request) {
  const data = await request.json();
  const { ip, latitude, longitude } = data;

  console.log(`Received Details: IP: ${ip}, Latitude: ${latitude}, Longitude: ${longitude}`);
  return new Response(JSON.stringify({ message: 'Details logged successfully!' }), {
    status: 200,
  });
}

