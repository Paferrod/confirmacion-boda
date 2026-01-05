import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const normalizarTexto = (texto) =>
  texto
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const Paso4 = ({ form, setForm, siguiente, anterior }) => {
  const [duplicados, setDuplicados] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNinoChange = (index, campo, valor) => {
    const nuevos = [...(form.ninosComen || [])];
    nuevos[index] = { ...nuevos[index], [campo]: valor };
    setForm((prev) => ({ ...prev, ninosComen: nuevos }));
  };

  // ✅ Solo se llama al pulsar "Continuar"
  const buscarDuplicados = async () => {
    const snapshot = await getDocs(collection(db, "confirmaciones"));
    const yaRegistrados = [];

    snapshot.forEach((doc) => {
      const data = doc.data();

      // ✅ Compatible: formato antiguo (ninosComen) o nuevo (ninos.comen)
      const lista = data.ninosComen || data.ninos?.comen || [];

      lista.forEach((nino) => {
        const clave = normalizarTexto(`${nino.nombre} ${nino.apellido}`);
        yaRegistrados.push(clave);
      });
    });

    const encontrados = (form.ninosComen || []).map((n) => {
      const clave = normalizarTexto(`${n.nombre} ${n.apellido}`);
      return yaRegistrados.includes(clave);
    });

    setDuplicados(encontrados);
    return encontrados;
  };

  useEffect(() => {
    const cantidad = parseInt(form.ninosQueComen, 10);

    if (!isNaN(cantidad) && cantidad > 0) {
      const nuevos = Array.from({ length: cantidad }, (_, i) => ({
        nombre: form.ninosComen?.[i]?.nombre || "",
        apellido: form.ninosComen?.[i]?.apellido || "",
        alergias: form.ninosComen?.[i]?.alergias || "",
      }));

      setForm((prev) => ({ ...prev, ninosComen: nuevos }));
      setDuplicados(Array.from({ length: cantidad }, () => false));
    } else {
      setForm((prev) => ({ ...prev, ninosComen: [] }));
      setDuplicados([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.ninosQueComen]);

  const continuar = async (e) => {
    e.preventDefault();

    if (form.traeNinos === "sí") {
      const cantidad = parseInt(form.cantidadNinos || 0, 10);
      const queComen = parseInt(form.ninosQueComen || 0, 10);

      if (isNaN(cantidad) || cantidad < 1) {
        return alert("Indica cuántos niños vienen contigo.");
      }

      if (isNaN(queComen) || queComen < 0 || queComen > cantidad) {
        return alert("Revisa cuántos niños van a comer.");
      }

      for (let i = 0; i < queComen; i++) {
        const nino = form.ninosComen?.[i];
        if (!nino?.nombre || !nino?.apellido) {
          return alert(`Falta información del niño ${i + 1}.`);
        }
      }

      // ✅ Comprobación de duplicados SOLO al continuar (1 lectura)
      if (form.ninosComen?.length > 0) {
        const encontrados = await buscarDuplicados();
        if (encontrados.some(Boolean)) {
          return alert("Hay niños duplicados. Revísalo antes de continuar.");
        }
      }
    }

    siguiente();
  };

  return (
    <form onSubmit={continuar} className="formulario">
      <h2>Niños</h2>

      <p
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "rgba(255,255,255,0.72)",
        }}
      >
        Para organizarlo todo con calma, necesitamos saberlo con antelación.
      </p>

      <label>¿Vas a traer niños al evento?</label>
      <select
        name="traeNinos"
        value={form.traeNinos || ""}
        onChange={handleChange}
        required
      >
        <option value="">Selecciona una opción</option>
        <option value="sí">Sí</option>
        <option value="no">No</option>
      </select>

      {form.traeNinos === "sí" && (
        <>
          <input
            name="cantidadNinos"
            type="number"
            min="1"
            value={form.cantidadNinos || ""}
            onChange={handleChange}
            placeholder="¿Cuántos niños vienen contigo?"
            required
          />

          <input
            name="ninosQueComen"
            type="number"
            min="0"
            max={form.cantidadNinos || 99}
            value={form.ninosQueComen || ""}
            onChange={handleChange}
            placeholder="¿Cuántos de ellos van a comer?"
            required
          />

          {(form.ninosComen || []).map((nino, i) => (
            <div
              key={i}
              style={{
                paddingLeft: "12px",
                borderLeft: "2px solid rgba(255,255,255,0.12)",
                marginBottom: "15px",
              }}
            >
              <label>Niño/a {i + 1}</label>

              <input
                value={nino.nombre}
                onChange={(e) => handleNinoChange(i, "nombre", e.target.value)}
                placeholder="Nombre"
                required
              />

              <input
                value={nino.apellido}
                onChange={(e) =>
                  handleNinoChange(i, "apellido", e.target.value)
                }
                placeholder="Apellidos"
                required
              />

              <input
                value={nino.alergias}
                onChange={(e) =>
                  handleNinoChange(i, "alergias", e.target.value)
                }
                placeholder="Alergias o intolerancias (opcional)"
              />

              {duplicados[i] && (
                <p
                  style={{
                    color: "#c9b37a",
                    fontSize: "0.9rem",
                    marginTop: "6px",
                    opacity: 0.95,
                  }}
                >
                  Este niño ya ha sido registrado. Revísalo antes de continuar.
                </p>
              )}
            </div>
          ))}
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

export default Paso4;
