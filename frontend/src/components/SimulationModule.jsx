import React, { useState, useEffect, useRef, useContext } from "react";
import { ScenarioSelection } from "./ScenarioSelection";
import { SimulationTranscript } from "./SimulationTranscript";
import { SimulationControls } from "./SimulationControls";
import SimulationResults from "./SimulationResults";
import { scenarioService } from "@/api/scenarioApi";
import Loader from "./Loader";
import { DispatchContext } from "@/Context/ContextAPI";
import { useAppStore } from "@/Context/Zustand";

function SimulationModule() {
  // const { userEmail,token,selectedScenario, setSelectedScenario,scenario, setScenario,isSimulationActive, setIsSimulationActive } = useContext(DispatchContext);
    const scenario = useAppStore((state)=>state.scenario)
    const selectedScenario  = useAppStore((state)=>state.selectedScenario)
    const userEmail = useAppStore((state)=>state.userEmail)
    const setSelectedScenario = useAppStore((state)=>state.setSelectedScenario)
    const setScenario = useAppStore((state)=>state.setScenario)
    const isSimulationActive = useAppStore((state)=>state.isSimulationActive)
    const setIsSimulationActive = useAppStore((state)=>state.setIsSimulationActive)
    const token = useAppStore((state)=>state.token)
    const userResponse = useAppStore((state)=>state.userResponse)
    const setUserResponse = useAppStore((state)=>state.setUserResponse)
    const botResponse = useAppStore((state)=>state.botResponse)
    const setBotResponse = useAppStore((state)=>state.setBotResponse)

  const [transcript, setTranscript] = useState("");
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const controlsRef = useRef(null);
 
// function to scroll smooothly to avatar
const scrollToControls = () => {
  controlsRef.current?.scrollIntoView({ behavior: 'smooth' });
};


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
      const data = await scenarioService(token,userEmail,scenario);
      console.log(data)

      setScenario(data);
      setLoading(false);
      // speakBotMessage(data[0]?.body);
    } catch (error) {
      console.error("Error fetching scenario:", error);
      setTranscript(`Error: Unable to fetch scenario for ${scenario}`);
    }
  };

  const handleStartSimulation = () => {
    setIsSimulationActive(true);
    scrollToControls()
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
        <div className="mt-10 gap-8">
          {transcript.scenario_title?<SimulationTranscript
            setSelectedScenario={setSelectedScenario}
            onStartSimulation={handleStartSimulation}
            isSimulationActive={isSimulationActive}
            transcript={scenario}
            isBotSpeaking={isBotSpeaking}
            isUserSpeaking={isUserSpeaking}
            
          /> : <div className="container mx-auto text-xl font-bold text-black-500">
          Something went wrong try refreshing or logging in again
        </div>}
    <div className="h-[85vh]" ref={controlsRef}>
    {/* if(!transcript.scenario_title){
    return <div className="container mx-auto text-xl font-bold text-red-500">
      Something went wrong try refreshing or logging in again
    </div>
  } */}
          <SimulationControls
            isSimulationActive={isSimulationActive}
            isBotSpeaking={isBotSpeaking}
            isUserSpeaking={isUserSpeaking}
            onStartSimulation={handleStartSimulation}
            onMicToggle={handleMicToggle}
            onEndSimulation={handleEndSimulation}
          />
          </div>
        </div>
      )}
    </div>
  );
}

export default SimulationModule;
