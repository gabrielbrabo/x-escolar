import { useEffect, useState } from "react";

export default function useSingleTab({ keysToClear = [], disableOnMobile = false }) {
  const [isAnotherTabOpen, setIsAnotherTabOpen] = useState(false);

  useEffect(() => {
    if (disableOnMobile) {
      return; // no mobile, não bloqueia nada
    }

    let tabId = sessionStorage.getItem("tabId");
    if (!tabId) {
      tabId = Date.now() + "-" + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem("tabId", tabId);
    }

    /*const hasBroadcast = typeof BroadcastChannel !== "undefined";

    if (hasBroadcast) {
      // ---- Usando BroadcastChannel ----
      const bc = new BroadcastChannel("sistema_abas");

      bc.onmessage = (event) => {
        if (event.data === "ja_aberto") {
          // outra aba já está aberta → marca bloqueio
          setIsAnotherTabOpen(true);

          // limpa sessionStorage/localStorage se desejar
          keysToClear.forEach((key) => {
            sessionStorage.removeItem(key);
            localStorage.removeItem(key);
          });
        }
      };

      // avisa que esta aba abriu
      bc.postMessage("ja_aberto");

      return () => {
        bc.close();
      };
    } else {*/
      // ---- Fallback usando localStorage com tabId ----
      const onStorage = (e) => {
        if (e.key === "sistema_abas" && e.newValue !== tabId) {
          setIsAnotherTabOpen(true);

          keysToClear.forEach((key) => {
            sessionStorage.removeItem(key);
            localStorage.removeItem(key);
          });
        }
      };

      window.addEventListener("storage", onStorage);

      // avisa no localStorage que essa aba foi aberta
      localStorage.setItem("sistema_abas", tabId);

      return () => {
        window.removeEventListener("storage", onStorage);
        localStorage.removeItem("sistema_abas");
      };
    //}
  }, [keysToClear, disableOnMobile]);

  return isAnotherTabOpen;
}


/**import { useState, useEffect, useRef } from "react";

export default function useSingleTabLocked({ keysToClear = [], disableOnMobile = false } = {}) {
  const [isBlocked, setIsBlocked] = useState(false);
  const tabIdRef = useRef(null);
  const TAB_KEY = "app_single_tab";

  useEffect(() => {
    if (disableOnMobile) return; // não faz nada no mobile

    // Cria um tabId único persistente para esta aba
    let tabId = sessionStorage.getItem("tab_id");
    if (!tabId) {
      tabId = Date.now().toString() + Math.random().toString(36).slice(2);
      sessionStorage.setItem("tab_id", tabId);
    }
    tabIdRef.current = tabId;

    const blockTab = () => {
      setIsBlocked(true);
      // Limpa sessionStorage da aba bloqueada
      sessionStorage.clear();
      // Limpa apenas as chaves específicas do localStorage
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
  }, [keysToClear, disableOnMobile]);

  return isBlocked;
}**/
