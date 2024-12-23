import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, User, Bot } from 'lucide-react';

export function SimulationTranscript({ transcript, isBotSpeaking, isUserSpeaking }) {
  console.log(transcript)
  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-teal-900">
          Scenario Transcript
        </h2>
        <div className="text-sm rounded max-h-52 overflow-y-auto leading-tight">
          {transcript.split("\n").map((line, index) => (
            <div key={index} className="mb-2">
              {line.startsWith("Dispatcher:") ? (
                <span className="text-slate-800">{line}</span>
              ) : (
                <span className="text-slate-800">{line}</span>
              )}
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
              <span>
                {isBotSpeaking ? "Chatbot is speaking..." : "Listening..."}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

