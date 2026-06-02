// ════════════════════════════════════════
// AFFICHER UNE ERREUR SUR UN CHAMP
// ════════════════════════════════════════
function afficherErreur(champ, texteErreur) {
    champ.classList.remove("succes")
    champ.classList.add("erreur")

    let messageExistant = champ.parentElement.querySelector(".message-erreur")

    if (!messageExistant) {
    messageExistant = document.createElement("span")
    messageExistant.classList.add("message-erreur")
    champ.parentElement.appendChild(messageExistant)
    }

    messageExistant.textContent = texteErreur
}


// ════════════════════════════════════════
// AFFICHER UN SUCCÈS SUR UN CHAMP
// ════════════════════════════════════════
function afficherSucces(champ) {
    champ.classList.remove("erreur")
    champ.classList.add("succes")

    const messageExistant = champ.parentElement.querySelector(".message-erreur")
    if (messageExistant) messageExistant.remove()
}


// ════════════════════════════════════════
// AFFICHER UNE ERREUR POUR UN GROUPE
// (radio ou checkbox)
// ════════════════════════════════════════
function afficherErreurGroupe(idConteneur, texteErreur) {
    const conteneur = document.getElementById(idConteneur)
    conteneur.innerHTML = `<div class="erreur-groupe">${texteErreur}</div>`
}

function effacerErreurGroupe(idConteneur) {
    document.getElementById(idConteneur).innerHTML = ""
}


// ════════════════════════════════════════
// VALIDER LE CHAMP PRÉNOM / NOM
// ════════════════════════════════════════
function validerPrenomNom(champ) {
    let valeur = champ.value
        .replace(/\s+/g, " ")
        .trim();

    champ.value = valeur; // met à jour le champ

    if (valeur === "") {
        afficherErreur(champ, "Ce champ est obligatoire");
        return false;
    }

    // lettres + espaces uniquement (comme ton besoin réel)
    const regex = /^[a-zA-ZÀ-ÿ]+( [a-zA-ZÀ-ÿ]+)+$/;

    if (!regex.test(valeur)) {
        afficherErreur(champ, "Seules les lettres et espaces sont autorisés");
        return false;
    }

    if (valeur.length < 3) {
        afficherErreur(champ, "Minimum 3 caractères requis");
        return false;
    }

    afficherSucces(champ);
    return true;
}


// ════════════════════════════════════════
// VALIDER LE CHAMP EMAIL
// ════════════════════════════════════════
function validerEmail(champ) {
    const valeur = champ.value.trim()

    if (valeur === "") {
    afficherErreur(champ, "L'email est obligatoire")
    return false
    }

    // Expression régulière simple pour valider le format de l'email
    const regexEmail = /^[^\s@]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
    
    if (!regexEmail.test(valeur)) {
    afficherErreur(champ, "Format invalide — ex: nom@domaine.com")
    return false
    }

    afficherSucces(champ)
    return true
}


// ════════════════════════════════════════
// VALIDER LE SELECT (liste déroulante)
// ════════════════════════════════════════
function validerSelect(champ) {
  // Liste des valeurs autorisées
  const valeursAutorisees = ["Front-End", "Back-End", "Design/UX", "Data"]

  if (champ.value === "") {
    afficherErreur(champ, "Fais un choix pour continuer")
    return false
  }

  if (!valeursAutorisees.includes(champ.value)) {
    afficherErreur(champ, "Valeur non autorisée")
    return false
  }

  afficherSucces(champ)
  return true
}


// ════════════════════════════════════════
// VALIDER LES BOUTONS RADIO
// ════════════════════════════════════════
function validerRadio(nomGroupe) {
    const choixCoche = document.querySelector(`input[name="${nomGroupe}"]:checked`)
    const tousLesRadios = document.querySelectorAll(`input[name="${nomGroupe}"]`)

    if (!choixCoche) {
    afficherErreurGroupe("erreur-chrono", "Sélectionne une option pour continuer")
    tousLesRadios.forEach(function(radio) {
        radio.closest(".carte-radio").classList.add("erreur-carte")
    })
    return false
    }

    effacerErreurGroupe("erreur-chrono")
    tousLesRadios.forEach(function(radio) {
    radio.closest(".carte-radio").classList.remove("erreur-carte")
    })
    return true
}


// ════════════════════════════════════════
// VALIDER LES CASES À COCHER (passions)
// ════════════════════════════════════════
function validerPassions(nomGroupe) {
    const casesChoisies = document.querySelectorAll(`input[name="${nomGroupe}"]:checked`)
    const toutesLesCases = document.querySelectorAll(`input[name="${nomGroupe}"]`)

    if (casesChoisies.length < 2) {
    afficherErreurGroupe("erreur-passion", `${casesChoisies.length}/2 sélectionnée(s) — coche au moins 2 passions`)
    toutesLesCases.forEach(function(caseACocher) {
        caseACocher.closest(".carte-passion").classList.add("erreur-carte")
    })
    return false
    }

    effacerErreurGroupe("erreur-passion")
    toutesLesCases.forEach(function(caseACocher) {
    caseACocher.closest(".carte-passion").classList.remove("erreur-carte")
    })
    return true
}


// ════════════════════════════════════════
// VALIDER LA ZONE DE TEXTE (textarea)
// ════════════════════════════════════════
function validerMessage(champ) {
    const valeur = champ.value.trim()

    if (valeur === "") {
    afficherErreur(champ, "Ce champ est obligatoire")
    return false
    }
    if (valeur.length < 25) {
    afficherErreur(champ, `Encore ${25 - valeur.length} caractère(s) minimum`)
    return false
    }
    if (valeur.length > 255) {
    afficherErreur(champ, "Maximum 255 caractères atteint")
    return false
    }

    afficherSucces(champ)
    return true
}


// ════════════════════════════════════════
// VALIDER TOUTE UNE PAGE
// ════════════════════════════════════════
function validerPage(numeroDePage) {

    if (numeroDePage === 1) {
    const ok1 = validerPrenomNom(document.getElementById("prenom-nom"))
    const ok2 = validerEmail(document.getElementById("email"))
    return ok1 && ok2
    }

    if (numeroDePage === 2) {
    const ok1 = validerSelect(document.getElementById("domaine"))
    const ok2 = validerRadio("chrono")
    return ok1 && ok2
    }

    if (numeroDePage === 3) {
    return validerPassions("passion")
    }

    if (numeroDePage === 4) {
    return validerMessage(document.getElementById("message"))
    }

    return true
}


// ════════════════════════════════════════
// VALIDER TOUT LE FORMULAIRE (avant soumission)
// ════════════════════════════════════════
function validerTout() {
  const ok1 = validerPrenomNom(document.getElementById("prenom-nom"))
  const ok2 = validerEmail(document.getElementById("email"))

  // Si page 1 a une erreur → on y retourne
  if (!ok1 || !ok2) {
    afficherPage(1)
    return false
  }

  const ok3 = validerSelect(document.getElementById("domaine"))
  const ok4 = validerRadio("chrono")

  // Si page 2 a une erreur → on y retourne
  if (!ok3 || !ok4) {
    afficherPage(2)
    return false
  }

  const ok5 = validerPassions("passion")

  // Si page 3 a une erreur → on y retourne
  if (!ok5) {
    afficherPage(3)
    return false
  }

  const ok6 = validerMessage(document.getElementById("message"))

  // Si page 4 a une erreur → on reste là
  if (!ok6) return false

  return true
}

// ════════════════════════════════════════
// NAVIGATION : ALLER À LA PAGE SUIVANTE
// ════════════════════════════════════════
function allerPageSuivante(pageActuelle) {
    if (!validerPage(pageActuelle)) return

    marquerEtapeTerminee(pageActuelle)
    afficherPage(pageActuelle + 1)
    remplirLigne(pageActuelle)
}


// ════════════════════════════════════════
// NAVIGATION : ALLER À LA PAGE PRÉCÉDENTE
// ════════════════════════════════════════
function allerPagePrecedente(pageActuelle) {
    afficherPage(pageActuelle - 1)
}


// ════════════════════════════════════════
// AFFICHER UNE PAGE ET METTRE À JOUR LE STEPPER
// ════════════════════════════════════════
function afficherPage(numeroDePage) {
    // Cacher toutes les pages
    document.querySelectorAll(".page-formulaire").forEach(function(page) {
    page.classList.remove("active")
    })
    // Afficher la bonne page
    document.getElementById("page-" + numeroDePage).classList.add("active")

    // Mettre à jour le stepper
    document.querySelectorAll(".etape").forEach(function(etape) {
    etape.classList.remove("actif")
    etape.querySelector(".etape-cercle").classList.remove("actif")
    })

    const etapeActive = document.querySelector(`.etape[data-numero="${numeroDePage}"]`)
    etapeActive.classList.add("actif")
    etapeActive.querySelector(".etape-cercle").classList.add("actif")

    window.scrollTo({ top: 0, behavior: "smooth" })
}


// ════════════════════════════════════════
// MARQUER UNE ÉTAPE COMME TERMINÉE
// ════════════════════════════════════════
function marquerEtapeTerminee(numeroEtape) {
    const etape = document.querySelector(`.etape[data-numero="${numeroEtape}"]`)
    const cercle = etape.querySelector(".etape-cercle")

    cercle.classList.remove("actif")
    cercle.classList.add("termine")
    cercle.textContent = "✓"

    etape.classList.add("termine")
    etape.classList.remove("actif")
}


// ════════════════════════════════════════
// REMPLIR LA LIGNE ENTRE LES ÉTAPES
// ════════════════════════════════════════
function remplirLigne(numeroEtape) {
    const ligne = document.getElementById("ligne-" + numeroEtape)
    if (ligne) ligne.classList.add("termine")
}


// ════════════════════════════════════════
// FEEDBACK EN TEMPS RÉEL (pendant la saisie)
// ════════════════════════════════════════
document.getElementById("prenom-nom").addEventListener("blur", function() {
    validerPrenomNom(this)
})

document.getElementById("email").addEventListener("blur", function() {
    validerEmail(this)
})

document.getElementById("domaine").addEventListener("change", function() {
    validerSelect(this)
})

document.getElementById("message").addEventListener("input", function() {
    validerMessage(this)
    mettreAJourCompteur(this)
})

document.querySelectorAll('input[name="chrono"]').forEach(function(radio) {
    radio.addEventListener("change", function() {
    validerRadio("chrono")
    // Style visuel : cocher la carte sélectionnée
    document.querySelectorAll(".carte-radio").forEach(function(carte) {
        carte.classList.remove("selectionnee")
    })
    this.closest(".carte-radio").classList.add("selectionnee")
    })
})

document.querySelectorAll('input[name="passion"]').forEach(function(caseACocher) {
    caseACocher.addEventListener("change", function() {
    validerPassions("passion")
    // Style visuel : cocher/décocher la carte
    const carte = this.closest(".carte-passion")
    if (this.checked) {
        carte.classList.add("selectionnee")
    } else {
        carte.classList.remove("selectionnee")
    }
    })
})


// ════════════════════════════════════════
// COMPTEUR DE CARACTÈRES
// ════════════════════════════════════════
function mettreAJourCompteur(textarea) {
    const nombreCaracteres = textarea.value.length
    const restants = 255 - nombreCaracteres
    const elementCompteur = document.getElementById("compteur")

    elementCompteur.textContent = restants + " caractère(s) restant(s)"
    elementCompteur.className = "compteur-caracteres"

    if (nombreCaracteres >= 230) {
    elementCompteur.classList.add("danger")
    } else if (nombreCaracteres >= 200) {
    elementCompteur.classList.add("avertissement")
    }
}


// ════════════════════════════════════════
// AFFICHER LA CARTE DE PROFIL
// ════════════════════════════════════════
function afficherCarteProfil() {
    const nom     = document.getElementById("prenom-nom").value.trim()
    const email   = document.getElementById("email").value.trim()
    const domaine = document.getElementById("domaine").value
    const chrono  = document.querySelector('input[name="chrono"]:checked').value
    const passions = [...document.querySelectorAll('input[name="passion"]:checked')].map(function(c) { return c.value })
    const message = document.getElementById("message").value.trim()

    const carteProfil = document.createElement("div")
    carteProfil.classList.add("carte-profil")

    carteProfil.innerHTML = `
    <span class="badge-succes">✓ Profil créé</span>
    <h2>${nom}</h2>
    <div class="ligne-profil">
        <span class="label-profil">Email</span>
        <span class="valeur-profil">${email}</span>
    </div>
    <div class="ligne-profil">
        <span class="label-profil">Domaine</span>
        <span class="valeur-profil">${domaine}</span>
    </div>
    <div class="ligne-profil">
        <span class="label-profil">Chrono-type</span>
        <span class="valeur-profil">${chrono === "matin" ? "☀️ Early Bird" : "🦉 Night Owl"}</span>
    </div>
    <div class="ligne-profil">
        <span class="label-profil">Passions</span>
        <span class="valeur-profil">${passions.map(function(p) { return `<span class="etiquette-passion">${p}</span>` }).join("")}</span>
    </div>
    <div class="ligne-profil">
        <span class="label-profil">Anecdote</span>
        <span class="valeur-profil">${message}</span>
    </div>
    `

    document.querySelector(".carte-formulaire").after(carteProfil)
}

// ════════════════════════════════════════
// SOUMISSION DU FORMULAIRE
// ════════════════════════════════════════
document.getElementById("formulaire").addEventListener("submit", function(evenement) {
    evenement.preventDefault()

    if (!validerTout()) return 

    marquerEtapeTerminee(4)

    // Supprimer l'ancienne carte si elle existe
    const ancienneCarte = document.querySelector(".carte-profil")
    if (ancienneCarte) ancienneCarte.remove()

    // Afficher la carte de profil
    afficherCarteProfil()

    // Remettre le formulaire à zéro
    document.getElementById("formulaire").reset()

    // Remettre tous les cercles du stepper à zéro
    document.querySelectorAll(".etape").forEach(function(etape) {
        etape.classList.remove("actif", "termine")
        const cercle = etape.querySelector(".etape-cercle")
        cercle.classList.remove("actif", "termine")
        cercle.textContent = etape.getAttribute("data-numero")
    })

    // Remettre toutes les lignes à zéro
    document.querySelectorAll(".ligne-etape").forEach(function(ligne) {
        ligne.classList.remove("termine")
    })

    // Retourner à la page 1 et activer l'étape 1
    afficherPage(1)

    // Scroll vers le haut
    window.scrollTo({ top: 0, behavior: "smooth" })
})


