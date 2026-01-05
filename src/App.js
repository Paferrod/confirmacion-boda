import React, { useState } from "react";
import "./App.css";
import MultiStepForm from "./components/formulario/MultiStepForm";
import VideoIntro from "./components/VideoIntro";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <VideoIntro onFinish={() => setShowIntro(false)} />}

      <div className="App">
        <div className="contenedor-formulario">
          <MultiStepForm />
        </div>
      </div>
    </>
  );
}

export default App;
