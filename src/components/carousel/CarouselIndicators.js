export default function(prop) {
    return (
        <button type="button" class="w-3 h-3 rounded-full" aria-current={prop.isTrue} aria-label={`Slide ${prop.index + 1}`} data-carousel-slide-to={prop.index}></button>
    )
}