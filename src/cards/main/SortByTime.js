import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Card from "./Card";

export default function() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const unsub = async() => {
            const q = query(collection(db, "products"), orderBy("timeCreated", "desc"))
            const res = await getDocs(q)
            const array = []
            res.forEach(product => {
                array.push({id: product.data().id, name: product.data().name, image: product.data().images[0]})
            }) 
            const timeArray = array.slice(0, 5)
            setProducts(timeArray)
        }
        unsub()
    }, [])

    return (
        <div className="mt-2">
            <h1 className="text-center text-xl font-semibold mb-1.5">{prop.title}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 place-items-center">
                {products.map(item => {
                    return <Card key={item.id} name={item.name} img={item.image} />
                })}
            </div>

        </div>
    )
}