export default function(prop) {
    return (
        <div className="w-4/5 h-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
            <a href="#" onClick={prop.handleClick}>
                <img className="rounded-t-lg object-contain h-52 block mx-auto" src={prop.img} alt="product image" />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{prop.name}</h5>
                </a>
            </div>
        </div>
    )
}