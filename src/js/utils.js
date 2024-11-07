export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function updateRecipeCounter(count) {
    const recipeCounter = document.getElementById('recipes-number');
    recipeCounter.textContent = `${count.length} recettes`;
}

export function displayClearButton(applyFilters) {
    const searchInput = document.getElementById("search-input");
    const clearButton = document.querySelector(".clear-search");

    searchInput.addEventListener("input", () => {
        if (searchInput.value.length >= 3) {
            clearButton.classList.remove("hidden");
        } else {
            clearButton.classList.add("hidden");
        }
    });

    clearButton.addEventListener("click", () => {
        searchInput.value = "";
        clearButton.classList.add("hidden");
        applyFilters();
    });
}
