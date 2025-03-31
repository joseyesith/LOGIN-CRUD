import { useForm } from 'react-hook-form';
import { useAuth } from '../Context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticated, errors: registerErrors = [] } = useAuth();
    const navigate = useNavigate();

    // Redirigir al usuario si ya está autenticado
    useEffect(() => {
        if (isAuthenticated) {
            console.log("Usuario autenticado, redirigiendo al inicio...");
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    // Manejo del envío del formulario
    const onSubmit = handleSubmit(async (values) => {
        console.log("Formulario enviado:", values); // Verifica los valores antes de enviarlos
        
        // Llamada a la función de registro
        const success = await signup(values);

        if (success) {
            console.log("Registro exitoso, redirigiendo al inicio...");
            navigate("/");
        }
    });

    return (
        <div className="bg-[url('/tete.jpg')] bg-cover bg-center flex h-[calc(100vh-100px)] items-center justify-center">

            <div className='bg-white max-w-md p-10 rounded-md'>
                {/* Mostrar errores de registro si los hay */}
                {
                    Array.isArray(registerErrors) && registerErrors.map((error, i) => (
                        <div className=' bg-red-500 p-2 text-white text-center my-2' key={i}>
                            {error}
                        </div>
                    ))
                }
                <form onSubmit={onSubmit}>
                    <h1 className='text-3xl font-bold my-2 text-red-500 text-center '>Registro</h1>

                    {/* Campo de usuario */}
                    <input type="text"
                        {...register('username', { required: true })}
                        className='w-full bg-white text-black px-4 py-2 rounded-md my-2 ' placeholder='Usuario' />
                    {errors.username && (
                        <p className='text-red-500'>Usuario Requerido</p>
                    )}

                    {/* Campo de email */}
                    <input type="email"
                        {...register("email", { required: true })}
                        className='w-full bg-white text-black px-4 py-2 rounded-md my-2   ' placeholder='Email' />
                    {errors.email && (
                        <p className='text-red-500'>Email Requerido</p>
                    )}

                    {/* Campo de contraseña */}
                    <input type="password"
                        {...register("password", { required: true })}
                        className='w-full bg-white text-black px-4 py-2 rounded-md my-2   ' placeholder='Contraseña' />
                    {errors.password && (
                        <p className='text-red-500'>Password Requerido</p>
                    )}

                    {/* Botón de submit */}
                    <button type="submit"
                        className='bg-red-500 text-white px-4 py-2 rounded block mx-auto font-bold'>
                        Registrarse
                    </button>
                </form>

                {/* Enlace para iniciar sesión */}
                <p className='flex gap-x-2 justify-between'>
                    ¿Ya tienes una cuenta? <Link to="/login" className='text-sky-500'>Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
