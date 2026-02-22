// ==========================================================================
// Application State Management
// ==========================================================================
const defaultState = {
    currentView: 'recipes',
    recipes: [], // Array of recipe objects
    planner: {
        // Structure: { "Monday": { breakfast: null, lunch: recipeId, dinner: "Eating Out", scales: { breakfast: 2, lunch: 2, dinner: 2 } } }
        Monday: { breakfast: null, lunch: null, dinner: null, scales: { breakfast: 2, lunch: 2, dinner: 2 } },
        Tuesday: { breakfast: null, lunch: null, dinner: null, scales: { breakfast: 2, lunch: 2, dinner: 2 } },
        Wednesday: { breakfast: null, lunch: null, dinner: null, scales: { breakfast: 2, lunch: 2, dinner: 2 } },
        Thursday: { breakfast: null, lunch: null, dinner: null, scales: { breakfast: 2, lunch: 2, dinner: 2 } },
        Friday: { breakfast: null, lunch: null, dinner: null, scales: { breakfast: 2, lunch: 2, dinner: 2 } },
        Saturday: { breakfast: null, lunch: null, dinner: null, scales: { breakfast: 2, lunch: 2, dinner: 2 } },
        Sunday: { breakfast: null, lunch: null, dinner: null, scales: { breakfast: 2, lunch: 2, dinner: 2 } },
    },
    groceryList: []
};

let state = defaultState;

// Load state from localStorage if it exists
const savedState = localStorage.getItem('aura_recipe_state');
if (savedState) {
    try {
        state = JSON.parse(savedState);
        state.currentView = 'recipes'; // Always default to recipes view on load
    } catch (e) {
        console.error("Failed to parse saved recipe state", e);
    }
}

function saveState() {
    localStorage.setItem('aura_recipe_state', JSON.stringify(state));
}

// ==========================================================================
// DOM Elements & View Routing
// ==========================================================================
const views = document.querySelectorAll('.view');
const navLinks = document.querySelectorAll('.nav-links li');
const pageTitle = document.getElementById('page-title');

// Set Date in Header
document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

function switchView(target) {
    // Update state
    state.currentView = target;

    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.target === target) {
            link.classList.add('active');
        }
    });

    // Update visible view
    views.forEach(view => {
        view.classList.remove('active-view');
        if (view.id === `${target}-view`) {
            view.classList.add('active-view');
        }
    });

    // Update Header Title dynamically
    const titles = {
        'recipes': 'Recipe Book',
        'planner': 'Weekly Planner',
        'grocery': 'Grocery List',
        'cooking': 'Cooking Mode'
    };
    pageTitle.textContent = titles[target] || 'Aura Cooking';

    // Trigger re-renders if necessary based on view
    if (target === 'recipes') {
        renderRecipes();
    } else if (target === 'planner') {
        renderPlanner();
    } else if (target === 'grocery') {
        renderGroceryList();
    }
}

// Bind Navigation
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        switchView(link.dataset.target);
    });
});


// ==========================================================================
// Recipe Book Logic
// ==========================================================================
const recipeModal = document.getElementById('recipe-modal');
const recipeForm = document.getElementById('recipe-form');

document.getElementById('add-recipe-btn').addEventListener('click', () => {
    recipeForm.reset();
    document.getElementById('entry-id').value = '';
    document.getElementById('modal-title').textContent = 'Add New Recipe';
    recipeModal.style.display = 'flex';
});

document.getElementById('btn-cancel-recipe').addEventListener('click', () => {
    recipeModal.style.display = 'none';
});

recipeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('entry-id').value || Date.now().toString();
    const recipe = {
        id: id,
        title: document.getElementById('entry-title').value,
        image: document.getElementById('entry-image').value,
        ingredients: document.getElementById('entry-ingredients').value.split('\n').filter(i => i.trim() !== ''),
        instructions: document.getElementById('entry-instructions').value,
        timesCooked: 0,
        rating: 0
    };

    const existingIndex = state.recipes.findIndex(r => r.id === id);
    if (existingIndex >= 0) {
        // preserve stats if editing
        recipe.timesCooked = state.recipes[existingIndex].timesCooked;
        recipe.rating = state.recipes[existingIndex].rating;
        state.recipes[existingIndex] = recipe;
    } else {
        state.recipes.push(recipe);
    }

    saveState();
    recipeModal.style.display = 'none';
    renderRecipes();
});

// ==========================================================================
// AI Generation Logic
// ==========================================================================
document.getElementById('btn-ai-generate').addEventListener('click', async () => {
    const userPrompt = prompt("What kind of recipe do you need? (e.g., 'Toddler-friendly hidden veggie pasta' or 'Quick 15-min chicken dinner')");

    if (!userPrompt) return; // User cancelled

    const btn = document.getElementById('btn-ai-generate');
    const originalIcon = btn.innerHTML;

    try {
        // Show loading state
        btn.innerHTML = `<span style="font-size: 0.8rem; font-weight: bold;">Loading...</span>`;
        btn.disabled = true;

        const generatedRecipe = await generateRecipeFromGemini(userPrompt);

        // Pre-fill the modal form
        recipeForm.reset();
        document.getElementById('entry-id').value = ''; // Ensure it creates a new entry on save
        document.getElementById('modal-title').textContent = '✨ AI Generated Recipe ✨';

        document.getElementById('entry-title').value = generatedRecipe.title;
        document.getElementById('entry-ingredients').value = generatedRecipe.ingredients.join('\n');
        document.getElementById('entry-instructions').value = generatedRecipe.instructions;

        // Open modal
        recipeModal.style.display = 'flex';

    } catch (error) {
        alert("Oops! Something went wrong: " + error.message);
    } finally {
        // Restore button state
        btn.innerHTML = originalIcon;
        btn.disabled = false;
    }
});

function renderRecipes() {
    const list = document.getElementById('recipe-list');

    if (state.recipes.length === 0) {
        list.style.display = 'block';
        list.innerHTML = `<p class="empty-state">No recipes yet. Tap + Add to start building your book!</p>`;
        return;
    }

    list.style.display = 'grid';
    list.innerHTML = state.recipes.map(recipe => `
        <div class="recipe-card" data-id="${recipe.id}">
            <img class="recipe-img" src="${recipe.image || 'data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1\"></svg>'}" alt="${recipe.title}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 1 1\\'></svg>'">
            <div class="recipe-info">
                <div class="recipe-title">${recipe.title}</div>
                <div class="recipe-stats">
                    <span>🍳 ${recipe.timesCooked} times</span>
                    <span>★ ${recipe.rating}/5</span>
                </div>
            </div>
        </div>
    `).join('');

    // Add click listeners to cards for edit/cooking mode later
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            openCookingMode(id);
        });
    });
}

function renderPlanner() {
    const container = document.getElementById('planner-container');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['breakfast', 'lunch', 'dinner'];

    // Helper to generate options
    const getOptions = (selectedId) => {
        let html = `<option value="">-- Select Meal --</option>`;
        html += `<option value="eat_out" ${selectedId === 'eat_out' ? 'selected' : ''}>🍽️ Eating Out</option>`;
        state.recipes.forEach(r => {
            html += `<option value="${r.id}" ${selectedId === r.id ? 'selected' : ''}>${r.title}</option>`;
        });
        return html;
    };

    let html = '';
    days.forEach(day => {
        html += `
            <div class="day-card">
                <div class="day-header">${day}</div>
        `;

        meals.forEach(meal => {
            const currentPlan = state.planner[day][meal];
            const currentScale = state.planner[day].scales[meal] || 2;
            const mealLabel = meal.charAt(0).toUpperCase() + meal.slice(1);

            html += `
                <div class="meal-slot">
                    <div class="meal-slot-header">
                        <span>${mealLabel}</span>
                        <div class="meal-controls">
                            <span style="font-size: 0.75rem; align-self: center;">Portions:</span>
                            <input type="number" class="meal-scale" data-day="${day}" data-meal="${meal}" value="${currentScale}" min="1" max="20">
                        </div>
                    </div>
                    <select class="meal-select" data-day="${day}" data-meal="${meal}">
                        ${getOptions(currentPlan)}
                    </select>
                </div>
            `;
        });
        html += `</div>`;
    });

    container.innerHTML = html;

    // Attach listeners
    document.querySelectorAll('.meal-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const day = e.target.dataset.day;
            const meal = e.target.dataset.meal;
            state.planner[day][meal] = e.target.value;
            saveState();
            // Automatically re-render grocery list if we are on it (though we are on planner view now)
        });
    });

    document.querySelectorAll('.meal-scale').forEach(input => {
        input.addEventListener('change', (e) => {
            const day = e.target.dataset.day;
            const meal = e.target.dataset.meal;
            state.planner[day].scales[meal] = parseInt(e.target.value) || 1;
            saveState();
        });
    });
}

function renderGroceryList() {
    const list = document.getElementById('grocery-items');
    let allIngredients = [];

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['breakfast', 'lunch', 'dinner'];

    days.forEach(day => {
        meals.forEach(meal => {
            const recipeId = state.planner[day][meal];
            const scale = state.planner[day].scales[meal] || 2;

            if (recipeId && recipeId !== 'eat_out') {
                const recipe = state.recipes.find(r => r.id === recipeId);
                if (recipe && recipe.ingredients) {
                    recipe.ingredients.forEach(ing => {
                        // Naive scaling: extract leading numbers if possible, multiply by (scale / 2) assuming base recipe is for 2
                        // For a robust app, a complex NLP parser goes here. For now, we will just prepend the portion scale if no number is found, or multiply the leading number.
                        let scaledIng = ing;
                        const match = ing.match(/^([\d.,/]+)\s*(.*)/);
                        if (match) {
                            const num = parseFloat(match[1]);
                            if (!isNaN(num)) {
                                // Assume base recipe is for 2 people
                                const newNum = (num * (scale / 2)).toFixed(1).replace(/\.0$/, '');
                                scaledIng = `${newNum} ${match[2]}`;
                            }
                        } else {
                            // If no number, just add the multiplier multiplier
                            if (scale !== 2) {
                                scaledIng = `[x${scale / 2}] ${ing}`;
                            }
                        }

                        // Push with a unique key to allow combining later if we want
                        allIngredients.push({ text: scaledIng, original: ing });
                    });
                }
            }
        });
    });

    if (allIngredients.length === 0) {
        list.innerHTML = `<p class="empty-state">No meals planned yet. Add recipes to your Weekly Planner to generate a grocery list!</p>`;
        return;
    }

    // Sort alphabetically for easier shopping
    allIngredients.sort((a, b) => a.text.localeCompare(b.text));

    let html = '';
    allIngredients.forEach((item, index) => {
        // Check if previously checked off in state
        const isChecked = state.groceryList && state.groceryList.includes(item.text);
        html += `
            <li class="grocery-item">
                <label style="display: flex; gap: 1rem; align-items: center; cursor: pointer; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);">
                    <input type="checkbox" class="grocery-checkbox" value="${item.text}" ${isChecked ? 'checked' : ''} style="width: 20px; height: 20px;">
                    <span style="font-size: 1rem; ${isChecked ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${item.text}</span>
                </label>
            </li>
        `;
    });

    list.innerHTML = html;

    // Attach listeners to save checked state
    document.querySelectorAll('.grocery-checkbox').forEach(box => {
        box.addEventListener('change', (e) => {
            const text = e.target.value;
            const span = e.target.nextElementSibling;

            if (!state.groceryList) state.groceryList = [];

            if (e.target.checked) {
                span.style.textDecoration = 'line-through';
                span.style.color = 'var(--text-muted)';
                if (!state.groceryList.includes(text)) state.groceryList.push(text);
            } else {
                span.style.textDecoration = 'none';
                span.style.color = 'var(--text-primary)';
                state.groceryList = state.groceryList.filter(i => i !== text);
            }
            saveState();
        });
    });
}

function openCookingMode(id) {
    const recipe = state.recipes.find(r => r.id === id);
    if (!recipe) return;

    const container = document.getElementById('cooking-container');

    let ingredientsHtml = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');

    // Generate stars
    const rating = recipe.rating || 0;
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        starsHtml += `<span class="star ${i <= rating ? 'active' : ''}" data-val="${i}">★</span>`;
    }

    container.innerHTML = `
        <div class="cooking-header">
            <h2 class="cooking-title">${recipe.title}</h2>
            <div class="cooking-stats">
                <span>Cooked ${recipe.timesCooked} times</span>
            </div>
        </div>
        
        <h3 class="cooking-section-title">Ingredients</h3>
        <ul class="cooking-ingredients">
            ${ingredientsHtml}
        </ul>
        
        <h3 class="cooking-section-title">Instructions</h3>
        <div class="cooking-instructions">${recipe.instructions}</div>
        
        <div class="cooking-actions">
            <div>
                <p style="text-align:center; font-size:0.875rem; color:var(--text-muted); margin-bottom:0.5rem;">Rate this recipe</p>
                <div class="star-rating" id="recipe-rater">
                    ${starsHtml}
                </div>
            </div>
            <button id="btn-finish-cooking" class="btn btn-primary" style="width: 100%; padding: 1rem; font-size: 1.25rem;">
                Finish Cooking
            </button>
        </div>
    `;

    // Bind Listeners
    document.getElementById('btn-finish-cooking').addEventListener('click', () => {
        recipe.timesCooked += 1;
        saveState();
        alert(`Awesome job! You've cooked this ${recipe.timesCooked} time(s).`);
        switchView('recipes');
    });

    const stars = container.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            const val = parseInt(e.target.dataset.val);
            recipe.rating = val;
            saveState();

            // Re-render stars
            stars.forEach(s => {
                if (parseInt(s.dataset.val) <= val) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    switchView('cooking');
}

// ==========================================================================
// Initialization
// ==========================================================================
function init() {
    switchView(state.currentView);
}

// Start
init();

// ==========================================================================
// PWA Service Worker Registration
// ==========================================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
