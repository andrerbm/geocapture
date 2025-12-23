import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Searching from "@/pages/searching";
import Result from "@/pages/result";
import Unlock from "@/pages/unlock";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/searching" component={Searching} />
      <Route path="/result" component={Result} />
      <Route path="/unlock" component={Unlock} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
