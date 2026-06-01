// Ce qu'il faut faire
const form = document.getElementById("monFormulaire")

form.addEventListener("submit", function(event) {
    event.preventDefault()


    // Comme ça on lit les valeurs AU MOMENT où l'utilisateur soumet
    const nomComplet = document.getElementById("nomcomplet").value
    const email = document.getElementById("email").value
    const domaine = document.getElementById("domaine").value
    const message = document.getElementById("message").value
    const chronoType = document.querySelector('input[name="chrono"]:checked')
    const passions = document.querySelectorAll('input[name="passion"]:checked')
})


function showError(input, message) {
    input.classList.remove("success")
    input.classList.add("error")

    // On cherche s'il y a déjà un message d'erreur
    let errorMsg = input.parentElement.querySelector(".error-message")

    // S'il n'existe pas encore, on le crée
    if (!errorMsg) {
    errorMsg = document.createElement("span")
    errorMsg.classList.add("error-message")
    input.parentElement.appendChild(errorMsg)
    }

    errorMsg.textContent = message
}

function showSuccess(input) {
    input.classList.remove("error")
    input.classList.add("success")

    // On supprime le message d'erreur s'il existe
    const errorMsg = input.parentElement.querySelector(".error-message")
    if (errorMsg) errorMsg.remove()
}

function validateText(input) {
    const valeur = input.value.trim() // trim() enlève les espaces au début et à la fin

    if (valeur === "") {
    showError(input, "Ce champ est obligatoire")
    return false
    }

    if (valeur.length < 3) {
    showError(input, "Minimum 3 caractères")
    return false
    }

    showSuccess(input)
    return true
}

function validateEmail(input) {
    const valeur = input.value.trim() // 1. On récupère le texte

    if (valeur === "") {
    showError(input, "Ce champ est obligatoire")
    return false
    }

    if (!valeur.includes("@")) { // 2. On vérifie le @
    showError(input, "Email invalide, le @ est manquant")
    return false
    }

    showSuccess(input)
    return true
}

function validateSelect(input) {
    const valeur = input.value

    if (valeur === "") {
    showError(input, "Veuillez sélectionner un domaine")
    return false
    }

    showSuccess(input)
    return true
}

function validateRadio(name) {
    const radio = document.querySelector(`input[name="${name}"]:checked`)
    const premierRadio = document.querySelector(`input[name="${name}"]`)

    if (!radio) {
    showError(premierRadio, "Veuillez sélectionner une option")
    return false
    }

    showSuccess(premierRadio)
    return true
}


function validateCheckbox(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`)
    const premierCheckbox = document.querySelector(`input[name="${name}"]`)

    if (checkboxes.length < 2) {
    showError(premierCheckbox, "Veuillez sélectionner au moins 2 passions")
    return false
    }

    showSuccess(premierCheckbox)
    return true
}


function validateTextarea(input) {
    const valeur = input.value.trim()

    if (valeur === "") {
    showError(input, "Ce champ est obligatoire")
    return false
    }

    if (valeur.length < 25) {
    showError(input, "Minimum 25 caractères")
    return false
    }

    if (valeur.length > 255) {
    showError(input, "Maximum 255 caractères")
    return false
    }

    showSuccess(input)
    return true
}