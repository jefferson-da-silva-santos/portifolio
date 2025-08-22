import Footer from "./components/Footer";
import { LanguageProvider } from "./provider/LenguageProvider";
import { ThemeProvider } from "./provider/ThemeProvider";
import Contato from "./pages/Contato";
import Habilidades from "./pages/Habilidades";
import Inicio from "./pages/Inicio";
import Projetos from "./pages/Projetos";
import Servicos from "./pages/Servicos";
import Sobre from "./pages/Sobre";

function App() {
  return (
    <>
      <ThemeProvider>
        <LanguageProvider>
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
