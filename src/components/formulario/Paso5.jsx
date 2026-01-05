import React from "react";

const Paso5 = ({ form, setForm, anterior, siguiente }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const continuar = (e) => {
    e.preventDefault();
    siguiente();
  };

  return (
    <form onSubmit={continuar} className="formulario">
      <h2>Autobús</h2>

      <p
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "rgba(255,255,255,0.72)",
        }}
      >
        Para organizar los traslados con antelación, indícanos si lo vas a necesitar.
      </p>

      <label>¿Quieres venir en autobús?</label>
      <select
        name="autobus"
        value={form.autobus || ""}
        onChange={handleChange}
        required
      >
        <option value="">Selecciona una opción</option>
        <option value="sí">Sí</option>
        <option value="no">No</option>
      </select>

      {form.autobus === "sí" && (
        <>
          <label>¿Desde dónde quieres salir?</label>
          <select
            name="origenAutobus"
            value={form.origenAutobus || ""}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona punto de salida</option>
            <option value="valencia">Valencia</option>
            <option value="carcaixent">Carcaixent</option>
          </select>

          {form.origenAutobus === "valencia" && (
            <>
              <p style={{ marginTop: "10px", color: "rgba(255,255,255,0.70)" }}>
                Salida desde Gran Via Marques Del Turia, 49 (VIPS) a las 19:15.
              </p>

              <label style={{ marginTop: "1rem" }}>
                ¿En qué horario tienes pensado volver?
              </label>
              <select
                name="regresoValencia"
                value={form.regresoValencia || ""}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una opción</option>
                <option value="3:00">A la 1:00</option>
                <option value="5:00">A las 5:00</option>
              </select>
            </>
          )}

          {form.origenAutobus === "carcaixent" && (
            <div
              style={{
                marginTop: "10px",
                color: "rgba(255,255,255,0.70)",
                fontSize: "0.95rem",
                lineHeight: "1.35",
              }}
            >
              <p style={{ marginTop: 0 }}>
                <strong style={{ color: "rgba(255,255,255,0.88)" }}>
                  Salida desde Carcaixent
                </strong>{" "}
                (dirección por concretar).
              </p>
              
            
            </div>
          )}
        </>
      )}

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

export default Paso5;
