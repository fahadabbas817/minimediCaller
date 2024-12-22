import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, User, Bot, Loader2 } from 'lucide-react';
import SimulationResults from './SimulationResults';

function SimulationModule() {
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        setTranscript(prev => prev + '\nDispatcher: ' + transcript);
      };

      recognitionRef.current.onend = () => {
        setIsUserSpeaking(false);
      };

      synthRef.current = window.speechSynthesis;
    }
    else{
      alert('Your browser do not support speech synthesis api')
    }
  }, []);

  const handleStartSimulation = () => {
    setIsSimulationActive(true);
    speakBotMessage("Welcome to the emergency dispatch simulation. What's the nature of your emergency?");
    setSuggestions([
      { icon: '🚑', text: 'Medical Emergency' },
      { icon: '🚒', text: 'Fire Incident' },
      { icon: '🚗', text: 'Traffic Accident' },
      { icon: '🆘', text: 'Other Emergency' },
    ]);
  };

  const handleSuggestionClick = (suggestion) => {
    setTranscript(prev => prev + '\nDispatcher: ' + suggestion.text);
    // Here you would typically process the user input and update the simulation state
    speakBotMessage(`I understand this is a ${suggestion.text}. Can you provide more details about the situation?`);
    setSuggestions([
      { icon: '📍', text: 'Provide location' },
      { icon: '👥', text: 'Number of people involved' },
      { icon: '🆘', text: 'Severity of the situation' },
      { icon: '🚨', text: 'Request immediate assistance' },
    ]);
  };

  const speakBotMessage = (message) => {
    setIsBotSpeaking(true);
    setTranscript(prev => prev + '\nChatbot: ' + message);

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.onend = () => {
      setIsBotSpeaking(false);
    };
    synthRef.current.speak(utterance);
  };

  const handleMicToggle = () => {
    if (isUserSpeaking) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsUserSpeaking(true);
    }
  };

  const handleEndSimulation = () => {
    setIsSimulationActive(false);
    setShowResults(true);
  };

  if (showResults) {
    return <SimulationResults onClose={() => setShowResults(false)} />;
  }

  return (
    <div className="space-y-8 container mx-auto mt-10">
      <h1 className="text-3xl font-bold">Simulation Module</h1>
      {!isSimulationActive ? (
        <Button onClick={handleStartSimulation}>Start Simulation</Button>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Scenario Transcript</h2>
              <div className="whitespace-pre-wrap bg-gray-100 p-4 rounded max-h-60 overflow-y-auto">
                {transcript.split('\n').map((line, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    {line.startsWith('Dispatcher:') ? (
                      <User className="h-6 w-6 text-blue-500" />
                    ) : (
                      <Bot className="h-6 w-6 text-green-500" />
                    )}
                    <span>{line}</span>
                  </div>
                ))}
                {(isBotSpeaking || isUserSpeaking) && (
                  <div className="flex items-center space-x-2">
                    {isBotSpeaking ? (
                      <Bot className="h-6 w-6 text-green-500" />
                    ) : (
                      <User className="h-6 w-6 text-blue-500" />
                    )}
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{isBotSpeaking ? 'Chatbot is speaking...' : 'Listening...'}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <span>{suggestion.icon}</span>
                <span>{suggestion.text}</span>
              </Button>
            ))}
          </div>
          <div className="flex justify-between">
            <Button
              onClick={handleMicToggle}
              variant="outline"
              disabled={isBotSpeaking}
              className={`flex items-center space-x-2 ${isUserSpeaking ? 'bg-red-100' : ''}`}
            >
              {isBotSpeaking ? (
                <MicOff className="h-4 w-4" />
              ) : isUserSpeaking ? (
                <Mic className="h-4 w-4 text-red-500" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
              <span>{isUserSpeaking ? 'Stop Speaking' : 'Start Speaking'}</span>
            </Button>
            <Button onClick={handleEndSimulation} variant="outline">End Simulation</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SimulationModule;

