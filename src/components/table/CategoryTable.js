import { useContext, useEffect, useReducer, useState } from "react";
import Table from "../classes/Table";
import CategoryModal from "../modal/CategoryModal";
import AddRow from "../tableRow/addRow";
import { collection, getDocs, onSnapshot} from "firebase/firestore";
import { db } from "../../firebase";
import RemoveModal from "../modal/RemoveModal";
import { initFlowbite } from "flowbite";
import { CategoryContext } from "../../contexts/Category";

export default function() {
    const category = useContext(CategoryContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "categories"), res => {
            const array = []
            res.forEach(doc => {
                array.push({id: doc.data().id, name: doc.data().name});
            })
            setCategories(array)
        })
        return () => {
            unsub()
        }
    }, [])

    return (
        

        <Table>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Category name
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
                    {categories.map(doc => {
                        return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={doc.id} id={doc.id}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {doc.name}
                                </th>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" onClick={() => category.dispatch({type: 'edit', value: {id: doc.id ,name: doc.name}})} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" onClick={() => category.dispatch({type: 'remove', value: {id: doc.id ,name: doc.name}})} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                                </td>
                            </tr>
                        )
                    })}
                    <tr className="bg-white dark:bg-gray-800">
                        <AddRow label="category" handleClick={() => category.dispatch({type: 'add'})}/>
                    </tr>
                </tbody>
                {category.category.label == 'a' && <RemoveModal closeModal={() => category.dispatch({type: "cancel"})}/>}
                {category.category.label.length > 1 && <CategoryModal label={category.category.label} button={category.category.button} closeModal={() => category.dispatch({type: 'cancel'})}/>}
        </Table>

    )
}