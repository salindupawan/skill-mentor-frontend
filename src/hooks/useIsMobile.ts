import { useEffect, useState } from "react";

export default function useIsMobile(){
    const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");
    const listener = () => setIsMobile(media.matches);
    
    // Set initial value
    setIsMobile(media.matches);
    
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return isMobile;
}