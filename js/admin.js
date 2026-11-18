import { request ,chargerFilms ,deleteContent } from "./api.js";

const tableBody = document.getElementById("admin_table_body")
const loading = document.getElementById("loading")
let items = []


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

initAdmin()