window.addEventListener("load", function() {
    let form = document.querySelector(".form")

    form.addEventListener("submit", function(e) {
        let inputPrice = document.querySelector(".price");

        let liPrice = document.querySelector(".li-price");

        if (inputPrice.value <= 0) {
            e.preventDefault();
            
            if(liPrice.value == "") {
                liPrice.innerHTML = "Tienes que ponerle un precio"
            }
        }

        // let inputImg = document.querySelector(".img");

        // let liImg = document.querySelector(".li-img")

        // if (inputImg.value.originalname == "") {
        //     e.preventDefault();
            
        //     if(liImg.value == "") {
        //         liImg.innerHTML = "Tienes que ponerle un precio"
        //     }
        // }
        
    });
})