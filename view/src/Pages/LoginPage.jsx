import {useForm} from 'react-hook-form';
import { useAuth } from '../Context/AuthContext';
import {Link, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
function LoginPage(){

    const {register,handleSubmit, formState:{errors}}=useForm();

    const{signin,errors:signinErrors,isAuthenticated}=useAuth();
const navigate=useNavigate();
    const onSubmit=handleSubmit((data)=>{
        signin(data);
    });

    useEffect(()=>{
        if(isAuthenticated)navigate("/");
    },[isAuthenticated])
    return(
        <div className="bg-[url('/tete.jpg')] bg-cover bg-center flex h-[calc(100vh-100px)] items-center justify-center">

             
        <div className='bg-white max-w-md w-full p-10 rounded-lg p-4 '>
        {
                signinErrors.map((error,i)=>(
                    <div className=' bg-red-500 p-2 text-white text-center my-2'key={i}>
                        {error}
                    </div>    
            
                ))
            }
        <form onSubmit={onSubmit}
        >
        <h1 className='text-3xl font-bold my-2 text-red-500 text-center '>Inicio Sesión</h1>

            <input type="email" 
            {...register("email",{required:true})}
            className='w-full bg-white text-black px-4 py-2 rounded-md my-2 'placeholder='Email'/>
            {errors.email &&(
                    <p className='text-red-500'>Email Requerido</p>
                )}
            <input type="password" 
            {...register("password",{required:true})}
            className='w-full bg-white text-black px-4 py-2 rounded-md my-2   'placeholder='Contraseña'/>
            {errors.password &&(
                    <p className='text-red-500'>Password Requerido</p>
                )}
            <button type="submit"
            className='bg-red-500 text-white px-4 py-2 rounded block mx-auto font-bold'>
                Login
            </button>

            </form>

            <p className='flex gap-x-2 justify-between'>
                ¿No tienes una cuenta aún? <Link to="/register" className='text-sky-500'>Registrate</Link>
            </p>
        </div>
            </div>
    )
}

export default LoginPage