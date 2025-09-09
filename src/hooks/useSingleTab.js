import { useEffect, useState, useRef } from "react";

export default function useSingleTab({ heartbeatInterval = 2000, expiryTime = 5000 } = {}) {
  const [isAnotherTabOpen, setIsAnotherTabOpen] = useState(false);
  const tabIdRef = useRef(null);
  const isAnotherTabOpenRef = useRef(isAnotherTabOpen);
  isAnotherTabOpenRef.current = isAnotherTabOpen;

  const heartbeatIntervalRef = useRef(heartbeatInterval);
  const expiryTimeRef = useRef(expiryTime);

  useEffect(() => {
    const key = "app_tab_open";

    // cria ou mantém tabId da aba
    let storedTabId = sessionStorage.getItem("tab_id");
    if (!storedTabId) {
      storedTabId = Date.now().toString() + Math.random().toString(36).slice(2);
      sessionStorage.setItem("tab_id", storedTabId);
    }
    tabIdRef.current = storedTabId;

    // registra ou atualiza aba no localStorage
    const registerTab = () => {
      const data = JSON.stringify({ tabId: tabIdRef.current, timestamp: Date.now() });
      localStorage.setItem(key, data);
    };

    // verifica se outra aba está ativa
    const checkOtherTab = () => {
      const dataStr = localStorage.getItem(key);
      if (!dataStr) return false;
      try {
        const data = JSON.parse(dataStr);
        const now = Date.now();

        // se timestamp expirou, a aba antiga foi fechada → registra esta aba
        if (now - data.timestamp > expiryTimeRef.current) {
          registerTab();
          return false;
        }

        // se tabId é diferente, outra aba está ativa
        if (data.tabId !== tabIdRef.current) return true;

        return false;
      } catch {
        registerTab();
        return false;
      }
    };

    // checa imediatamente ao montar
    if (checkOtherTab()) setIsAnotherTabOpen(true);
    else registerTab();

    // heartbeat: atualiza timestamp da aba ativa
    const interval = setInterval(() => {
      if (!isAnotherTabOpenRef.current) registerTab();
    }, heartbeatIntervalRef.current);

    // remove o lock ao fechar a aba
    const handleBeforeUnload = () => {
      const dataStr = localStorage.getItem(key);
      if (!dataStr) return;
      const data = JSON.parse(dataStr);
      if (data.tabId === tabIdRef.current) localStorage.removeItem(key);
    };

    // captura mudanças no localStorage vindas de outras abas
    const handleStorage = (e) => {
      if (e.key === key && e.newValue) {
        const data = JSON.parse(e.newValue);
        if (data.tabId !== tabIdRef.current) setIsAnotherTabOpen(true);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("storage", handleStorage);
      const dataStr = localStorage.getItem(key);
      if (dataStr) {
        const data = JSON.parse(dataStr);
        if (data.tabId === tabIdRef.current) localStorage.removeItem(key);
      }
    };
  }, []);

  return isAnotherTabOpen;
}
