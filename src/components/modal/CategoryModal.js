import { useContext, useEffect, useState } from "react"
import { v4 } from "uuid";
import AuthModal from "./AuthModal";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { UserContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { CategoryContext } from "../../contexts/Category";

export default function(prop) {
    const [name, setName] = useState("");
    const [modal, setModal] = useState(false);
    const [msg, setMsg] = useState("");
    const admin = useContext(UserContext);
    const category = useContext(CategoryContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!admin && !admin.email == 'admin@gmail.com') navigate("/")
    }, [])
    async function submitName(e) {
        setModal(true)
        if (!name) {
            setMsg("Name cannot be empty")
        }
        else {
            const id = v4();
            const capName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
            const q = query(collection(db, "categories"), where("name", "==", capName));
            const tagQ = query(collection(db, "tags"), where("name", "==", capName));
            const categories = await getDocs(q);
            const tags = await getDocs(tagQ);
            if (categories.docs.length > 0) {
                setMsg("A category with this name exists")
            }
            else if (tags.docs.length > 0) {
                setMsg("A tag with this name exists")
            }
            else {
                if (e.target.innerHTML == 'Add new category') {
                    setMsg("Category added")
                    await setDoc(doc(db, "categories", id), {
                        id: id,
                        name: capName,
                        products: [],
                    })
                }
                else if (e.target.innerHTML == 'Edit category') {
                    setMsg("Category edited")
                    await getDoc(doc(db, "categories", category.category.value.id))
                    .then(async res => {
                        const array = res.data();
                        array.name = capName;
                        const products = await getDocs(collection(db, "products"))
                        const emptyArray = []
                        products.forEach(item => {
                            emptyArray.push(item.data())
                        })
                        emptyArray.map(async item => {
                            if (item.category == category.category.value.name) {
                                item.category = capName
                                await setDoc(doc(db, "products", item.id), item)
                            }
                        })
                        await setDoc(doc(db, "categories", array.id), array)

                    })
                }
                else if (e.target.innerHTML == 'Add new tag') {
                    setMsg("Tag added");
                    await setDoc(doc(db, "tags", id), {
                        id,
                        name: capName
                    })
                }
                else if (e.target.innerHTML == 'Edit tag') {
                    setMsg("Tag edited")
                    await getDoc(doc(db, "tags", category.category.value.id))
                    .then(res => {
                        const obj = res.data();
                        obj.name = capName
                        setDoc(doc(db, "tags", category.category.value.id), obj)
                    })
                }
            }
        }
    }
    return (
        <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-gray-500/75 bg-justify-center items-center justify-center w-full md:inset-0 h-screen max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {prop.label}
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={prop.closeModal}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:border-gray-300 focus:ring-0" placeholder="Type here..." required />
                            </div>
                        </div>
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={submitName}>
                            
                            {prop.button}
                        </button>
                    </form>
                </div>
            </div>
            {modal && <AuthModal msg={msg} closeModal={() => setModal(false)}/>}
        </div> 
    )
}