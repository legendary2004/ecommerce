export default function(prop) {
    return (
        <li className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden">
                <img src={prop.img} className="h-full w-full object-contain hover:object-cover object-center"/>
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                        <a href="#">{prop.name}</a>
                        </h3>
                        <p className="ml-4">{prop.price} $</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">{prop.color}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex flex-col">
                        <p className="text-gray-500">qty {prop.quantity}</p>
                        <div className="flex">
                            <button className="px-1 py-0.5 rounded-l text-lg" onClick={prop.addQuantity}>+</button>
                            <button className="px-1 py-0.5 rounded-r text-lg" onClick={prop.removeQuantity}>-</button>
                        </div>
                    </div>

                    <div className="flex">
                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={prop.handleClick}>Remove</button>
                    </div>
                </div>
            </div>
        </li>
    )
}