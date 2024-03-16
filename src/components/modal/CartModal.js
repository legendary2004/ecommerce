import { FaShoppingCart } from "react-icons/fa";
import Cart from "../../cards/shop/Cart";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";

export default function() {
    const navigate = useNavigate()
    const userCart = useContext(CartContext)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalProducts, setTotalProducts] = useState(0)

    useEffect(() => {
        let price = 0;
        let products = 0
        if (userCart.state.length > 0) {
            userCart.state.map(item => {
                price += +item.price
                products += +item.quantity
            })
        }
        setTotalPrice(price)
        setTotalProducts(products)
    }, [userCart.state])

    function toCheckout() {
        if (userCart.state.length == 0) userCart.dispatch({type: 'toCheckout'})
        else navigate("/checkout")
    }
    return (
        <>
            <button data-modal-target="cart-modal" data-modal-toggle="cart-modal" className="relative" type="button">
                <FaShoppingCart className="w-8 h-8 "/>
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{totalProducts}</div>
            </button>
            <div id="cart-modal" className="hidden relative z-50" role="dialog">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <div className="pointer-events-auto w-screen max-w-md">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                <div className="ml-3 flex h-7 items-center">
                                    <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500" data-modal-hide="cart-modal">
                                        <span className="absolute -inset-0.5"></span>
                                        <span className="sr-only">Close panel</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {userCart.state.map((item, index) => {
                                            return (
                                                <Cart 
                                                    key={index} 
                                                    name={item.name} 
                                                    price={item.price} 
                                                    color={item.color} 
                                                    quantity={item.quantity} 
                                                    img={item.img} 
                                                    handleClick={() => userCart.dispatch({type: 'removeProduct', info: {id: item.id, color: item.color}})}
                                                    addQuantity={() => userCart.dispatch({type: 'addQuantity', info: {id: item.id, color: item.color}})}
                                                    removeQuantity={() => userCart.dispatch({type: 'removeQuantity', info: {id: item.id, color: item.color}})}
                                                />
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                            </div>

                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Total</p>
                                    <p>{totalPrice} $</p>
                                </div>
                                <div className="mt-6 flex flex-col gap-y-1">
                                    <button className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700" onClick={toCheckout} data-modal-hide="cart-modal">Checkout</button>
                                    <button onClick={() => userCart.dispatch({type: 'clearCart', info: {id: userCart.state[0].id}})} className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Clear cart</button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            {userCart.msg && <AuthModal msg={userCart.msg} closeModal={() => {userCart.dispatch({type: 'closeModal'})}} />}
        </>
    )
}