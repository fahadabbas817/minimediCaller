import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ReportingDashboard() {
  // This would typically come from an API or state management
  const performanceData = [
    { month: 'Jan', adherence: 75 },
    { month: 'Feb', adherence: 80 },
    { month: 'Mar', adherence: 85 },
    { month: 'Apr', adherence: 82 },
    { month: 'May', adherence: 88 },
    { month: 'Jun', adherence: 90 },
  ];

  const commonMissedSteps = [
    { step: "Failure to obtain caller's phone number", count: 15 },
    { step: "Incorrect prioritization of emergency", count: 12 },
    { step: "Missed critical pre-arrival instructions", count: 10 },
    { step: "Inadequate location verification", count: 8 },
  ];

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Reporting Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Performance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="adherence" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Commonly Missed Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Step</TableHead>
                <TableHead>Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commonMissedSteps.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.step}</TableCell>
                  <TableCell>{item.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReportingDashboard;

