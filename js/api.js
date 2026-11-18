const url = "https://6afaead6730c1d152f32bcb8.mockapi.io/api/v1"
export async function request(path, options = {}) {
const res = await fetch(BASE_URL + path, {
headers: { "Content-Type": "application/json" },
...options,
});
if (!res.ok) throw new Error(`Erreur ${res.status}`);
return res.json();
}
export async function chargerFilms(){
    const data = localStorage.getItem("cinetrack");
    if(data !== null){
        return JSON.parse(data);
    }
    try{
        const films = await request("/contents");
        localStorage.setItem("cinetrack", JSON.stringify(films));
        return films;
    } catch(erreur){
        console.log("Probleme :", erreur);
        return [];
    }
}

function sauvgarder(cinetrack){
    localStorage.setItem("cinetrack", JSON.stringify(cinetrack));
}
// POST
export const createContent = (data) =>
    request("/contents", { method: "POST", body: JSON.stringify(data) });

// PUT
export const updateContent = (id, data) =>
    request(`/contents/${id}`, { method: "PUT", body: JSON.stringify(data) });

// DELETE
export const deleteContent = (id) =>
    request(`/contents/${id}`, { method: "DELETE" });