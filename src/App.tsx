/*
 * SEO — palavras-chave (usadas no title, description, H1, H2 e textos)
 * Principal: desenvolvedor full-stack em Pernambuco
 * Secundárias: desenvolvedor React e Node.js · criação de sites em Limoeiro PE ·
 *   desenvolvedor de aplicativos React Native · desenvolvedor freelancer · sistema SaaS sob medida
 * Cauda longa: contratar desenvolvedor full-stack remoto · quanto custa criar um site ·
 *   criação de app Android e iOS em Pernambuco · desenvolvedor para criar sistema de gestão
 */
import Footer from "./components/Footer";
import { LanguageProvider } from "./provider/LenguageProvider";
import { ThemeProvider } from "./provider/ThemeProvider";
import Contato from "./pages/Contato";
import Habilidades from "./pages/Habilidades";
import Inicio from "./pages/Inicio";
import Projetos from "./pages/Projetos";
import Servicos from "./pages/Servicos";
import FreelaCTA from "./components/FreelaCTA";
import Sobre from "./pages/Sobre";
import ModalProject from "./components/ModalProject";
import PrivacyPolicy from "./components/PrivacyPolicy";
import useTheme from "./hooks/useTheme";
import { useEffect, useState } from "react";
import { MenuProvider } from "./provider/MenuProvider";
import { ModalProjectProvider } from "./provider/ModalProjectProvider";
import useModalProject from "./hooks/useModalProject";
import type { IProject } from "./provider/types";
import AOS from "aos";
import "aos/dist/aos.css";

function PrivacyLayer() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("open-privacy", show);
    return () => window.removeEventListener("open-privacy", show);
  }, []);
  return <PrivacyPolicy open={open} onClose={() => setOpen(false)} theme={theme} />;
}

function App() {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const { isModalOpen } = useModalProject();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <MenuProvider>
          <ModalProjectProvider setSelectedProject={setSelectedProject}>
            {selectedProject && (
              <ModalProject isVisible={isModalOpen} selectedProject={selectedProject} />
            )}

            <Inicio />
            <main>
              <Sobre />
              <Habilidades />
              <Projetos />
              <Servicos />
              <FreelaCTA />
              <Contato />
            </main>
            <Footer />
            <PrivacyLayer />
          </ModalProjectProvider>
        </MenuProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
