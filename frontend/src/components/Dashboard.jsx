import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DispatchContext } from "@/Context/ContextAPI";
import { useAppStore } from "@/Context/Zustand";
import Contributors from "./Contributors";
import larenda from "@/assets/larenda.jpg";
import medihack from "@/assets/medihack.jpg";

function Dashboard() {
  const navigate = useNavigate();
  // const {isAuthenticated,setIsAuthenticated } = useContext(DispatchContext);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useAppStore((state) => state.setIsAuthenticated);
  const sponsors = [
    { name: "MediHack", logo: medihack },
    { name: "larenda", logo: larenda },
  ];

  useEffect(() => {
    isAuthenticated ? navigate("/dashboard") : navigate("/login");
  }, []);
  return (
    <div className="container mx-auto mt-24  h-screen space-y-10">
      <h1 className="text-3xl font-bold text-center text-gray-200">
        🎉Welcome, Dispatcher
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Simulation Module</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Practice emergency dispatch scenarios.</p>
            <Button asChild className="mt-4">
              <Link to="/simulation">Start Simulation</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Feedback Module</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Review and analyze your performance.</p>
            <Button asChild className="mt-4">
              <Link to="/feedback">View Feedback</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Progress Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Completed Simulations: 10</p>
          <p>Average Adherence: 85%</p>
          <p>Areas for Improvement: Response Time, Protocol Adherence</p>
        </CardContent>
      </Card>
    
    </div>
  );
}

export default Dashboard;
