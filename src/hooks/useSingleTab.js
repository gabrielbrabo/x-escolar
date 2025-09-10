import { useState, useEffect, useRef } from "react";

export default function useSingleTabLocked({ keysToClear = [] } = {}) {
  const [isBlocked, setIsBlocked] = useState(false);
  const tabIdRef = useRef(null);
  const TAB_KEY = "app_single_tab";

  useEffect(() => {
    // Cria um tabId único persistente para esta aba
    let tabId = sessionStorage.getItem("tab_id");
    if (!tabId) {
      tabId = Date.now().toString() + Math.random().toString(36).slice(2);
      sessionStorage.setItem("tab_id", tabId);
    }
    tabIdRef.current = tabId;

    const blockTab = () => {
      setIsBlocked(true);

      // Limpa somente sessionStorage da aba bloqueada
      sessionStorage.clear();

      // Limpa apenas as chaves específicas do localStorage da aba bloqueada
      keysToClear.forEach(key => localStorage.removeItem(key));
    };

    const registerTab = () => {
      const current = localStorage.getItem(TAB_KEY);
      if (!current) {
        localStorage.setItem(TAB_KEY, tabIdRef.current);
        setIsBlocked(false);
      } else if (current !== tabIdRef.current) {
        blockTab(); // Bloqueia esta aba
      }
    };

    // Inicial check
    registerTab();

    // Observa mudanças no localStorage (outra aba tenta se registrar)
    const handleStorage = (e) => {
      if (e.key === TAB_KEY) {
        const current = e.newValue;
        if (current !== tabIdRef.current) {
          blockTab(); // Bloqueia permanentemente
        }
      }
    };
    window.addEventListener("storage", handleStorage);

    // Remove TAB_KEY apenas se aba original fechar
    const handleBeforeUnload = () => {
      const current = localStorage.getItem(TAB_KEY);
      if (current === tabIdRef.current) {
        localStorage.removeItem(TAB_KEY);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      const current = localStorage.getItem(TAB_KEY);
      if (current === tabIdRef.current) localStorage.removeItem(TAB_KEY);
    };
  }, [keysToClear]);

  return isBlocked;
}
