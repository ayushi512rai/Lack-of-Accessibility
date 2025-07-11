import React, { useRef, useState, useEffect } from 'react';

const LETTERS = {
  // Demo: Map number of extended fingers to letters (A–E)
  0: 'A', // Fist
  1: 'B', // One finger
  2: 'C', // Two fingers
  3: 'D', // Three fingers
  4: 'E', // Four fingers
  5: 'Open hand', // All fingers
};

const GESTURE_IMAGES = {
  '1': '/asl_numbers/1.png',
  '2': '/asl_numbers/2.png',
  '3': '/asl_numbers/3.png',
  '4': '/asl_numbers/4.png',
  '5': '/asl_numbers/5.png',
  'OK': '/asl_gestures/ok.png',
  'Peace': '/asl_gestures/peace.png',
  'Thumbs Up': '/asl_gestures/thumbsup.png',
  'Stop': '/asl_gestures/stop.png',
  'Yes': '/asl_gestures/yes.png',
  'No': '/asl_gestures/no.png',
};

const loadMediaPipe = () => {
  return new Promise((resolve) => {
    if (window.Hands) return resolve();
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js';
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

const countExtendedFingers = (landmarks) => {
  // Simple demo: count fingers above wrist (y < wrist.y)
  if (!landmarks) return 0;
  const wristY = landmarks[0].y;
  // Thumb: 4, Index: 8, Middle: 12, Ring: 16, Pinky: 20
  const tips = [4, 8, 12, 16, 20];
  let count = 0;
  tips.forEach((i) => {
    if (landmarks[i].y < wristY - 0.1) count++;
  });
  return count;
};

const detectGesture = (landmarks) => {
  if (!landmarks) return '';
  // Count extended fingers (for numbers 1-5)
  const wristY = landmarks[0].y;
  const tips = [4, 8, 12, 16, 20];
  let count = 0;
  tips.forEach((i) => {
    if (landmarks[i].y < wristY - 0.1) count++;
  });
  if (count >= 1 && count <= 5) return String(count);
  // OK: index and thumb tips close together, others up
  const distThumbIndex = Math.hypot(
    landmarks[4].x - landmarks[8].x,
    landmarks[4].y - landmarks[8].y
  );
  if (distThumbIndex < 0.07 && landmarks[12].y < wristY - 0.1 && landmarks[16].y < wristY - 0.1 && landmarks[20].y < wristY - 0.1) return 'OK';
  // Peace: index and middle up, others down
  if (
    landmarks[8].y < wristY - 0.1 &&
    landmarks[12].y < wristY - 0.1 &&
    landmarks[16].y > wristY &&
    landmarks[20].y > wristY &&
    landmarks[4].y > wristY
  ) return 'Peace';
  // Thumbs Up: thumb up, others down
  if (
    landmarks[4].y < wristY - 0.1 &&
    landmarks[8].y > wristY &&
    landmarks[12].y > wristY &&
    landmarks[16].y > wristY &&
    landmarks[20].y > wristY
  ) return 'Thumbs Up';
  // Stop: all fingers up, palm open
  if (
    landmarks[4].y < wristY - 0.1 &&
    landmarks[8].y < wristY - 0.1 &&
    landmarks[12].y < wristY - 0.1 &&
    landmarks[16].y < wristY - 0.1 &&
    landmarks[20].y < wristY - 0.1
  ) return 'Stop';
  // Yes: fist (all tips near wrist)
  if (tips.every(i => Math.abs(landmarks[i].y - wristY) < 0.05)) return 'Yes';
  // No: index and middle together, others down
  if (
    Math.abs(landmarks[8].x - landmarks[12].x) < 0.04 &&
    landmarks[8].y < wristY - 0.1 &&
    landmarks[12].y < wristY - 0.1 &&
    landmarks[16].y > wristY &&
    landmarks[20].y > wristY &&
    landmarks[4].y > wristY
  ) return 'No';
  return '';
};

const speak = (text) => {
  if ('speechSynthesis' in window) {
    const utter = new window.SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utter);
  }
};

const SignLanguageRecognition = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [recognized, setRecognized] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [running, setRunning] = useState(false);
  const [detectedGesture, setDetectedGesture] = useState('');

  useEffect(() => {
    loadMediaPipe().then(() => {
      if (!window.Hands) return;
      const hands = new window.Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });
      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7
      });
      let animationId;
      let lastLetter = '';
      let lastSpoken = '';
      const processFrame = async () => {
        if (!videoRef.current || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, 400, 300);
        await hands.send({ image: canvasRef.current });
        animationId = requestAnimationFrame(processFrame);
      };
      hands.onResults((results) => {
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          const landmarks = results.multiHandLandmarks[0];
          const gesture = detectGesture(landmarks);
          setDetectedGesture(gesture);
          const count = countExtendedFingers(landmarks);
          const letter = LETTERS[count] || '';
          setRecognized(letter);
          if (letter && letter !== lastSpoken) {
            speak(letter);
            lastSpoken = letter;
          }
        } else {
          setRecognized('');
          setDetectedGesture('');
        }
      });
      // Start camera
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setRunning(true);
          animationId = requestAnimationFrame(processFrame);
        };
      });
      return () => {
        if (animationId) cancelAnimationFrame(animationId);
        if (videoRef.current && videoRef.current.srcObject) {
          videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        }
        setRunning(false);
      };
    });
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
      <h2>Sign Language Recognition (Real-Time Demo)</h2>
      <div style={{ position: 'relative', width: 400, height: 300, margin: '0 auto' }}>
        <video ref={videoRef} width={400} height={300} style={{ borderRadius: 12, background: '#222', position: 'absolute', top: 0, left: 0 }} playsInline muted />
        <canvas ref={canvasRef} width={400} height={300} style={{ borderRadius: 12, position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
      </div>
      <div style={{ margin: '1rem 0' }}>
        {running ? <span style={{ color: 'green' }}>Camera running...</span> : <span style={{ color: 'red' }}>Starting camera...</span>}
      </div>
      <div style={{ margin: '1.5rem 0', background: '#f9f9f9', padding: '1rem', borderRadius: 8, border: '1px solid #ccc', minHeight: 40 }}>
        <strong>Recognized:</strong> <span style={{ fontSize: 24 }}>{recognized}</span>
        {detectedGesture && (
          <div style={{ marginTop: 10 }}>
            <strong>Gesture:</strong> <span style={{ fontSize: 22, color: '#1976d2' }}>{detectedGesture}</span>
            {GESTURE_IMAGES[detectedGesture] && (
              <div><img src={GESTURE_IMAGES[detectedGesture]} alt={detectedGesture} style={{ width: 60, marginTop: 6 }} /></div>
            )}
          </div>
        )}
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h3>ASL Numbers & Common Gestures Reference</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginBottom: 24 }}>
          {Object.entries(GESTURE_IMAGES).map(([name, src]) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <img src={src} alt={name} style={{ width: 50, height: 50, borderRadius: 8, background: '#eee', marginBottom: 4 }} />
              <div style={{ fontSize: 14, color: '#333' }}>{name}</div>
            </div>
          ))}
        </div>
        <h3>ASL Alphabet & Numbers Reference</h3>
        <img src="/asl_alphabet.png" alt="ASL Alphabet and Numbers" style={{ width: '100%', maxWidth: 500, marginBottom: 24, borderRadius: 8 }} />
        <h3>Common Sign Language Words</h3>
        <img src="/common_signs.png" alt="Common Sign Language Words" style={{ width: '100%', maxWidth: 500, borderRadius: 8 }} />
      </div>
    </div>
  );
};

export default SignLanguageRecognition; 