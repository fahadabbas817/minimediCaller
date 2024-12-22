import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

function SimulationResults({ onClose }) {
  const navigate = useNavigate();

  // This would typically come from the simulation state or API
  const results = {
    adherencePercentage: 85,
    missedSteps: [
      "Failed to ask for the exact location of the emergency",
      "Didn't confirm the caller's phone number",
    ],
    suggestions: [
      "Always begin by asking for the precise location of the incident",
      "Confirm the caller's contact information for potential callback",
    ],
  };

  const handleRetry = () => {
    onClose();
  };

  const handleSaveReport = () => {
    // Implement save report functionality
    console.log('Saving report...');
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Simulation Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg">Adherence Percentage: <span className="font-bold">{results.adherencePercentage}%</span></p>
        <div>
          <h3 className="font-semibold text-lg">Missed Steps:</h3>
          <ul className="list-disc pl-5">
            {results.missedSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Improvement Suggestions:</h3>
          <ul className="list-disc pl-5">
            {results.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="space-x-2 justify-end">
        <Button onClick={handleRetry} variant="outline">Retry</Button>
        <Button onClick={handleSaveReport} variant="outline">Save Report</Button>
        <Button onClick={handleContinue}>Continue</Button>
      </CardFooter>
    </Card>
  );
}

export default SimulationResults;

