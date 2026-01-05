import React from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";

const Paso7 = ({ form, setForm, anterior, siguiente }) => {
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, mensajeFinal: e.target.value }));
  };

  const toInt = (v) => {
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : null;
  };

  const cleanStr = (v) => String(v || "").trim();

  const construirPayload = () => {
    const alergiasTxt = cleanStr(form.detalleAlergia);
    const mensajeTxt = cleanStr(form.mensajeFinal);
    const cancionTxt = cleanStr(form.cancionDJ);

    const quiereManoletinas = form.manoletinas === "si";
    const tallaTxt = cleanStr(form.talla);

    const traeNinos = form.traeNinos === "sí";
    const cantidadNinos = toInt(form.cantidadNinos);
    const ninosQueComen = toInt(form.ninosQueComen);

    // Niños que comen: lo guardamos solo si hay y trae niños
    const listaNinos = Array.isArray(form.ninosComen)
      ? form.ninosComen
          .map((n) => ({
            nombre: cleanStr(n?.nombre),
            apellido: cleanStr(n?.apellido),
            alergias: cleanStr(n?.alergias),
          }))
          .filter((n) => n.nombre && n.apellido) // evita basura
      : [];

    const quiereAutobus = form.autobus === "sí";

    // Construimos el objeto agrupado
    const payload = {
      invitado: {
        nombre: cleanStr(form.nombre),
        apellido: cleanStr(form.apellido),
      },

      // Aquí realmente ya es confirmación (porque has llegado al paso 7),
      // pero si quieres guardarlo siempre, lo guardamos:
      asistencia: {
        asiste: true,
      },

      menu: {
        tipo: cleanStr(form.menu),
        alergias: form.alergias === "sí" ? "sí" : "no",
        // Solo guardamos detalle si alergias = sí y hay texto
        ...(form.alergias === "sí" && alergiasTxt ? { detalleAlergia: alergiasTxt } : {}),
      },

      manoletinas: {
        quiere: quiereManoletinas ? "sí" : "no",
        ...(quiereManoletinas && tallaTxt ? { talla: tallaTxt } : {}),
      },

      ninos: {
        trae: traeNinos ? "sí" : "no",
        ...(traeNinos && cantidadNinos !== null ? { cantidad: cantidadNinos } : {}),
        ...(traeNinos && ninosQueComen !== null ? { comenCantidad: ninosQueComen } : {}),
        ...(traeNinos && listaNinos.length ? { comen: listaNinos } : {}),
      },

      transporte: {
        autobus: quiereAutobus ? "sí" : "no",
        ...(quiereAutobus && form.origenAutobus ? { origen: form.origenAutobus } : {}),
        ...(quiereAutobus && form.origenAutobus === "valencia" && form.regresoValencia
          ? { regresoValencia: form.regresoValencia }
          : {}),
      },

      musica: {
        ...(cancionTxt ? { cancionDJ: cancionTxt } : {}),
      },

      ...(mensajeTxt ? { mensajeFinal: mensajeTxt } : {}),

      createdAt: serverTimestamp(),
    };

    return payload;
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();

    try {
      const payload = construirPayload();
      await addDoc(collection(db, "confirmaciones"), payload);

      console.log("✅ Formulario enviado correctamente.");
      siguiente();
    } catch (error) {
      console.error("❌ Error al enviar el formulario:", error);
      alert("Error al enviar. Por favor, inténtalo más tarde.");
    }
  };

  return (
    <form onSubmit={enviarFormulario} className="formulario">
      <h2>Último paso</h2>

      <p
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "rgba(255,255,255,0.72)",
        }}
      >
        Si quieres, deja unas palabras para nosotros.
      </p>

      <textarea
        name="mensajeFinal"
        value={form.mensajeFinal || ""}
        onChange={handleChange}
        placeholder="Escribe aquí tu mensaje (opcional)"
        maxLength={600}
      />

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
        <button type="submit">Sellar mi destino</button>
      </div>
    </form>
  );
};

export default Paso7;
