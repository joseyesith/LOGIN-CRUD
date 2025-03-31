import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold text-black">Clan Niggaz</h1>

      <ul className="flex gap-x-4">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/" className="px-4 py-1 text-black font-bold">Inicio</Link>
            </li>
            <li>
              <Link to="/add-task" className="px-4 py-1 text-black font-bold">Reservas</Link>
            </li>
            <li>
              <Link to="/room" className="px-4 py-1 text-black font-bold">Nuestro Estudio</Link>
            </li>
            <li>
              <Link to="/" onClick={logout} className="px-4 py-1 text-black font-bold">Cerrar Sesión</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="px-4 py-1 text-black font-bold">Iniciar Sesión</Link>
            </li>
            <li>
              <Link to="/register" className="px-4 py-1 text-black font-bold">Registro</Link>
            </li>
            <li>
              <Link to="/room" className="px-4 py-1 text-black font-bold">Nuestro Estudio</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
