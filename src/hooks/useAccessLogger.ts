import { useEffect } from "react";
import { UAParser } from "ua-parser-js"; 

const useAccessLogger = (userId: string) => {
  useEffect(() => {
    const parser = new UAParser();
    const uaResult = parser.getResult();

    const accessData = {
      projeto_id: 25,
      user_id: userId,
      ip: "", // vamos buscar depois
      url: window.location.href,
      referer: document.referrer || "http://localhost:5173/",
      user_agent: navigator.userAgent,
      navegador: uaResult.browser.name,
      sistema_operacional: uaResult.os.name,
      dispositivo: uaResult.device.type || "desktop",
      localizacao_geografica: {}, // vamos buscar depois
    };

    // Busca IP e localização
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((loc) => {
        accessData.ip = loc.ip;
        accessData.localizacao_geografica = {
          cidade: loc.city,
          pais: loc.country_name,
        };

        // Envia para sua API
        fetch("https://track-you-api.vercel.app/api/v1/acessos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(accessData),
        }).catch(console.error);
      })
      .catch(console.error);
  }, []);
};

export default useAccessLogger;