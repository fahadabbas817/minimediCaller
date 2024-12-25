import React, { useState, useEffect, useRef, useContext } from "react";
import { ScenarioSelection } from "./ScenarioSelection";
import { SimulationTranscript } from "./SimulationTranscript";
import { SimulationControls } from "./SimulationControls";
import SimulationResults from "./SimulationResults";
import { conversationService, generateFeedbackService, scenarioService } from "@/api/scenarioApi";
import Loader from "./Loader";
import { DispatchContext } from "@/Context/ContextAPI";
import { useAppStore } from "@/Context/Zustand";
import { useNavigate } from "react-router-dom";

function SimulationModule() {
  // const { userEmail,token,selectedScenario, setSelectedScenario,scenario, setScenario,isSimulationActive, setIsSimulationActive } = useContext(DispatchContext);
  const convHistory = useAppStore((state) => state.convHistory);
  const updateConversation = useAppStore((state) => state.updateConversation);
  const scenario = useAppStore((state) => state.scenario);
  const selectedScenario = useAppStore((state) => state.selectedScenario);
  const userEmail = useAppStore((state) => state.userEmail);
  const setSelectedScenario = useAppStore((state) => state.setSelectedScenario);
  const setScenario = useAppStore((state) => state.setScenario);
  const isSimulationActive = useAppStore((state) => state.isSimulationActive);
  const setIsSimulationActive = useAppStore(
    (state) => state.setIsSimulationActive
  );
  const token = useAppStore((state) => state.token);
  const userResponse = useAppStore((state) => state.userResponse);
  const setUserResponse = useAppStore((state) => state.setUserResponse);
  const botResponse = useAppStore((state) => state.botResponse);
  const setBotResponse = useAppStore((state) => state.setBotResponse);
  const setReportData = useAppStore((state) => state.setReportData);
  const reportData = useAppStore((state) => state.reportData);

  const [transcript, setTranscript] = useState("");
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [convLoading, setConvLoading] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const controlsRef = useRef(null);

  const navigate = useNavigate()

  // function to scroll smooothly to avatar
  const scrollToControls = () => {
    controlsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      let accumulatedTranscript = ""; //temporary variable

        recognitionRef.current.onresult = (event) => {
          const result = event.results[event.results.length - 1];
          if (result.isFinal) {
            accumulatedTranscript += result[0]?.transcript.trim() + " ";
          }
          console.log("Interim Transcript:", accumulatedTranscript);
          updateConversation(accumulatedTranscript, "Dispatcher");
// Previous onResult Function
      // recognitionRef.current.onresult = (event) => {
      //   const finalTranscript =
      //     event.results[event.results.length - 1][0].transcript;
      //   setTranscript((prev) =>
      //     `${prev}\nDispatcher: ${finalTranscript}`.trim()
      //   );
      //   console.log("User Voice Input:", finalTranscript);
      //   if (finalTranscript === "") {
      //     setUserResponse("please be patient");
      //   } else {
      //     console.log(finalTranscript)
      //     setUserResponse(finalTranscript);
      //   }
        // function to get response from chatbot

        // handleUserInput(finalTranscript);
      };

      recognitionRef.current.onend = () => {
        setIsUserSpeaking(false);
      
        if (accumulatedTranscript) {
          console.log("Final User Input:", accumulatedTranscript);
      
          // Update Zustand state
          setUserResponse(accumulatedTranscript);
      
          // Update conversation history
          updateConversation(accumulatedTranscript, "Dispatcher");
      
          // Trigger conversation processing
          handleConversation(accumulatedTranscript);
      
          // Clear the accumulated transcript for the next session
          accumulatedTranscript = "";
        } else {
          console.warn("No valid input detected.");
          speakBotMessage("I couldn't hear you clearly. Please try again.");
        }
      };
      

      // Conversation api will be executed here previous on end function
      // recognitionRef.current.onend = () => {
      //   setIsUserSpeaking(false);
      //   // set user speaking
      //   console.log(userResponse);
      //   updateConversation(userResponse, "Dispatcher");
      //   handleConversation(userResponse);
      //   setUserResponse("");
      // };

      synthRef.current = window.speechSynthesis;
    } else {
      console.error("Speech recognition is not supported in this browser.");
    }
  }, []);

  console.log(scenario.scenario);
  console.log(scenario);
  console.log(userResponse);
  console.log(convHistory);
  console.log(token);

  const handleConversation = async (message) => {
    setConvLoading(true);
    try {
      const result = await conversationService(
        scenario.scenario,
        message,
        convHistory,
        token
      );
      if (result === null || undefined) return;
      speakBotMessage(result);
      setConvLoading(false);
      updateConversation(result, "bot");
      setBotResponse(result);
    } catch (error) {
      console.log("something went wrong please try again");
    }
  };
  const handleGenerateFeedback = async () => {
    setFeedbackLoading(true);
    try {
      const result = await generateFeedbackService(userEmail, convHistory, token);
      if(result){
        console.log(result);
        console.log(typeof(result));
        setReportData(result)
        // if (result === null || undefined) return;
        setFeedbackLoading(false);
        navigate('/reports')
      }
      console.log(reportData)
     
    } catch (error) {
      console.log("something went wrong please try again");
    }
  };

  // Scenario selection api caller function
  const handleScenarioSelection = async (scenario) => {
    setSelectedScenario(scenario);
    setLoading(true);
    try {
      const data = await scenarioService(token, userEmail, scenario);
      if (data === null || undefined) return;
      console.log(data);
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
    scrollToControls();
    speakBotMessage(botResponse);
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
          <SimulationTranscript
            setSelectedScenario={setSelectedScenario}
            onStartSimulation={handleStartSimulation}
            isSimulationActive={isSimulationActive}
            transcript={scenario}
            isBotSpeaking={isBotSpeaking}
            isUserSpeaking={isUserSpeaking}
          />
          <div className="h-screen" ref={controlsRef}>
            {/* if(!transcript.scenario_title){
    return <div className="container mx-auto text-xl font-bold text-red-500">
    Something went wrong try refreshing or logging in again
    </div>
    } */}
            <SimulationControls
              handleGenerateFeedback={handleGenerateFeedback}
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
