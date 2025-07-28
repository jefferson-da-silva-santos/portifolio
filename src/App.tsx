import Footer from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeProvider";
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
        <Inicio />
        <main>
          <Sobre />
          <Habilidades />
          <Projetos />
          <Servicos />
          <Contato />
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
