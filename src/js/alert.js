// Alert.js
export default class Alert {
  constructor(alertJsonPath) {
    this.alertJsonPath = alertJsonPath;
    this.alertContainer = document.querySelector(".alert-banner");
  }

  async loadAndDisplayAlerts() {
    try {
      const res = await fetch(this.alertJsonPath);
      if (!res.ok) throw new Error("No se pudo cargar alerts.json");

      const alerts = await res.json();

      // Mostrar la primera alerta, por ejemplo
      const alert = alerts[0]; // o haz un bucle si quieres mostrar varias

      this.alertContainer.innerHTML = `
        <div style="
          background-color: ${alert.background};
          color: ${alert.color};
          padding: 1em;
          text-align: center;
          font-weight: bold;
        ">
          ${alert.message}
        </div>
      `;
    } catch (err) {
      console.error("Error al mostrar alertas:", err);
    }
  }
}
