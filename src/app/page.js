'use client';
import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function VideoWithEmailCapture() {
  const [email, setEmail] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (email) {
      // Send email to your backend API silently
      fetch('/api/save-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    }
  }, [email]);

  const handleGoogleLogin = async () => {
    // @ts-ignore
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: '779802968966-mgl5tco82lsbkm8ji3h1hsfhp01cpif2.apps.googleusercontent.com',
      scope: 'email',
      callback: async (tokenResponse) => {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        const data = await res.json();
        setEmail(data.email);
        setShowVideo(true);
      },
    });
    tokenClient.requestAccessToken();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <Script src="https://accounts.google.com/gsi/client" async defer />

      {!showVideo ? (
        <div className="text-center">
          <img src="/assets/video-thumbnail.jpg" alt="Video Preview" className="w-full max-w-md rounded shadow mb-4" />
          <button
            onClick={handleGoogleLogin}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            ▶️ Play Video
          </button>
        </div>
      ) : (
        <video controls autoPlay className="w-full max-w-4xl mt-4 rounded shadow">
          <source src="/videos/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
