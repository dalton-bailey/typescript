import * as _ from 'lodash'
import './styles.css'

document.querySelector("#chickenBtn").addEventListener('click' , setChicken) 
document.querySelector("#beefBtn").addEventListener('click', setBeef);
document.querySelector("#fishBtn").addEventListener('click', setFish);
document.querySelector("#favoritesBtn").addEventListener('click', setFavorites)

const chickenDiv = <HTMLElement>document.querySelector('#chicken');
const beefDiv = <HTMLElement>document.querySelector('#beef');
const fishDiv = <HTMLElement>document.querySelector('#fish');
const favDiv = <HTMLElement>document.querySelector("#favorites")


function setChicken() {
    console.log('chicken')
    chickenDiv.style.display = "flex"
    beefDiv.style.display = "none"
    fishDiv.style.display = "none"
    favDiv.style.display = "none"
}
function setBeef() {
    console.log('beef')
    chickenDiv.style.display = "none"
    beefDiv.style.display = "flex"
    fishDiv.style.display = "none"
    favDiv.style.display = "none"
}
function setFish() {
    console.log('fish')
    chickenDiv.style.display = "none"
    beefDiv.style.display = "none"
    fishDiv.style.display = "flex"
    favDiv.style.display = "none"
}

function setFavorites() {
    console.log('favorites')
    chickenDiv.style.display = "none"
    beefDiv.style.display = "none"
    fishDiv.style.display = "none"
    favDiv.style.display = "flex"
}

const choices = ["chicken", "beef", "fish"];
let favorites: string[] = []

interface User {
    url: string
    name: string
}

type UsersPromise = Promise<User[]>

async function getapi(url: string): Promise<User[]> {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "x-rapidapi-key": "69b1e63df0msh1e193782366dff1p1021f6jsneef29c1d0021",
            "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
        },
    });

    let recipes = await response.json();
    console.log(recipes.hits); 

    recipe(recipes.hits);

    return recipes.hits

}

choices.forEach(choice => {
    getapi(`https://edamam-recipe-search.p.rapidapi.com/search?q=${choice}`);
})
 

function recipe(chickenRecipes: string[] = []) {
    chickenRecipes.forEach((chickenRecipe:any) => {
        const recipe = document.createElement("div");

        const index = chickenRecipes.indexOf(chickenRecipe)

        const recipeImg = document.createElement("img");
        recipeImg.src = chickenRecipe.recipe.image;

        const recipeName = document.createElement("h1");
        recipeName.innerText = chickenRecipe.recipe.label;

        const viewInfoBtn = document.createElement("button");
        viewInfoBtn.className = "infoButton";
        viewInfoBtn.innerText = "View Info";

        const favBtn = document.createElement("input")
        favBtn.type = 'checkbox'
        favBtn.className = "favButton";
        favBtn.innerText = "Favorite";

        favBtn.addEventListener("click", addFav)

        function addFav() {
            console.log('added', index)
            console.log(favorites)
            if (favBtn.checked == true) {
                favDiv.appendChild(recipe)
                console.log('checked')
            } if (favBtn.checked == false) {

                if (chickenRecipe.recipe.label.includes('Chicken')) {
                    chickenDiv.appendChild(recipe);
                } if (chickenRecipe.recipe.label.includes('Beef')) {
                    beefDiv.appendChild(recipe)
                } if (chickenRecipe.recipe.label.includes('Fish' || 'fish')) {
                    fishDiv.appendChild(recipe)
                }
            }
        }

        viewInfoBtn.addEventListener("click", toggle);

        function toggle() {
            recipeInfo.classList.toggle("recipeInfo");
        }

        const recipeInfo = document.createElement("div");
        recipeInfo.className = "recipeInfo";

        const totalTime = document.createElement("p");
        totalTime.innerText =
            "Total Time " + chickenRecipe.recipe.totalTime + " minutes";

        const servings = document.createElement("p");
        servings.innerText = "Servings " + chickenRecipe.recipe.yield;

        const indgredientsHeader = document.createElement("h2");
        indgredientsHeader.innerText = "Ingredients";

        const ingredients = document.createElement("ul");
        chickenRecipe.recipe.ingredientLines.forEach((ingredient:any) => {
            const item = document.createElement("li");
            item.innerText = ingredient;

            ingredients.appendChild(item);
        });

        const instructions = document.createElement("a");
        instructions.href = chickenRecipe.recipe.url;
        instructions.innerText = "Recipe";
        instructions.setAttribute("target", "_blank");

        recipeInfo.appendChild(totalTime);
        recipeInfo.appendChild(servings);
        recipeInfo.appendChild(indgredientsHeader);
        recipeInfo.appendChild(ingredients);
        recipeInfo.appendChild(instructions);

        recipe.appendChild(recipeImg);
        recipe.appendChild(recipeName);
        recipe.appendChild(viewInfoBtn);
        recipe.appendChild(favBtn);
        recipe.appendChild(recipeInfo);

        if (chickenRecipe.recipe.label.includes('Chicken')) {
            chickenDiv.appendChild(recipe);
        } if (chickenRecipe.recipe.label.includes('Beef')) {
            beefDiv.appendChild(recipe)
        } if (chickenRecipe.recipe.label.includes('Fish' || 'fish')) {
            fishDiv.appendChild(recipe)
        }

    });
}



