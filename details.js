const container1=document.querySelector(".complete");
const id=new URLSearchParams(window.location.search).get('id');
const homebtn= document.querySelector(".backto1");

// console.log("world")
const rendercomplete = async() => {
    const res1 = await fetch('http://localhost:3000/recipes/'+id);
    const post = await res1.json();
    let ingredientsList = post.ingredients.map(item => `<li>${item}</li>`).join("");
    // console.log("hello")
    const template1= `
            <div class="complete1">
            <h2>${post.title}</h2>
            <h4>Ingredients:</h4>
            <ul>
                ${ingredientsList}
            </ul>
            <p class="head1">Steps:</p>
            <p class="content">${post.steps}....</p>
            </div>
        `;
    container1.innerHTML=template1;
}

const deletebtn= document.querySelector(".delete");

deletebtn.addEventListener("click", async(e)=>{
    const res= await fetch('http://localhost:3000/recipes/'+id , {
        method: 'DELETE'
    })
    window.location.replace('/index.html');
})

homebtn.addEventListener("click", ()=>{
    window.location.replace('/index.html');
})
window.addEventListener('DOMContentLoaded', () => rendercomplete());