import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

export default function(prop) {
    const [tags, setTags] = useState([])
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "tags"), res => {
            const array = []
            res.forEach(doc => {
                array.push({id: doc.data().id, name: doc.data().name})
            })
            setTags(array)
        })

        return () => {
            unsub()
        }
    }, [])

    return (
        <>
            <label htmlFor="tags" className="block mb-0.5 text-sm font-medium text-gray-900 dark:text-white">Select tags</label>
            <select multiple onChange={prop.handleChange} value={prop.value} id={prop.id} className="no-arrow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pe-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {tags.map(item => {
                    return <option value={item.name} key={item.id}>{item.name}</option>
                })}
            </select>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.</label>
        </>
    )
}