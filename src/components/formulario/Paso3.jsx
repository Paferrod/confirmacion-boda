import React from "react";

const Paso3 = ({ form, setForm, siguiente, anterior }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const continuar = (e) => {
    e.preventDefault();

    if (!form.menu) {
      alert("Por favor, selecciona un tipo de menú.");
      return;
    }

    if (form.alergias === "sí" && !form.detalleAlergia.trim()) {
      alert("Por favor, especifica tus alergias o intolerancias.");
      return;
    }

    siguiente();
  };

  return (
    <form onSubmit={continuar} className="formulario">
      <h2>Menú y necesidades</h2>

      <p
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "rgba(255,255,255,0.72)",
        }}
      >
        Para que ese día todo sea fácil y estés a gusto.
      </p>

      <label>¿Qué tipo de menú prefieres?</label>
      <select name="menu" value={form.menu} onChange={handleChange} required>
        <option value="">Selecciona una opción</option>
        <option value="normal">Normal</option>
        <option value="vegetariano">Vegetariano</option>
        <option value="vegano">Vegano</option>
      </select>

      <label>¿Tienes alguna alergia o intolerancia?</label>
      <select name="alergias" value={form.alergias} onChange={handleChange}>
        <option value="no">No</option>
        <option value="sí">Sí</option>
      </select>

      {form.alergias === "sí" && (
        <>
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.68)",
            }}
          >
            Indícanoslo con claridad para que el equipo lo tenga en cuenta.
          </p>

          <input
            type="text"
            name="detalleAlergia"
            value={form.detalleAlergia}
            onChange={handleChange}
            placeholder="Especifica tus alergias o intolerancias"
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

export default Paso3;
