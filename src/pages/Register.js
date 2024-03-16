import FloatingInput from "../components/inputs/FloatingInput";
import File from "../components/inputs/File";
import MainNav from "../components/navbar/MainNav";
import Footer from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import FormButton from "../components/buttons/FormButton";
import { useEffect, useState } from "react";
import { auth, storage, db } from "../firebase";
import AuthModal from "../components/modal/AuthModal";
import { initFlowbite } from "flowbite";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import FormClass from "../components/classes/FormClass";

export default function() {
    setTimeout(() => {
        initFlowbite()
    }, 500);

    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        mail: "",
        pass: "",
        passRepeat: "",
        image: ""
    })
    const [error, setError] = useState("a")
    const [errorMsg, setErrorMsg] = useState("");
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    function handleFormChange(e) {
        const id = e.target.id;
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value
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
            if (profile.firstName.length < 2 || profile.lastName.length < 2) {
                setError("auth/name-too-short")
            }
            else if (profile.pass !== profile.passRepeat) {
                setError("auth/invalid-password")
            }
            else {
                await createUserWithEmailAndPassword(auth, profile.mail, profile.pass)
                .then(async res => {
                    setError("")
                    setModal(false)
                    const imageRef = ref(storage, res.user.uid)
                    profile.image && await uploadBytes(imageRef, profile.image)
                    const imageURL = profile.image ? await getDownloadURL(imageRef) : "https://firebasestorage.googleapis.com/v0/b/ecommerce-9e9cd.appspot.com/o/avatar.png?alt=media&token=6245eeb5-98e0-4eb0-aca7-2467b7da8c02"
                    await updateProfile(res.user, {
                        displayName: `${profile.firstName} ${profile.lastName}`,
                        photoURL: imageURL
                    })
                    await setDoc(doc(db, "users", res.user.uid), {
                        id: res.user.uid,
                        displayName: `${profile.firstName} ${profile.lastName}`,
                        email: profile.mail,
                        photoURL: imageURL,
                    })
                    await setDoc(doc(db, "cart", res.user.uid), {
                        cart: []
                    })
                })
            }
        }
        catch (err) {
            setError(err.code)
        }
    }

    useEffect(() => {
        if (error == 'auth/email-already-in-use') {
            setErrorMsg("This email is already in use. Use a different email")
        }
        else if (error == 'auth/invalid-email') {
            setErrorMsg("This email is not valid")
        }
        else if (error == 'auth/weak-password' || error == 'auth/missing-password') {
            setErrorMsg("Password must contain at least 6 letters")
        }
        else if (error == 'auth/name-too-short') {
            setErrorMsg("First name and last name should contain at least 2 letters")
        }
        else if (error == 'auth/invalid-password') {
            setErrorMsg("Passwords do not match")
        }
        else if (!error) {
            navigate("/")
        }
    }, [error])

    
    return (
        <FormClass>
            <h1 className="text-center text-2xl font-bold">Create your account</h1>
            <div className="grid gap-y-2 grid-cols-1 place-items-center w-full">
                <div className="grid gap-x-2 grid-cols-2 place-items-center w-full">
                    <FloatingInput type="text" label="First Name" placeholder="First name" id="firstName" handleChange={handleFormChange} value={profile.firstName}/>
                    <FloatingInput type="text" label="Last Name" placeholder="Last name" id="lastName" handleChange={handleFormChange} value={profile.lastName}/>
                </div>
                <FloatingInput type="email" label="Email" placeholder="name@example.com" id="mail" handleChange={handleFormChange} value={profile.mail}/>
                <FloatingInput type="password" label="Password" placeholder="Password" id="pass" handleChange={handleFormChange} value={profile.pass}/>
                <FloatingInput type="password" label="Confirm password" placeholder="Confirm password" id="passRepeat" handleChange={handleFormChange} value={profile.passRepeat}/>
                <File label="Upload profile picture" accept="image/*" id="image" handleChange={handleFormChange} multiple={false}/>
                <p className="text-base font-medium">Your image: {profile.image.name}</p>
                <p className="text-base font-medium">Already have an account? Click <a href="#" className="text-sky-400 no-underline" onClick={() => navigate("/login")}>here</a> to sign in</p>
                <FormButton button="Sign up" handleClick={handleButtonClick}/>
            </div>
            {modal && <AuthModal msg={errorMsg} closeModal={() => setModal(false)}/>}
        </FormClass>
    )
}