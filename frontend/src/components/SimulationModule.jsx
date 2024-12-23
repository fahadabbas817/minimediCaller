import React, { useState, useEffect, useRef } from "react";
import { ScenarioSelection } from "./ScenarioSelection";
import { SimulationTranscript } from "./SimulationTranscript";
import { SimulationControls } from "./SimulationControls";
import SimulationResults from "./SimulationResults";
import { getRandomData } from "@/api/authApi";
import Loader from "./Loader";

function SimulationModule() {
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [userInput, setUserInput] = useState("");

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const finalTranscript =
          event.results[event.results.length - 1][0].transcript;
        setUserInput(finalTranscript);
        setTranscript((prev) =>
          `${prev}\nDispatcher: ${finalTranscript}`.trim()
        );
        console.log("User Voice Input:", finalTranscript);
        handleUserInput(finalTranscript);
      };

      recognitionRef.current.onend = () => {
        setIsUserSpeaking(false);
      };

      synthRef.current = window.speechSynthesis;
    } else {
      console.error("Speech recognition is not supported in this browser.");
    }
  }, []);

  const handleScenarioSelection = async (scenario) => {
    setSelectedScenario(scenario);
    setLoading(true);
    try {
      const data = await getRandomData({ scenario });
      console.log(data[0]?.body);

      setTranscript(
        `Selected Scenario: ${scenario}\n\nChatbot: ${data[0]?.body}`
      );
      setLoading(false);
      // speakBotMessage(data[0]?.body);
    } catch (error) {
      console.error("Error fetching scenario:", error);
      setTranscript(`Error: Unable to fetch scenario for ${scenario}`);
    }
  };

  const handleStartSimulation = () => {
    setIsSimulationActive(true);
    speakBotMessage("What's the nature of your emergency?");
  };

  const speakBotMessage = (message) => {
    setIsBotSpeaking(true);
    setTranscript((prev) => `${prev}\nChatbot: ${message}`);

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.onend = () => {
      setIsBotSpeaking(false);
    };
    if (synthRef.current) {
      synthRef.current.speak(utterance);
    }
  };

  const handleMicToggle = () => {
    if (isUserSpeaking) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setIsUserSpeaking(true);
    }
  };

  const handleUserInput = async (input) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, scenario: selectedScenario }),
      });
      const data = await response.json();
      speakBotMessage(data.response);
    } catch (error) {
      console.error("Error sending user input to API:", error);
      speakBotMessage(
        "I'm sorry, I couldn't process your input. Please try again."
      );
    }
  };

  const handleEndSimulation = () => {
    setIsSimulationActive(false);
  };

  return (
    <div className="container mx-auto mt-10">
      {/* <h1 className="text-3xl text-gray-200 font-bold text-center  mt-10">
        Simulator
      </h1> */}
      
      {!selectedScenario ? (
        <ScenarioSelection onSelect={handleScenarioSelection} />
      ) : loading ? (
        <Loader />
      ) : (
        <div className="mt-10 flex flex-col gap-8">
          <SimulationTranscript
            transcript={transcript}
            isBotSpeaking={isBotSpeaking}
            isUserSpeaking={isUserSpeaking}
          />
          <SimulationControls
            isSimulationActive={isSimulationActive}
            isBotSpeaking={isBotSpeaking}
            isUserSpeaking={isUserSpeaking}
            onStartSimulation={handleStartSimulation}
            onMicToggle={handleMicToggle}
            onEndSimulation={handleEndSimulation}
          />
        </div>
      )}
    </div>
  );
}

export default SimulationModule;
