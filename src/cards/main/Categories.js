import { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { ProductOverviewContext } from "../../contexts/ProductToShop";
import { useNavigate } from "react-router-dom";

export default function(prop) {
    const navigate = useNavigate()
    const product = useContext(ProductOverviewContext)
    const [products, setProducts] = useState([])
    useEffect(() => {
        const unsub = async () => {
            const q = query(collection(db, "products"), orderBy("timeCreated", "desc"))
            const res = await getDocs(q)
            const array = [];
            res.forEach(product => {
                array.push({id: product.data().id, name: product.data().name, price: product.data().price, image: product.data().images[0]})
            })
            const timeArray = array.slice(0, 5)
            const highestArray = array.sort((a, b) => a.price - b.price).reverse().slice(0, 5)
            const cheapestArray = array.sort((a, b) => a.price - b.price).slice(0, 5)
            setProducts([
                {id: '1', name: 'Latest releases', products: timeArray},
                {id: '2', name: 'Highest rated', products: highestArray},
                {id: '3', name: 'Cheapest price', products: cheapestArray},
            ])
        }

        unsub()
    }, [])

    function productOverview(id) {
        navigate("/single")
        product.getProduct(id)
    }

    return (
        <>
            {products.map(item => {
                return (
                    <div className="mt-2" key={item.id}>
                        <h1 className="text-center text-xl font-semibold mb-1.5">{item.name}</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 place-items-center">
                            {item.products.map(product => {
                                return <Card key={product.id} name={product.name} img={product.image} handleClick={() => productOverview(product.id)}/>
                            })}
                        </div>

                    </div>
                )
            })}
        </>
    )
}