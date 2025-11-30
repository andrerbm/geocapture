import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import mapImage from "@assets/generated_images/top_down_view_of_a_digital_map_interface.png";

export default function Searching() {
  const [_, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState([
    { text: "Conectando-se à estação base celular", status: "pending" },
    { text: "Identificando operadora de rede", status: "pending" },
    { text: "Conectando-se à estação base celular", status: "pending" }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setLocation("/result");
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    // Simulate steps completing
    setTimeout(() => {
      setSteps(s => s.map((step, i) => i === 0 ? { ...step, status: "completed" } : step));
    }, 1500);
    setTimeout(() => {
      setSteps(s => s.map((step, i) => i === 1 ? { ...step, status: "completed" } : step));
    }, 3000);
    setTimeout(() => {
      setSteps(s => s.map((step, i) => i === 2 ? { ...step, status: "completed" } : step));
    }, 4500);

    return () => clearInterval(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen relative font-sans overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={mapImage} 
          alt="Map Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-end pb-12 md:justify-center md:pb-0 p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 rounded-[2rem] overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-700">
          <CardContent className="p-8 md:p-10 text-center">
            <h2 className="text-gray-900 font-bold text-lg mb-1">Procurando por</h2>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">+55 84 99612-3112</h1>

            <div className="space-y-6 text-left mb-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  {step.status === "completed" ? (
                    <div className="bg-[#00Cba9] rounded-full p-0.5">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-full p-0.5">
                      <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
                    </div>
                  )}
                  <span className={`text-sm font-medium ${step.status === "completed" ? "text-gray-700" : "text-gray-400"}`}>
                    {step.text}
                  </span>
                </div>
              ))}
            </div>

            <Progress value={progress} className="h-2 bg-gray-100" indicatorClassName="bg-[#00Cba9]" />
          </CardContent>
        </Card>
      </div>
      
      {/* Google Logo Placeholder (bottom left like screenshot) */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/80 px-2 py-1 rounded text-xs font-bold text-gray-500">
        Google
      </div>
    </div>
  );
}
