import { FaFileImage } from "react-icons/fa"

export default function(prop) {
    return (
        <label className="flex justify-center cursor-pointer mt-1">
            <FaFileImage className="w-8 h-6"/>
            <p className="font-medium">{prop.label}</p>
            <input className="hidden" type="file" id={prop.id} value={prop.value} accept={`${prop.accept}`} onChange={prop.handleChange} multiple={prop.multiple}/>
        </label>
    )
}