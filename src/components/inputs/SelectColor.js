export default function(prop) {
    return (
        <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
            <input type="radio" checked={prop.isChecked} name="color-choice" value="White" className="sr-only" aria-labelledby="color-choice-0-label" />
            <span id="color-choice-0-label" className="sr-only">{prop.color}</span>
            <span aria-hidden="true" className={`h-8 w-8 bg-[${prop.color}] rounded-full border border-black border-opacity-10`}></span>
        </label>
    )
}