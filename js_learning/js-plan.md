# 🚀 JavaScript 超车计划（7天实战）

**目标**：掌握JS核心概念 + DOM操作 + 异步编程 + ES6+语法

## 🔍 前置要求
- HTML/CSS 基础（能写简单页面）
- 会用浏览器开发者工具

## 📅 每日任务（3小时/天）

### Day 1：JS基础速通

#### 1. 变量与常量
- **const**：声明常量，值不可变。适合存储不会变的数据。
- **let**：声明变量，值可变。适合存储会变化的数据。

```javascript
const PI = 3.14159; // 圆周率，永远不变
let radius = 5;     // 半径，可以变化
radius = 10;        // 变量可以重新赋值
```

#### 2. 数据类型与运算
- 常见类型：number、string、boolean、undefined、null、object、array
- 运算符：+ - * / %

```javascript
let name = "小明";
let age = 18;
let isStudent = true;
let scores = [90, 80, 100];
let person = { name: "小明", age: 18 };
```

#### 3. 函数的定义与调用
- 函数是“工具箱”，可以重复使用。

```javascript
function add(a, b) {
  return a + b;
}
const sum = add(2, 3); // 5

// 箭头函数
const square = x => x * x;
```

#### 4. 条件判断与循环
- if/else、for、while

```javascript
let score = 85;
if (score >= 60) {
  console.log("及格");
} else {
  console.log("不及格");
}

for (let i = 0; i < 3; i++) {
  console.log("第" + (i+1) + "次循环");
}
```

#### 5. 今日实战练习
1. 用变量和常量计算圆的面积（S = πr²），并输出结果。
2. 写一个函数，判断输入数字是奇数还是偶数。
3. 用 for 循环打印 1~10 的所有偶数。

---

### Day 2：DOM 魔法训练

#### 1. 什么是 DOM？
- **DOM** (Document Object Model) 文档对象模型，听起来很复杂，但你可以把它想象成一个 **家族树**。HTML 里的每个标签（`<body>`, `<h1>`, `<p>`）都是家族的一个成员（节点），它们有父子、兄弟关系。JavaScript 就是通过这棵树来找到并操作任何一个标签的。

#### 2. DOM 操作三件套

- **第一件：选中元素（魔杖选择器）**
  - `document.querySelector('选择器')`：最常用的方法，像 CSS 选择器一样精准定位。`#id` 选 id，`.class` 选 class。

- **第二件：修改元素（变形咒）**
  - `element.innerHTML`：修改标签内部的 HTML 内容。
  - `element.textContent`：修改标签内部的纯文本。
  - `element.style.属性 = '值'`：修改 CSS 样式。

- **第三件：事件监听（设置陷阱）**
  - `element.addEventListener('事件名', 函数)`：当用户做了某个动作（比如 `click` 点击、`mouseover` 鼠标悬浮），就执行你指定的函数。

#### 3. 今日实战练习

1.  **“点我变色”按钮**：创建一个 HTML 文件，包含一个按钮。用 JS 实现点击按钮后，整个网页背景色随机变化。

    ```html
    <!-- index.html -->
    <button id="magicBtn">点我变色</button>
    <script src="main.js"></script> <!-- 引入JS文件 -->
    ```

    ```javascript
    // main.js
    const btn = document.querySelector('#magicBtn');
    btn.addEventListener('click', () => {
      const randomColor = '#' + Math.random().toString(16).slice(2, 8);
      document.body.style.backgroundColor = randomColor;
    });
    ```

2.  **简易留言板**：一个输入框和一个“发布”按钮。在输入框输入内容后，点击按钮，将内容添加到下方的列表中。

---

### Day 3：异步突围战

#### 1. 什么是异步？
- **同步**：像排队打饭，必须一个接一个，前面的人没打完，后面的人只能干等着。
- **异步**：像点外卖，你下单后（发出请求），就可以继续玩手机、看电视（执行其他代码），不用傻等。外卖到了（数据返回），你再去处理。
- JS 中的网络请求、定时器都是异步的，这能防止网页因为等待数据而卡死。

#### 2. Promise 与 fetch
- **Promise**：一个承诺对象，代表一个未来才会结束的事件（通常是异步操作）。它有三种状态：进行中、已成功、已失败。
- **fetch('网址')**：JS 内置的网络请求工具，它会返回一个 Promise。
  - `.then(成功函数)`：当 Promise 成功时调用。
  - `.catch(失败函数)`：当 Promise 失败时调用。

```javascript
// 从一个公共API获取一条笑话
fetch('https://official-joke-api.appspot.com/random_joke')
  .then(response => response.json()) // 1. 收到回复，拆开包装（转成JSON）
  .then(data => {
    // 2. 成功拿到数据
    console.log(`笑话标题: ${data.setup}`);
    console.log(`笑点: ${data.punchline}`);
  })
  .catch(error => {
    // 如果网络出问题，就在这里捕获错误
    console.error('请求失败了！', error);
  });
```

#### 3. async/await（更优雅的写法）
- `async/await` 是 Promise 的语法糖，让你能用像写同步代码的方式来写异步，更直观。

```javascript
async function getJoke() {
  try {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await response.json();
    console.log(`笑话标题: ${data.setup}`);
    console.log(`笑点: ${data.punchline}`);
  } catch (error) {
    console.error('请求失败了！', error);
  }
}
getJoke();
```

#### 4. 今日实战练习
1.  调用 [JSONPlaceholder](https://jsonplaceholder.typicode.com/users/1) API，获取一个用户的数据，并将其中的姓名和邮箱地址显示在页面上。

---

### Day 4：ES6+ 新武器库

ES6 是 JS 的一次重大升级，带来了很多让代码更简洁、更强大的新特性。我们来盘点几个最常用的。

#### 1. 解构赋值
- 像拆快递一样，从数组或对象中快速提取值。

```javascript
// 数组解构
const [hero, weapon] = ['后羿', '弓'];
console.log(hero); // '后羿'

// 对象解构
const skill = { name: '惩戒射击', damage: 400 };
const { name, damage } = skill;
console.log(name); // '惩戒射击'
```

#### 2. 展开/剩余语法 (...)
- 用途广泛，可以展开数组/对象，也可以收集剩余的参数。

```javascript
// 展开数组
const team1 = ['悟空', '八戒'];
const team2 = ['沙僧', '师傅'];
const fullTeam = [...team1, ...team2]; // ['悟空', '八戒', '沙僧', '师傅']

// 收集函数参数
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
sum(1, 2, 3, 4); // 10
```

#### 3. 箭头函数
- 更简洁的函数写法，已在 Day 1 见过。它还有一个重要特性：不绑定自己的 `this`，能避免很多 `this` 指向的麻烦。

#### 4. 模板字符串
- 使用反引号 `` ` `` 来创建字符串，可以轻松嵌入变量和换行。

```javascript
const pet = '小猫';
const sentence = `我有一只${pet}，
它非常可爱。`;
console.log(sentence);
```

#### 5. 今日实战练习
1.  定义一个包含姓名、年龄、技能（数组）的用户对象，使用解构赋值分别获取这些值。
2.  写一个函数，接收任意数量的数字作为参数，返回它们中的最大值（提示：使用剩余语法和 `Math.max`）。

---

### Day 5-7：实战项目：随机菜谱生成器

这个项目将综合运用前四天学到的所有知识，是一个完美的练手机会！

#### 1. 需求分析
- 页面上有一个标题、一个显示菜谱信息的区域（图片、菜名、做法）和一个“换一个”按钮。
- 初始加载时，自动请求一个随机菜谱并显示。
- 点击按钮时，再次请求并显示新的菜谱。

#### 2. 推荐 API
- [TheMealDB API](https://www.themealdb.com/api/json/v1/1/random.php) 是一个免费的菜谱 API，可以直接获取随机菜谱，无需注册。

#### 3. 实现步骤拆解

1.  **HTML 结构**：先搭建好页面的基本骨架。

    ```html
    <h1>今天吃什么？</h1>
    <div id="recipe-container">
      <h2 id="recipe-name"></h2>
      <img id="recipe-img" src="" alt="菜谱图片" width="300">
      <p id="recipe-instructions"></p>
    </div>
    <button id="new-recipe-btn">换一个</button>
    ```

2.  **JavaScript 骨架**：定义一个函数来获取并显示菜谱，再给按钮绑定事件。

    ```javascript
    const recipeNameEl = document.querySelector('#recipe-name');
    // ... 其他元素
    const newRecipeBtn = document.querySelector('#new-recipe-btn');

    async function fetchAndDisplayRecipe() {
      // 在这里写 fetch 逻辑
      // 1. 调用 API
      // 2. 解析数据
      // 3. 更新 DOM 元素的内容 (recipeNameEl.textContent = ...)
    }

    newRecipeBtn.addEventListener('click', fetchAndDisplayRecipe);

    // 页面加载时先执行一次
    fetchAndDisplayRecipe();
    ```

3.  **填充逻辑**：完成 `fetchAndDisplayRecipe` 函数内部的细节，处理 API 返回的数据，并把菜名、图片链接、做法等信息填充到对应的 HTML 元素中。

## 📚 资源推荐
- 闯关式学习：[freeCodeCamp JavaScript](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)
- 趣味教程：[JavaScript 30](https://javascript30.com/)
- 文档：[MDN Web Docs](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
