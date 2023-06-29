import { useState } from "react";

const App = () => {
  const [text, setText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula."
  );
  const [isActive, setIsActive] = useState(true);

  const changeText = () => {
    setIsActive(false);
    setTimeout(() => {
      setText(
        "Mauris id libero nec mauris dapibus venenatis. Proin non quam varius."
      );
      setIsActive(true);
    }, 500); // Adjust timing to match CSS transition
  };

  return (
    <div className="container text-black">
      <div className={`content ${isActive ? "active" : ""}`}>{text}</div>
      <button onClick={changeText} style={{ marginTop: "30px" }}>
        Next
      </button>
    </div>
  );
};

export default App;
