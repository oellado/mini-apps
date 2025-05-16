import React, { useEffect, useState } from 'react';
import { sdk } from '@farcaster/frame-sdk';

const vibes = [
  {
    text: 'Today is for movement, get the energy flowing',
    gif: 'https://fc.miguelgarest.com/fc/0.gif'
  },
  {
    text: 'Let loose. Today is made for fun.',
    gif: 'https://fc.miguelgarest.com/fc/1.gif'
  },
  {
    text: 'Find your rhythm and let it carry you.',
    gif: 'https://fc.miguelgarest.com/fc/2.gif'
  },
  {
    text: 'Adventure awaits. Try something new today.',
    gif: 'https://fc.miguelgarest.com/fc/3.gif'
  },
  {
    text: 'Reach out, someone needs your love today.',
    gif: 'https://fc.miguelgarest.com/fc/4.gif'
  }
];

function App() {
  const [result, setResult] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await sdk.actions.ready();
        setTimeout(() => setShowSplash(false), 1500);
      } catch (error) {
        console.error('Error initializing:', error);
      }
    };
    init();
  }, []);

  const handleClick = () => {
    const random = vibes[Math.floor(Math.random() * vibes.length)];
    setResult(random);
  };

  const handleShare = async () => {
    if (!result) return;
    try {
      await sdk.actions.composeCast({
        text: result.text,
        embeds: [result.gif]
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (showSplash) {
    return (
      <div style={{
        backgroundColor: '#DCE5FF',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem'
      }}>
        •ᴗ•
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#DCE5FF',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      {!result ? (
        <>
          <h1 style={{ marginBottom: '20px' }}>Show me today's energy</h1>
          <button onClick={handleClick}>Try me!</button>
        </>
      ) : (
        <>
          <h2 style={{ marginBottom: '20px' }}>{result.text}</h2>
          <img
            src={result.gif}
            alt="vibe gif"
            style={{
              width: '300px',
              height: '300px',
              objectFit: 'contain',
              backgroundColor: '#EAEAE8',
              borderRadius: '24px',
              padding: '10px',
              marginBottom: '30px'
            }}
          />
          <button onClick={handleShare}>Share</button>
        </>
      )}
    </div>
  );
}

export default App;
