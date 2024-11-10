import { capitalizeFirstLetter } from "./utils.js";
import { selectedIngredients, selectedAppliances, selectedUtensils } from './filterSelections.js';

let ingredientSearchTerm = "";
let applianceSearchTerm = "";
let utensilSearchTerm = "";

export function generateFilters(recipes, applyFilters) {
    const ingredientList = document.getElementById('ingredient-list');
    const applianceList = document.getElementById('appliance-list');
    const utensilList = document.getElementById('utensil-list');
    const ingredientInput = document.getElementById('ingredient-filter-input');
    const applianceInput = document.getElementById('appliance-filter-input');
    const utensilInput = document.getElementById('utensil-filter-input');

    const updateFilterList = (items, set, listElement, searchTerm) => {
        listElement.innerHTML = "";
        items.forEach(item => {
            if (!set.has(item) && item.includes(searchTerm.toLowerCase())) {
                const li = document.createElement('li');
                li.textContent = capitalizeFirstLetter(item);
                li.classList.add("cursor-pointer", "p-2", "hover:bg-yellow-300", "text-gray-700", "font-medium");

                li.addEventListener('click', () => {
                    if (set.has(item)) {
                        set.delete(item);
                    } else {
                        set.add(item);
                    }
                    applyFilters();
                });

                listElement.appendChild(li);
            }
        });
    };

    const appliances = new Set();
    const utensils = new Set();
    const ingredients = new Set();

    recipes.forEach(recipe => {
        appliances.add(recipe.appliance.toLowerCase());
        recipe.ustensils.forEach(utensil => utensils.add(utensil.toLowerCase()));
        recipe.ingredients.forEach(ingredient => ingredients.add(ingredient.ingredient.toLowerCase()));
    });

    updateFilterList(ingredients, selectedIngredients, ingredientList, ingredientSearchTerm);
    updateFilterList(appliances, selectedAppliances, applianceList, applianceSearchTerm);
    updateFilterList(utensils, selectedUtensils, utensilList, utensilSearchTerm);

    ingredientInput.addEventListener('input', () => {
        ingredientSearchTerm = ingredientInput.value;
        updateFilterList(ingredients, selectedIngredients, ingredientList, ingredientSearchTerm);
    });

    applianceInput.addEventListener('input', () => {
        applianceSearchTerm = applianceInput.value;
        updateFilterList(appliances, selectedAppliances, applianceList, applianceSearchTerm);
    });

    utensilInput.addEventListener('input', () => {
        utensilSearchTerm = utensilInput.value;
        updateFilterList(utensils, selectedUtensils, utensilList, utensilSearchTerm);
    });
}




export function updateSelectedFiltersDisplay(selectedIngredients, selectedAppliances, selectedUtensils, applyFilters) {
    const globalSelectedFiltersContainer = document.querySelector('.selected-filters');
    const selectedIngredientsContainer = document.getElementById('selected-ingredients');
    const selectedAppliancesContainer = document.getElementById('selected-appliances');
    const selectedUtensilsContainer = document.getElementById('selected-utensils');
    globalSelectedFiltersContainer.innerHTML = "";
    selectedIngredientsContainer.innerHTML = "";
    selectedAppliancesContainer.innerHTML = "";
    selectedUtensilsContainer.innerHTML = "";

    const createTagElement = (item, set, container, globalContainer) => {
        let containerLiHTML = `
            <li class="p-2 cursor-pointer font-manrope bg-yellow-400 flex items-center justify-between group hover:font-bold">
                ${capitalizeFirstLetter(item)}
                <i class="fa-solid fa-circle-xmark hidden group-hover:inline"></i>
            </li>
        `;
        let globalLiHTML = `
            <li class="p-4 mr-2 rounded-lg bg-yellow-400 cursor-pointer font-manrope flex items-center justify-between">
                ${capitalizeFirstLetter(item)}
                <i class="fa-solid fa-x pl-4"></i> 
            </li>
        `;

        const globalLiElement = document.createElement('div');
        globalLiElement.innerHTML = globalLiHTML.trim();
        const globalTag = globalLiElement.firstChild;

        const containerLiElement = document.createElement('div');
        containerLiElement.innerHTML = containerLiHTML.trim();
        const containerTag = containerLiElement.firstChild;

        globalTag.addEventListener('click', () => {
            set.delete(item);
            applyFilters();
            updateSelectedFiltersDisplay(selectedIngredients, selectedAppliances, selectedUtensils, applyFilters);
        });

        containerTag.addEventListener('click', () => {
            set.delete(item);
            applyFilters();
            updateSelectedFiltersDisplay(selectedIngredients, selectedAppliances, selectedUtensils, applyFilters);
        });

        globalContainer.appendChild(globalTag);
        container.appendChild(containerTag);
    };

    selectedIngredients.forEach(ingredient => createTagElement(ingredient, selectedIngredients, selectedIngredientsContainer, globalSelectedFiltersContainer));
    selectedAppliances.forEach(appliance => createTagElement(appliance, selectedAppliances, selectedAppliancesContainer, globalSelectedFiltersContainer));
    selectedUtensils.forEach(utensil => createTagElement(utensil, selectedUtensils, selectedUtensilsContainer, globalSelectedFiltersContainer));
}