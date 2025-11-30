import { useState } from "react";
import { 
  MapPin, 
  Smartphone, 
  ShieldCheck, 
  Users, 
  Search, 
  Bell, 
  Radio, 
  HeartPulse, 
  Activity, 
  Watch, 
  Zap, 
  BrainCircuit, 
  Cpu,
  Quote,
  Star,
  CheckCircle2,
  Menu,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import heroImage from "@assets/generated_images/city_street_at_night_with_tracking_interface_overlay.png"; 

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-primary font-bold text-2xl tracking-tight flex items-center gap-1">
            <MapPin className="fill-primary text-white h-8 w-8" /> GeoZilla
          </div>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
           {/* Placeholder nav items if desired, keeping clean for now as per screenshot focus */}
        </div>
        <Button variant="ghost" size="icon" className="md:hidden text-gray-600">
          <Menu className="h-6 w-6" />
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          {/* Laurel Wreath Header */}
          <div className="flex flex-col items-center justify-center text-center space-y-1">
            <div className="flex items-center gap-3 md:gap-4">
              <svg className="w-6 h-12 md:w-8 md:h-16 text-emerald-300" viewBox="0 0 24 48" fill="currentColor">
                 <path d="M20.5 44c-1 0-2.5-1.5-3-3 .5-2 2-3.5 4-4 .5 2-1.5 5-1 7zm-4.5-6c-1 0-2.5-1-3-2.5.5-2 2-3 4-3.5.5 2-1.5 4.5-1 6zm-3-6.5c-.5 0-2-1-2.5-2.5.5-2 2-3 3.5-3 .5 2-1.5 4-1 5.5zm-1-6.5c-.5 0-2-.5-2.5-2 .5-1.5 2-2.5 3.5-2.5.5 1.5-1.5 3.5-1 4.5z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-emerald-500 font-bold text-lg md:text-2xl leading-tight">
                  Mais de 25 milhões de usuários
                </span>
                <span className="text-gray-400 text-sm font-medium">
                  confiaram em nós
                </span>
              </div>
              <svg className="w-6 h-12 md:w-8 md:h-16 text-emerald-300 transform scale-x-[-1]" viewBox="0 0 24 48" fill="currentColor">
                 <path d="M20.5 44c-1 0-2.5-1.5-3-3 .5-2 2-3.5 4-4 .5 2-1.5 5-1 7zm-4.5-6c-1 0-2.5-1-3-2.5.5-2 2-3 4-3.5.5 2-1.5 4.5-1 6zm-3-6.5c-.5 0-2-1-2.5-2.5.5-2 2-3 3.5-3 .5 2-1.5 4-1 5.5zm-1-6.5c-.5 0-2-.5-2.5-2 .5-1.5 2-2.5 3.5-2.5.5 1.5-1.5 3.5-1 4.5z" />
              </svg>
            </div>
          </div>
          
          {/* Main Headline */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Localize qualquer telefone, <br/>
              <span className="text-gray-900">em qualquer lugar</span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg pt-2">Digite o número que deseja rastrear</p>
          </div>
          
          {/* Device Pills */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
             <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 cursor-default shadow-sm">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/></svg>
                iOS
             </div>
             <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 cursor-default shadow-sm">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 576 512"><path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10l-48.54,84.07a288.8,288.8,0,0,0-246.56,0l-48.54-84.07a10,10,0,1,0-17.27,10l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"/></svg>
                Android
             </div>
             <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 cursor-default shadow-sm">
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                Todos os dispositivos
             </div>
             <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 cursor-default shadow-sm">
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                Qualquer rede
             </div>
          </div>

          <div className="space-y-4 max-w-xl mx-auto w-full">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1 shadow-sm">
               <div className="flex items-center pl-3 pr-2 border-r border-gray-200 h-10 cursor-pointer hover:bg-gray-100 rounded-l-lg transition-colors">
                  <img src="https://flagcdn.com/w40/br.png" alt="Brazil" className="w-6 h-auto rounded-sm shadow-sm" />
                  <svg className="w-4 h-4 ml-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
               </div>
               <div className="flex-1 flex items-center pl-3">
                  <span className="text-gray-900 text-lg font-medium mr-2">+55</span>
                  <input 
                    type="tel"
                    className="w-full bg-transparent border-none focus:ring-0 outline-none text-lg p-0 text-gray-900 placeholder-gray-400 h-12"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
               </div>
            </div>
            
            <Button className="w-full h-16 text-xl font-bold rounded-xl shadow-sm bg-[#98D8C6] hover:bg-[#86cbb8] text-white transition-all" size="lg">
              Localizar
            </Button>
            
            <div className="flex justify-between gap-4 w-full pt-2">
              <div className="flex-1 flex items-center justify-center gap-2 bg-[#e8f7f3] py-3 rounded-lg">
                 <ShieldCheck className="h-4 w-4 text-[#5bb59a]" /> 
                 <span className="text-[#5bb59a] text-xs font-bold">100% Confidencial</span>
              </div>
              <div className="flex-1 flex items-center justify-center gap-2 bg-[#e8f7f3] py-3 rounded-lg">
                 <Lock className="h-4 w-4 text-[#5bb59a]" /> 
                 <span className="text-[#5bb59a] text-xs font-bold">SSL Seguro</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-2xl border-[6px] border-white ring-1 ring-gray-100">
           <img 
             src={heroImage} 
             alt="Location Tracking" 
             className="w-full h-full object-cover scale-105"
           />
           
           {/* Overlay UI elements mimicking the screenshot */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
              <div className="relative">
                {/* Pulse Rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/20 rounded-full animate-[ping_3s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/30 rounded-full"></div>
                
                {/* Marker */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-primary p-1.5 rounded-full border-[3px] border-white shadow-lg shadow-black/20 mb-2">
                     <Avatar className="h-14 w-14 border-2 border-white">
                       <AvatarImage src="https://github.com/shadcn.png" />
                       <AvatarFallback>CN</AvatarFallback>
                     </Avatar>
                  </div>
                  <div className="bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Localizado
                  </div>
                  {/* Pin triangle */}
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black/80 -mt-[1px]"></div>
                </div>
              </div>
           </div>
           
           {/* Camera UI overlay */}
           <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
             <div className="flex justify-between">
               <div className="w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-2xl"></div>
               <div className="w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-2xl"></div>
             </div>
             <div className="flex justify-between items-end">
               <div className="w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-2xl"></div>
               <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm mb-2">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white font-mono font-bold tracking-widest text-xs">REC</span>
               </div>
               <div className="w-12 h-12 border-b-4 border-r-4 border-white rounded-br-2xl"></div>
             </div>
           </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">O que ganhará</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: MapPin, title: "Localização em tempo real", color: "bg-cyan-50 text-cyan-600" },
              { icon: Activity, title: "Histórico de localização", color: "bg-blue-50 text-blue-600" },
              { icon: Bell, title: "Alertas de local", color: "bg-emerald-50 text-emerald-600" },
              { icon: Search, title: "Busca em RA", color: "bg-purple-50 text-purple-600" },
              { icon: Radio, title: "Botão SOS", color: "bg-red-50 text-red-600" },
              { icon: HeartPulse, title: "Detecção de quedas", color: "bg-pink-50 text-pink-600" },
              { icon: Zap, title: "Controle de colisão e velocidade", color: "bg-amber-50 text-amber-600" },
              { icon: Watch, title: "Conexão com vestíveis", color: "bg-indigo-50 text-indigo-600" },
            ].map((feature, i) => (
              <Card key={i} className="border-0 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white rounded-2xl overflow-hidden group">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4 h-full justify-center">
                  <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center ${feature.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-10 w-10 stroke-[1.5]" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm md:text-base leading-tight px-2">{feature.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">Nossas tecnologias</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
            {[
              { icon: MapPin, title: "Rastreamento GPS preciso", desc: "Tecnologia avançada de posicionamento" },
              { icon: BrainCircuit, title: "Algoritmos modernos de ML", desc: "(Aprendizado de Máquina)" },
              { icon: Cpu, title: "Ampla gama de dispositivos", desc: "IoT suportados" },
            ].map((tech, i) => (
              <div key={i} className="bg-emerald-50/30 rounded-[2rem] p-8 md:p-10 flex flex-col items-center gap-6 hover:bg-emerald-50/60 transition-colors border border-emerald-100/50">
                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-primary shadow-sm mb-2 border border-emerald-100">
                  <tech.icon className="h-10 w-10 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{tech.title}</h3>
                  <p className="text-gray-500 text-sm font-medium">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button className="h-14 px-10 text-lg font-bold rounded-full shadow-xl shadow-primary/25 bg-primary hover:bg-primary/90 transition-all hover:scale-105">
            Experimente GeoZilla Agora
          </Button>
        </div>
      </section>

      {/* Press / Testimonials */}
      <section className="py-20 bg-white border-t border-gray-50">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Eles escrevem sobre nós</h2>
          
          <div className="relative p-10 bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 mb-12">
            <Quote className="h-10 w-10 text-primary/20 absolute top-8 left-8 rotate-180" />
            <p className="text-gray-600 italic text-xl leading-relaxed relative z-10 pt-6 px-4 font-light">
              "O Verge relata que GeoZilla ajudará você a manter seus entes queridos seguros, sabendo onde eles estão e ajudando-os se necessário."
            </p>
            <div className="mt-8 flex justify-center items-center gap-2">
               <div className="w-8 h-1 bg-primary/20 rounded-full"></div>
               <span className="font-bold text-xs tracking-widest text-gray-400 uppercase">The Verge</span>
               <div className="w-8 h-1 bg-primary/20 rounded-full"></div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center justify-center">
               <div className="bg-red-600 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-sm shadow-lg">cnet</div>
            </div>
            <div className="font-serif font-bold text-2xl flex items-center text-black">The New York Times</div>
            <div className="font-bold text-xl flex items-center text-orange-600 tracking-tighter">
              <span className="bg-orange-600 text-white px-1 mr-0.5">THE</span> VERGE
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-20">Como Funciona</h2>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-1 bg-emerald-50 z-0">
              <div className="h-full bg-emerald-100 w-1/2"></div>
            </div>

            {[
              { step: 1, title: "Verificar o número", desc: "Insira o número de telefone que deseja verificar. Essas informações são privadas e inacessíveis a terceiros." },
              { step: 2, title: "Enviar solicitação", desc: "O destinatário recebe um SMS para consentir com sua localização. O compartilhamento é opcional." },
              { step: 3, title: "Receber a localização", desc: "Você será notificado para visualizar a localização exata em um mapa." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-6 bg-white p-4 relative z-10">
                <div className="w-20 h-20 bg-emerald-50 text-primary font-bold text-3xl rounded-2xl flex items-center justify-center shadow-sm border border-emerald-100 relative group">
                  <span className="group-hover:scale-110 transition-transform">{item.step}</span>
                  {i < 2 && <div className="md:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-emerald-100"></div>}
                </div>
                <div>
                   <h3 className="font-bold text-xl text-gray-900 mb-3">{item.title}</h3>
                   <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button className="h-14 px-10 text-lg font-bold rounded-full shadow-xl shadow-primary/25 bg-primary hover:bg-primary/90 transition-all hover:scale-105">
              Experimente GeoZilla Agora
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-slate-50/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
             <div className="inline-flex items-center justify-center mb-4">
               <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-gray-100 flex items-center gap-2 text-primary font-bold text-lg">
                 <Users className="h-5 w-5" /> Mais de 25 milhões de usuários
               </div>
             </div>
             <p className="text-gray-400 font-medium">confiaram em nós</p>
          </div>

          <div className="flex justify-center gap-6 mb-12 text-sm font-medium">
             <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-xl border border-gray-100 shadow-sm">
               <span className="font-bold text-gray-900">App Store</span>
               <div className="flex text-yellow-400 gap-0.5"><Star className="h-3.5 w-3.5 fill-current" /><Star className="h-3.5 w-3.5 fill-current" /><Star className="h-3.5 w-3.5 fill-current" /><Star className="h-3.5 w-3.5 fill-current" /><Star className="h-3.5 w-3.5 fill-current" /></div>
               <span className="text-gray-400 font-normal">4.6</span>
             </div>
             <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-xl border border-gray-100 shadow-sm">
               <span className="font-bold text-gray-900">Google Play</span>
               <div className="flex text-yellow-400 gap-0.5"><Star className="h-3.5 w-3.5 fill-current" /><Star className="h-3.5 w-3.5 fill-current" /><Star className="h-3.5 w-3.5 fill-current" /><Star className="h-3.5 w-3.5 fill-current" /><Star className="h-3.5 w-3.5 fill-current" /></div>
               <span className="text-gray-400 font-normal">4.5</span>
             </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Kevin Peters", role: "Ótimo app", desc: "Ótimo app para acompanhar adolescentes ocupados em movimento!", img: "https://i.pravatar.cc/150?u=5" },
              { name: "John Lee", role: "Perfeito para Android e iPhone", desc: "Estou nos primeiros estágios de demência - isto será útil para minha família no futuro.", img: "https://i.pravatar.cc/150?u=8" },
              { name: "Megan Smith", role: "Super útil!", desc: "Exibir endereços físicos em cada ponto de rastreamento ao longo de uma rota é impressionante!", img: "https://i.pravatar.cc/150?u=3" },
            ].map((review, i) => (
              <Card key={i} className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white rounded-2xl">
                <CardContent className="p-8">
                   <div className="flex items-center gap-4 mb-6">
                     <Avatar className="h-12 w-12 border border-gray-100">
                       <AvatarImage src={review.img} />
                       <AvatarFallback>{review.name[0]}</AvatarFallback>
                     </Avatar>
                     <div className="text-left">
                       <h4 className="font-bold text-gray-900 leading-tight">{review.name}</h4>
                       <div className="flex items-center text-emerald-500 text-xs font-medium mt-0.5">
                         <CheckCircle2 className="h-3 w-3 mr-1 fill-emerald-500 text-white" /> Verificado
                       </div>
                     </div>
                   </div>
                   <h5 className="font-bold text-gray-900 mb-3">{review.role}</h5>
                   <p className="text-gray-500 text-sm leading-relaxed">{review.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Form */}
      <section className="py-20 container mx-auto px-4">
        <div className="bg-emerald-50/50 rounded-[3rem] p-8 md:p-20 border border-emerald-100 text-center max-w-5xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            Encontrar Localização<br/>por Número de Telefone
          </h2>
          <p className="text-gray-500 mb-10 text-lg">Digite o número que deseja rastrear</p>
          
          <div className="space-y-6 max-w-md mx-auto relative z-10">
            <div className="flex gap-2 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
               <Select defaultValue="br">
                <SelectTrigger className="w-[100px] bg-gray-50 border-transparent rounded-xl focus:ring-0">
                   <span className="mr-2">🇧🇷</span>
                   <SelectValue placeholder="País" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="br">+55</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                placeholder="Número de telefone" 
                className="flex-1 bg-gray-50 border-transparent rounded-xl h-10 focus-visible:ring-0"
              />
            </div>
            <Button className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/25 bg-primary hover:bg-primary/90 transition-all hover:scale-105" size="lg">
              Localizar
            </Button>
            <div className="flex justify-center gap-8 text-xs text-gray-400 mt-4">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" /> 100% Confidencial</span>
              <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-primary" /> SSL Seguro</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 flex flex-col items-center gap-10">
          <div className="flex gap-8 text-gray-300">
            <a href="#" className="hover:text-primary hover:scale-110 transition-all"><span className="sr-only">Facebook</span>
               <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" className="hover:text-primary hover:scale-110 transition-all"><span className="sr-only">X</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="hover:text-primary hover:scale-110 transition-all"><span className="sr-only">LinkedIn</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" className="hover:text-primary hover:scale-110 transition-all"><span className="sr-only">Instagram</span>
               <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
          
          <div className="text-center text-gray-400 text-xs space-y-4">
            <p>Copyright © 2025 Geozilla.</p>
            <p>Todos os direitos reservados.</p>
            <div className="flex justify-center gap-6 mt-4">
              <a href="#" className="underline hover:text-gray-600 transition-colors">Privacidade</a>
              <a href="#" className="underline hover:text-gray-600 transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
