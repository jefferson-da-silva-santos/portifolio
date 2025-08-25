import Footer from "./components/Footer";
import { LanguageProvider } from "./provider/LenguageProvider";
import { ThemeProvider } from "./provider/ThemeProvider";
import Contato from "./pages/Contato";
import Habilidades from "./pages/Habilidades";
import Inicio from "./pages/Inicio";
import Projetos from "./pages/Projetos";
import Servicos from "./pages/Servicos";
import Sobre from "./pages/Sobre";
import ModalProject from "./components/ModalProject";
import { useState } from "react";
import { MenuProvider } from "./provider/MenuProvider";
import { ModalProjectProvider } from "./provider/ModalProjectProvider";
import useModalProject from "./hooks/useModalProject";
import type { IProject } from "./provider/types"; 

function App() {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const { isModalOpen } = useModalProject();

  return (
    <>
      <ThemeProvider>
        <LanguageProvider>
          <MenuProvider>
            <ModalProjectProvider setSelectedProject={setSelectedProject}>
              {selectedProject && (
                <ModalProject
                  isVisible={isModalOpen}
                  selectedProject={selectedProject}
                />
              )}
              <Inicio />
              <main>
                <Sobre />
                <Habilidades />
                <Projetos />
                <Servicos />
                <Contato />
              </main>
              <Footer />
            </ModalProjectProvider>
          </MenuProvider>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
