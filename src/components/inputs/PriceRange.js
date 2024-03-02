export default function(prop) {
    return (
        <>
            <div className="w-full flex items-end justify-center space-x-3">
                <div>
                    <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Min price</label>
                    <input type="number" id="minPrice" value={prop.value1} onChange={prop.handleChange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "/>
                </div>
                <span>to</span>
                <div>
                    <label for="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max price</label>
                    <input type="number" id="maxPrice" value={prop.value2} onChange={prop.handleChange} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  "/>
                </div>
            </div>
            <div className="mt-2 flex rounded-md justify-center items-center">
                <button onClick={prop.handleClick} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    Search
                </button>
                <button onClick={prop.handleClear} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    Clear
                </button>
            </div>
        </>
    )

}