import { getRandomJoke } from './joke-service.js';

// 获取DOM元素
const loadJokeBtn = document.getElementById('loadJokeBtn');
const clearBtn = document.getElementById('clearBtn');
const jokeList = document.getElementById('jokeList');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');

// 显示加载状态
function showLoading(show) {
    loadJokeBtn.disabled = show;
    loadingElement.style.display = show ? 'block' : 'none';
}

// 显示错误信息
function showError(message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 3000);
}

// 创建笑话元素
function createJokeElement(joke) {
    const jokeBox = document.createElement('div');
    jokeBox.className = 'joke-box';
    jokeBox.innerHTML = `
        <h3>${joke.setup}</h3>
        <p>${joke.punchline}</p>
        <small>加载时间: ${new Date().toLocaleTimeString()}</small>
    `;
    return jokeBox;
}

// 加载新笑话
async function loadNewJoke() {
    showLoading(true);
    errorElement.style.display = 'none';

    try {
        const joke = await getRandomJoke();
        const jokeElement = createJokeElement(joke);
        jokeList.insertBefore(jokeElement, jokeList.firstChild);
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

// 清空笑话列表
function clearJokes() {
    jokeList.innerHTML = '';
}

// 绑定事件监听器
loadJokeBtn.addEventListener('click', loadNewJoke);
clearBtn.addEventListener('click', clearJokes);

// 页面加载时自动加载一个笑话
loadNewJoke();