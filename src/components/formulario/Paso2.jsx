import React from "react";

const Paso2 = ({ form, setForm, siguiente, anterior }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const continuar = (e) => {
    e.preventDefault();

    // Si quiere manoletinas, la talla es obligatoria
    if (form.manoletinas === "si" && !String(form.talla || "").trim()) {
      alert("Por favor, indica tu talla de manoletina.");
      return;
    }

    siguiente();
  };

  return (
    <form onSubmit={continuar} className="formulario">
      <h2>Un detalle para el camino</h2>

      <p
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "rgba(255,255,255,0.72)",
        }}
      >
        ¿Te gustaría disponer de manoletinas durante la celebración?
      </p>

      <select
        name="manoletinas"
        value={form.manoletinas || ""}
        onChange={handleChange}
        required
      >
        <option value="">Selecciona una opción</option>
        <option value="si">Sí</option>
        <option value="no">No</option>
      </select>

      {form.manoletinas === "si" && (
        <>
          <label>¿Qué talla usas?</label>
          <input
            type="text"
            name="talla"
            value={form.talla || ""}
            onChange={handleChange}
            placeholder="Ej: 37 / 38 / 39"
            required
          />
        </>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
          gap: "12px",
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

export default Paso2;
