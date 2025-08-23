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

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Adapte seus dados de projeto para incluir todas as informações necessárias
  const adaptedProjectsData = [
    {
      title: "Cardápio Online",
      description: "Descrição completa do cardápio online.",
      technologies: ["Vite", "HTML", "SASS", "CSS", "JavaScript", "API ViaCep"],
      githubUrl: "https://github.com/...",
      deployUrl: "https://site.com.br/...",
      imageClass: "cardapio",
      buttonClass: "cardapio",
    },
    // ... outros projetos
  ];

  return (
    <>
      <ThemeProvider>
        <LanguageProvider>
          <ModalProject
            isVisible={true}
            onClose={() => {}}
            projectData={adaptedProjectsData[0]}
          />
          <Inicio />
          <main>
            <Sobre />
            <Habilidades />
            <Projetos />
            <Servicos />
            <Contato />
          </main>
          <Footer />
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
