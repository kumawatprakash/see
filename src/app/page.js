'use client';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    // Ensure the code runs after window is available
    if (typeof window !== 'undefined') {
      const fetchAndLogLocation = async () => {
        try {
          // Step 1: Send a request to the backend, which will get the IP, city, latitude, and longitude
          const response = await fetch('/api/log', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          });

          const data = await response.json();
          console.log('Logged:', data);
        } catch (error) {
          console.error('Error fetching or logging location:', error);
        }
      };

      fetchAndLogLocation();
    }
  }, []); // Empty array ensures this effect runs only once after the component mounts

  return null; // No UI needed
}
