import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  User,
  Bot,
  Phone,
  MapPin,
  AlertTriangle,
  FileText,
  Plus,
  PhoneCall,
} from "lucide-react";
import { Button } from "./ui/button";
import { useAppStore } from "@/Context/Zustand";

export function SimulationTranscript({
  transcript,
  isBotSpeaking,
  isUserSpeaking,
  onStartSimulation,
  isSimulationActive,
  controlsRef
}) {

  const setSelectedScenario = useAppStore((state)=>state.setSelectedScenario)
  const selectedScenario = useAppStore((state)=>state.selectedScenario)
 
  return (
    <>
   
      <div
        className="flex justify-between"
      >
        <h1 className="text-xl md:text-3xl text-gray-200 mb-6 font-semibold">
          Scenario Transcript
        </h1>
        <Button
          variant="outline"
          className="flex gap-1 w-fit p-1  md:gap-2 bg-gray-200 text-teal-900 font-semibold"
          onClick={() => setSelectedScenario(!selectedScenario)}
        >
          <Plus className="" />
          <span className="">New Scenario</span>
        </Button>
      </div>
      <Card className="w-full mx-auto bg-gradient-to-r from-white/60 to-white/40 shadow-md max-h-[70vh] md:max-h-fit overflow-y-scroll ">
        <CardHeader>
          <CardTitle className=" text-lg leading-tight md:leading-normal md:text-2xl font-bold text-teal-700">
            {transcript.scenario_title}
          </CardTitle>
          <Badge
            variant="destructive"
            className=" flex items-center w-fit md:py-1 space-x-1"
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs md:text-base">{transcript.callers_emergency_type}</span>
          </Badge>
        </CardHeader>
        <CardContent className=" space-y-1 md:space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-500" />
              <span className="font-medium">{transcript.callers_name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-green-500" />
              <span>{transcript.callers_contact_no}</span>
            </div>
            <div className="flex items-center space-x-2 col-span-full">
              <MapPin className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-sm">{transcript.callers_location}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-teal-600 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Scenario Details
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {transcript.scenario}
            </p>
          </div>
          {/* 
        {(isBotSpeaking || isUserSpeaking) && (
          <div className="flex items-center space-x-2 mt-4 bg-gray-100 p-3 rounded-md">
            {isBotSpeaking ? (
              <Bot className="h-6 w-6 text-green-500" />
            ) : (
              <User className="h-6 w-6 text-blue-500" />
            )}
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">
              {isBotSpeaking ? "Chatbot is speaking..." : "Listening..."}
            </span>
          </div>
        )} */}
        </CardContent>
      </Card>
      {!isSimulationActive && (
        <div className="flex justify-center mt-6">
          <Button
            className="p-8 text-xl flex gap-4 bg-gray-200 text-teal-900 hover:bg-white/40 hover:text-white transition-all ease-in duration-100 w-fit rounded-full"
            onClick={onStartSimulation}
            variant="outline"
          >
            <PhoneCall />
            Start Conversation
          </Button>
          <div ref={controlsRef} />
        </div>
      )}
 
    </>
  );
}
