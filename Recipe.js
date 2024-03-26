const SearchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipecontainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");



//FUNCTION TO GET RECIPE
const fetchRecipes = async (query) => {
    recipecontainer.innerHTML = "<h2>Fetching Recipe...</h2>";

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

     recipecontainer.innerHTML = "";
     response.meals.forEach(meal => {
        //  console.log(meal);
         const recipeDiv = document.createElement('Div');
         recipeDiv.classList.add('recipe');
         recipeDiv.innerHTML = `
         <img src="${meal.strMealThumb}"> 
         <h3> ${meal.strMeal}</h3>
         <p><span>${meal.strArea}</span>Dish</p>
         <p>Belongs to <span>${meal.strCategory}</span>Category</p>

         `
         const button = document.createElement('button');
         button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        //ADDING EVENTLISTENER TO RECIPE BUTTON
        button.addEventListener('click',()=>{
            openRecipePopup(meal);
        })

         recipecontainer.appendChild(recipeDiv);
     });
}

//FUNCTION TO FETCH INGREDIENT AND MEAUREMENTS
const fetchIngredients = (meal) => {
// console.log(meal);
let ingredientsList = "";
for(let i = 1; i <= 20; i++){
    const ingredient = meal[`strIngredient${i}`];
    if(ingredient){
          const measure = meal[`strMeasure${i}`];
          ingredientsList += `<li>${measure} ${ingredient}</li>`
    }
    else{
        break;
    }
} 
return ingredientsList;
}
  
const  openRecipePopup = (meal) =>{
  recipeDetailsContent.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul>${fetchIngredients(meal)}</ul>
  `

  recipeDetailsContent.parentElement.style.display = "block";
}



searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();  // Auto-Submit nhi hone dega Console me
    // console.log("Button Clicked");
    const searchInput = SearchBox.value.trim();
    fetchRecipes(searchInput);
});
