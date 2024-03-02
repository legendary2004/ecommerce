export default function(prop) {
    return (
        <>
            <label htmlFor="tags" className="block mb-0.5 text-sm font-medium text-gray-900 dark:text-white">Select color</label>
            <div className="flex items-center justify-center ">
                <input type="color" id={prop.id} onChange={prop.handleChange} />
                <button type="button" onClick={prop.handleClick} className="ms-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">Add color</button>

            </div>
        </>

    )
}