import { useEffect, useState } from "react";

export default function useSingleTab() {
  const [isAnotherTabOpen, setIsAnotherTabOpen] = useState(false);

  useEffect(() => {
    const key = "app_tab_open";

    // ID único da aba
    const tabId = Date.now().toString() + Math.random().toString(36).slice(2);
    sessionStorage.setItem("tab_id", tabId);

    const existingTab = localStorage.getItem(key);

    if (existingTab && existingTab !== sessionStorage.getItem("tab_id")) {
      // já existe outra aba ativa
      setIsAnotherTabOpen(true);
    } else {
      // registra esta aba
      localStorage.setItem(key, tabId);
    }

    const handleStorage = (e) => {
      if (e.key === key && e.newValue !== tabId) {
        setIsAnotherTabOpen(true);
      }
    };

    const handleBeforeUnload = () => {
      const currentTab = localStorage.getItem(key);
      if (currentTab === tabId) {
        localStorage.removeItem(key);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      handleBeforeUnload();
    };
  }, []);

  return isAnotherTabOpen;
}
