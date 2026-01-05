import React from "react";

const Paso8 = ({ form }) => {
  return (
    <div className="formulario" style={{ textAlign: "center" }}>
      <h2>Tu confirmación ha sido enviada</h2>

      <p style={{ color: "rgba(255,255,255,0.72)", marginTop: "1rem" }}>
        Gracias por acompañarnos en este día.
      </p>

      <p
        style={{
          color: "rgba(255,255,255,0.58)",
          marginTop: "0.9rem",
          lineHeight: "1.4",
        }}
      >
        Si necesitas modificar algún dato, escríbenos y lo actualizamos.
      </p>

      {/* Si quieres mostrar un resumen mínimo (opcional, puedes borrar este bloque) */}
      {form?.nombre && (
        <p style={{ color: "rgba(255,255,255,0.60)", marginTop: "1.4rem" }}>
          Registrado a nombre de{" "}
          <span style={{ color: "rgba(255,255,255,0.88)" }}>
            {form.nombre} {form.apellido || ""}
          </span>
        </p>
      )}
    </div>
  );
};

export default Paso8;
