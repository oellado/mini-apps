import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ShareResult() {
  const [text, setText] = useState('');
  const [gif, setGif] = useState('');
  const location = useLocation();

  const updateMetaTag = (name, content) => {
    let meta = document.querySelector(`meta[name="${name}"]`) ||
               document.querySelector(`meta[property="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(name.includes('og:') ? 'property' : 'name', name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const textParam = params.get('text');
    const gifParam = params.get('gif');
    
    console.log('Share page params:', { textParam, gifParam });
    
    setText(textParam || '');
    setGif(gifParam || '');

    // Update meta tags
    document.title = 'Daily Vibes Result';
    
    // Update OpenGraph meta tags
    updateMetaTag('og:title', 'Daily Vibes Result');
    updateMetaTag('og:description', textParam || 'Check out my Daily Vibes result!');
    updateMetaTag('og:image', gifParam || '');
    
    // Update Farcaster Frame meta tag
    const frameMetadata = {
      version: "next",
      imageUrl: gifParam || '',
      button: {
        title: "🎯 Get Your Vibes",
        action: {
          type: "launch_frame",
          url: "https://fc.miguelgarest.com"
        }
      }
    };
    updateMetaTag('fc:frame', JSON.stringify(frameMetadata));
  }, [location]);

  return (
    <main style={{
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h1>Daily Vibes Result</h1>
      <p>{text}</p>
      {gif && <img src={gif} alt="Result GIF" style={{ maxWidth: '100%' }} />}
    </main>
  );
}

export default ShareResult;