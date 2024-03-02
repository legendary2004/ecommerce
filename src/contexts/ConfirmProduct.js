import { Timestamp, collection, doc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { db, storage } from "../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { GetProductContext } from "./GetProduct";


export const ProductContext = createContext();

export default function ProductContextProvider({children}) {
    const [state, setState] = useState("");
    const [productMsg, dispatch] = useReducer(handleForm, "");
    const getProduct = useContext(GetProductContext);

    async function handleForm(state, action) {
        const {name, price, desc, category, tags, images} = action.info.formProp;
        const colors = action.info.colors;
        if (action.type == 'close') setState("")
        else {
            if (!name) setState("Product name cannot be empty")
            else if (!price) setState("Set a price for the product")
            else if (!desc) setState("Product description cannot be empty")
            else if (images.length == 0) setState("Add at least 1 image for the product")
            else if (colors.length == 0) setState("Add at least 1 available color for the product")
            else {
                const capName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
                const q = query(collection(db, "products"), where('name', '==', capName))
                const res = await getDocs(q)
                if (res.size > 0 && getProduct.state.product.name != capName) setState("A product with this name already exists")
                else {
                    const categoryQuery = query(collection(db, "categories"), where('name', '==', category))
                    const categoryRes = await getDocs(categoryQuery)
                    categoryRes.forEach(async result => {
                        const arrayOfImgURL = [];
                            const productId = v4();
                            for (let i = 0; i < images.length; i++) {
                                const id = v4();
                                const imgRef = ref(storage, `products/${id}`)
                                await uploadBytes(imgRef, images[i])
                                const imgUrl = await getDownloadURL(imgRef)
                                arrayOfImgURL.push(imgUrl)
                            }
                            const array = result.data();
                        if (action.type == 'add') {
                            const timeCreated = Timestamp.now();
                            setState("Product succesfully added to database")
                            array.products.push({id: productId, name: capName, price, image: arrayOfImgURL[0], tags, timeCreated})
                            await setDoc(doc(db, "products", productId), {
                                id: productId,
                                name: capName,
                                price,
                                desc,
                                category,
                                tags,
                                images: arrayOfImgURL,
                                colors,
                                timeCreated
                            })
                            await setDoc(doc(db, "categories", array.id), array)
                        }
                        else if (action.type == 'edit') {
                            const timeCreated = action.info.timestamp
                            setState("Product succesfully edited")
                            array.products.map(product => {
                                if (getProduct.state.product.id == product.id) {
                                    product.name = capName
                                    product.price = price
                                    product.image = arrayOfImgURL[0]
                                    product.tags = tags
                                }
                            })
                            await setDoc(doc(db, "products", getProduct.state.product.id), {
                                id: getProduct.state.product.id,
                                name: capName,
                                price,
                                desc,
                                category,
                                tags,
                                images: arrayOfImgURL,
                                colors,
                                timeCreated
                            })
                            await setDoc(doc(db, "categories", array.id), array)
                        }
                    })
                }
            }
        }
    }

    return (
        <ProductContext.Provider value={{productMsg: state, dispatch}}>
            {children}
        </ProductContext.Provider>
    )
}