import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function(prop) {
    const navigate = useNavigate();

    function navigateTo(path) {
        navigate(path)
    }
    
    return (
        <li>
            <a href="#" className="block p-2 sm:py-0.5 text-gray-900 rounded hover:bg-gray-100 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" onClick={() => navigate(prop.path)}>{prop.name}</a>
        </li>
    )
}