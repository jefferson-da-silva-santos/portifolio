import Footer from "./components/Footer";
import { LanguageProvider } from "./provider/LenguageProvider";
import { ThemeProvider } from "./provider/ThemeProvider";
import Contato from "./pages/Contato";
import Habilidades from "./pages/Habilidades";
import Inicio from "./pages/Inicio";
import Projetos from "./pages/Projetos";
import Servicos from "./pages/Servicos";
import Sobre from "./pages/Sobre";
import Blog from "./pages/Blog";
import BlogAdmin from "./pages/BlogAdmin";
import ModalProject from "./components/ModalProject";
import { useEffect, useState } from "react";
import { MenuProvider } from "./provider/MenuProvider";
import { ModalProjectProvider } from "./provider/ModalProjectProvider";
import useModalProject from "./hooks/useModalProject";
import type { IProject } from "./provider/types"; 
import AOS from 'aos';
import 'aos/dist/aos.css';
// import useAccessLogger from "./hooks/useAccessLogger";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewPost from "./pages/ViewPost";

// Componente para organizar a página inicial (raiz)
function HomeLayout() {
  return (
    <>
      <Inicio />
      <main>
        <Sobre />
        <Habilidades />
        <Projetos />
        <Servicos />
        <Contato />
      </main>
      <Footer />
    </>
  );
}

function App() {
  // useAccessLogger('portifolio_jefferson_dev');
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
              <ModalProject
                isVisible={isModalOpen}
                selectedProject={selectedProject}
              />
            )}
            
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomeLayout />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<ViewPost />} />
                <Route path="/admin" element={<BlogAdmin />} />
              </Routes>
            </BrowserRouter>

          </ModalProjectProvider>
        </MenuProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;