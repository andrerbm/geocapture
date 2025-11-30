import { useLocation } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import mapImage from "@assets/generated_images/top_down_view_of_a_digital_map_interface.png";

export default function Result() {
  const [_, setLocation] = useLocation();

  return (
    <div className="min-h-screen relative font-sans overflow-hidden">
      {/* Map Background with Blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src={mapImage} 
          alt="Map Background" 
          className="w-full h-full object-cover blur-sm brightness-75"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 rounded-[2rem] overflow-hidden animate-in zoom-in-95 duration-500">
          <CardContent className="p-8 md:p-10 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#00Cba9] rounded-full flex items-center justify-center shadow-lg shadow-[#00Cba9]/20">
                 <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                   <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                 </svg>
              </div>
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">+55 84 99612-3112</h1>
            <h2 className="text-gray-900 font-bold text-lg mb-8">Número localizado!</h2>

            <div className="space-y-3 text-sm mb-8">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2 border-dotted">
                <span className="text-gray-500">País</span>
                <span className="font-medium text-gray-900">BR</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-2 border-dotted">
                <span className="text-gray-500">Fuso Horário</span>
                <span className="font-medium text-gray-900">(GMT-3)</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-2 border-dotted">
                <span className="text-gray-500">Cidade</span>
                <span className="font-medium text-gray-400 blur-[4px] select-none">Natal/RN</span>
              </div>
              <div className="flex justify-between items-center border-b-0 border-gray-100 pb-2 border-dotted">
                <span className="text-gray-500">Localização</span>
                <span className="font-bold text-[#00Cba9]">Definida</span>
              </div>
            </div>

            <Button 
              className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-[#00Cba9]/20 bg-[#00Cba9] hover:bg-[#00b596] text-white transition-all"
              onClick={() => setLocation("/")}
            >
              Continuar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
