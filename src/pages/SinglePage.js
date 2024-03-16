import { useContext, useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import MainNav from "../components/navbar/MainNav";
import { ProductOverviewContext } from "../contexts/ProductToShop";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import CarouselImage from "../components/carousel/CarouselImage";
import CarouselIndicators from "../components/carousel/CarouselIndicators";
import CarouselControllers from "../components/carousel/CarouselControllers";
import { initFlowbite } from "flowbite";
import SelectColor from "../components/inputs/SelectColor";
import Badge from "../components/buttons/Badge";
import { CartContext } from "../contexts/CartContext";
import AuthModal from "../components/modal/AuthModal";

export default function() {
    setTimeout(() => {
        initFlowbite()
    }, 500)
    const id = useContext(ProductOverviewContext)
    const cart = useContext(CartContext)
    const [product, setProduct] = useState({})
    const [colors, setColors] = useState([])
    const [activeColor, setActiveColor] = useState("")

    useEffect(() => {
        if (id.state) {
            const unsub = async () => {
                const res = await getDoc(doc(db, "products", id.state))
                const emptyArray = []
                res.data().colors.map((item, index) => {
                    emptyArray.push({
                        id: `radio${index}`,
                        value: item,
                        isChecked: index == 0 ? true : false
                    })
                    if (index == 0) setActiveColor(item)
                })
                setColors(emptyArray)
                setProduct(res.data())
            }
            unsub()
        }
    }, [id])

    function handleColorChange(e) {
        const {id, checked} = e.target
        const array = [...colors]
        array.map(item => {
            if (id == item.id) {
                item.isChecked = checked
                setActiveColor(item.value)
            }
            else item.isChecked = false
        })
        setColors(array)
    }
    
    return (
        <div>
            <MainNav />
            <div className="bg-white">
                <div className="pt-6">

                {product.images && product.images.length == 1 && 
                    <div>
                        <img className="block w-full h-56 md:h-[500px] object-contain" src={product.images[0]} alt="" />
                    </div>
                }

                {product.images && product.images.length > 1 && <div id="default-carousel" className="relative w-full h-full md:w-5/6 mx-auto" data-carousel="static">
                    <div className="relative h-56 overflow-hidden rounded-lg md:h-[500px]">
                        {product.images && product.images.map(item => {
                            return <CarouselImage key={item} img={item} />
                        })}
                    </div>
                    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                        {product.images && product.images.map((item, index) => {
                            return <CarouselIndicators key={item} isTrue={index == 0 ? true : false} index={index}/>
                        })}
                    </div>
                    {product.images && <CarouselControllers />}
                </div>}


                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl flex items-center">{product.name} 
                            {product.tags && product.tags.map(item => {
                                return <Badge key={item} name={item} />
                            })}
                        </h1>
                    </div>

                    
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">{product.price} $</p>

                        <div>
                            <h3 className="text-sm font-medium text-gray-900">Color</h3>

                            <fieldset className="mt-4">
                                <legend className="sr-only">Choose a color</legend>
                                <div className="flex items-center space-x-3">
                                    {colors && colors.map((item, index) => {
                                        return <SelectColor key={index} id={item.id} bgColor={item.value} isChecked={item.isChecked} isActive={item.isChecked ? 'selected' : 'notSelected'}  handleChange={handleColorChange}/>
                                    })}
                                </div>
                            </fieldset>
                        </div>

                        <button type="submit" onClick={() => cart.dispatch({type: 'addProduct', info: {id: product.id, color: activeColor}})} className="mt-5 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add to bag</button>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        <div>
                        <h3 className="sr-only">Description</h3>

                        <div className="space-y-6">
                            <p className="text-base text-gray-900">{product.desc}</p>
                        </div>
                        </div>

                    </div>
                    </div>
                </div>
                {cart.msg && <AuthModal msg={cart.msg} closeModal={() => cart.dispatch({type: 'closeModal'})} />}
            </div>
        <Footer />
        </div>
    )
}