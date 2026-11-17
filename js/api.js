const url = "https://6afaead6730c1d152f32bcb8.mockapi.io/api/v1"
export async function chargerFilms(){
    const data = localStorage.getItem("cinetrack");
    if(data !== null){
        return JSON.parse(data);
    }

    try{
        const reponse = await fetch(url+"/contents");
        if(!reponse.ok){
            throw new Error("Erreur API");
        }
        const films = await reponse.json();
        sauvgarder(films);
        return films;
    } catch(erreur){
        console.log("Probleme :", erreur);
        return [];
    }
}

function sauvgarder(cinetrack){
    localStorage.setItem("cinetrack", JSON.stringify(cinetrack));
}