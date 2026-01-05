import React from "react";

const Paso6 = ({ form, setForm, siguiente, anterior }) => {
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, cancionDJ: e.target.value }));
  };

  const continuar = (e) => {
    e.preventDefault();
    siguiente();
  };

  return (
    <form onSubmit={continuar} className="formulario">
      <h2>Tu canción</h2>

      <p
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "rgba(255,255,255,0.72)",
        }}
      >
        Si quieres, déjanos una canción que te gustaría escuchar durante la fiesta.
      </p>

      <input
        type="text"
        name="cancionDJ"
        value={form.cancionDJ || ""}
        onChange={handleChange}
        placeholder="Escribe aquí tu canción"
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        <button type="button" onClick={anterior}>
          Atrás
        </button>
        <button type="submit">Continuar</button>
      </div>
    </form>
  );
};

export default Paso6;
