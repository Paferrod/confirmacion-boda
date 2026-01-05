import React, { useState } from "react";
import Paso1 from "./Paso1";
import Paso2 from "./Paso2";
import Paso3 from "./Paso3";
import Paso4 from "./Paso4";
import Paso5 from "./Paso5";
import Paso6 from "./Paso6";
import Paso7 from "./Paso7";
import Paso8 from "./Paso8";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    asiste: "",
    sexo: "",
    talla: "",
    quiereManoletinas: false,
    menu: "",
    alergias: "no",
    detalleAlergia: "",
    traeNinos: "",
    cantidadNinos: "",
    ninosQueComen: "",
    ninosComen: [],
    autobus: "",
    origenAutobus: "",
    regresoValencia: "",
    cancionDJ: "",
    mensajeFinal: "",
  });

  const siguiente = () => setStep((prev) => prev + 1);
  const anterior = () => setStep((prev) => prev - 1);

  return (
    <div className="contenedor-formulario">
      {step === 1 && <Paso1 form={form} setForm={setForm} siguiente={siguiente} />}
      {step === 2 && <Paso2 form={form} setForm={setForm} siguiente={siguiente} anterior={anterior} />}
      {step === 3 && <Paso3 form={form} setForm={setForm} siguiente={siguiente} anterior={anterior} />}
      {step === 4 && <Paso4 form={form} setForm={setForm} siguiente={siguiente} anterior={anterior} />}
      {step === 5 && <Paso5 form={form} setForm={setForm} siguiente={siguiente} anterior={anterior} />}
      {step === 6 && <Paso6 form={form} setForm={setForm} siguiente={siguiente} anterior={anterior} />}
      {step === 7 && <Paso7 form={form} setForm={setForm} siguiente={siguiente} anterior={anterior} />}
      {step === 8 && <Paso8 />}
    </div>
  );
};

export default MultiStepForm;
