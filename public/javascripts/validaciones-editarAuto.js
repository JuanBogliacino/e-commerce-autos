window.addEventListener("load", function() {
    let form = document.querySelector(".form")

    form.addEventListener("submit", function(e) {
        let liModel = document.querySelector(".li-model");

        let inputModel = document.querySelector(".model");

        if (inputModel.value == "") {
            e.preventDefault();

            if(liModel.value == "") {
                liModel.innerHTML = "Tienes que escribir el modelo del auto"
            }
        }

        let inputPrice = document.querySelector(".price");

        let liPrice = document.querySelector(".li-price");

        if (inputPrice.value <= 0) {
            e.preventDefault();
            
            if(liPrice.value == "") {
                liPrice.innerHTML = "Tienes que ponerle un precio"
            }
        }
    });
})