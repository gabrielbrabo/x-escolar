import { useEffect, useState } from "react";

export default function useSingleTab() {
  const [isAnotherTabOpen, setIsAnotherTabOpen] = useState(false);

  useEffect(() => {
    const key = "app_tab_open";

    // Sinaliza que a aba atual está aberta
    if (localStorage.getItem(key)) {
      setIsAnotherTabOpen(true);
    } else {
      localStorage.setItem(key, "true");
    }

    const handleStorage = (e) => {
      if (e.key === key && e.newValue === null) {
        setIsAnotherTabOpen(false);
      }
    };

    window.addEventListener("storage", handleStorage);

    // Ao fechar a aba
    const handleBeforeUnload = () => {
      localStorage.removeItem(key);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      localStorage.removeItem(key);
    };
  }, []);

  return isAnotherTabOpen;
}
