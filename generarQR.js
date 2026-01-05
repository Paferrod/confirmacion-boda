import QRCode from "qrcode";

// URL de tu web en Firebase Hosting
const url = "https://boda-sara-y-pablo.web.app";

// Opciones visuales (puedes ajustar colores)
const opciones = {
  color: {
    dark: "#000000",  // color de los puntos
    light: "#f8f3e7"  // color de fondo (beige suave)
  },
  width: 600 // tamaño del QR (en píxeles)
};

// Generar archivo PNG
QRCode.toFile("qr-boda.png", url, opciones, (err) => {
  if (err) throw err;
  console.log("✅ QR generado: qr-boda.png");
});
