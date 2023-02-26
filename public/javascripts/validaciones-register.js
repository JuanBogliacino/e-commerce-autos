window.addEventListener("load", function() {
    let form = document.querySelector(".form")

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        let inputName = document.querySelector(".name");

        if (inputName.value == "") {
            alert("el campo de nombre tiene que estar completo")
        } else if (inputName.value.length < 3) {
            alert("el campo de nombre debe tener al menos 3 caracteres")
        }

        let inputMail = document.querySelector(".mail");

        if (inputMail.value == "") {
            alert("el campo de mail tiene que estar completo")
        }

        let inputPassword= document.querySelector(".password");

        if (inputPassword.value == "") {
            alert("el campo de password tiene que estar completo")
        }
    });
})