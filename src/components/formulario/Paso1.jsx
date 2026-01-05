import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";

const Paso1 = ({ form, setForm, siguiente }) => {
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const continuar = (e) => {
    e.preventDefault();
    if (form.nombre && form.apellido && form.asiste === "sí") {
      siguiente();
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const enviarSinAsistir = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.apellido || form.asiste !== "no") {
      alert("Completa tu nombre, apellido y selecciona que no asistes.");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      await addDoc(collection(db, "mensajes"), {
        nombre: form.nombre,
        apellido: form.apellido,
        asiste: "no",
        mensaje: form.mensaje || "",
        createdAt: serverTimestamp(),
      });

      setEnviado(true);
    } catch (error) {
      alert("Error al enviar. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  /* Pantalla final cuando no asiste */
  if (enviado) {
    return (
      <div className="formulario" style={{ textAlign: "center" }}>
        <h2>Tu mensaje ha sido recibido</h2>
        <p style={{ color: "rgba(255,255,255,0.75)", marginTop: "1rem" }}>
          Gracias por avisar y por dejar unas palabras. Las leemos con mucho
          cariño.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={form.asiste === "no" ? enviarSinAsistir : continuar}
      className="formulario"
    >
      {/* TÍTULO ÉPICO */}
      <h2>
        En toda gran historia hay una elección.
        <br />
        ¿Caminarás con nosotros ese día?
      </h2>

      {/* Texto funcional muy discreto */}
      <p
        style={{
          fontSize: "0.9rem",
          color: "rgba(255,255,255,0.65)",
          textAlign: "center",
          marginBottom: "1.2rem",
        }}
      >
        26 de septiembre de 2026
      </p>

      <p
        style={{
          fontSize: "0.85rem",
          color: "rgba(255,255,255,0.55)",
          textAlign: "center",
          marginBottom: "1.6rem",
        }}
      >
        Este formulario es individual. Si vienes acompañado/a, reenvía este
        enlace a tu acompañante para que también confirme su asistencia.
      </p>

      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Tu nombre en esta historia"
        required
      />

      <input
        name="apellido"
        value={form.apellido}
        onChange={handleChange}
        placeholder="Tus apellidos"
        required
      />

      <select name="asiste" value={form.asiste} onChange={handleChange} required>
        <option value="">¿Estarás con nosotros?</option>
        <option value="sí">Sí, allí estaré</option>
        <option value="no">No podré acompañaros</option>
      </select>

      {form.asiste === "no" && (
        <>
          <p style={{ marginTop: "20px", fontWeight: "bold" }}>
            Si no puedes acompañarnos, déjanos unas palabras igualmente.
          </p>

          <textarea
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            placeholder="Un mensaje para los novios"
            maxLength={500}
          />
        </>
      )}

      <button type="submit" disabled={loading}>
        {form.asiste === "no"
          ? loading
            ? "Enviando..."
            : "Enviar palabras"
          : "Continuar"}
      </button>
    </form>
  );
};

export default Paso1;
