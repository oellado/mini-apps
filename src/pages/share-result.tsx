import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ShareResult() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [gif, setGif] = useState('');

  useEffect(() => {
    if (router.isReady) {
      setText(router.query.text as string || '');
      setGif(router.query.gif as string || '');
    }
  }, [router.isReady, router.query]);

  const frameMetadata = {
    version: "next",
    imageUrl: gif || '',
    button: {
      title: "🎯 Get Your Vibes",
      action: {
        type: "launch_frame",
        url: "https://warpcast.com/miniapps/F3EoBj27HyTd/daily-vibes"
      }
    }
  };

  return (
    <>
      <Head>
        <title>Daily Vibes Result</title>
        <meta name="description" content={text || 'Daily Vibes Result'} />
        
        <meta property="og:title" content="Daily Vibes Result" />
        <meta property="og:description" content={text || 'Check out my Daily Vibes result!'} />
        <meta property="og:image" content={gif || ''} />
        
        <meta name="fc:frame" content={JSON.stringify(frameMetadata)} />
      </Head>

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
    </>
  );
}