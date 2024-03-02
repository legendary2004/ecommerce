import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect } from "react";

export default function(prop) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "categories"), res => {
            const array = [];
            res.forEach(doc => {
                array.push({id: doc.data().id, name: doc.data().name});
            })
            setCategories(array);
        })

        return () => {
            unsub()
        }
    }, [])
    return (
        <>
            <label htmlFor="countries" className="block mb-0.5 text-sm font-medium text-gray-900 dark:text-white">Select category</label>
            <select id={prop.id} value={prop.value} onChange={prop.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled={prop.isReadonly}>
                {categories.map((item, index) => {
                    return <option value={item.name} key={item.id}>{item.name}</option>
                })}
                
            </select>
        </>
    )
}