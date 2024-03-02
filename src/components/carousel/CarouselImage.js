export default function(prop) {
    return (
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src={prop.img} class="absolute block w-full h-56 md:h-[500px] top-0 left-0 object-contain" alt="..."/>
        </div>
    )
}