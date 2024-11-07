function createRecipeCard(recipe) {
    return `
        <article class="bg-white rounded-[21px] shadow-[0px_4px_34px_30px_rgba(0,0,0,0.04)] overflow-hidden recipe-container mb-[3rem] relative w-[28%] max-lg:w-[40%]">
            <img src="./src/images/${recipe.image}" alt="Image de ${recipe.name}" class="object-cover h-[253px] w-full rounded-t-[20px]">
            <div class="px-[6.5%] container-card-text min-h-[478px]">
                <h2 class="text-lg font-anton py-[21px] pb-[29px] text-black">${recipe.name}</h2>

                <div class="description-container mb-[28px]">
                    <h3 class="uppercase font-medium opacity-60 mb-[15px] text-[12px] font-manrope tracking-[1.08px] text-[#7A7A7A]">Recette</h3>
                    <p class="recipe-description text-[14px] font-light font-manrope text-[#1B1B1B] max-h-[85px] overflow-hidden">
                        ${recipe.description}
                    </p>
                </div>

                <div class="mt-[28px] flex flex-col recipe-ingredients mb-[61px]">
                    <h3 class="uppercase font-medium opacity-60 mb-[15px] text-[12px] font-manrope tracking-[1.08px] text-[#7A7A7A]">Ingrédients</h3>
                    <div class="w-full flex justify-between items-center flex-wrap">
                        ${recipe.ingredients.map(ingredient => `
                            <div class="w-[45%] mb-5">
                                <p class="font-medium ingredient-name text-[14px] font-manrope text-[#1B1B1B]">
                                    ${ingredient.ingredient}
                                </p>
                                <small class="opacity-60 text-base font-normal ingredient-quantity text-[14px] font-manrope text-[#7A7A7A]">
                                    ${ingredient.quantity || '-'}${ingredient.unit || ''}
                                </small>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="recipe-time inline-flex p-[5px_15px] justify-center items-center gap-[10px] rounded-[14px] bg-[#FFD15B] absolute top-[21px] right-[22px]">
                ${recipe.time} min
            </div>
        </article>
    `;
}

export function displayRecipeCards(recipes) {
    const container = document.getElementById('recipes-container');
    container.innerHTML = recipes.map(recipe => createRecipeCard(recipe)).join('');
}