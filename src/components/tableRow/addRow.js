export default function(prop) {
    return (
        <td className="w-full hover:bg-gray-300" colSpan="100%" onClick={prop.handleClick}>
            <a href="#" className="px-6 py-4 text-center block text-lg font-medium text-blue-600 dark:text-blue-500">Add {prop.label}</a>
        </td>
    )
}