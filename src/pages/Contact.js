import { initFlowbite } from "flowbite";
import FormButton from "../components/buttons/FormButton";
import Footer from "../components/footer/Footer";
import File from "../components/inputs/File";
import FloatingInput from "../components/inputs/FloatingInput";
import Textarea from "../components/inputs/Textarea";
import MainNav from "../components/navbar/MainNav";
import { useEffect, useRef, useState } from "react";
import AuthModal from "../components/modal/AuthModal";

export default function() {
    const [msg, setMsg] = useState("");
    const [helpForm, setHelpForm] = useState({email: "", code: "", text: ""});
    setTimeout(() => {
        initFlowbite()
    }, 1000)

    function handleHelpFormChange(e) {
        e.preventDefault()
        const {id, value} = e.target
        setHelpForm(prev => {
            return {
                ...prev, 
                [id]: value
            }
        })
    }

    function submitHelpForm(e) {
        if (!helpForm.email) setMsg("Invalid email")
        else if (!helpForm.code) setMsg("The product code is missing")
        else if (!helpForm.text) setMsg("Text is missing")
        else {
            try {
                e.preventDefault()
            }
            catch(err) {
                console.log(err)
            }
        }
    }
    return (
        <div className="h-screen">
            <MainNav />
            <div className="auth-height flex items-center contact-dir">
                <div className="w-1/2 p-6 contact-width">
                    <div className="border-2 border-black grid grid-cols-1 place-items-center gap-y-2 p-12">
                        <h1 className="text-center text-2xl font-bold">Product help</h1>
                        <FloatingInput id="email" value={helpForm.email} handleChange={handleHelpFormChange} type="email" label="Your email" placeholder="Email"/>
                        <FloatingInput id="code" value={helpForm.code} handleChange={handleHelpFormChange} type="text" label="Product code" placeholder="Product code"/>
                        <Textarea id="text" value={helpForm.text} handleChange={handleHelpFormChange} placeholder="Enter message" />
                        <FormButton button="Send" handleClick={submitHelpForm}/>
                    </div>
                </div>
                <div className="w-1/2 p-6 contact-width">
                    <div className="border-2 border-black grid grid-cols-1 place-items-center gap-y-2 p-12">
                        <h1 className="text-center text-2xl font-bold">Job application</h1>
                        <FloatingInput type="email" label="Your email" placeholder="Email"/>
                        <FloatingInput type="text" label="Job position" placeholder="Product code"/>
                        <File label="Upload CV" accept=".docx, .pdf" />
                        <FormButton button="Send"/>
                    </div>
                </div>
            </div>
            {msg && <AuthModal msg={msg} closeModal={() => setMsg("")} />}
            <Footer />
        </div>
    )
}