import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Captioning from './Captioning';
import ImageDescription from './ImageDescription';
import VisualAssistance from './VisualAssistance';
import VolunteerPage from './VolunteerPage';
import VoiceAssistant from './VoiceAssistant';
import SignLanguageRecognition from './SignLanguageRecognition';
import Homepage from './Homepage';
import LoginPage from './LoginPage';
import Home from './Home';
import MorseVoice from './MorseVoice';
import ImageToSign from './ImageToSign';
import TextToSpeechButton from './components/TextToSpeechButton';
import SpeechToTextInput from './components/SpeechToTextInput';

const Placeholder = ({ title }) => (
  <div style={{ maxWidth: 500, margin: '2rem auto', textAlign: 'center' }}>
    <h2>{title}</h2>
    <div style={{ marginTop: '2rem', color: '#888', fontSize: '1.1rem' }}>Coming soon...</div>
  </div>
);

const features = [
  {
    name: 'Real-Time Captioning & Subtitling',
    path: '/captioning',
    description: 'Live transcribe audio/video to text captions.',
    icon: '🎤'
  },
  {
    name: 'AI-Based Image Description',
    path: '/image-description',
    description: 'Describe images for the visually impaired.',
    icon: '🖼️'
  },
  {
    name: 'Voice-Controlled Navigation',
    path: '/voice-navigation',
    description: 'Control the app using your voice.',
    icon: '🗣️'
  },
  {
    name: 'Cognitive Load Detection',
    path: '/cognitive-load',
    description: 'Adaptive interface based on user stress/focus.',
    icon: '🧠'
  },
  {
    name: 'AI Chatbot for Accessibility Support',
    path: '/chatbot',
    description: 'Get instant help and accessibility support.',
    icon: '💬'
  },
  {
    name: 'Personalized Text-to-Speech',
    path: '/tts',
    description: 'Read text aloud in a customizable voice.',
    icon: '🔊'
  },
  {
    name: 'Sign Language Recognition',
    path: '/sign-language',
    description: 'Convert sign language to text or speech.',
    icon: '🤟'
  },
  {
    name: 'Assistive Keyboard & Predictive Typing',
    path: '/assistive-keyboard',
    description: 'Smart keyboard with predictive typing.',
    icon: '⌨️'
  },
  {
    name: 'Visual Assistance (Be My Eyes)',
    path: '/visual-assistance',
    description: 'Connect with a volunteer for real-time visual help via video call.',
    icon: '📹'
  },
  {
    name: 'Voice Assistant for Visually Impaired',
    path: '/voice-assistant',
    description: 'Control the app and get information using your voice.',
    icon: '🎙️'
  }
];

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === '' || loading) return;
    const userMsg = input;
    setMessages([...messages, { from: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      if (data.reply) {
        setMessages(msgs => [...msgs, { from: 'bot', text: data.reply }]);
      } else {
        setMessages(msgs => [...msgs, { from: 'bot', text: 'Sorry, there was an error.' }]);
      }
    } catch (err) {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Network error. Please try again.' }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', background: '#e6f0fa', borderRadius: 10, boxShadow: '0 2px 8px #0001', padding: 24 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 16 }}>AI Chatbot for Accessibility Support</h2>
      <div style={{ height: 250, overflowY: 'auto', background: '#fff', borderRadius: 8, padding: 12, marginBottom: 12, border: '1px solid #cce' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.from === 'user' ? 'right' : 'left', margin: '8px 0', display: 'flex', alignItems: 'center', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
            <span style={{
              display: 'inline-block',
              background: msg.from === 'user' ? '#d1e7dd' : '#f8d7da',
              color: '#222',
              borderRadius: 16,
              padding: '8px 14px',
              maxWidth: '80%',
              wordBreak: 'break-word',
            }}>{msg.text}</span>
            {msg.from === 'bot' && <TextToSpeechButton text={msg.text} />}
          </div>
        ))}
        {loading && (
          <div style={{ textAlign: 'left', margin: '8px 0' }}>
            <span style={{
              display: 'inline-block',
              background: '#f8d7da',
              color: '#222',
              borderRadius: 16,
              padding: '8px 14px',
              maxWidth: '80%',
              wordBreak: 'break-word',
              opacity: 0.7
            }}>Thinking...</span>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <SpeechToTextInput
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #bbb' }}
          disabled={loading}
        />
        <button onClick={handleSend} style={{ padding: '8px 16px', borderRadius: 8, background: '#1976d2', color: '#fff', border: 'none' }} disabled={loading}>Send</button>
      </div>
    </div>
  );
};

function App() {
  const [page, setPage] = useState('home');
  const [userDetails, setUserDetails] = useState(null);

  if (page === 'home') {
    return <Homepage onContinue={(details) => { setUserDetails(details); setPage('main'); }} />;
  }
  // Main app content: restore router-based navigation
  const handleLogout = () => {
    setUserDetails(null);
    setPage('home');
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home username={userDetails?.name || ''} onLogout={handleLogout} />} />
        <Route path="/captioning" element={<Captioning />} />
        <Route path="/image-description" element={<ImageDescription />} />
        <Route path="/voice-navigation" element={<Placeholder title="Voice-Controlled Navigation" />} />
        <Route path="/cognitive-load" element={<Placeholder title="Cognitive Load Detection & Adaptive Interfaces" />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/tts" element={<Placeholder title="Personalized Text-to-Speech" />} />
        <Route path="/sign-language" element={<SignLanguageRecognition />} />
        <Route path="/assistive-keyboard" element={<Placeholder title="Assistive Keyboard & Predictive Typing" />} />
        <Route path="/visual-assistance" element={<VisualAssistance />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/voice-assistant" element={<VoiceAssistant />} />
        <Route path="/morse-voice" element={<MorseVoice />} />
        <Route path="/image-to-sign" element={<ImageToSign />} />
      </Routes>
    </Router>
  );
}

export default App;
