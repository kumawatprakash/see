export async function POST(request) {
    const data = await request.json();
    const { ip, latitude, longitude } = data;
  
    console.log(`Received Details: IP: ${ip}, Latitude: ${latitude}, Longitude: ${longitude}`);
    return new Response(JSON.stringify({ message: 'Details logged successfully!' }), {
      status: 200,
    });
  }
  