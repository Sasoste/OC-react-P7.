import { displayRecipeCards } from './displayRecipeCards.js';
import { generateFilters, updateSelectedFiltersDisplay } from './generateFilters.js';
import { recipes as initialRecipesData } from '../data/recipes.js';
import { selectedIngredients, selectedAppliances, selectedUtensils } from './filterSelections.js';
import './utils.js';
import { displayClearButton, updateRecipeCounter } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", () => {
        applyFilters(false);
    });

    function applyFilters() {
        const searchText = searchInput.value.toLowerCase();
        const filteredRecipes = [];
        for (const recipe of initialRecipesData) {
            let matchesSearch = searchText.length < 3 ||
                recipe.name.toLowerCase().includes(searchText) ||
                recipe.description.toLowerCase().includes(searchText);

            if (!matchesSearch) {
                for (const ingredient of recipe.ingredients) {
                    if (ingredient.ingredient.toLowerCase().includes(searchText)) {
                        matchesSearch = true;
                        break;
                    }
                }
            }

            let matchesIngredients = true;
            for (const ingredient of selectedIngredients) {
                let found = false;
                for (const i of recipe.ingredients) {
                    if (i.ingredient.toLowerCase() === ingredient.toLowerCase()) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    matchesIngredients = false;
                    break;
                }
            }

            const matchesAppliance = selectedAppliances.size === 0 || selectedAppliances.has(recipe.appliance.toLowerCase());

            let matchesUtensils = true;
            for (const utensil of selectedUtensils) {
                let found = recipe.ustensils.map(u => u.toLowerCase()).includes(utensil.toLowerCase());
                if (!found) {
                    matchesUtensils = false;
                    break;
                }
            }

            if (matchesSearch && matchesIngredients && matchesAppliance && matchesUtensils) {
                filteredRecipes.push(recipe);
            }
        }
        displayRecipeCards(filteredRecipes, searchText);
        updateRecipeCounter(filteredRecipes);
        generateFilters(filteredRecipes, applyFilters);
        updateSelectedFiltersDisplay(selectedIngredients, selectedAppliances, selectedUtensils, applyFilters);
    }
    searchInput.addEventListener("input", applyFilters);
    displayClearButton(applyFilters);

    displayRecipeCards(initialRecipesData, "");
    generateFilters(initialRecipesData, applyFilters);
    updateRecipeCounter(initialRecipesData);
});
