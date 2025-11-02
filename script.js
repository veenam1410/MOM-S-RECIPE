const container=document.querySelector(".recipes");
const searchForm= document.querySelector(".search input");
const enterbtn = document.querySelector("#enter");
const additems= document.querySelector(".additems");
const msg= document.querySelector(".msg-container");

const fetchrecipes= async(term)=>{

    let uri="http://localhost:3000/recipes?_sort=title&_order=desc";
    if(term){
        uri+=`&q=${term}`;
    }
    console.log(term);
    const res= await fetch(uri);
    let recipes= await res.json();
    if (term) {
        if(term.length==0){
            msg.innerHTML=``;
        }
        filtered = recipes.filter(r =>
            r.title.toLowerCase().includes(term.toLowerCase())
        );
        if (filtered.length === 0) {
            // console.log("No matches found, showing all recipes.");
            msg.innerHTML += `<p class="msg">No match found</p>`;
            const allRes = await fetch("http://localhost:3000/recipes?_sort=title&_order=desc");
            recipes = await allRes.json();
        } else {
            recipes = filtered;
            msg.innerHTML= `<a class="backtohome" href="index.html">Back to Home</a>`;
            additems.remove();
        }
    }
    console.log(recipes);
    let template=``;
    recipes.forEach(recipe=>{
        let ingredients = recipe.ingredients.slice(0, 5);
        let ingredientsList = ingredients.map(item => `<li>${item}</li>`).join("");
        
        template+=`
            <div class="recipepost">
            <h2>${recipe.title}</h2>
            <h4>Ingredients:</h4>
            <ul>
                ${ingredientsList}
            </ul>
            <a href="complete.html?id=${recipe.id}" class="seeall">See All</a>
            <p class="head"><strong>Steps</strong></p>
            <p>${recipe.steps.slice(0,200)}.... <a href="complete.html?id=${recipe.id}" class="seemore">See more</a></p>
            </div>
        `
    });

    // console.log("Fetched Recipes:");
    container.innerHTML=template;
}

enterbtn.addEventListener("click", (e)=>{
    fetchrecipes(searchForm.value.trim());
    searchForm.value=``;
});

additems.addEventListener("click", (e)=>{
    e.preventDefault();
    window.location.replace('/add.html');
})

window.addEventListener('DOMContentLoaded', () => fetchrecipes());
