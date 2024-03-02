import CategoryTable from "../table/CategoryTable"
import ProductTable from "../table/ProductTable"
import TagsTable from "../table/TagsTable"

export default function() {

    const propObj = [
        {id: "1", label: "Manage categories", content: <CategoryTable />},
        {id: "2", label: "Manage products", content: <ProductTable />},
        {id: "3", label: "Manage tags", content: <TagsTable />}
    ]
    return (
        propObj.map(prop => {
            return (
                <div key={prop.id}>
                    <h2 id={`accordion-open-heading-${prop.id}`}>
                        <button type="button" className="flex items-center justify-between w-[90%] mx-auto p-5 font-medium rtl:text-right text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target={`#accordion-open-body-${prop.id}`} aria-expanded="false" aria-controls={`accordion-open-body-${prop.id}`}>
                            <span className="flex items-center"><svg className="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg> {prop.label}</span>
                            <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                            </svg>
                        </button>
                    </h2>
                    <div id={`accordion-open-body-${prop.id}`} className="hidden" aria-labelledby={`accordion-open-heading-${prop.id}`}>
                        <div className="p-5 dark:bg-gray-900">
                            {prop.content}
                        </div>
                    </div>
                </div>
            )
        })
    )
}