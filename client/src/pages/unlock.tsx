import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import {
  Lock,
  MapPin,
  Shield,
  CheckCircle2,
  Smartphone,
  Signal,
  Clock,
  Navigation,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Unlock() {
  const [_, setLocation] = useLocation();
  const [pulseActive, setPulseActive] = useState(true);

  // Get phone number from URL
  const phoneNumber =
    new URLSearchParams(window.location.search).get("phone") ||
    "+55 84 99612-3112";

  // Extract DDD from phone number
  const extractDDD = (phone: string) => {
    const match = phone.match(/\d{2}/);
    return match ? match[0] : "84";
  };

  const ddd = extractDDD(phoneNumber);

  // Simulated data based on DDD
  const locationData: Record<
    string,
    { city: string; state: string; operator: string }
  > = {
    "11": { city: "São Paulo", state: "SP", operator: "Vivo" },
    "21": { city: "Rio de Janeiro", state: "RJ", operator: "Claro" },
    "31": { city: "Belo Horizonte", state: "MG", operator: "TIM" },
    "41": { city: "Curitiba", state: "PR", operator: "Vivo" },
    "51": { city: "Porto Alegre", state: "RS", operator: "Claro" },
    "61": { city: "Brasília", state: "DF", operator: "TIM" },
    "71": { city: "Salvador", state: "BA", operator: "Oi" },
    "81": { city: "Recife", state: "PE", operator: "Vivo" },
    "84": { city: "Natal", state: "RN", operator: "Claro" },
    "85": { city: "Fortaleza", state: "CE", operator: "TIM" },
    "91": { city: "Belém", state: "PA", operator: "Oi" },
    "92": { city: "Manaus", state: "AM", operator: "Vivo" },
  };

  const currentLocation = locationData[ddd] || {
    city: "Natal",
    state: "RN",
    operator: "Claro",
  };

  // Pulse animation toggle
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseActive((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlock = () => {
    setLocation(`/payment?phone=${encodeURIComponent(phoneNumber)}`);
  };

  // Generate random last activity time (1-15 minutes ago)
  const lastActivityMinutes = Math.floor(Math.random() * 14) + 1;

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="container mx-auto py-4 px-4 flex items-center justify-center">
        <div className="text-primary font-bold text-xl tracking-tight flex items-center gap-1">
          <MapPin className="fill-primary text-white h-6 w-6" /> GeoCapture
        </div>
      </nav>

      {/* Divider Line */}
      <div className="container mx-auto px-4">
        <div className="border-t border-gray-200"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center p-4 py-8">
        <div className="w-full max-w-lg space-y-6">
          {/* Status Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full">
              <div className="relative">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="absolute inset-0 w-2 h-2 bg-primary rounded-full animate-ping"></div>
              </div>
              <span className="text-sm font-medium text-primary">
                Sinal GPS ativo • Rastreamento disponível
              </span>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Número <span className="text-primary">Localizado!</span>
            </h1>
            <p className="text-gray-600 text-lg">
              <span className="font-semibold text-primary">{phoneNumber}</span>
            </p>
          </div>

          {/* Blurred Map Preview */}
          <Card className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <CardContent className="p-0">
              {/* Fake map with blur */}
              <div className="relative h-48 bg-gradient-to-br from-emerald-50 via-gray-50 to-blue-50 overflow-hidden">
                {/* Grid lines to simulate map */}
                <div className="absolute inset-0 opacity-40">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)
                      `,
                      backgroundSize: "30px 30px",
                    }}
                  ></div>
                </div>

                {/* Simulated streets - more visible */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-0 right-0 h-1.5 bg-gray-300/70"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-2.5 bg-gray-400/60"></div>
                  <div className="absolute top-3/4 left-0 right-0 h-1.5 bg-gray-300/70"></div>
                  <div className="absolute left-1/4 top-0 bottom-0 w-1.5 bg-gray-300/70"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-2.5 bg-gray-400/60"></div>
                  <div className="absolute left-3/4 top-0 bottom-0 w-1.5 bg-gray-300/70"></div>

                  {/* Diagonal streets */}
                  <div className="absolute top-0 left-0 right-0 bottom-0">
                    <div className="absolute top-1/3 left-1/3 w-24 h-1 bg-gray-300/50 rotate-45"></div>
                    <div className="absolute top-2/3 right-1/3 w-20 h-1 bg-gray-300/50 -rotate-45"></div>
                  </div>

                  {/* Park/green area simulation */}
                  <div className="absolute top-[15%] right-[20%] w-16 h-16 bg-emerald-200/40 rounded-lg"></div>

                  {/* Building blocks */}
                  <div className="absolute top-[30%] left-[15%] w-8 h-8 bg-gray-200/50"></div>
                  <div className="absolute bottom-[25%] right-[30%] w-10 h-10 bg-gray-200/50"></div>
                </div>

                {/* Location pin with pulse */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    {/* Pulse rings */}
                    <div
                      className={`absolute -inset-8 rounded-full bg-primary/20 ${
                        pulseActive ? "animate-ping" : ""
                      }`}
                      style={{ animationDuration: "2s" }}
                    ></div>
                    <div
                      className="absolute -inset-4 rounded-full bg-primary/30 animate-pulse"
                      style={{ animationDuration: "1.5s" }}
                    ></div>
                    {/* Pin */}
                    <div className="relative z-10 w-10 h-10 bg-gradient-to-b from-primary to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-primary/50">
                      <Navigation className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Very light overlay - minimal blur */}
                <div className="absolute inset-0 bg-white/10"></div>

                {/* Lock icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-xl border border-primary/30 flex items-center gap-3 shadow-lg cursor-pointer hover:bg-primary/5 transition-colors">
                    <Lock className="w-5 h-5 text-primary" />
                    <span className="text-primary font-semibold">
                      Acessar localização agora
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Header */}
              <div className="px-4 pt-4 pb-2">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-gray-900">
                    Status do Aparelho
                  </h3>
                  <div className="ml-auto flex items-center gap-1 text-xs text-primary">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                    Online
                  </div>
                </div>
              </div>

              {/* Partial data revealed */}
              <div className="p-4 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  {/* City - Visible */}
                  <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-xs text-gray-600">Cidade</span>
                    </div>
                    <p className="text-gray-900 font-semibold">
                      {currentLocation.city}, {currentLocation.state}
                    </p>
                  </div>

                  {/* Operator - Visible */}
                  <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Signal className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-600">Operadora</span>
                    </div>
                    <p className="text-gray-900 font-semibold">
                      {currentLocation.operator}
                    </p>
                  </div>

                  {/* Address - Blurred */}
                  <div className="bg-gray-50 rounded-xl p-3 relative overflow-hidden border border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Navigation className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-600">Endereço</span>
                    </div>
                    <p className="text-gray-900 font-semibold blur-sm select-none">
                      Rua das Flores, 123
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                      <Lock className="w-4 h-4 text-primary" />
                    </div>
                  </div>

                  {/* GPS - Blurred */}
                  <div className="bg-gray-50 rounded-xl p-3 relative overflow-hidden border border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Radio className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-600">Coordenadas</span>
                    </div>
                    <p className="text-gray-900 font-semibold blur-sm select-none">
                      -5.7945, -35.2110
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                      <Lock className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card className="border border-gray-200 rounded-2xl bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-900">
                  Última Atividade
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Localização atualizada
                    </p>
                    <p className="text-xs text-gray-500">
                      Há {lastActivityMinutes} minutos
                    </p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Conexão de dados ativa
                    </p>
                    <p className="text-xs text-gray-500">
                      Há {lastActivityMinutes + 3} minutos
                    </p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl opacity-60 relative overflow-hidden border border-gray-100">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="flex-1 blur-sm">
                    <p className="text-sm text-gray-900">
                      Movimentação detectada
                    </p>
                    <p className="text-xs text-gray-500">Há 23 minutos</p>
                  </div>
                  <Lock className="w-4 h-4 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Unlock CTA */}
          <Card className="border-2 border-primary/50 rounded-2xl overflow-hidden bg-emerald-50/30 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Desbloqueie o Acesso Completo
                </h3>
                <p className="text-gray-600 text-sm">
                  Veja o endereço exato, coordenadas GPS e histórico de
                  localização em tempo real
                </p>
              </div>

              <Button
                className="w-full h-14 text-base font-bold rounded-full bg-primary hover:bg-primary/90 text-white transition-all shadow-xl shadow-primary/25 mb-4 hover:scale-105"
                onClick={handleUnlock}
              >
                <Lock className="w-5 h-5 mr-2" />
                Desbloquear Localização Agora
              </Button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>Pagamento seguro</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Acesso imediato</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features List */}
          <Card className="border border-gray-200 rounded-2xl bg-white shadow-sm">
            <CardContent className="p-5">
              <h4 className="font-bold text-gray-900 mb-4 text-center">
                O que você terá acesso:
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-2 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    Endereço completo
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-gray-700">Coordenadas GPS</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    Mapa em tempo real
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-gray-700">
                    Histórico completo
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Proof */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">+50.000</span>{" "}
              números localizados este mês
            </p>
            <p className="text-xs text-gray-500">
              Avaliação média: 4.8/5 estrelas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

