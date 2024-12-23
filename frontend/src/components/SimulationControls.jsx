import React from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from 'lucide-react';

export function SimulationControls({
  isSimulationActive,
  isBotSpeaking,
  isUserSpeaking,
  onStartSimulation,
  onMicToggle,
  onEndSimulation
}) {
  if (!isSimulationActive) {
    return (
      <div className='flex justify-'>
      <Button className='p-8 text-xl bg-gray-200 text-teal-900 hover:bg-white/40 transition-all ease-in duration-100 w-fit rounded-full' onClick={onStartSimulation} variant="outline">
        Start Simulation
      </Button>
      </div>
    );
  }

  return (
    <>
    <div className="flex justify-between">
      <Button
        onClick={onMicToggle}
        variant="outline"
        disabled={isBotSpeaking}
        className={`flex items-center space-x-2 ${
          isUserSpeaking ? "bg-red-100" : ""
        }`}
      >
        {isUserSpeaking ? <Mic className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
        <span>{isUserSpeaking ? "Stop Speaking" : "Dispatcher"}</span>
      </Button>
      <Button
        onClick={onMicToggle}
        variant="outline"
        disabled={isUserSpeaking}
        className={`flex items-center space-x-2 ${
          isBotSpeaking ? "bg-red-100" : ""
        }`}
      >
        {isBotSpeaking ? <Mic className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
        <span>{isBotSpeaking ? "Stop Speaking" : "ChatBot"}</span>
      </Button>
    </div>
    <div className='flex justify-center'>
      <Button className='p-8 text-lg w-max rounded-full' onClick={onEndSimulation} variant="outline">
        End Simulation
      </Button>
      </div>
    </>
  );
}

