import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import FloatingInput from "../components/inputs/FloatingInput";
import MainNav from "../components/navbar/MainNav";
import FormButton from "../components/buttons/FormButton";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AuthModal from "../components/modal/AuthModal";
import FormClass from "../components/classes/FormClass";
import { initFlowbite } from "flowbite";

export default function() {
    setTimeout(() => {
        initFlowbite()
    }, 500);

    const navigate = useNavigate();
    const [profile, setProfile] = useState({mail: "", pass: ""});
    const [error, setError] = useState("a");
    const [errorMsg, setErrorMsg] = useState("");
    const [modal, setModal] = useState(false);

    function handleFormChange(e) {
        const id = e.target.id
        const value = e.target.value
        setProfile(prevVal => {
            return {
                ...prevVal,
                [id]: value
            }
        })
    }

    async function handleButtonClick() {
        setModal(true)
        try {
            await signInWithEmailAndPassword(auth, profile.mail, profile.pass).then(res => setError(""))
        }
        catch (err) {   
            setError(err.code)
        }
    }

    useEffect(() => {
        if (error == 'auth/invalid-login-credentials' || error == 'auth/invalid-email' || error == 'auth/missing-password') {
            setErrorMsg("Invalid email or password")
        }
        else if (!error) navigate("/")
    }, [error])

    return (
        <FormClass>
            <h1 className="text-center text-2xl font-bold">Login</h1>
            <div className="grid gap-y-2 grid-cols-1 place-items-center w-full">
                <FloatingInput type="email" label="Email" id="mail" value={profile.mail} handleChange={handleFormChange}/>
                <FloatingInput type="password" label="Password" id="pass" value={profile.pass} handleChange={handleFormChange}/>
                <p className="text-base font-medium">Do not have an account? Click <a href="#" className="text-sky-400 no-underline" onClick={() => navigate("/register")}>here</a> to create one</p>
                <FormButton button="Sign in" handleClick={handleButtonClick}/>
            </div>
            {modal && <AuthModal msg={errorMsg} closeModal={() => setModal(false)}/>}
        </FormClass>
        
    )
}