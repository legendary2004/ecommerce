import FormClass from "../components/classes/FormClass";
import FloatingInput from "../components/inputs/FloatingInput";
import File from "../components/inputs/File";
import FormButton from "../components/buttons/FormButton";
import SelectCategory from "../components/inputs/SelectCategory";
import SelectTags from "../components/inputs/SelectTags";
import Textarea from "../components/inputs/Textarea";
import { useContext, useEffect, useReducer, useState } from "react";
import { collection, doc, getDoc, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebase";
import RemoveBadge from "../components/buttons/RemoveBadge";
import Color from "../components/inputs/Color";
import ClearAllBadge from "../components/buttons/ClearAllBadge";
import { ProductContext } from "../contexts/ConfirmProduct";
import AuthModal from "../components/modal/AuthModal";
import { GetProductContext } from "../contexts/GetProduct";
import { useNavigate } from "react-router-dom";


export default function() {
    const navigate = useNavigate()
    const product = useContext(ProductContext)
    const getProduct = useContext(GetProductContext)
    const [formProp, setFormProp] = useState({
        name: "",
        price: "",
        desc: "",
        category: "",
        tags: [],
        images: [],
        color: ""
    });
    const [timestamp, setTimestamp] = useState("")
    const [colors, dispatch] = useReducer(handleColors, []);
    useEffect(() => {
        const unsub = async () => {
            if (!getProduct.state.label) navigate("/")
            if (getProduct.state.product.id) {
                const res = await getDoc(doc(db, "products", getProduct.state.product.id))
                setFormProp(prevVals => {
                    return {
                        ...prevVals,
                        name: res.data().name,
                        price: res.data().price,
                        desc: res.data().desc,
                        category: res.data().category
                    }
                })
                dispatch({type: 'getColors', colors: res.data().colors})
                setTimestamp(res.data().timeCreated)
            }
            else if (!getProduct.state.product.id) {
                const q = query(collection(db, "categories"), limit(1));
                const res = await getDocs(q)
                res.forEach(doc => setFormProp(prevState => {
                    return {
                        ...prevState,
                        category: doc.data().name
                    }
                }))
            }
        }
        unsub()
    }, [])

    function handleFormChange(e) {
        const id = e.target.id;
        const type = e.target.type;
        const value = type == 'file' ? e.target.files : e.target.value;
        const array = formProp.tags;
        const arrayImg = [];
        e.preventDefault()
        if (id == 'tags') {
            array.length = 0
            const options = e.target.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    array.push(options[i].value)
                }
            }
        }
        if (id == 'images') {
            for (let i = 0; i < value.length; i++) {
                const foundElement = formProp.images.filter(image => image.name == value[i].name);
                if (foundElement.length == 0) formProp.images.push(value[i])
            }
        }
        setFormProp(prevVals => {
            return {
                ...prevVals,
                [id]: value,
                tags: array,
                images: [...prevVals.images, ...arrayImg]
            }
        })
    }

    function removeOneImg(img) {
        const newImgArray = formProp.images.filter(image => image.name != img)
        setFormProp(prevVal => {
            return {
                ...prevVal,
                images: newImgArray
            }
        })
    }

    function removeAllImg() {
        setFormProp(prevVal => {
            return {
                ...prevVal,
                images: []
            }
        })
    }

    function handleColors(state, action) {
        let newState = state.slice();
        if (action.type == 'add' && formProp.color) {
            newState.push(formProp.color)
        }
        else if (action.type == 'remove') {
            newState = newState.filter(color => color != action.color)
        }
        else if (action.type == 'removeAll') {
            newState = []
        }
        if (action.type == 'getColors') {
            newState = action.colors
        }
        return newState
    }

    return (
        <FormClass>
            <h1 className="text-center text-2xl font-bold">{getProduct.state.label}</h1>
            <div className="grid grid-cols-1 place-items-center gap-y-2 w-full">
                <FloatingInput type="text" label="Product name" id="name" value={formProp.name} handleChange={handleFormChange}/>
                <FloatingInput type="number" label="Product price" id="price" value={formProp.price} handleChange={handleFormChange}/>
                <Textarea placeholder="Products description" id="desc" value={formProp.desc} handleChange={handleFormChange}/>
                <SelectCategory id="category" value={formProp.category} handleChange={handleFormChange} isReadonly={getProduct.state.buttonAction == 'edit' ? true : false}/>
                <SelectTags id="tags" handleChange={handleFormChange} />
                <File id="images" handleChange={handleFormChange} accept="image/*" label="Product images" multiple={true}/>
                <p>Images selected: {formProp.images.map((img, index) => {
                    return <RemoveBadge key={index} badge={img.name} removeBadge={() => removeOneImg(img.name)}/>
                })} {formProp.images.length > 1 && <ClearAllBadge handleClick={removeAllImg} />}</p>
                <Color id="color" value={formProp.color} handleChange={handleFormChange} handleClick={() => dispatch({type: 'add'})}/>
                <p>Colors selected: {colors.map((col, index) => {
                    return <RemoveBadge key={index} badge={col} removeBadge={() => dispatch({type: 'remove', color: col})}/>
                })} {colors.length > 1 && <ClearAllBadge handleClick={() => dispatch({type: 'removeAll'})} />}</p>
                <FormButton button="Add" handleClick={() => product.dispatch({type: getProduct.state.buttonAction, info: {formProp, colors, timestamp}})}/>
            </div>
            {product.productMsg && <AuthModal msg={product.productMsg} closeModal={() => product.dispatch({type: 'close', info: {formProp, colors}})}/>}
        </FormClass>
    )
}