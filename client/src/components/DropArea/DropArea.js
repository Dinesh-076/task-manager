import React, { useState } from "react";
import "./DropArea.css";

const DropArea = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <section
      className={showDrop ? "drop-area" : "hide-drop"}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        if (onDrop) {
          onDrop();
        }
        setShowDrop(false);
      }}
    >
      Drop Here
    </section>
  );
};

export default DropArea;
