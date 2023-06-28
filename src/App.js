// App.js

import { FiberManualRecord, Stop } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css';
import ChatGPT from './components/ChatGPT';

function App() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span className="error">Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="container">
      <h1 className="title">TalkBot - Voice Recognition</h1>
      <div className="buttons-container">
        <button
          className={`mic-button ${listening ? 'active' : ''}`}
          onClick={SpeechRecognition.startListening}
        >
          <FiberManualRecord className="mic-icon" />
        </button>
        <button className="mic-button" onClick={SpeechRecognition.stopListening}>
          <Stop className="mic-icon" />
        </button>
      </div>
      <ChatGPT
        transcript={transcript}
        listening={listening}
        resetTranscript={resetTranscript}
        setLoading={setLoading}
        message={message}
        setMessage={setMessage}
      />
      {loading && <CircularProgress className="loader" />}
      <span className="message">{message}</span>
    </div>
  );
}

export default App;
