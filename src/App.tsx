import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Squircle clip-path definitions — objectBoundingBox scales to any element size */}
      <svg aria-hidden focusable="false" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <defs>
          {/* squircle: Apple icon squircle — 22.5% corner radius, for square elements only */}
          <clipPath id="squircle" clipPathUnits="objectBoundingBox">
            <path d="M 0.225,0 L 0.775,0 C 0.9125,0 1,0.0875 1,0.225 L 1,0.775 C 1,0.9125 0.9125,1 0.775,1 L 0.225,1 C 0.0875,1 0,0.9125 0,0.775 L 0,0.225 C 0,0.0875 0.0875,0 0.225,0 Z" />
          </clipPath>
        </defs>
      </svg>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
