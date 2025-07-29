import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){
    const UsernameRef = useRef<HTMLInputElement>(null);
    const PasswordRef = useRef<HTMLInputElement>(null);
    const EmailRef = useRef<HTMLInputElement>(null);
    const NameRef = useRef<HTMLInputElement>(null);
    const [Loading , SetLoading] = useState(false)
    const navigate = useNavigate();

    async function signup(){
        SetLoading(true);
        const username = UsernameRef.current?.value;
        const password = PasswordRef.current?.value;
        const email = EmailRef.current?.value;
        const name = NameRef.current?.value;

        const response  = await axios.post("https://brainlybe.onrender.com/api/v1/signup", {
            username,
            password,
            name,
            email
        })
        SetLoading(false);
        const token = response.data.token;
        localStorage.setItem("authorization", token);
        navigate("/dashboard");
    }

    return <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 relative overflow-hidden overflow-x-hidden scroll-smooth transform-gpu will-change-transform   flex justify-center items-center">
             <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-500 opacity-30 blur-3xl rounded-full  transform-gpu" />
  <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-700 opacity-20 blur-2xl rounded-full -translate-x-1/2 -translate-y-1/2 transform-gpu" />
  <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-800 opacity-25 blur-2xl rounded-full transform-gpu" />
        <div className="bg-white/10 backdrop-blur-md  p-4 w-80  rounded-lg shadow-lg  rounded-xl border border-white/20 shadow-xl">
            <div className="flex justify-center">
                <img className="w-20 h20 ml-3" src="/icons/3dimg.png"></img>
               
            </div>
            <div className="flex justify-center mb-4">
            <h1 className="text-3xl font-orbitron font-bold text-purple-800 pl-2 bg-clip-text inline-block font-bold font-orbitron text-white text-glow-pulse">Brainly</h1>
            </div>
            <div className="mb-4">
                <Input reference={NameRef} placeholder = "Name" className="w-full px-4 py-2 mb-4 rounded-md "/>
            </div>
            <div className="mb-4">
                <Input reference={UsernameRef} placeholder = "Username" className="w-full px-4 py-2 mb-4 rounded-md "/>
            </div>
            <div className="mb-4">
                <Input reference={PasswordRef} placeholder = "Password" className="w-full px-4 py-2 mb-4 rounded-md "/>
            </div>
            <div   className="mb-4">
                <Input reference={EmailRef} placeholder = "Email" className="w-full px-4 py-2 mb-4 rounded-md "/>
            </div>
            
            <div className="flex justify-center pt-4">
                <Button onClick={signup} loading={Loading} variant="primary" text="Sign Up" fullWidth={true}/>
            </div>
        </div>
    </div>
}