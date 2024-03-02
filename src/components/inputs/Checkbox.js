export default function(prop) {
    return (
        <li className="w-full">
            <div className="flex items-center ps-3">
                <input id={prop.id} checked={prop.isChecked} onChange={prop.handleChange} type="checkbox" value="" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600"/>
                <label className="w-full py-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{prop.tag}</label>
            </div>
        </li>
    )
}