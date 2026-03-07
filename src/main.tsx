import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { ClerkProvider } from "@clerk/react";

const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
  
  <StrictMode>
    <ClerkProvider publishableKey={key}>
    <BrowserRouter>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
);
