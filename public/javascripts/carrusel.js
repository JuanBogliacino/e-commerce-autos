const prev = document.querySelector(".prev")
const next = document.querySelector(".next")
const slider = document.querySelector(".slider")

prev.addEventListener("click", ()=> {
    slider.scrollLeft -= 500
})

next.addEventListener("click", ()=> {
    slider.scrollLeft += 500
})

const prevOf = document.querySelector(".prev-ofertas")
const nextOf = document.querySelector(".next-ofertas")
const sliderOf = document.querySelector(".slider-ofertas")

prevOf .addEventListener("click", ()=> {
    sliderOf.scrollLeft -= 500
})

nextOf.addEventListener("click", ()=> {
    sliderOf.scrollLeft += 500
})