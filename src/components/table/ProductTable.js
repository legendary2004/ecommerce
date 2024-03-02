import { useNavigate } from "react-router-dom";
import Table from "../classes/Table";
import AddRow from "../tableRow/addRow";
import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { GetProductContext } from "../../contexts/GetProduct";
import { CategoryContext } from "../../contexts/Category";
import RemoveModal from "../modal/RemoveModal";

export default function() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const getProduct = useContext(GetProductContext);
    const removeProduct = useContext(CategoryContext)

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "products"), (res) => {
            const array = []
            res.forEach(product => {
                array.push({
                    id: product.data().id, 
                    name: product.data().name, 
                    category: product.data().category, 
                    price: product.data().price,
                })
            })
            setProducts(array)
        })

        return () => {
            unsub()
        }
    }, [])

    function editProduct(product) {
        getProduct.dispatch({type: 'edit', product})
        navigate("/productForm")
    }

    function addProduct() {
        getProduct.dispatch({type: 'add'})
        navigate("/productForm")
    }

    return (
        

        <Table>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">
                            Category
                            <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                            </svg></a>
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">
                            Price
                            <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                            </svg></a>
                        </div>
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
            {products.map(product => {
                return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={product.id}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {product.name}
                        </th>
                        <td className="px-6 py-4">
                            {product.category}
                        </td>
                        <td className="px-6 py-4">
                            {product.price}
                        </td>
                        <td className="px-6 py-4 text-right">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => editProduct(product)}>Edit</a>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => removeProduct.dispatch({type: 'removeProduct', value: {id: product.id, name: product.name}})}>Remove</a>
                        </td>
                    </tr>
                )
            })}
            <tr className="bg-white dark:bg-gray-800">
                <AddRow label="product" handleClick={addProduct}/>
            </tr>
        </tbody>
        {removeProduct.category.label == 'c' && <RemoveModal closeModal={() => removeProduct.dispatch({type: "cancel"})}/>}
        </Table>

    )
}