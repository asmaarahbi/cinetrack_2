import {chargerFilms ,deleteContent,createContent,updateContent} from "./api.js";

const tableBody = document.getElementById("admin_table_body")
const loading = document.getElementById("loading")
const form = document.getElementById("form_film")
const formTitle=document.getElementById("form_title")
const btnSubmit =document.getElementById("btn_submit")

const btnCancel =document.getElementById("btn_cancel")


let items = []

 let editingId = null
async function initAdmin(){
    try{
        items = await chargerFilms();
        loading.style.display = "none"
        renderTable(items)
    }
    catch (e){
        loading.textContent= "Erreur lors de chargement"
        loading.classList.add("text-red-500")
    }
}

function renderTable ( data){
    if(data.length === 0){
        tableBody.innerHTML=`<tr><td colspan="5" class= " text-center py-4 text-gray-500"> Aucun contenu</td></tr>`
        return
        }
    tableBody.innerHTML = data.map(item => 
        `<tr class = "border-b border-neutral-800">
            <td class="py-3"><img src ="${item.image}" alt="${item.title}" class= "h-10 w-8 object-cover rounded"></td>
            <td class= "py-3 font-semibold"> ${item.title}</td>
            <td class= "py-3 text-gray-400">${item.type}</td>
            <td class= "py-3 text-gray-400">${item.releaseYear}</td>
            <td class= "py-3 text-right space-x-2">
             <button onclick="window.deleteItem('${item.id}')" class="text-red-500 hover:underline">Supprimer</button>
              <button onclick="window.editItem('${item.id}')" class="text-blue-500 hover:underline">Modifier</button>
             </td>
             </tr>
            `).join("");
    }

    
window.deleteItem = async function(id){
    const item = items.find(i=> String(i.id) === String(id))
    if(!item) return
    if(!confirm(`Supprimer << ${item.title}>> ?`)) return
    try{
        await deleteContent(id)
        items=items.filter(i=>String(i.id) !== String(id))
        renderTable(items)
        localStorage.setItem("cinetrack",JSON.stringify(items))
    } catch (e){
        alert ("Erreur lors de la suppression")
    }
}



window.editItem = function(id){
    const item = items.find(i => String(i.id) === String(id))
    if(!item) return
    editingId = item.id
    document.getElementById("title").value = item.title
    document.getElementById("image").value = item.image
    document.getElementById("type").value = item.type
    document.getElementById("releaseYear").value=item.releaseYear

    formTitle.textContent = "Modifier le contenu"
    btnSubmit.textContent= "Mettre à jour"
    btnCancel.classList.remove("hidden")
}

btnCancel.addEventListener("click", resetForm)

function resetForm (){
    editingId = null
    form.reset()
    formTitle.textContent = "Ajouter  un contenu"
    btnSubmit.textContent  = "Enregistrer"
    btnCancel.classList.add("hidden")
}
form.addEventListener("submit",async function (e) {
    e.preventDefault()

    const title = document.getElementById("title").value.trim()
    const image = document.getElementById("image").value.trim()
    const type = document.getElementById ("type").value
    const releaseYear= parseInt(document.getElementById("releaseYear").value)


// validat 
if(!title){
    alert("le titre est obligatoire")
    return;
}

const currentYear = new Date().getFullYear()
if(!releaseYear || releaseYear < 1900 ||releaseYear > currentYear) {
    alert(`l'année doit etre entre 1900 et ${currentYear}`)
    return
}
    
const payload = {title,image,type,releaseYear}
try{ 
    if(editingId){
        const updated = await updateContent (editingId,payload)
        items = items.map(i=> String(i.id) === String(editingId)? updated : i)
    }else{
        const created = await createContent(payload)
        items.push(created)
    }
    localStorage.setItem("cinetrack",JSON.stringify(items))
    renderTable(items)
    resetForm()
}
catch (e){
alert ("Erreur lors de l enregistrement")
}
})

initAdmin()