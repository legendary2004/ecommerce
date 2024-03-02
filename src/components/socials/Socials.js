import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { SiGooglemaps } from "react-icons/si"

export default function() {
    return (
        <div className="flex justify-center items-center">
            <a href="#" target="_blank"className="text-gray-700 hover:text-sky-600 ms-3"><FaFacebookF className="w-8 h-6"/></a>
            <a href="#" target="_blank"className="text-gray-700 hover:text-rose-600 ms-3"><FaInstagram className="w-8 h-6"/></a>
            <a href="#" target="_blank"className="text-gray-700 ms-3 "><FaXTwitter className="w-8 h-6" /></a>
            <a href="#" target="_blank"className="text-gray-700 hover:text-rose-600 ms-3"><FaYoutube className="w-8 h-6" /></a>
            <a href="https://maps.app.goo.gl/xPMcsj3nZE5RKHrP6" target="_blank"className="text-gray-700 ms-3"><SiGooglemaps className="w-8 h-6 " /></a> 
        </div>
    )
}