import { createContext, useContext, useReducer, useState, useEffect } from "react";
import { UserContext } from "./AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const CartContext = createContext();
export default function CartContextProvider({children}) {
    const [msg, setMsg] = useState("");
    const user = useContext(UserContext);
    const [state, setState] = useState([]);
    const [reducer, dispatch] = useReducer(handleCartAction, []);

    useEffect(() => {
        if (user) {
            const unsub = async () => {
                const res = await getDoc(doc(db, "cart", user.uid))
                setState(res.data().cart)
            }
            unsub()
        }
    }, [user])

    async function handleCartAction(current, action) {
        if (!user && action.type == 'addProduct') setMsg("You must be logged in in order to add products");
        else if (action.type == 'closeModal') setMsg("")
        else if (action.type == 'toCheckout') setMsg("Your cart is empty. add some products to proceed to checkout")
        else {
            setMsg("")
            const id = action.info.id;
            const productRes = await getDoc(doc(db, "products", id));
            const cartRes = await getDoc(doc(db, "cart", user.uid));
            const color = action.info.color ? action.info.color : productRes.data().colors[0]
            let array = cartRes.data().cart;
            const foundElement = array.filter(a => a.id == id && a.color == color)
            if (action.type == 'addProduct' || action.type == 'addQuantity') {
                if (foundElement.length > 0) {
                    array.map(item => {
                        if (item.id == id && item.color == color) {
                            item.quantity += 1;
                            item.price += +productRes.data().price
                        }
                    })
                }
                else if (foundElement.length == 0) {
                    const {id, name, price, images} = productRes.data()
                    array.push({
                        id,
                        name,
                        price: +price,
                        quantity: 1,
                        img: images[0],
                        color
                    })
                }
            }
            else if (action.type == 'removeProduct') {
                array.map((item, index) => {
                    if (item.id == id && item.color == color) {
                        array.splice(index, 1)
                    }
                })
            }
            else if (action.type == 'removeQuantity') {
                array.map((item, index) => {
                    if (item.id == id && item.color == color) {
                        item.quantity -= 1;
                        item.price -= +productRes.data().price
                        if (item.quantity == 0) {
                            array.splice(index, 1)
                        }
                    }
                })
            }
            else if (action.type = 'clearCart') array = []
            setState(array)
            await setDoc(doc(db, "cart", user.uid), {
                cart: array
            })
        }
    }

    return (
        <CartContext.Provider value={{state, msg, dispatch}}>
            {children}
        </CartContext.Provider>
    )
}