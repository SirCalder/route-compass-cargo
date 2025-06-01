// src/App.tsx
import { Toaster as Sonner } from "@/components/ui/sonner"; // Mantido do seu App.tsx original
import { TooltipProvider } from "@/components/ui/tooltip"; // Mantido
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Mantido
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext"; // Mantido
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Importe o RouteProvider
import { RouteProvider } from './contexts/RouteContext'; // Ajuste o caminho se necessário [cite: 149]
// Removido Toaster de @/components/ui/toaster pois Sonner já está presente
// import './App.css'; // Removido se não estiver sendo usado ou se os estilos globais estiverem em index.css

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        {/* Envolver com RouteProvider */}
        <RouteProvider> {/* [cite: 149, 152] */}
          <Sonner /> {/* Mantido */}
          <BrowserRouter basename="/route-compass-cargo">
            <Routes>
              <Route path="/" element={<Index />} />
              {/* A página Dashboard é a que usará os componentes de rota */}
              <Route path="/dashboard" element={<Dashboard />} /> {/* [cite: 150, 151] */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </RouteProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;