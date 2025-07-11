import React from 'react';
import { Link } from 'react-router-dom';
import VoiceAssistant from './VoiceAssistant';
import MorseVoice from './MorseVoice';
import ImageToSign from './ImageToSign';

const deafDumbFeatures = [
  {
    name: 'Real-Time Captioning & Subtitling',
    path: '/captioning',
    description: 'Live transcribe audio/video to text captions.',
    icon: '🎤'
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
    name: 'AI Chatbot for Accessibility Support',
    path: '/chatbot',
    description: 'Get instant help and accessibility support (text-based).',
    icon: '💬'
  },
  {
    name: 'V.O.I.C.E. (Morse)',
    path: '/morse-voice',
    description: 'Morse code input/output and speech for the mute/deaf.',
    icon: '📡'
  },
  {
    name: 'Image to Sign (ASL)',
    path: '/image-to-sign',
    description: 'Convert image text to ASL sign language.',
    icon: '🖼️'
  }
];

const blindFeatures = [
  {
    name: 'AI-Based Image Description',
    path: '/image-description',
    description: 'Describe images for the visually impaired.',
    icon: '🖼️'
  },
  {
    name: 'Voice Assistant for Visually Impaired',
    path: '/voice-assistant',
    description: 'Control the app and get information using your voice.',
    icon: '🎙️'
  },
  {
    name: 'Personalized Text-to-Speech',
    path: '/tts',
    description: 'Read text aloud in a customizable voice.',
    icon: '🔊'
  },
  {
    name: 'Visual Assistance (Be My Eyes)',
    path: '/visual-assistance',
    description: 'Connect with a volunteer for real-time visual help via video call.',
    icon: '📹'
  }
];

const universalFeatures = [
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
  }
];

const sectionStyle = {
  margin: '2.5rem auto',
  maxWidth: 1100,
  background: 'white',
  borderRadius: 18,
  boxShadow: '0 2px 16px rgba(106,90,205,0.10)',
  padding: '2rem 2rem 2.5rem 2rem',
};
const headingStyle = {
  fontFamily: 'cursive',
  color: '#6a5acd',
  fontSize: '2rem',
  marginBottom: '1.5rem',
  letterSpacing: 1,
  textAlign: 'center',
};
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: 32,
};

const Home = ({ username, onLogout }) => {
  const [blindMode, setBlindMode] = React.useState(false);
  return (
    <div className="app-shell">
      <header className="app-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', background: '#6a5acd', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="app-logo" aria-label="Accessibility Suite Logo" role="img" style={{ fontSize: '2.5rem', marginRight: 16 }}>♿</span>
          <span className="app-title" style={{ fontFamily: 'cursive', fontSize: '2rem', letterSpacing: 2 }}>WE ARE ONE</span>
        </div>
        <div>
          <button
            onClick={() => setBlindMode(b => !b)}
            style={{ marginRight: 16, padding: '8px 16px', borderRadius: 6, background: blindMode ? '#222' : 'white', color: blindMode ? 'white' : '#6a5acd', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
            aria-pressed={blindMode}
            aria-label="Toggle Blind Mode"
          >
            {blindMode ? 'Blind Mode: ON' : 'Blind Mode: OFF'}
          </button>
          <span style={{ marginRight: 24, fontSize: '1.2rem' }}>Welcome, <b>{username}</b>!</span>
          <button onClick={onLogout} style={{ padding: '8px 20px', borderRadius: 6, background: 'white', color: '#6a5acd', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>Logout</button>
        </div>
      </header>
      <main className="app-background app-main" style={{ minHeight: '80vh', background: '#f0f4fa', padding: '2rem 0' }}>
        <section style={sectionStyle}>
          <div style={headingStyle}>🦻 For Deaf/Dumb (Hearing/Speech Impaired)</div>
          <div style={gridStyle}>
            {deafDumbFeatures.map((feature) => (
              <Link
                key={feature.path}
                to={feature.path}
                className="feature-card"
                tabIndex={0}
                aria-label={feature.name + ': ' + feature.description}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  boxShadow: '0 2px 12px rgba(106,90,205,0.08)',
                  padding: '2rem 1.5rem',
                  textDecoration: 'none',
                  color: '#333',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'box-shadow 0.2s',
                  fontFamily: 'inherit',
                }}
              >
                <div className="feature-icon" role="img" aria-label={feature.name + ' icon'} style={{ fontSize: '2.5rem', marginBottom: 16 }}>{feature.icon}</div>
                <div className="feature-name" style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: 8 }}>{feature.name}</div>
                <div className="feature-desc" style={{ color: '#6a5acd', fontSize: '1rem', textAlign: 'center' }}>{feature.description}</div>
              </Link>
            ))}
          </div>
        </section>
        <section style={sectionStyle}>
          <div style={headingStyle}>👁️ For Blind (Visually Impaired)</div>
          <div style={gridStyle}>
            {blindFeatures.map((feature) => (
              <Link
                key={feature.path}
                to={feature.path}
                className="feature-card"
                tabIndex={0}
                aria-label={feature.name + ': ' + feature.description}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  boxShadow: '0 2px 12px rgba(106,90,205,0.08)',
                  padding: '2rem 1.5rem',
                  textDecoration: 'none',
                  color: '#333',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'box-shadow 0.2s',
                  fontFamily: 'inherit',
                }}
              >
                <div className="feature-icon" role="img" aria-label={feature.name + ' icon'} style={{ fontSize: '2.5rem', marginBottom: 16 }}>{feature.icon}</div>
                <div className="feature-name" style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: 8 }}>{feature.name}</div>
                <div className="feature-desc" style={{ color: '#6a5acd', fontSize: '1rem', textAlign: 'center' }}>{feature.description}</div>
              </Link>
            ))}
          </div>
        </section>
        <section style={sectionStyle}>
          <div style={headingStyle}>🌐 Universal / Other Accessibility</div>
          <div style={gridStyle}>
            {universalFeatures.map((feature) => (
              <Link
                key={feature.path}
                to={feature.path}
                className="feature-card"
                tabIndex={0}
                aria-label={feature.name + ': ' + feature.description}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  boxShadow: '0 2px 12px rgba(106,90,205,0.08)',
                  padding: '2rem 1.5rem',
                  textDecoration: 'none',
                  color: '#333',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'box-shadow 0.2s',
                  fontFamily: 'inherit',
                }}
              >
                <div className="feature-icon" role="img" aria-label={feature.name + ' icon'} style={{ fontSize: '2.5rem', marginBottom: 16 }}>{feature.icon}</div>
                <div className="feature-name" style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: 8 }}>{feature.name}</div>
                <div className="feature-desc" style={{ color: '#6a5acd', fontSize: '1rem', textAlign: 'center' }}>{feature.description}</div>
              </Link>
            ))}
          </div>
        </section>
        {blindMode && (
          <div style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 1000, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0002', padding: 16 }}>
            <VoiceAssistant enableNavigation onNavigate={path => window.location.hash = '#' + path} onLogout={onLogout} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home; 