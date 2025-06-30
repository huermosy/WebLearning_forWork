// 🎯 JavaScript 函数深度学习
// Day 1: 函数的定义与调用 - 从入门到精通

console.log("=== JavaScript 函数学习开始 ===");

// 1. 函数基础概念
console.log("\n📝 1. 函数基础概念演示：");
console.log("函数就像一个工具箱，可以重复使用，让代码更整洁！");

// 2. 函数声明的三种方式
console.log("\n🛠️ 2. 函数声明的三种方式：");

// 方式一：函数声明 (Function Declaration)
function greet(name) {
    return "你好，" + name + "！";
}

// 方式二：函数表达式 (Function Expression)
const sayGoodbye = function(name) {
    return "再见，" + name + "！";
};

// 方式三：箭头函数 (Arrow Function) - ES6新语法
const introduce = (name, age) => {
    return `我是${name}，今年${age}岁`;
};

// 更简洁的箭头函数（单行返回）
const square = x => x * x;
const double = x => x * 2;

console.log("函数调用示例:");
console.log(greet("小明"));
console.log(sayGoodbye("小红"));
console.log(introduce("小李", 20));
console.log("5的平方:", square(5));
console.log("8的两倍:", double(8));

// 3. 函数参数详解
console.log("\n📋 3. 函数参数详解：");

// 基本参数
function add(a, b) {
    console.log("计算", a, "+", b, "=", a + b);
    return a + b;
}

// 默认参数
function greetWithDefault(name = "朋友") {
    return "欢迎你，" + name + "！";
}

// 剩余参数 (Rest Parameters)
function sum(...numbers) {
    let total = 0;
    for (let num of numbers) {
        total += num;
    }
    return total;
}

// 参数解构
function createUser({name, age, city = "北京"}) {
    return `用户：${name}，${age}岁，来自${city}`;
}

console.log("基本参数:", add(3, 7));
console.log("默认参数:", greetWithDefault());
console.log("默认参数:", greetWithDefault("张三"));
console.log("剩余参数:", sum(1, 2, 3, 4, 5));
console.log("参数解构:", createUser({name: "王五", age: 25}));

// 4. 函数返回值
console.log("\n🔄 4. 函数返回值演示：");

// 返回单个值
function calculateArea(radius) {
    const PI = 3.14159;
    return PI * radius * radius;
}

// 返回多个值（使用数组）
function getMinMax(numbers) {
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    return [min, max];
}

// 返回多个值（使用对象）
function analyzeText(text) {
    return {
        length: text.length,
        words: text.split(" ").length,
        uppercase: text.toUpperCase(),
        lowercase: text.toLowerCase()
    };
}

// 无返回值的函数
function logMessage(message) {
    console.log("📢 消息:", message);
    // 没有return语句，默认返回undefined
}

console.log("圆面积计算:", calculateArea(5));
console.log("最小最大值:", getMinMax([3, 7, 1, 9, 4]));
console.log("文本分析:", analyzeText("Hello World JavaScript"));
logMessage("这是一条测试消息");

// 5. 作用域与闭包
console.log("\n🎭 5. 作用域与闭包演示：");

// 全局作用域
let globalVar = "我是全局变量";

function scopeDemo() {
    // 函数作用域
    let localVar = "我是局部变量";
    console.log("函数内访问全局变量:", globalVar);
    console.log("函数内访问局部变量:", localVar);
}

// 闭包示例 - 计数器
function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

// 闭包示例 - 私有变量
function createBankAccount(initialBalance) {
    let balance = initialBalance;
    
    return {
        deposit: function(amount) {
            balance += amount;
            return `存入${amount}元，余额：${balance}元`;
        },
        withdraw: function(amount) {
            if (amount <= balance) {
                balance -= amount;
                return `取出${amount}元，余额：${balance}元`;
            } else {
                return "余额不足！";
            }
        },
        getBalance: function() {
            return `当前余额：${balance}元`;
        }
    };
}

scopeDemo();
const counter = createCounter();
console.log("计数器:", counter()); // 1
console.log("计数器:", counter()); // 2
console.log("计数器:", counter()); // 3

const myAccount = createBankAccount(1000);
console.log(myAccount.getBalance());
console.log(myAccount.deposit(500));
console.log(myAccount.withdraw(200));
console.log(myAccount.withdraw(2000));

// 6. 高阶函数
console.log("\n🚀 6. 高阶函数演示：");

// 函数作为参数
function processNumbers(numbers, operation) {
    const result = [];
    for (let num of numbers) {
        result.push(operation(num));
    }
    return result;
}

// 函数作为返回值
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const numbers = [1, 2, 3, 4, 5];
const doubled = processNumbers(numbers, x => x * 2);
const squared = processNumbers(numbers, x => x * x);

const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log("原数组:", numbers);
console.log("翻倍结果:", doubled);
console.log("平方结果:", squared);
console.log("3倍函数 - 5×3 =", triple(5));
console.log("4倍函数 - 7×4 =", quadruple(7));

// 7. 实用工具函数
console.log("\n🛠️ 7. 实用工具函数示例：");

// 判断奇偶数
function isEven(number) {
    return number % 2 === 0;
}

function isOdd(number) {
    return number % 2 !== 0;
}

// 数组工具函数
function findLargest(array) {
    if (array.length === 0) return null;
    let largest = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] > largest) {
            largest = array[i];
        }
    }
    return largest;
}

// 字符串工具函数
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

// 日期工具函数
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

console.log("6是偶数:", isEven(6));
console.log("7是奇数:", isOdd(7));
console.log("最大值:", findLargest([3, 9, 2, 8, 1]));
console.log("首字母大写:", capitalize("javascript"));
console.log("字符串反转:", reverseString("hello"));
console.log("日期格式化:", formatDate(new Date()));

// 8. 递归函数
console.log("\n🔄 8. 递归函数演示：");

// 计算阶乘
function factorial(n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

// 斐波那契数列
function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 数组求和（递归方式）
function recursiveSum(arr, index = 0) {
    if (index >= arr.length) {
        return 0;
    }
    return arr[index] + recursiveSum(arr, index + 1);
}

console.log("5的阶乘:", factorial(5));
console.log("斐波那契第7位:", fibonacci(7));
console.log("递归求和:", recursiveSum([1, 2, 3, 4, 5]));

// 9. 实际应用示例
console.log("\n🎯 9. 实际应用示例：");

// 购物车功能
function createShoppingCart() {
    let items = [];
    
    return {
        addItem: function(name, price, quantity = 1) {
            items.push({ name, price, quantity });
            return `已添加 ${quantity} 个 ${name}`;
        },
        
        removeItem: function(name) {
            const index = items.findIndex(item => item.name === name);
            if (index !== -1) {
                const removed = items.splice(index, 1)[0];
                return `已移除 ${removed.name}`;
            }
            return "商品不存在";
        },
        
        getTotal: function() {
            return items.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);
        },
        
        getItems: function() {
            return items.map(item => 
                `${item.name} x${item.quantity} = ¥${item.price * item.quantity}`
            );
        }
    };
}

// 表单验证函数
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return {
        isValid: password.length >= 8,
        hasNumber: /\d/.test(password),
        hasLetter: /[a-zA-Z]/.test(password),
        hasSpecial: /[!@#$%^&*]/.test(password)
    };
}

// 使用购物车
const cart = createShoppingCart();
console.log(cart.addItem("苹果", 5.5, 3));
console.log(cart.addItem("香蕉", 3.2, 2));
console.log("购物车商品:", cart.getItems());
console.log("总价:", cart.getTotal(), "元");

// 使用验证函数
console.log("邮箱验证:", validateEmail("test@example.com"));
console.log("密码验证:", validatePassword("myPassword123!"));

console.log("\n=== 函数学习完成 ===");
console.log("💡 下一步：尝试完成练习题，巩固函数概念！");
