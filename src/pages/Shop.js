
import { useContext, useEffect, useState } from "react";
import Filter from "../components/classes/Filter";
import Footer from "../components/footer/Footer";
import MainNav from "../components/navbar/MainNav";
import { initFlowbite } from "flowbite";
import PriceRange from "../components/inputs/PriceRange";
import Card from "../cards/shop/Card";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import Pagination from "../components/navbar/Pagination";
import { ProductOverviewContext } from "../contexts/ProductToShop";

export default function() {
  const navigate = useNavigate()
  const category = useContext(ShopContext)
  const product = useContext(ProductOverviewContext)
  const [state, setState] = useState({})
  setTimeout(() => {
    initFlowbite()
  }, [500])
  
  useEffect(() => {
    setState(category.filtered)
  }, [category.filtered])

  function productOverview(id) {
    navigate("/single")
    product.getProduct(id)
  }
  
    return (
      <div className="min-h-screen">
        <MainNav />
        {state.name && <div className="py-5">
              <h1 className="text-3xl text-center font-bold">Shop category: {state.name}</h1>
              <p className="text-center text-md">Current page: {state.currentPage}</p>
              <div className="flex flex-wrap items-start justify-around p-5">
                <div className="w-auto flex flex-col flex-wrap">
                  <Filter />
                  <PriceRange 
                    value1={category.priceRange.minPrice}
                    value2={category.priceRange.maxPrice}
                    handleChange={category.functions.handlePriceChange}
                    handleClick={category.functions.confirmPriceChange}
                    handleClear={() => category.dispatch({type: 'clear'})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-2 mt-2">
                    {state.products.length > 0 && state.products[state.currentPage - 1].map(item => {
                      return <Card key={item.id} name={item.name} price={item.price} img={item.image} handleClick={() => productOverview(item.id)}/>
                    })}
                  </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="inline-flex -space-x-px text-base h-10 list-none">
                  {state.products.length > 0 && state.products.map((item, index) => {
                    return <Pagination key={index} label={index + 1} handleClick={() => category.dispatch({type: 'changePage', info: {label: index + 1}})}/>
                  })}
                </div>
              </div>
          </div>}
        <Footer />
      </div>

    )
}