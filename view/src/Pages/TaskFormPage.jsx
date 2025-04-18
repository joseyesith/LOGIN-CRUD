import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

function TaskFormPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const availableTimes = ["10:00", "12:00", "14:00", "16:00", "18:00"];

  // Datos del usuario
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        try {
          const response = await fetch(`http://localhost:4000/api/tasks/${params.id}`, {
            credentials: "include", // Enviar cookies (token de sesión)
          });
          if (response.ok) {
            const task = await response.json();
            setSelectedDate(dayjs(task.date).utc().format("YYYY-MM-DD"));
            setSelectedTime(task.time || "");
            setUserData({
              name: task.name || "",
              email: task.email || "",
              phone: task.phone || "",
            });
          } else {
            console.error("Error al cargar la tarea.");
          }
        } catch (error) {
          console.error("Error en la solicitud: ", error);
        }
      }
    }
    loadTask();
  }, [params.id]);

  const handleReserve = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !userData.name || !userData.email || !userData.phone) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const reservation = {
      title: "Reserva de estudio",
      description: "Reserva para sesión de grabación",
      date: selectedDate,
      time: selectedTime,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
    };

    try {
      const response = await fetch("http://localhost:4000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Enviar cookies (token de sesión)
        body: JSON.stringify(reservation),
      });

      if (response.ok) {
        alert("Reserva creada con éxito.");
        navigate("/tasks");
      } else if (response.status === 401) {
        alert("No estás autenticado. Inicia sesión para hacer una reserva.");
      } else {
        alert("Error al crear la reserva.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un problema al realizar la reserva.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full bg-white min-h-screen">
      <div className="bg-[url('/tete.jpg')] bg-cover bg-center flex h-[30vh] w-[100%] items-center justify-center text-white text-6xl font-bold rounded-lg">
        RESERVA UNA SESIÓN
      </div>

      <div className="bg-white max-w-4xl w-full p-10 rounded-md text-black mt-6 shadow-lg flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 flex flex-col">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Selecciona una Fecha:</label>
            <input
              type="date"
              className="w-full bg-gray-200 text-black px-4 py-2 rounded-md border border-gray-400"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          {selectedDate && (
            <div className="bg-gray-100 p-4 rounded-md shadow-md">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-red-500 text-white">
                    <th className="p-2">HORARIO</th>
                    <th className="p-2">FECHA</th>
                    <th className="p-2">SELECCIONAR</th>
                  </tr>
                </thead>
                <tbody>
                  {availableTimes.map((time, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{time}</td>
                      <td className="p-2">{selectedDate}</td>
                      <td className="p-2">
                        <button
                          onClick={() => setSelectedTime(time)}
                          className={`px-4 py-2 rounded-md ${
                            selectedTime === time ? "bg-green-500" : "bg-red-500"
                          } text-white`}
                        >
                          {selectedTime === time ? "SELECCIONADO" : "SELECCIONAR"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selectedTime && (
          <div className="md:w-1/2 bg-gray-100 p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">Datos del Usuario</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold">Nombre:</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                  placeholder="Tu nombre"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold">Correo Electrónico:</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                  placeholder="correo@ejemplo.com"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold">Teléfono:</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-400 rounded-md"
                  placeholder="Tu número de teléfono"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                />
              </div>

              <button
                type="submit"
                onClick={handleReserve}
                className="w-full bg-blue-500 text-white py-2 rounded-md font-bold"
              >
                CONFIRMAR RESERVA
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskFormPage;

