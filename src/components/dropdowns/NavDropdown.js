import { collection, onSnapshot } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { db } from "../../firebase"
import { useNavigate } from "react-router-dom"
import { ShoppingContext } from "../../contexts/CategoryToShop"

export default function() {
    const navigate = useNavigate()
    const category = useContext(ShoppingContext)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "categories"), res => {
            const array = [];
            res.forEach(data => {
                const {id, name, products} = data.data();
                array.push({id, name, products})
            })
            setCategories(array)
        })
        return () => {
            unsub()
        }
    }, [])
    
    function handleClick(item) {
        category.dispatch(item)
        navigate("/shop")
    }
    return (
        <li>
            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="block p-2 sm:py-0.5 text-gray-900 rounded hover:bg-gray-100 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Shop
            
            </button>
            <div id="dropdownNavbar" className="z-50 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownLargeButton">
                  {categories.map(item => {
                    return (
                        <li key={item.id}>
                            <a href="#" onClick={() => handleClick(item)} className="block px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item.name}</a>
                        </li>
                    )
                  })}
                </ul>
            </div>
        </li>
    )
}