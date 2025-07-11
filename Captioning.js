import React, { useState, useRef } from 'react';

const Captioning = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  const isSpeechRecognitionSupported =
    'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  const getRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!recognitionRef.current && SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setTranscript((prev) => prev + event.results[i][0].transcript + ' ');
          }
        }
        // Optionally show interim transcript
      };
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setListening(false);
      };
      recognitionRef.current.onend = () => {
        setListening(false);
      };
    }
    return recognitionRef.current;
  };

  const startListening = () => {
    if (!isSpeechRecognitionSupported) return;
    setTranscript('');
    setListening(true);
    getRecognition().start();
  };

  const stopListening = () => {
    setListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  if (!isSpeechRecognitionSupported) {
    return <div>Your browser does not support real-time captioning.</div>;
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
      <h2>Real-Time Captioning</h2>
      <button onClick={listening ? stopListening : startListening} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
        {listening ? 'Stop' : 'Start'} Listening
      </button>
      <div style={{ marginTop: '2rem', minHeight: '3rem', border: '1px solid #ccc', padding: '1rem', borderRadius: 8, background: '#f9f9f9' }}>
        {transcript || (listening ? 'Listening...' : 'Click start to begin captioning.')}
      </div>
    </div>
  );
};

export default Captioning; 