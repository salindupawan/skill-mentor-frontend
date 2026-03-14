import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { ClerkProvider } from "@clerk/react";
import { Toaster } from "./components/ui/sonner.tsx";

const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
// console.log(`pubkey-${key}`)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={key} afterSignOutUrl="/">
      <TooltipProvider>
        <App />
        <Toaster />
      </TooltipProvider>
    </ClerkProvider>
  </StrictMode>,
);
