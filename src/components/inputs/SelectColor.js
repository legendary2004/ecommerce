export default function(prop) {
    const sizeVariant = {
        selected: 'w-10 h-10',
        notSelected: 'w-6 h-6'
    }
    return (
        <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
            <input type="radio" id={prop.id} checked={prop.isChecked} onChange={prop.handleChange} name="color-choice" value="White" className="sr-only" aria-labelledby="color-choice-0-label" />
            <span id="color-choice-0-label" className="sr-only">{prop.bgColor}</span>
            <span aria-hidden="true" className={`${sizeVariant[prop.isActive]} border rounded-full border-white border-opacity-10`} style={{background: prop.bgColor}}></span>
        </label>
    )
}