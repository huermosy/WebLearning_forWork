// 获取DOM元素
const recipeNameEl = document.querySelector('#recipe-name');
const recipeImgEl = document.querySelector('#recipe-img');
const recipeCategoryEl = document.querySelector('#recipe-category');
const recipeAreaEl = document.querySelector('#recipe-area');
const recipeInstructionsEl = document.querySelector('#recipe-instructions');
const ingredientsListEl = document.querySelector('#ingredients-list');
const newRecipeBtn = document.querySelector('#new-recipe-btn');
const loadingEl = document.querySelector('#loading');
const errorEl = document.querySelector('#error');
const recipeContainer = document.querySelector('#recipe-container');

// 设置API地址
const API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

// 显示加载状态
function showLoading(isLoading) {
    if (isLoading) {
        loadingEl.style.display = 'block';
        recipeContainer.style.opacity = '0.5';
        newRecipeBtn.disabled = true;
    } else {
        loadingEl.style.display = 'none';
        recipeContainer.style.opacity = '1';
        newRecipeBtn.disabled = false;
    }
}

// 显示错误消息
function showError(message) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    setTimeout(() => {
        errorEl.style.display = 'none';
    }, 5000);
}

// 处理食材列表
function processIngredients(meal) {
    // 清空现有列表
    ingredientsListEl.innerHTML = '';
    
    // 最多20个食材和用量
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        
        // 如果没有食材则跳出循环
        if (!ingredient || ingredient.trim() === '') {
            break;
        }
        
        // 创建列表项
        const listItem = document.createElement('li');
        listItem.textContent = `${ingredient} ${measure ? '- ' + measure : ''}`;
        ingredientsListEl.appendChild(listItem);
    }
}

// 格式化说明文本
function formatInstructions(instructions) {
    // 将英文段落分隔符替换为中文段落
    return instructions
        .split('\r\n')
        .filter(step => step.trim() !== '')
        .map((step, index) => `${index + 1}. ${step}`)
        .join('\n\n');
}

// 获取并显示菜谱
async function fetchAndDisplayRecipe() {
    // 显示加载状态
    showLoading(true);
    // 隐藏错误消息
    errorEl.style.display = 'none';
    
    try {
        // 1. 调用API
        const response = await fetch(API_URL);
        
        // 检查响应是否成功
        if (!response.ok) {
            throw new Error(`请求失败，状态码: ${response.status}`);
        }
        
        // 2. 解析数据
        const data = await response.json();
        
        // 检查是否有数据
        if (!data.meals || !data.meals[0]) {
            throw new Error('没有找到任何菜谱');
        }
        
        const meal = data.meals[0];
        
        // 3. 更新DOM元素
        recipeNameEl.textContent = meal.strMeal;
        recipeImgEl.src = meal.strMealThumb;
        recipeImgEl.alt = meal.strMeal;
        recipeCategoryEl.textContent = meal.strCategory;
        recipeAreaEl.textContent = meal.strArea;
        recipeInstructionsEl.textContent = formatInstructions(meal.strInstructions);
        
        // 处理食材列表
        processIngredients(meal);
        
    } catch (error) {
        console.error('获取菜谱失败:', error);
        showError(`无法获取菜谱: ${error.message}`);
        
        // 设置默认值，防止页面显示不完整
        recipeNameEl.textContent = '获取菜谱失败';
        recipeImgEl.src = '';
        recipeCategoryEl.textContent = '';
        recipeAreaEl.textContent = '';
        recipeInstructionsEl.textContent = '请点击"换一道菜"按钮重试';
        ingredientsListEl.innerHTML = '';
    } finally {
        // 无论成功失败都隐藏加载状态
        showLoading(false);
    }
}

// 为按钮绑定点击事件
newRecipeBtn.addEventListener('click', fetchAndDisplayRecipe);

// 页面加载时自动获取一个菜谱
fetchAndDisplayRecipe();