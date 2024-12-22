import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

function FeedbackModule() {
  const [transcripts, setTranscripts] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Here you would typically process the file and update the transcripts state
      const newTranscript = {
        id: Date.now(),
        name: file.name,
        timestamp: new Date().toLocaleString(),
        type: 'Medical Emergency', // This would be determined from the file content
      };
      setTranscripts(prev => [...prev, newTranscript]);
    }
  };

  return (
    <div className="container mx-auto mt-10 space-y-8">
      <h1 className="text-3xl font-bold">Feedback</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transcripts.map((transcript) => (
            <TableRow key={transcript.id}>
              <TableCell>{transcript.name}</TableCell>
              <TableCell>{transcript.timestamp}</TableCell>
              <TableCell>{transcript.type}</TableCell>
              <TableCell>
                <Button variant="outline">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default FeedbackModule;

