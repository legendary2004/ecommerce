export default function(prop) {
    return (
        <li>
            <input type="checkbox" id={prop.id} checked={prop.isChecked} onChange={prop.handleChange} value="" className="hidden peer" required=""/>
            <label for={prop.id} className="inline-flex items-center justify-between w-full py-1 px-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                <div className="w-full text-lg font-semibold">{prop.name}</div>
            </label>
        </li>
    )
}