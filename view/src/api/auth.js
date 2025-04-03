import axios from "./axios.js";

export const registerRequest = (user) => axios.post(`/auth/register`, user);
export const loginRequest = (user) => axios.post(`/auth/login`, user);
export const verifyTokenRequest = () => axios.get('/auth/verify');

export const downloadUserReportPDF = async () => {
    try {
        const response = await axios.get('/auth/users/pdf', {
            responseType: 'blob' // Importante para manejar el archivo binario
        });

        // Crear un objeto URL para el Blob
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Crear un enlace para la descarga
        const a = document.createElement("a");
        a.href = url;
        a.download = "usuarios_reporte.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Liberar memoria
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error descargando el reporte:", error);
    }
};
