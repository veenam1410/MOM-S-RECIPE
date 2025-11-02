const form = document.getElementById("recipeForm");
const ingredientInput = document.getElementById("ingredientInput");
const ingredientList = document.getElementById("ingredientList");
const addIngredientBtn = document.getElementById("addIngredient");
const backto= document.querySelector(".backto");

let ingredients = []; 

addIngredientBtn.addEventListener("click", () => {
  const value = ingredientInput.value.trim();
  if (value) {
    ingredients.push(value);
  
    let li = document.createElement("li");
    li.textContent = value;
    ingredientList.appendChild(li);

    ingredientInput.value = ""; 
  }
});

const form1= document.querySelector("form");

form1.addEventListener("submit", async(e)=>{
    e.preventDefault();

    const doc={
        title: form1.title.value,
        ingredients: ingredients,
        steps: form1.steps.value
    }

    await fetch("http://localhost:3000/recipes", {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: {'content-Type':'application/json'}
    })

    window.location.replace('/index.html');
})

backto.addEventListener("click", ()=>{
  window.location.replace('/index.html');
})
