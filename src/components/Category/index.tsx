interface CategoryProps {
  category: string;
  isActive: boolean;
  onClick: () => void;
}

const Category = ({ category, isActive, onClick }: CategoryProps) => {
  return (
    <span
      className={`groupProjetos-categorys__item ${isActive ? "active" : ""}`}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "inline-block", // Garante que o scale funcione corretamente
        transition: "transform 0.3s ease", // Suaviza o aumento de tamanho
        transform: isActive ? "scale(1.1)" : "scale(1)",
        zIndex: isActive ? 10 : 1, // Garante que o item ativo fique por cima se houver sobreposição
      }}
    >
      <div className="effect"></div>
      <p
        className="groupProjetos-categorys__text"
        style={{ fontWeight: isActive ? "bold" : "normal" }} // Opcional: negrito no ativo
      >
        {category}
      </p>
    </span>
  );
};

export default Category