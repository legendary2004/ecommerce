import { FaSearch } from "react-icons/fa";

export default function(prop) {
    return (
        <div>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="flex justify-center items-center border border-gray-300 bg-gray-50 rounded-md dark:bg-gray-700 dark:border-gray-600">
                <div className="px-3 cursor-pointer">
                    <FaSearch className="text-gray-400 w-6 h-6" onClick={prop.handleClick}/>
                </div>
                <input id="search" value={prop.value} onChange={prop.handleChange} className="bg-gray-50 rounded-md outline-none w-full p-3 text-sm text-gray-900 dark:placeholder-gray-400 dark:text-white" placeholder="Search product" required/>
            </div>
        </div>
    )
}