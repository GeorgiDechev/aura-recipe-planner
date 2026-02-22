// ==========================================================================
// Application State Management
// ==========================================================================
const initialRecipes = [
    // --- 10 Toddler Favorites ---
    {
        id: "toddler_1",
        title: "Hidden Veggie Mac & Cheese",
        image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?auto=format&fit=crop&q=80&w=400",
        ingredients: ["1 box macaroni", "1 cup steamed cauliflower", "1/2 cup steamed carrots", "1 cup cheddar cheese", "1/4 cup milk", "1 tbsp butter"],
        instructions: "1. Cook pasta according to package directions.\n2. In a blender, combine steamed cauliflower, carrots, milk, and butter until smooth.\n3. Pour veggie sauce over drained pasta. Stir in cheddar cheese until melted.\n4. Serve warm!",
        timesCooked: 0,
        rating: 5
    },
    {
        id: "toddler_2",
        title: "Mini Chicken & Apple Meatballs",
        image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=400",
        ingredients: ["1 lb ground chicken", "1 small apple, peeled and grated", "1/4 cup breadcrumbs", "1 egg", "1/2 tsp garlic powder", "Pinch of salt"],
        instructions: "1. Preheat oven to 400°F (200°C).\n2. Mix all ingredients in a bowl until just combined.\n3. Form into bite-sized mini meatballs.\n4. Bake on a parchment-lined tray for 15-20 minutes until cooked through.",
        timesCooked: 0,
        rating: 4
    },
    {
        id: "toddler_3",
        title: "Sweet Potato & Black Bean Quesadillas",
        image: "https://images.unsplash.com/photo-1623855244183-52fd8d3ce2f7?auto=format&fit=crop&q=80&w=400",
        ingredients: ["2 small tortillas", "1/2 cup mashed sweet potato", "1/4 cup black beans, rinsed and mashed slightly", "1/4 cup shredded mild cheese"],
        instructions: "1. Spread mashed sweet potato on one tortilla.\n2. Sprinkle mashed black beans and cheese over the top.\n3. Top with the second tortilla.\n4. Toast in a skillet over medium heat until golden brown on both sides. Slice into small wedges.",
        timesCooked: 0,
        rating: 5
    },
    {
        id: "toddler_4",
        title: "Spinach & Banana Blender Pancakes",
        image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=400",
        ingredients: ["1 ripe banana", "1 big handful fresh spinach", "1 egg", "1/2 cup rolled oats", "1/4 cup milk", "1/2 tsp cinnamon"],
        instructions: "1. Add all ingredients to a blender and blend until completely smooth and bright green.\n2. Heat a lightly greased skillet over medium-low heat.\n3. Pour small circles of batter into the pan.\n4. Flip when bubbles form, cook another minute, and serve.",
        timesCooked: 0,
        rating: 5
    },
    {
        id: "toddler_5",
        title: "Cheesy Broccoli Bites",
        image: "https://images.unsplash.com/photo-1601275868351-8e5baef77ba4?auto=format&fit=crop&q=80&w=400",
        ingredients: ["2 cups broccoli florets, steamed and finely chopped", "1 cup cheddar cheese, shredded", "1/2 cup breadcrumbs", "2 eggs", "1/2 tsp garlic powder"],
        instructions: "1. Preheat oven to 400°F (200°C).\n2. Mix all ingredients together in a large bowl. The mixture should hold together when squeezed.\n3. Form into small tots or nuggets and place on a baking sheet.\n4. Bake for 15-20 minutes until crispy on the outside.",
        timesCooked: 0,
        rating: 4
    },
    {
        id: "toddler_6",
        title: "Toddler-Friendly 'Sushi' Roll-ups",
        image: "https://images.unsplash.com/photo-1626025178116-43e990c8b939?auto=format&fit=crop&q=80&w=400",
        ingredients: ["1 large whole wheat tortilla", "2 tbsp creamy peanut butter", "1 ripe banana", "1 tsp chia seeds"],
        instructions: "1. Lay the tortilla flat and spread the peanut butter evenly over it.\n2. Sprinkle chia seeds over the peanut butter.\n3. Place the whole peeled banana near the edge of the tortilla and roll it up tightly.\n4. Slice into 1-inch 'sushi' rounds.",
        timesCooked: 0,
        rating: 5
    },
    {
        id: "toddler_7",
        title: "Carrot, Zucchini & Apple Muffins",
        image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&q=80&w=400",
        ingredients: ["1/2 cup grated carrot", "1/2 cup grated zucchini (squeezed dry)", "1/2 cup grated apple", "1 1/2 cups flour", "1 tsp baking soda", "2 eggs", "1/4 cup maple syrup", "1/4 cup melted butter"],
        instructions: "1. Preheat oven to 350°F (175°C).\n2. Whisk eggs, syrup, and butter in a bowl. Stir in the grated veggies and apple.\n3. Fold in the dry ingredients until just combined.\n4. Divide into a mini muffin tin and bake for 12-15 minutes.",
        timesCooked: 0,
        rating: 4
    },
    {
        id: "toddler_8",
        title: "Mild Turkey & Veggie Chili",
        image: "https://images.unsplash.com/photo-1548695662-817db44e5a91?auto=format&fit=crop&q=80&w=400",
        ingredients: ["1 lb ground turkey", "1 cup pureed pumpkin or butternut squash", "1 can mild diced tomatoes", "1 can kidney beans, rinsed", "1/2 tsp mild chili powder", "1/2 cup corn kernels"],
        instructions: "1. Brown the ground turkey in a pot.\n2. Stir in the pumpkin puree, tomatoes, beans, corn, and chili powder.\n3. Simmer on low heat for 20 minutes.\n4. Serve warm, optionally topped with a little shredded cheese.",
        timesCooked: 0,
        rating: 4
    },
    {
        id: "toddler_9",
        title: "Crispy Baked Chicken Nuggets",
        image: "https://images.unsplash.com/photo-1562967914-01efa7e87832?auto=format&fit=crop&q=80&w=400",
        ingredients: ["1 lb chicken breast, cut into chunks", "1 cup panko breadcrumbs", "1/4 cup grated parmesan", "1 egg, beaten", "1/2 tsp paprika"],
        instructions: "1. Preheat oven to 400°F (200°C) and line a pan with parchment paper.\n2. Mix breadcrumbs, parmesan, and paprika in a bowl.\n3. Dip chicken chunks into the egg, then coat thoroughly in the breadcrumb mixture.\n4. Bake for 15-18 minutes until golden and cooked through.",
        timesCooked: 0,
        rating: 5
    },
    {
        id: "toddler_10",
        title: "Creamy Tomato Basil Soup with Dippers",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=400",
        ingredients: ["1 can crushed tomatoes", "1/4 cup heavy cream or coconut milk", "1/2 cup vegetable broth", "1 tsp dried basil", "1 grilled cheese sandwich, cut into 'fingers'"],
        instructions: "1. In a small pot, simmer the crushed tomatoes, broth, and basil for 10 minutes.\n2. Remove from heat and stir in the cream.\n3. Blend with an immersion blender if your toddler prefers it totally smooth.\n4. Serve warm with the grilled cheese fingers for dipping.",
        timesCooked: 0,
        rating: 5
    },

    // --- 10 Viral Couples Recipes ---
    {
        id: "couple_1",
        title: "Viral Marry Me Tuscan Pasta",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=400",
        ingredients: ["8 oz penne pasta", "2 chicken breasts", "1/2 cup sun-dried tomatoes", "1 cup heavy cream", "1/2 cup parmesan cheese", "2 cloves garlic, minced", "1 big handful fresh spinach"],
        instructions: "1. Cook pasta and set aside.\n2. Sear seasoned chicken breasts in a skillet until golden brown. Remove and slice.\n3. In the same pan, sauté garlic and sun-dried tomatoes. Pour in heavy cream and simmer.\n4. Stir in parmesan and spinach until wilted.\n5. Return chicken and pasta to the pan, toss to coat in the rich sauce.",
        timesCooked: 0,
        rating: 5
    },
    {
        id: "couple_2",
        title: "Crispy Feta Honey Eggs",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400",
        ingredients: ["2 large eggs", "1/2 cup feta cheese, crumbled", "1 large avocado, mashed", "2 slices sourdough bread, toasted", "Drizzle of hot honey", "Chili flakes"],
        instructions: "1. Sprinkle a ring of crumbled feta into a hot non-stick pan.\n2. Crack an egg directly into the center of the feta ring.\n3. Cover and cook until the whites are set and the cheese is totally crispy brown on the bottom.\n4. Spread mashed avocado on toast.\n5. Slide the crispy feta egg on top, drizzle with hot honey and chili flakes.",
        timesCooked: 0,
        rating: 5
    },
    {
        id: "couple_3",
        title: "Date Night Steak with Garlic Butter Mushrooms",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=400",
        ingredients: ["2 ribeye or strip steaks", "8 oz baby bella mushrooms, sliced", "3 tbsp butter", "3 cloves garlic, smashed", "Fresh rosemary sprigs", "Salt and heavy black pepper"],
        instructions: "1. Season steaks generously with salt and pepper. Let rest for 20 minutes at room temp.\n2. Sear steaks in a screaming hot cast iron skillet for 3-4 minutes per side (for medium-rare).\n3. Add butter, garlic, and rosemary to the pan, basting the steaks for 1 minute. Remove steaks to rest.\n4. In the same pan, sauté the mushrooms in the leftover steak butter until browned.\n5. Serve steaks topped with entirely too many mushrooms.",
        timesCooked: 0,
        rating: 5
    },
    {
        id: "couple_4",
        title: "Creamy Gochujang Vodka Pasta",
        image: "https://images.unsplash.com/photo-1612871626317-006fc5979509?auto=format&fit=crop&q=80&w=400",
        ingredients: ["8 oz rigatoni", "2 tbsp gochujang (Korean chili paste)", "1 tbsp tomato paste", "1/4 cup vodka", "1/2 cup heavy cream", "1/4 cup parmesan", "2 cloves garlic, minced"],
        instructions: "1. Boil the rigatoni in highly salted water.\n2. In a skillet, sauté garlic in olive oil, then stir in gochujang and tomato paste. Cook for 2 minutes.\n3. Deglaze with vodka and let it reduce by half.\n4. Stir in heavy cream and let it simmer until slightly thickened.\n5. Toss the cooked pasta and parmesan into the sauce, adding pasta water as needed.",
        timesCooked: 0,
        rating: 5
    },
    {
        id: "couple_5",
        title: "Hot Honey Salmon Bites & Rice",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=400",
        ingredients: ["2 salmon fillets, cubed", "2 tbsp soy sauce", "2 tbsp hot honey", "1 tbsp sesame oil", "1 tsp minced ginger", "1 cup cooked jasmine rice", "Sliced green onions"],
        instructions: "1. Toss the salmon cubes with soy sauce, hot honey, and ginger.\n2. Air fry at 400°F (200°C) for 6-8 minutes, or pan-sear until crispy and caramelized.\n3. Serve the salmon bites over warm jasmine rice.\n4. Drizzle with extra hot honey and garnish with green onions.",
        timesCooked: 0,
        rating: 4
    },
    {
        id: "couple_6",
        title: "15-Minute Lemon Garlic Butter Shrimp",
        image: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&q=80&w=400",
        ingredients: ["1 lb large shrimp, peeled and deveined", "4 tbsp butter", "4 cloves garlic, minced", "Juice of 1/2 lemon", "1/4 cup fresh parsley, chopped", "Crusty bread for dipping"],
        instructions: "1. Melt butter in a large skillet over medium heat. Add garlic and cook for 1 minute.\n2. Add the shrimp in a single layer. Cook for 1-2 minutes per side until pink and opaque.\n3. Remove from heat, squeeze in lemon juice, and toss with fresh parsley.\n4. Serve immediately right out of the skillet with crusty bread.",
        timesCooked: 0,
        rating: 4
    },
    {
        id: "couple_7",
        title: "Sheet Pan Gnocchi with Sausage & Veggies",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=400",
        ingredients: ["1 package shelf-stable gnocchi", "2 mild Italian sausages, sliced into coins", "1 bell pepper, chopped", "1 zucchini, chopped", "2 tbsp olive oil", "Italian seasoning"],
        instructions: "1. Preheat oven to 400°F (200°C).\n2. Toss the gnocchi (uncooked!), sausage coins, and veggies on a sheet pan with olive oil, salt, pepper, and Italian seasoning.\n3. Spread out into an even layer.\n4. Bake for 20-25 minutes until the gnocchi is slightly crispy and the sausage is deeply browned.",
        timesCooked: 0,
        rating: 4
    },
    {
        id: "couple_8",
        title: "Viral Smashed Burger Tacos",
        image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c754?auto=format&fit=crop&q=80&w=400",
        ingredients: ["1/2 lb ground beef", "4 small flour tortillas", "4 slices American cheese", "Shredded lettuce", "Diced pickles", "Burger sauce (mayo, ketchup, relish)"],
        instructions: "1. Press a thin, even layer of ground beef directly onto one side of each tortilla. Season with salt and pepper.\n2. Place the tortilla meat-side down into a hot skillet. Smash it flat with a spatula.\n3. Cook for 2-3 minutes until a crust forms, then flip.\n4. Immediately place a slice of cheese on the meat and cover the pan for 30 seconds to melt.\n5. Remove from pan, top with lettuce, pickles, and a generous drizzle of burger sauce. Fold and eat!",
        timesCooked: 0,
        rating: 5
    },
    {
        id: "couple_9",
        title: "Spicy Peanut Noodles with Crispy Tofu",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400",
        ingredients: ["8 oz ramen or udon noodles", "1 block firm tofu, cubed and cornstarch-coated", "3 tbsp peanut butter", "2 tbsp soy sauce", "1 tbsp chili crisp", "1 tbsp rice vinegar", "1 clove garlic, minced"],
        instructions: "1. Pan-fry the cornstarch-coated tofu cubes in oil until ultra-crispy on all sides. Set aside.\n2. Whisk together the peanut butter, soy sauce, chili crisp, vinegar, garlic, and a splash of hot water to thin the sauce.\n3. Boil the noodles until tender, then drain.\n4. Toss the warm noodles in the spicy peanut sauce until coated, then top with the crispy tofu and extra chili crisp.",
        timesCooked: 0,
        rating: 4
    },
    {
        id: "couple_10",
        title: "French Onion Soup Stuffed Chicken",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400",
        ingredients: ["2 large chicken breasts", "2 large onions, thinly sliced", "2 tbsp butter", "1/4 cup beef broth", "1/2 cup gruyere or swiss cheese, grated", "1 tsp fresh thyme"],
        instructions: "1. Caramelize the onions in butter over medium-low heat for 30 minutes until deep brown and jammy. Deglaze with beef broth and stir in thyme.\n2. Cut a pocket into the side of each chicken breast. Stuff the pockets with the caramelized onions and half the cheese.\n3. Secure with toothpicks, season the outside, and sear in an oven-safe skillet until golden brown.\n4. Top the chicken with the remaining cheese and bake at 375°F (190°C) for 15-20 minutes until melted and the chicken is cooked through.",
        timesCooked: 0,
        rating: 5
    }
];

const defaultState = {
    currentView: 'recipes',
    recipes: initialRecipes,
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
    groceryList: [],
    hiddenGroceries: []
};

let state = defaultState;

// Load state from localStorage if it exists
const savedState = localStorage.getItem('aura_recipe_state');
if (savedState) {
    try {
        state = JSON.parse(savedState);
        state.currentView = 'recipes'; // Always default to recipes view on load

        // Populate if empty (first time load after update)
        if (!state.recipes || state.recipes.length === 0) {
            state.recipes = initialRecipes;
        }

        // Ensure existing recipes have an audience tag
        state.recipes.forEach(r => {
            if (!r.audience) {
                if (r.id.startsWith("toddler")) r.audience = "Toddlers";
                else if (r.id.startsWith("couple")) r.audience = "Couples";
                else r.audience = "Everyone";
            }
        });
        saveState(); // Ensure they are saved locally immediately
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
    } else if (target === 'cooking') {
        renderCookingSelector();
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
    document.getElementById('entry-audience').value = 'Everyone';
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
        audience: document.getElementById('entry-audience').value,
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
            <div class="recipe-badge">${recipe.audience || 'Everyone'}</div>
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
                        if (!state.hiddenGroceries || !state.hiddenGroceries.includes(scaledIng)) {
                            allIngredients.push({ text: scaledIng, original: ing });
                        }
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

function renderCookingSelector() {
    const select = document.getElementById('cooking-recipe-select');
    if (!select) return;

    let html = `<option value="">-- Choose a Recipe to Cook --</option>`;
    state.recipes.forEach(r => {
        html += `<option value="${r.id}">${r.title}</option>`;
    });

    // Maintain selected value if it exists, otherwise empty
    const currentVal = select.value;
    select.innerHTML = html;
    if (currentVal && state.recipes.find(r => r.id === currentVal)) {
        select.value = currentVal;
    }
}

function openCookingMode(id) {
    const recipe = state.recipes.find(r => r.id === id);
    if (!recipe) return;

    const select = document.getElementById('cooking-recipe-select');
    if (select) {
        renderCookingSelector();
        select.value = id;
    }

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

document.getElementById('cooking-recipe-select').addEventListener('change', (e) => {
    if (e.target.value) {
        openCookingMode(e.target.value);
    } else {
        document.getElementById('cooking-container').innerHTML = `<p class="empty-state">Select a recipe from the dropdown above to start cooking!</p>`;
    }
});

document.getElementById('btn-clear-planner').addEventListener('click', () => {
    if (confirm("Are you sure you want to completely clear your week's meals?")) {
        state.planner = {
            Monday: { breakfast: null, lunch: null, dinner: null, scales: { breakfast: 2, lunch: 2, dinner: 2 } },
            Tuesday: { breakfast: null, lunch: null, dinner: null, scales: { breakfast: 2, lunch: 2, dinner: 2 } },
            Wednesday: { breakfast: null, lunch: null, dinner: null, scales: { breakfast: 2, lunch: 2, dinner: 2 } },
            Thursday: { breakfast: null, lunch: null, dinner: null, scales: { breakfast: 2, lunch: 2, dinner: 2 } },
            Friday: { breakfast: null, lunch: null, dinner: null, scales: { breakfast: 2, lunch: 2, dinner: 2 } },
            Saturday: { breakfast: null, lunch: null, dinner: null, scales: { breakfast: 2, lunch: 2, dinner: 2 } },
            Sunday: { breakfast: null, lunch: null, dinner: null, scales: { breakfast: 2, lunch: 2, dinner: 2 } },
        };
        state.groceryList = [];
        state.hiddenGroceries = [];
        saveState();
        if (state.currentView === 'planner') renderPlanner();
        if (state.currentView === 'grocery') renderGroceryList();
    }
});

document.getElementById('btn-clear-groceries').addEventListener('click', () => {
    if (confirm("Remove all checked-off items from the list? Unchecked items will remain.")) {
        if (!state.hiddenGroceries) state.hiddenGroceries = [];

        // Move all currently checked items into the hidden array
        if (state.groceryList) {
            state.groceryList.forEach(item => {
                if (!state.hiddenGroceries.includes(item)) {
                    state.hiddenGroceries.push(item);
                }
            });
        }

        // Clear the checked list state
        state.groceryList = [];
        saveState();
        if (state.currentView === 'grocery') renderGroceryList();
    }
});

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
