export default function(prop) {
    return (
        
        <form className="w-full mx-auto">
            <textarea id={prop.id} value={prop.value} onChange={prop.handleChange} rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" placeholder={prop.placeholder}></textarea>
        </form>

    )
}