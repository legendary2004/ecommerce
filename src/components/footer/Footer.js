import { useContext, useEffect, useState } from "react";
import NavLink from "../navbar/NavLink";
import Socials from "../socials/Socials";
import { UserContext } from "../../contexts/AuthContext";
import SignOut from "../buttons/SignOut";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export default function() {
    const user = useContext(UserContext)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "categories"), res => {
            const array = []
            res.forEach(data => {
                array.push(data.data())
            })
            setCategories(array)
        })
        return () => {
            unsub()
        }
    }, [])
    return (
        <div className="bg-slate-200 h-fit">
            <div className="flex flex-wrap justify-evenly items-start py-2 ">
                <div className="max-w-96">
                    <p className="text-base font-medium text-center">Explore all variety of products for a reasonable price. Our staff is always available for you to help.</p>
                    <Socials />
                </div>
                <div className="list-none flex flex-col flex-dir mt-2">
                    <NavLink name="Home" path="/" />
                    <NavLink name="About" path="/about" />
                    <NavLink name="Contact" path="/contact" />
                </div>
                <div>
                    <p className="text-base font-medium text-center mt-2 mb-0">Shop</p>
                    <div className="list-none flex flex-wrap justify-center">
                        {categories.map(item => {
                            return <NavLink key={item.id} name={item.name}/>
                        })}
                    </div>
                </div>
                <div>
                    <p className="text-base font-medium text-center mt-2 mb-0">Contact</p>
                    <div className="list-none flex flex-wrap justify-center">
                        <NavLink name="About us"/>
                        <NavLink name="Product support"/>
                        <NavLink name="Looking for a job?"/>
                    </div>
                </div>
                <div className="list-none flex flex-col items-center">
                    {user && <div className="flex justify-center items-center">
                        <img src={user.photoURL} className="w-12 h-12 rounded-[50%] mt-1"/>
                        <span className="text-base font-medium ms-1">{user.displayName}</span>
                    </div>}
                    {user ? <SignOut /> : <NavLink name="Login" path="/login" />}
                </div>
            </div>
            <div className="grid grid-cols-1 place-items-center">
                <div className="w-[95%] h-0.5 bg-slate-100"></div>
            </div>
            <p className="mt-1 ps-12 font-normal text-base">Copyright© 1995-2024 SAMSUNG All Rights Reserved.</p>
        </div>
    )
}