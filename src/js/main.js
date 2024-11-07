import { displayRecipeCards } from './displayRecipeCards.js';
import { generateFilters, updateSelectedFiltersDisplay } from './generateFilters.js';
import { recipes as initialRecipesData } from '../data/recipes.js';
import { selectedIngredients, selectedAppliances, selectedUtensils } from './filterSelections.js';
import './dropdownTriggers.js';
import { displayClearButton, updateRecipeCounter } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", () => {
        applyFilters(false);
    });

    function applyFilters() {
        const searchText = searchInput.value.toLowerCase();

        const filteredRecipes = initialRecipesData.filter(recipe => {
            const matchesSearch = searchText.length < 3 ||
                recipe.name.toLowerCase().includes(searchText) ||
                recipe.description.toLowerCase().includes(searchText) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchText));

            const matchesIngredients = Array.from(selectedIngredients).every(ingredient =>
                recipe.ingredients.some(i => i.ingredient.toLowerCase() === ingredient.toLowerCase())
            );
            const matchesAppliance = selectedAppliances.size === 0 || selectedAppliances.has(recipe.appliance.toLowerCase());
            const matchesUtensils = Array.from(selectedUtensils).every(utensil =>
                recipe.ustensils.map(u => u.toLowerCase()).includes(utensil.toLowerCase())
            );
            return matchesSearch && matchesIngredients && matchesAppliance && matchesUtensils;
        });

        displayRecipeCards(filteredRecipes);
        updateRecipeCounter(filteredRecipes);
        generateFilters(filteredRecipes, applyFilters);
        updateSelectedFiltersDisplay(selectedIngredients, selectedAppliances, selectedUtensils, applyFilters);
    }
    searchInput.addEventListener("input", applyFilters);
    displayRecipeCards(initialRecipesData);
    generateFilters(initialRecipesData, applyFilters);
    displayClearButton(applyFilters);
    updateRecipeCounter(initialRecipesData);

});
