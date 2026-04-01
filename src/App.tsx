import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Services from "./pages/Services.tsx";
import Specials from "./pages/Specials.tsx";
import WhatIs from "./pages/WhatIs.tsx";
import Book from "./pages/Book.tsx";
import Payment from "./pages/Payment.tsx";
import WhatsNew from "./pages/WhatsNew.tsx";
import Availability from "./pages/Availability.tsx";
import InformedChoices from "./pages/InformedChoices.tsx";
import Testimonials from "./pages/Testimonials.tsx";
import Policies from "./pages/Policies.tsx";
import Directions from "./pages/Directions.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/specials" element={<Specials />} />
          <Route path="/what-is" element={<WhatIs />} />
          <Route path="/anatomy" element={<Anatomy />} />
          <Route path="/book" element={<Book />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/whats-new" element={<WhatsNew />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/informed-choices" element={<InformedChoices />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/directions" element={<Directions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
