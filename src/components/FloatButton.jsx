import "./FloatButton.css";
import "../neumorphism.css";

function FloatButton({ onClick, children }) {
  return (
    <button className="float-button neumorphism" onClick={onClick}>
      {children}
    </button>
  );
}

export default FloatButton;
