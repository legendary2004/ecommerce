import { useContext, useEffect, useState } from "react"
import { CategoryContext } from "../../contexts/Category"
import AddRow from "../tableRow/addRow"
import Table from "../classes/Table"
import CategoryModal from "../modal/CategoryModal"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase"
import RemoveModal from "../modal/RemoveModal"

export default function() {
    const tag = useContext(CategoryContext)
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "tags"), res => {
            const array = [];
            res.forEach(doc => {
                array.push({id: doc.data().id, name: doc.data().name})
            })
            setTags(array);
        })
        return () => {
            unsub()
        }
    })
    return (
        <Table>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Tag name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Remove</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {tags.map(doc => {
                    return (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={doc.id} id={doc.id}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {doc.name}
                            </th>
                            <td className="px-6 py-4 text-right">
                                <a href="#" onClick={() => tag.dispatch({type: 'editTag', value: {id: doc.id ,name: doc.name}})} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <a href="#" onClick={() => tag.dispatch({type: 'removeTag', value: {id: doc.id ,name: doc.name}})} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                            </td>
                        </tr>
                    )
                })}
                <tr className="bg-white dark:bg-gray-800">
                    <AddRow label="tag" handleClick={() => tag.dispatch({type: 'addTag'})}/>
                </tr>
            </tbody>
            {tag.category.label == 'b' && <RemoveModal closeModal={() => tag.dispatch({type: "cancel"})}/>}
            {tag.category.label.length > 1 && <CategoryModal label={tag.category.label} button={tag.category.button} closeModal={() => tag.dispatch({type: "cancel"})}/>}
        </Table>
    )
}