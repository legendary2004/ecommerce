import { useContext, useEffect, useState } from "react"
import { onSnapshot, collection } from "firebase/firestore"
import { db } from "../../firebase"
import Checkbox from "../inputs/Checkbox"
import Radio from "../inputs/Radio"
import { ShopContext } from "../../contexts/ShopContext"
import { initFlowbite } from "flowbite"

export default function(prop) {
    setTimeout(() => {
        initFlowbite()
    }, [500])
    const shopContext = useContext(ShopContext)

    return (
        <>
            {shopContext.checkState.map((item) => {
                return (
                    <div key={item.id} id={`accordion-nested-collapse${item.id}`} data-accordion="collapse">
                        <h2 id={`accordion-nested-collapse-heading-${item.id}`}>
                            <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target={`#accordion-nested-collapse-body-${item.id}`} aria-expanded="false" aria-controls={`accordion-nested-collapse-body-${item.id}`}>
                                <span>{item.name}</span>
                                    <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeidth="2" d="M9 5 5 1 1 5"/>
                                </svg>
                            </button>
                        </h2>
                        <div id={`accordion-nested-collapse-body-${item.id}`} className="hidden" aria-labelledby={`accordion-nested-collapse-heading-${item.id}`}>
                            <div className="p-2">
                                <div className="mt-2">
                                    <ul className="w-72 text-sm font-medium text-gray-900 bg-white dark:bg-gray-700 dark:text-white">
                                        {item.array.map((label, index) => {
                                            if (item.id == '1') {
                                                return <Checkbox key={label.id} id={label.id} tag={label.name} isChecked={label.isChecked} handleChange={shopContext.functions.handleCheckChange}/>
                                            }
                                            else {
                                                return <Radio key={index} id={label.id} label={label.label} isChecked={label.isChecked} handleChange={shopContext.functions.handleRadioChange}/>
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}