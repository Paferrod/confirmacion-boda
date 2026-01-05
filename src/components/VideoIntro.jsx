import React, { useRef, useState } from "react";

const VideoIntro = ({ onFinish }) => {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);

  const startVideo = async () => {
    try {
      setStarted(true);
      await videoRef.current.play();
    } catch (e) {
      console.error("No se pudo iniciar el vídeo:", e);
    }
  };

  return (
    <div style={styles.wrap}>
      <video
        ref={videoRef}
        src="/Texto.mp4"
        style={styles.video}
        playsInline
        // ❌ muted eliminado → ahora hay sonido
        onEnded={onFinish}
      />

      {/* Overlay cinematográfico */}
      <div style={styles.overlay} />

      {/* Botón obligatorio para permitir audio */}
      {!started && (
        <div style={styles.center}>
          <button type="button" onClick={startVideo} style={styles.btn}>
            Comenzar
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrap: {
    position: "fixed",
    inset: 0,
    background: "#000",
    zIndex: 9999,
  },
  video: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(900px 600px at 50% 30%, rgba(255,255,255,0.06), transparent 60%), linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.75))",
    pointerEvents: "none",
  },
  center: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
  },
  btn: {
    padding: "1rem 1.4rem",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.18)",
    background:
      "linear-gradient(180deg, rgba(201,179,122,0.95), rgba(166,143,90,0.95))",
    color: "rgba(10,12,15,0.95)",
    fontFamily: "Cinzel, serif",
    letterSpacing: "1px",
    fontSize: "1.05rem",
    cursor: "pointer",
  },
};

export default VideoIntro;
