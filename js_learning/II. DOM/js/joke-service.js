// 模拟笑话数据库
const jokes = [
    {
        setup: "为什么程序员总是分不清万圣节和圣诞节？",
        punchline: "因为 Oct 31 === Dec 25"
    },
    {
        setup: "程序员最讨厌什么食物？",
        punchline: "Bug"
    },
    {
        setup: "为什么程序员喜欢黑咖啡？",
        punchline: "因为他们喜欢没有类（class）的生活"
    },
    {
        setup: "怎么哄生气的程序员？",
        punchline: "不要生气了，我们把 bug 删掉重来"
    },
    {
        setup: "什么是程序员最浪漫的表白？",
        punchline: "你是我代码里的唯一一个真命题"
    }
];

// 模拟网络请求延迟
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 获取随机笑话
export async function getRandomJoke() {
    // 模拟网络延迟
    await delay(1000);

    // 模拟偶尔的网络错误
    if (Math.random() < 0.1) {
        throw new Error('网络连接失败，请重试！');
    }

    // 随机返回一个笑话
    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
}

// 导出笑话总数
export const totalJokes = jokes.length;