import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { db } from "../firebase";
import { ShoppingContext } from "./CategoryToShop";

export const ShopContext = createContext()
export default function ShopContextProvider({children}) {
    const category = useContext(ShoppingContext)
    const [state, setState] = useState({});
    const [filtered, setFiltered] = useState({})
    const [checkState, setCheckState] = useState([]);
    const [msg, setMsg] = useState("");
    const [priceRange, setPriceRange] = useState({minPrice: '', maxPrice: ''});
    const [confirmPriceRange, setConfirmPriceRange] = useState({minPrice: '', maxPrice: ''});
    const [reducer, dispatch] = useReducer(handleFilter, "");

    useEffect(() => {
        setState(category.category);
        setFiltered(category.category)
    }, [category])

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "tags"), res => {
            const array = [];
            res.forEach(data => {
                const {id, name} = data.data()
                array.push({id, name, isChecked: false})
            })
            function compareByString(a, b) {
                if (a.name > b.name) return 1;
                else return -1;
            }
            setCheckState([
                {id: '1', name: 'Filter by tags', array},
                {id: '2', name: 'Sort by', array: [
                    {label: 'A-Z', id: "radio1", isChecked: false, sort: (products) => products.sort((a, b) => compareByString(a, b))}, 
                    {label: 'Z-A', id: "radio2", isChecked: false, sort: (products) => products.sort((a, b) => compareByString(a, b)).reverse()}, 
                    {label: 'Newest added', id: "radio3", isChecked: false, sort: (products) => products.sort((a, b) => a.timeCreated - b.timeCreated ).reverse()},
                    {label: 'Oldest added', id: "radio4", isChecked: true, sort: (products) => products.sort((a, b) => a.timeCreated - b.timeCreated)}, 
                    {label: 'Cheapest', id: "radio5", isChecked: false, sort: (products) => products.sort((a, b) => a.price - b.price)},
                    {label: 'Most expensive', id: "radio6", isChecked: false, sort: (products) => products.sort((a, b) => a.price - b.price).reverse()}
                ]}
            ])
        })
        return () => {
            unsub()
        }
    }, [])

    function handleProductChange(a, b) {
        const arrayLength = Math.ceil(a.length / 9)
        const arrayOfProducts = [];
        for (let i = 0; i < arrayLength; i++) {
            arrayOfProducts.push(a.slice(i * 9, 9 + i * 9))
        }
        const obj = {...b}
        obj.products = arrayOfProducts
        return obj
    }

    function handlePriceChange(e) {
        const {id, value} = e.target
        setPriceRange(prev => {
            return {
                ...prev,
                [id]: value
            }
        })
    }

    function confirmPriceChange() {
        setConfirmPriceRange(priceRange);
    }

    function handleRadioChange(e) {
        const {id, checked} = e.target
        checkState[1].array.map(item => {
            if (item.id == id) item.isChecked = checked
            else item.isChecked = false
        })
        setCheckState([...checkState])
    }

    function handleCheckChange(e) {
        const {id, checked} = e.target
        checkState[0].array.map(item => {
            if (item.id == id) item.isChecked = checked
        })
        setCheckState([...checkState])
    }

    function orderProducts(products, currentState) {
        let sortedState = []
        checkState[1].array.map(item => {
            if (item.isChecked) sortedState = item.sort(products)
        })
        const res = handleProductChange(sortedState, currentState)
        return res
    }

    function sortByPrice(products, currentState) {
        const {minPrice, maxPrice} = confirmPriceRange
        console.log(minPrice, maxPrice)
        const filteredProducts = products.filter(a => +a.price >= minPrice && +a.price <= maxPrice)
        currentState.currentPage = 1
        const res = handleProductChange(filteredProducts, currentState)
        return res
    }

    function sortByTags(products, currentState) {
        const checkedTags = [];
        checkState[0].array.map(item => {
            if (item.isChecked) checkedTags.push(item.name)
        })
        const filteredProducts = []
        products.map(item => {
            if (checkedTags.some(element => item.tags.includes(element))) filteredProducts.push(item)
        })
        currentState.currentPage = 1;
        const res = handleProductChange(filteredProducts, currentState)
        return res
    }

    function handleFilter(current, action) {
        // const currentState = {...action.info.state}
        // const allProducts = [];
        // if (currentState.products) currentState.products.map(item => allProducts.push(...item));
        // if (action.type == "sortByPrice") {
        //     const {minPrice, maxPrice} = priceRange
        //     if (!minPrice && !maxPrice) setMsg("Set a min or max price")
        //     else if (maxPrice <= minPrice) setMsg("Max price cannot be lower than min price")
        //     else {
        //         setMsg("")
        //         const products = allProducts.filter(a => a.price >= minPrice && a.price <= maxPrice)
        //         currentState.currentPage = 1
        //         const res = handleProductChange(products, currentState)
        //         setFiltered (res)
        //     }
        // }
        // else if (action.type == 'orderProducts') {
        //     let sortedState = []
        //     checkState[1].array.map(item => {
        //         if (item.isChecked) sortedState = item.sort(allProducts)
        //     })
        //     const res = handleProductChange(sortedState, currentState)
        //     setFiltered(res)
        // }
        // else if (action.type == 'clear') {
        //     setCurrentState(state)
        // }
        if (action.type == 'changePage') {
            setFiltered(prevVal => {
                return {
                    ...prevVal,
                    currentPage: action.info.label
                }
            })
        }
    }

    useEffect(() => {
        if (state.products) {
            const allProducts = []
            state.products.map(item => allProducts.push(...item))
            const res = orderProducts(allProducts, state)
            let res2;
            if (confirmPriceRange.minPrice || confirmPriceRange.maxPrice) {
                const allSortedProducts = [];
                res.products.map(item => allSortedProducts.push(...item));
                res2 = sortByPrice(allSortedProducts, res);
            }
            const isTrue = checkState[0].array.filter(a => a.isChecked)
            let res3;
            if (isTrue.length > 0) {
                const allProducts = []
                if (res2) {
                    res2.products.map(item => allProducts.push(...item))
                    res3 = sortByTags(allProducts, res2)
                } 
                else if (!res2) {
                    res.products.map(item => allProducts.push(...item))
                    res3 = sortByTags(allProducts, res)
                }
            }
            if (res3) setFiltered({...res3})
            else if (res2) setFiltered({...res2})
            else setFiltered({...res})
            
        }
    }, [checkState, confirmPriceRange])

    return (
        <ShopContext.Provider value={{state, filtered, checkState, msg, priceRange, dispatch, functions: {handlePriceChange, handleRadioChange, confirmPriceChange, handleCheckChange}}}>
            {children}
        </ShopContext.Provider>
    )
}