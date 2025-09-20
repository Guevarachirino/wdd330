// Alert.js
export default class Alert {
    constructor(jsonPath) {
        this.jsonPath = jsonPath; // Ruta del archivo alerts.json
    }

    async loadAndDisplayAlerts() {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) throw new Error('No se pudo cargar alerts.json');

            const alerts = await response.json();
            if (!alerts.length) return; // No hay alertas, salir

            const section = document.createElement('section');
            section.classList.add('alert-list');

            alerts.forEach(alert => {
                const p = document.createElement('p');
                p.textContent = alert.message;
                p.style.backgroundColor = alert.background;
                p.style.color = alert.color;
                p.style.padding = '1rem';
                p.style.margin = '0';
                p.style.fontWeight = 'bold';

                section.appendChild(p);
            });

            const main = document.querySelector('main');
            if (main) {
                main.prepend(section);
            } else {
                console.warn('<main> no encontrado en el HTML.');
            }
        } catch (error) {
            console.error('Error al mostrar alertas:', error);
        }
    }
}
