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
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    sdk.actions.ready();
    const timeout = setTimeout(() => setShowSplash(false), 1500); // 1.5 seconds
    return () => clearTimeout(timeout);
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
    } catch {
      alert('Failed to share.');
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
      fontFamily: 'sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#BFC8E0',
        padding: '12px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: 'white'
      }}>
        daily vibes
      </div>

      {/* Main */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px'
      }}>
        {!result ? (
          <>
            <h1 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              Show me today’s energy
            </h1>
            <button
              onClick={handleClick}
              style={{
                fontSize: '1.2rem',
                backgroundColor: '#fff',
                color: '#000',
                padding: '10px 24px',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Try me!
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
              Share
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: '10px',
        textAlign: 'center',
        color: 'white',
        fontSize: '0.9rem'
      }}>
        <div style={{ fontSize: '1.2rem' }}>⛩</div>
        © Miguelgarest, 2025.
      </div>
    </div>
  );
}

export default App;
