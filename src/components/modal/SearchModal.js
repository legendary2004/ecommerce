import { FaSearch } from "react-icons/fa";
import InputGroup from "../inputs/InputGroup";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import Card from "../../cards/main/Card";
import SearchCheckbox from "../inputs/SearchCheckbox";

export default function() {
    const [product, setProduct] = useState("")
    const [products, setProducts] = useState([])
    const [filtered, setFiltered] = useState([])
    const [tags, setTags] = useState([])
    const [msg, setMsg] = useState("")

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "products"), res => {
            const array = []
            res.forEach(data => {
                const {id, name, tags} = data.data()
                array.push({id, name, tags, image: data.data().images[0]})
            })
            setProducts(array)
        })
        const tagUnsub = onSnapshot(collection(db, "tags"), res => {
            const array = []
            res.forEach(data => {
                const {id, name} = data.data()
                array.push({id, name, isChecked: false})
            })
            setTags(array)
        })
        return () => {
            unsub()
            tagUnsub()
        }
    }, [])

    function handleCheckChanges(e) {
        const {id, checked} = e.target
        tags.map(item => {
            if (item.id == id) item.isChecked = checked
        })
        setTags(tags.slice())
    }

    function filterByTags(array) {
        const checkedTags = []
        tags.map(item => {
            if (item.isChecked) checkedTags.push(item.name)
        })
        const filteredProducts = []
        array.map(item => {
            if (checkedTags.some(element => item.tags.includes(element))) filteredProducts.push(item)
        })
        return filteredProducts
    }

    function confirmSearch(array) {
        const lowerName = product.toLowerCase()
        const filteredProducts = []
        array.map(item => {
            if (item.name.toLowerCase().includes(lowerName)) {
                filteredProducts.push(item)
            }
        })
        return (filteredProducts)
    }

    useEffect(() => {
        if (product) {
            const res1 = confirmSearch(products)
            const res2 = filterByTags(res1)
            const isTrue = tags.filter(a => a.isChecked == true)
            if (res2.length > 0) setMsg("")
            else setMsg("No results")
            if (isTrue.length > 0) setFiltered(res2.slice())
            else setFiltered(res1.slice())
        }
        else if (!product) {
            const res = filterByTags(products)
            if (res.length > 0) setMsg("")
            else setMsg("No results")
            setFiltered(res.slice())
        }
    }, [tags, product])

    return (
        <>
            <button data-modal-target="extralarge-modal" data-modal-toggle="extralarge-modal" className="" type="button">
                <FaSearch className="w-8 h-8 "/>
            </button>
            <div id="extralarge-modal" tabIndex="-1" className="fixed top-0 left-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-7xl max-h-full ">
            
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white ">
                                What are you looking for?
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="extralarge-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                    
                        <div className="p-4 md:p-5 space-y-4">
                            <InputGroup value={product} handleChange={(e) => setProduct(e.target.value)} handleClick={() => confirmSearch(products)}/>
                            <h3 class="mb-5 text-lg font-medium text-gray-900 dark:text-white">Or filter products based on the tags</h3>
                            <ul className="flex items-center flex-wrap w-full space-x-2">
                                {tags.map((item, index) => {
                                    return <SearchCheckbox id={item.id} name={item.name} isChecked={item.isChecked} handleChange={handleCheckChanges}/>
                                })}
                            </ul>
                            {msg && <p className="text-center">{msg}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 py-2 place-items-center">
                            {filtered.map(item => {
                                return <Card key={item.id} name={item.name} img={item.image} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}