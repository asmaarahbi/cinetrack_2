import { getComments, createComment } from "./api.js"


const modal =document.getElementById("modal")
const contenu = document.getElementById("modal-contenu");
const listeCommentaires = document.getElementById("liste-commentaires");
const loaderCommentaires = document.getElementById("loader-commentaires");
const formCommentaire = document.getElementById("form-commentaire");
const inputAuteur = document.getElementById("auteur-commentaire");
const inputTexte = document.getElementById("texte-commentaire");
const errCommentaire = document.getElementById("err-commentaire");

let filmActuel = null;
function afficherListeCommentaires(commentaires) {
    if (commentaires.length === 0) {
        listeCommentaires.innerHTML = `<p class="text-sm text-gray-500">Aucun commentaire</p>`;
        return;
    }

    listeCommentaires.innerHTML = commentaires.map(c => {
        const dateFormatee = c.createdAt ? new Date(c.createdAt).toLocaleDateString("fr-FR") : "";
        return `
            <li class="rounded-lg border border-neutral-800 bg-black p-3">
                <div class="flex items-center justify-between text-xs text-gray-400">
                    <span class="font-bold text-white">${c.author}</span>
                    <span>${dateFormatee}</span>
                </div>
                <p class="mt-1 text-sm text-gray-300">${c.text}</p>
            </li>
        `;
    }).join("");
}

async function chargerCommentairesDuFilm(idFilm) {
    listeCommentaires.innerHTML = "";
    loaderCommentaires.classList.remove("hidden");

    try {
        const tousLesCommentaires = await getComments();
        const commentairesDuFilm = tousLesCommentaires.filter(
            c => String(c.contentId) === String(idFilm)
        );
        afficherListeCommentaires(commentairesDuFilm);
    } catch (erreur) {
        listeCommentaires.innerHTML = `<p class="text-sm text-red-500">Erreur lors du chargement des commentaires</p>`;
    } finally {
        loaderCommentaires.classList.add("hidden");
    }
}

formCommentaire.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (filmActuel === null) return;

    const author = inputAuteur.value.trim();
    const text = inputTexte.value.trim();

    if (author === "" || text === "") {
        errCommentaire.textContent = "Le nom et le commentaire sont obligatoires.";
        errCommentaire.classList.remove("hidden");
        return;
    }

    errCommentaire.classList.add("hidden");
    localStorage.setItem("cinetrack_pseudo", author);

    try {
        const nouveauCommentaire = await createComment({
            contentId: String(filmActuel.id),
            author: author,
            text: text,
            createdAt: new Date().toISOString()
        });

        const tous = await getComments();
        const filtres = tous.filter(c => String(c.contentId) === String(filmActuel.id));
        if (filtres.length > 0) {
            afficherListeCommentaires(filtres);
        } else {
            afficherListeCommentaires([nouveauCommentaire]);
        }

        inputTexte.value = "";
    } catch (erreur) {
        errCommentaire.textContent = "Impossible d'envoyer le commentaire.";
        errCommentaire.classList.remove("hidden");
    }
});

export function ouvrirModal(film) {
    filmActuel = film;
    contenu.innerHTML = `<img src="${film.image}" alt="${film.title}" class="mb-4 h-64 w-full rounded-lg object-cover">
    <h2 class="text-xl font-bold">${film.title}</h2>
    <p class="text-sm text-gray-400">${film.releaseYear} . ${film.type}</p>`;

    const pseudoSauvegarde = localStorage.getItem("cinetrack_pseudo");
    if (pseudoSauvegarde !== null) {
        inputAuteur.value = pseudoSauvegarde;
    }
    errCommentaire.classList.add("hidden");

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    chargerCommentairesDuFilm(film.id);
}

export function fermerModal(){
    modal.classList.add("hidden")
    modal.classList.remove("flex")
}