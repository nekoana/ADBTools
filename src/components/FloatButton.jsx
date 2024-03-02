import "./FloatButton.css";
import "../neumorphism.css";
import { selectAll } from "../database/Database";

function FloatButton({ onClick, children }) {

  const selectAllCmd = async () => {
    const result = await selectAll();
    console.log(result);
  }

  return (
    <button className="float-button neumorphism" onClick={selectAllCmd}>
      {children}
    </button>
  );
}

export default FloatButton;
