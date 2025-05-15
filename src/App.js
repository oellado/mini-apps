import React, { useEffect, useState } from 'react';
import { sdk } from '@farcaster/frame-sdk';

const vibes = [
  { text: 'Today is for movement, get the energy flowing', gif: 'https://miguelgarest.com/fc/0.gif' },
  { text: 'Let loose. Today is made for fun.', gif: 'https://miguelgarest.com/fc/1.gif' },
  { text: 'Find your rhythm and let it carry you.', gif: 'https://miguelgarest.com/fc/2.gif' },
  { text: 'Adventure awaits. Try something new today.', gif: 'https://miguelgarest.com/fc/3.gif' },
  { text: 'Reach out, someone needs your love today.', gif: 'https://miguelgarest.com/fc/4.gif' }
];

const MINI_APP_URL = 'https://miguelgarest.com/fcapp';

function App() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  const handleClick = () => {
    const random = vibes[Math.floor(Math.random() * vibes.length)];
    setResult(random);
  };

  const handleShare = async () => {
    if (!result) return alert('Please pick a vibe first!');

    try {
      await sdk.actions.cast({
        text: `${result.text}\n\n${MINI_APP_URL}\n\n${result.gif}`
      });
      alert('Successfully shared on Farcaster!');
    } catch (error) {
      console.error('Cast failed:', error);
      alert('Failed to share the cast. Are you running inside Farcaster?');
    }
  };

  return (
    <div style={{
      backgroundColor: '#C6A9F2',
      minHeight: '100vh',
      overflow: 'hidden',
      margin: 0,
      padding: '20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }}>
      {!result ? (
        <>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Show me today’s energy!</h1>
          <button onClick={handleClick} style={{
            fontSize: '1.2rem', backgroundColor: '#fff', color: '#000',
            padding: '10px 20px', border: 'none', borderRadius: '12px',
            fontWeight: 'bold', cursor: 'pointer'
          }}>TRY ME</button>
        </>
      ) : (
        <>
          <h2 style={{ marginBottom: '20px' }}>{result.text}</h2>
          <img src={result.gif} alt="vibe gif" style={{
            width: '300px', height: '300px', objectFit: 'contain',
            backgroundColor: '#EAEAE8', borderRadius: '24px',
            padding: '10px', marginBottom: '30px'
          }}/>
          <button onClick={handleShare} style={{
            fontSize: '1.2rem', backgroundColor: '#fff', color: '#000',
            padding: '10px 20px', border: 'none', borderRadius: '12px',
            fontWeight: 'bold', cursor: 'pointer'
          }}>SHARE</button>
        </>
      )}
    </div>
  );
}

export default App;
