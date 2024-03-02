export default function(prop) {
    return (
        <div className="flex items-center mb-4">
            <input id={prop.id} checked={prop.isChecked} onChange={prop.handleChange} type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{prop.label}</label>
        </div>
    )
}