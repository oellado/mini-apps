import React, { useEffect, useState } from 'react';
import { sdk } from '@farcaster/frame-sdk';

const vibes = [
  {
    text: 'Today is for movement, get the energy flowing',
    gif: 'https://fc-daily-vibes-git-master-mgrsts-projects.vercel.app/fc/0.gif'
  },
  {
    text: 'Let loose. Today is made for fun.',
    gif: 'https://fc-daily-vibes-git-master-mgrsts-projects.vercel.app/fc/1.gif'
  },
  {
    text: 'Find your rhythm and let it carry you.',
    gif: 'https://fc-daily-vibes-git-master-mgrsts-projects.vercel.app/fc/2.gif'
  },
  {
    text: 'Adventure awaits. Try something new today.',
    gif: 'https://fc-daily-vibes-git-master-mgrsts-projects.vercel.app/fc/3.gif'
  },
  {
    text: 'Reach out, someone needs your love today.',
    gif: 'https://fc-daily-vibes-git-master-mgrsts-projects.vercel.app/fc/4.gif'
  }
];

function App() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    sdk.actions.ready(); // Let Warpcast know the app is ready
  }, []);

  const handleClick = () => {
    const random = vibes[Math.floor(Math.random() * vibes.length)];
    setResult(random);
  };

  const handleShare = async () => {
    if (!result) return;
    const castText = `${result.text}\n\nhttps://fc-daily-vibes-git-master-mgrsts-projects.vercel.app\n\n${result.gif}`;
    try {
      await sdk.actions.cast({ text: castText });
      alert('Cast shared!');
    } catch (e) {
      alert('Failed to share.');
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#C6A9F2',
        Height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        padding: '20px',
        textAlign: 'center'
      }}
    >
      {!result ? (
        <>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>
            Show me today’s energy!
          </h1>
          <button
            onClick={handleClick}
            style={{
              fontSize: '1.2rem',
              backgroundColor: '#fff',
              color: '#000',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            TRY ME
          </button>
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
          <button
            onClick={handleShare}
            style={{
              fontSize: '1.2rem',
              backgroundColor: '#fff',
              color: '#000',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            SHARE
          </button>
        </>
      )}
    </div>
  );
}

export default App;
