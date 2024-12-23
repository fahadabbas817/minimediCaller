import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, User, Bot, Loader2 } from "lucide-react";
import SimulationResults from "./SimulationResults";

function SimulationModule() {
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");

        setTranscript((prev) => prev + "\nDispatcher: " + transcript);
      };

      recognitionRef.current.onend = () => {
        setIsUserSpeaking(false);
      };

      synthRef.current = window.speechSynthesis;
    } else {
      alert("Your browser does not support speech synthesis API");
    }
  }, []);

  const handleStartSimulation = () => {
    if (!selectedTopic) return; // Ensure a topic is selected
    setIsSimulationActive(true);
    speakBotMessage(
      `Starting simulation for ${selectedTopic.text}. What's the nature of your emergency?`
    );
  };

  const handleTopicSelection = (topic) => {
    setSelectedTopic(topic);
    setTranscript(`Selected Topic: ${topic.text}`);
  };

  const speakBotMessage = (message) => {
    setIsBotSpeaking(true);
    setIsSimulationActive(true);
    setTranscript((prev) => prev + "\nChatbot: " + message);

    const utterance = new SpeechSynthesisUtterance(
      `I understand that your emergency is ${message} can you tell me more about it`
    );
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

  const topics = [
    { icon: "🚑", text: "Medical Emergency" },
    { icon: "🚒", text: "Fire Incident" },
    { icon: "🚗", text: "Traffic Accident" },
    { icon: "🆘", text: "General Emergency" },
  ];

  return (
    <div className=" container mx-auto mt-10">
      <h1 className="text-3xl text-gray-200 font-bold text-center mt-10">
        Simulator
      </h1>
{/* Card selection displayer */}
      {!isSimulationActive && (
        <div className="flex justify-center mt-20">
        <div className="simulationSelector flex flex-col gap-10 items-start">
          <h2 className="text-xl font-semibold text-gray-100 ">
            Select Simulation Type
          </h2>
          <div className="flex flex-wrap gap-4">
            {topics.map((topic, index) => (
              <Card
                key={index}
                disabled={isBotSpeaking}
                className={`p-4 cursor-pointer border-3 hover:border-blue-300 hover:bg-teal-400 transition-all ease-in ${
                  selectedTopic === topic
                    ? "border-yellow-500 bg-blue-100"
                    : "border-gray-300"
                }`}
                onClick={() => speakBotMessage(topic.text)}
              >
                <CardContent className="text-center">
                  <div className="text-4xl">{topic.icon}</div>
                  <h2 className=" font-bold mt-2">{topic.text}</h2>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </div>
      )}
{/* simulation chat displayer */}
      {isSimulationActive && (
        <div className="mt-10 flex flex-col  gap-8">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                Scenario Transcript
              </h2>
              <div className="whitespace-pre-wrap p-4 rounded max-h-60 overflow-y-auto">
                {(isBotSpeaking || isUserSpeaking) && (
                  <div className="flex items-center space-x-2">
                    {isBotSpeaking ? (
                      <Bot className="h-6 w-6 text-green-500" />
                    ) : (
                      <User className="h-6 w-6 text-blue-500" />
                    )}
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>
                      {isBotSpeaking
                        ? "Chatbot is speaking..."
                        : "Listening..."}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            {/* User side of speak */}
            <Button
              onClick={handleMicToggle}
              variant="outline"
              disabled={isBotSpeaking}
              className={`flex items-center space-x-2 ${
                isUserSpeaking ? "bg-red-100" : ""
              }`}
            >
              {isBotSpeaking ? (
                <MicOff className="h-4 w-4" />
              ) : isUserSpeaking ? (
                <Mic className="h-4 w-4 text-red-500" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
              <span>{isUserSpeaking ? "Stop Speaking" : "Dispatcher"}</span>
            </Button>
            {/* Chatbot response side */}
            <Button
              onClick={handleMicToggle}
              variant="outline"
              disabled={isUserSpeaking}
              className={`flex items-center space-x-2 ${
                isBotSpeaking ? "bg-red-100" : ""
              }`}
            >
              {isUserSpeaking ? (
                <MicOff className="h-4 w-4" />
              ) : isBotSpeaking ? (
                <Mic className="h-4 w-4 text-red-500" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
              <span>{isBotSpeaking ? "Chatbot Speaking" : "Chatbot"}</span>
            </Button>
          </div>
            <Button onClick={handleEndSimulation} variant="outline">
              End Simulation
            </Button>
        </div>
      )}

      {/* Previous Version with states */}
      {/* {!selectedTopic ? (
        <div className="simulationSelector">
          <h2 className='text-xl text-gray-100'>Select Simulation</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {topics.map((topic, index) => (
            <Card
              key={index}
              className={`p-4 cursor-pointer border-2 hover:border-blue-300 ${
                selectedTopic === topic ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
              }`}
              onClick={() => handleTopicSelection(topic)}
            >
              <CardContent className="text-center">
                <div className="text-4xl">{topic.icon}</div>
                <h2 className=" font-bold mt-2">{topic.text}</h2>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button onClick={handleStartSimulation}>Start Simulation</Button>
        </div>
      ) : !isSimulationActive ? (
        <Button onClick={handleStartSimulation}>Start Simulation</Button>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Scenario Transcript</h2>
              <div className="whitespace-pre-wrap p-4 rounded max-h-60 overflow-y-auto">
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
            <Button onClick={handleEndSimulation} variant="outline">
              End Simulation
            </Button>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default SimulationModule;
