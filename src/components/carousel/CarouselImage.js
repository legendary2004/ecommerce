export default function(prop) {
    return (
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src={prop.img} className="absolute block w-full h-56 md:h-[500px] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-contain object-center" alt="..."/>
        </div>
    )
}