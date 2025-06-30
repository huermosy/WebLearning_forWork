// 🎯 JavaScript 条件判断与循环掌握
// Day 4: 条件判断与循环 - 控制程序流程的艺术

console.log("=== JavaScript 条件判断与循环学习开始 ===");

// 1. 条件判断基础 - if/else
console.log("\n🔀 1. 条件判断基础：");

let score = 85;
let grade;

// 基本 if/else 结构
if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else if (score >= 60) {
    grade = "D";
} else {
    grade = "F";
}

console.log(`分数: ${score}, 等级: ${grade}`);

// 2. 比较运算符详解
console.log("\n⚖️ 2. 比较运算符详解：");

let a = 5;
let b = "5";
let c = 10;

console.log("基本比较:");
console.log(`${a} > ${c}: ${a > c}`);
console.log(`${a} < ${c}: ${a < c}`);
console.log(`${a} >= ${a}: ${a >= a}`);
console.log(`${a} <= ${c}: ${a <= c}`);

console.log("\n相等性比较 (重要!):");
console.log(`${a} == "${b}": ${a == b}`);   // true - 类型转换
console.log(`${a} === "${b}": ${a === b}`); // false - 严格相等
console.log(`${a} != "${b}": ${a != b}`);   // false
console.log(`${a} !== "${b}": ${a !== b}`); // true

// 3. 逻辑运算符组合
console.log("\n🧠 3. 逻辑运算符组合：");

let age = 20;
let hasLicense = true;
let hasInsurance = false;
let isWeekend = true;

// && (与) 运算符
let canDrive = age >= 18 && hasLicense;
console.log(`可以开车 (年龄>=18 且 有驾照): ${canDrive}`);

// || (或) 运算符
let needsDocuments = !hasLicense || !hasInsurance;
console.log(`需要补充证件: ${needsDocuments}`);

// 复合逻辑
let canRentCar = age >= 25 && hasLicense && hasInsurance;
let canDriveToday = canDrive && (isWeekend || age > 21);

console.log(`可以租车: ${canRentCar}`);
console.log(`今天可以开车: ${canDriveToday}`);

// 短路求值演示
console.log("\n短路求值演示:");
let userName = null;
let displayName = userName || "游客";
console.log(`显示名称: ${displayName}`);

let userSettings = { theme: "dark" };
let theme = userSettings && userSettings.theme;
console.log(`主题设置: ${theme}`);

// 4. 三元运算符 (条件运算符)
console.log("\n🔄 4. 三元运算符：");

let temperature = 25;
let weather = temperature > 30 ? "热" : temperature < 10 ? "冷" : "适宜";
console.log(`温度 ${temperature}°C, 天气: ${weather}`);

// 嵌套三元运算符
let userRole = "admin";
let permissions = userRole === "admin" ? "所有权限" : 
                  userRole === "user" ? "基础权限" : "无权限";
console.log(`角色: ${userRole}, 权限: ${permissions}`);

// 5. switch 语句
console.log("\n🎛️ 5. switch 语句：");

let dayOfWeek = 3;
let dayName;

switch (dayOfWeek) {
    case 1:
        dayName = "星期一";
        break;
    case 2:
        dayName = "星期二";
        break;
    case 3:
        dayName = "星期三";
        break;
    case 4:
        dayName = "星期四";
        break;
    case 5:
        dayName = "星期五";
        break;
    case 6:
    case 7:
        dayName = "周末";
        break;
    default:
        dayName = "无效日期";
}

console.log(`第${dayOfWeek}天是: ${dayName}`);

// switch 的现代用法
function getSeasonByMonth(month) {
    switch (month) {
        case 12:
        case 1:
        case 2:
            return "冬季";
        case 3:
        case 4:
        case 5:
            return "春季";
        case 6:
        case 7:
        case 8:
            return "夏季";
        case 9:
        case 10:
        case 11:
            return "秋季";
        default:
            return "无效月份";
    }
}

console.log(`3月份是: ${getSeasonByMonth(3)}`);
console.log(`7月份是: ${getSeasonByMonth(7)}`);

// 6. for 循环详解
console.log("\n🔄 6. for 循环详解：");

// 基本 for 循环
console.log("基本 for 循环 - 1到5:");
for (let i = 1; i <= 5; i++) {
    console.log(`第${i}次循环`);
}

// 遍历数组
const fruits = ["苹果", "香蕉", "橘子", "葡萄"];
console.log("\n遍历数组:");
for (let i = 0; i < fruits.length; i++) {
    console.log(`索引${i}: ${fruits[i]}`);
}

// 倒序循环
console.log("\n倒序循环:");
for (let i = fruits.length - 1; i >= 0; i--) {
    console.log(`倒序 ${fruits[i]}`);
}

// 步长控制
console.log("\n偶数循环:");
for (let i = 0; i <= 10; i += 2) {
    console.log(`偶数: ${i}`);
}

// 7. for...of 循环 (ES6)
console.log("\n🆕 7. for...of 循环 (ES6)：");

const colors = ["红色", "绿色", "蓝色"];

// 直接遍历值
console.log("for...of 遍历值:");
for (const color of colors) {
    console.log(`颜色: ${color}`);
}

// 遍历字符串
const message = "Hello";
console.log("\n遍历字符串:");
for (const char of message) {
    console.log(`字符: ${char}`);
}

// 8. for...in 循环
console.log("\n🔑 8. for...in 循环：");

const person = {
    name: "张三",
    age: 25,
    city: "北京",
    job: "程序员"
};

console.log("for...in 遍历对象属性:");
for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}

// 遍历数组索引 (不推荐)
console.log("\nfor...in 遍历数组索引:");
for (const index in fruits) {
    console.log(`索引${index}: ${fruits[index]}`);
}

// 9. while 循环
console.log("\n🔄 9. while 循环：");

let count = 1;
console.log("while 循环计数:");
while (count <= 3) {
    console.log(`计数: ${count}`);
    count++;
}

// 实际应用：猜数字游戏模拟
let targetNumber = 7;
let guess = 1;
let attempts = 0;

console.log("\n猜数字游戏模拟:");
while (guess !== targetNumber && attempts < 10) {
    attempts++;
    guess = Math.floor(Math.random() * 10) + 1;
    console.log(`第${attempts}次猜测: ${guess}`);
    
    if (guess === targetNumber) {
        console.log(`恭喜！用了${attempts}次猜中了！`);
    }
}

// 10. do...while 循环
console.log("\n🔄 10. do...while 循环：");

let userInput;
let validInput = false;
let inputCount = 0;

console.log("do...while 输入验证模拟:");
do {
    inputCount++;
    // 模拟用户输入
    userInput = Math.random() > 0.7 ? "valid" : "invalid";
    console.log(`第${inputCount}次输入: ${userInput}`);
    
    if (userInput === "valid") {
        validInput = true;
        console.log("输入验证成功！");
    } else {
        console.log("输入无效，请重试");
    }
} while (!validInput && inputCount < 5);

// 11. 循环控制语句
console.log("\n🛑 11. 循环控制语句：");

// break 语句
console.log("break 语句示例:");
for (let i = 1; i <= 10; i++) {
    if (i === 5) {
        console.log(`遇到${i}，跳出循环`);
        break;
    }
    console.log(`数字: ${i}`);
}

// continue 语句
console.log("\ncontinue 语句示例:");
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        console.log(`跳过${i}`);
        continue;
    }
    console.log(`处理数字: ${i}`);
}

// 12. 嵌套循环
console.log("\n🔗 12. 嵌套循环：");

console.log("九九乘法表:");
for (let i = 1; i <= 3; i++) {
    let row = "";
    for (let j = 1; j <= 3; j++) {
        row += `${i}x${j}=${i*j} `;
    }
    console.log(row);
}

// 遍历二维数组
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log("\n遍历二维数组:");
for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
        console.log(`位置[${row}][${col}]: ${matrix[row][col]}`);
    }
}

// 13. 实际应用示例
console.log("\n🎯 13. 实际应用示例：");

// 示例1：学生成绩统计
const scores = [85, 92, 78, 96, 88, 79, 94, 87];
let total = 0;
let highScores = 0;
let lowScores = 0;

for (const score of scores) {
    total += score;
    if (score >= 90) {
        highScores++;
    } else if (score < 80) {
        lowScores++;
    }
}

const average = total / scores.length;
console.log("成绩统计:");
console.log(`总人数: ${scores.length}`);
console.log(`平均分: ${average.toFixed(1)}`);
console.log(`优秀人数(>=90): ${highScores}`);
console.log(`待提高人数(<80): ${lowScores}`);

// 示例2：购物清单处理
const shoppingList = [
    { name: "苹果", price: 5.5, quantity: 3 },
    { name: "香蕉", price: 3.2, quantity: 5 },
    { name: "橘子", price: 4.8, quantity: 2 },
    { name: "牛奶", price: 12.5, quantity: 1 }
];

let totalCost = 0;
let itemCount = 0;

console.log("\n购物清单:");
for (const item of shoppingList) {
    const itemTotal = item.price * item.quantity;
    totalCost += itemTotal;
    itemCount += item.quantity;
    
    console.log(`${item.name}: ¥${item.price} x ${item.quantity} = ¥${itemTotal.toFixed(2)}`);
}

console.log(`总商品数: ${itemCount}`);
console.log(`总金额: ¥${totalCost.toFixed(2)}`);

// 示例3：用户权限检查
const users = [
    { name: "管理员", role: "admin", active: true },
    { name: "用户1", role: "user", active: true },
    { name: "用户2", role: "user", active: false },
    { name: "访客", role: "guest", active: true }
];

console.log("\n用户权限检查:");
for (const user of users) {
    let permission = "无权限";
    
    if (!user.active) {
        permission = "账户已停用";
    } else {
        switch (user.role) {
            case "admin":
                permission = "管理员权限";
                break;
            case "user":
                permission = "普通用户权限";
                break;
            case "guest":
                permission = "访客权限";
                break;
        }
    }
    
    console.log(`${user.name}: ${permission}`);
}

// 14. 性能优化技巧
console.log("\n⚡ 14. 性能优化技巧：");

// 缓存数组长度
const largeArray = new Array(1000).fill(0).map((_, i) => i);

console.log("性能对比示例:");
console.time("未优化循环");
for (let i = 0; i < largeArray.length; i++) {
    // 每次都计算 length
}
console.timeEnd("未优化循环");

console.time("优化循环");
for (let i = 0, len = largeArray.length; i < len; i++) {
    // 缓存 length
}
console.timeEnd("优化循环");

// 提前跳出
console.log("\n提前跳出优化:");
const numbers = [1, 3, 5, 8, 9, 11];
let foundEven = false;

for (const num of numbers) {
    if (num % 2 === 0) {
        console.log(`找到第一个偶数: ${num}`);
        foundEven = true;
        break; // 找到就退出，不继续遍历
    }
}

// 15. 常见错误与避免
console.log("\n⚠️ 15. 常见错误与避免：");

console.log("正确的循环写法示例:");

// ❌ 错误：修改正在遍历的数组
let problematicArray = [1, 2, 3, 4, 5];
console.log("原数组:", [...problematicArray]);

// ✅ 正确：倒序遍历删除元素
for (let i = problematicArray.length - 1; i >= 0; i--) {
    if (problematicArray[i] % 2 === 0) {
        problematicArray.splice(i, 1);
    }
}
console.log("删除偶数后:", problematicArray);

// ✅ 更好的方法：使用 filter
const originalArray = [1, 2, 3, 4, 5];
const filteredArray = originalArray.filter(num => num % 2 !== 0);
console.log("使用filter删除偶数:", filteredArray);

console.log("\n=== 条件判断与循环学习完成 ===");
console.log("💡 掌握了条件判断和循环，你就能控制程序的执行流程了！");
console.log("🚀 下一步可以学习DOM操作，让程序与网页交互！");
