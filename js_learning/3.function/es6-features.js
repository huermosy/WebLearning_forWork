// 🎯 ES6 (ECMAScript 2015) 核心特性详解
// ES6全称：ECMAScript 2015，是JavaScript语言标准的第6版

console.log("=== ES6 特性全面解析 ===");

// 1. let 和 const - 块级作用域变量声明
console.log("\n📝 1. let 和 const（替代 var）：");

// ES5 方式 - var 的问题
console.log("ES5 var 的问题演示:");
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var i:", i), 100); // 输出: 3, 3, 3
}

// ES6 方式 - let 解决作用域问题
console.log("ES6 let 解决方案:");
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let j:", j), 200); // 输出: 0, 1, 2
}

// const 声明常量
const API_URL = "https://api.example.com";
const CONFIG = { theme: "dark", language: "zh-CN" };
console.log("常量声明:", API_URL);

// 2. 箭头函数 - 更简洁的函数语法
console.log("\n🏹 2. 箭头函数（Arrow Functions）：");

// ES5 函数写法
const es5Function = function(x, y) {
    return x + y;
};

// ES6 箭头函数
const es6ArrowFunction = (x, y) => x + y;
const square = x => x * x;                    // 单参数可省略括号
const greet = () => "Hello ES6!";             // 无参数需要括号

console.log("ES5 函数:", es5Function(3, 4));
console.log("ES6 箭头函数:", es6ArrowFunction(3, 4));
console.log("平方函数:", square(5));
console.log("问候函数:", greet());

// 箭头函数的 this 绑定特性
const person = {
    name: "张三",
    
    // ES5 方法 - this 指向 person
    es5Method: function() {
        return "ES5: " + this.name;
    },
    
    // ES6 箭头函数 - this 继承外层作用域
    es6Method: () => {
        return "ES6: " + this.name; // this 不指向 person
    },
    
    // 正确的 ES6 方法写法
    correctMethod() {
        return "正确的ES6: " + this.name;
    }
};

console.log(person.es5Method());      // "ES5: 张三"
console.log(person.correctMethod());  // "正确的ES6: 张三"

// 3. 模板字符串 - 字符串拼接的革命
console.log("\n🎭 3. 模板字符串（Template Literals）：");

const name = "小明";
const age = 20;
const city = "北京";

// ES5 字符串拼接
const es5String = "我是" + name + "，今年" + age + "岁，来自" + city;

// ES6 模板字符串
const es6String = `我是${name}，今年${age}岁，来自${city}`;

// 多行字符串
const multiLine = `
    姓名: ${name}
    年龄: ${age}
    城市: ${city}
    计算: ${age * 2}岁时会是${age * 2}
`;

console.log("ES5 拼接:", es5String);
console.log("ES6 模板:", es6String);
console.log("多行模板:", multiLine);

// 4. 解构赋值 - 快速提取数据
console.log("\n📦 4. 解构赋值（Destructuring）：");

// 数组解构
const colors = ["红色", "绿色", "蓝色", "黄色"];
const [first, second, ...rest] = colors;
console.log("数组解构 - 第一个:", first, "第二个:", second, "其余:", rest);

// 对象解构
const user = {
    username: "admin",
    email: "admin@example.com",
    role: "administrator",
    settings: {
        theme: "dark",
        notifications: true
    }
};

const { username, email, role } = user;
const { theme, notifications } = user.settings;

console.log("对象解构:", { username, email, role });
console.log("嵌套解构:", { theme, notifications });

// 解构赋值重命名和默认值
const { username: userName, status = "active" } = user;
console.log("重命名和默认值:", userName, status);

// 5. 展开运算符 - 数组和对象的展开
console.log("\n🌟 5. 展开运算符（Spread Operator）：");

// 数组展开
const fruits = ["苹果", "香蕉"];
const vegetables = ["胡萝卜", "白菜"];
const food = [...fruits, ...vegetables, "鸡蛋"];
console.log("数组展开:", food);

// 数组克隆
const originalArray = [1, 2, 3];
const clonedArray = [...originalArray];
console.log("数组克隆:", clonedArray);

// 对象展开
const basicInfo = { name: "李四", age: 25 };
const contactInfo = { email: "lisi@example.com", phone: "123456789" };
const fullInfo = { ...basicInfo, ...contactInfo, city: "上海" };
console.log("对象展开:", fullInfo);

// 函数参数展开
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log("参数展开:", sum(1, 2, 3, 4, 5));

// 6. 默认参数 - 函数参数默认值
console.log("\n⚙️ 6. 默认参数（Default Parameters）：");

// ES5 默认参数模拟
function es5Greet(name, greeting) {
    greeting = greeting || "你好";
    return greeting + ", " + name + "!";
}

// ES6 默认参数
function es6Greet(name, greeting = "你好") {
    return `${greeting}, ${name}!`;
}

console.log("ES5 默认参数:", es5Greet("张三"));
console.log("ES6 默认参数:", es6Greet("李四"));
console.log("ES6 自定义参数:", es6Greet("王五", "欢迎"));

// 7. 类 - 面向对象编程
console.log("\n🏛️ 7. 类（Classes）：");

// ES6 类语法
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    // 实例方法
    introduce() {
        return `我是${this.name}，今年${this.age}岁`;
    }
    
    // 静态方法
    static compare(person1, person2) {
        return person1.age - person2.age;
    }
    
    // getter
    get info() {
        return `${this.name} (${this.age}岁)`;
    }
    
    // setter
    set info(value) {
        const [name, age] = value.split(",");
        this.name = name.trim();
        this.age = parseInt(age.trim());
    }
}

// 继承
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age); // 调用父类构造函数
        this.grade = grade;
    }
    
    introduce() {
        return super.introduce() + `，我是${this.grade}年级学生`;
    }
    
    study() {
        return `${this.name}正在学习`;
    }
}

const person1 = new Person("张三", 25);
const student1 = new Student("李四", 18, "高三");

console.log("类实例:", person1.introduce());
console.log("继承类:", student1.introduce());
console.log("静态方法:", Person.compare(person1, student1));
console.log("getter:", student1.info);

// 8. Promise - 异步编程解决方案
console.log("\n🔄 8. Promise（异步编程）：");

// 创建 Promise
function fetchData(success = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve({ data: "获取数据成功", timestamp: Date.now() });
            } else {
                reject(new Error("获取数据失败"));
            }
        }, 1000);
    });
}

// 使用 Promise
console.log("开始异步请求...");
fetchData(true)
    .then(result => {
        console.log("Promise 成功:", result);
        return "处理完成";
    })
    .then(message => {
        console.log("链式调用:", message);
    })
    .catch(error => {
        console.error("Promise 失败:", error.message);
    });

// 9. 模块化 - import/export
console.log("\n📦 9. 模块化（Modules）：");

// 注意：在 Node.js 中演示模块化概念
console.log("ES6 模块化语法示例:");
console.log(`
// 导出 (export)
export const PI = 3.14159;
export function calculateArea(radius) {
    return PI * radius * radius;
}
export default class Circle {
    constructor(radius) {
        this.radius = radius;
    }
}

// 导入 (import)
import Circle, { PI, calculateArea } from './circle.js';
import * as MathUtils from './math-utils.js';
`);

// 10. 数组新方法
console.log("\n🔧 10. 数组新方法：");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// find() - 查找第一个符合条件的元素
const firstEven = numbers.find(num => num % 2 === 0);
console.log("find - 第一个偶数:", firstEven);

// findIndex() - 查找第一个符合条件的元素索引
const firstEvenIndex = numbers.findIndex(num => num % 2 === 0);
console.log("findIndex - 第一个偶数索引:", firstEvenIndex);

// includes() - 检查数组是否包含某个元素
const hasNumber5 = numbers.includes(5);
console.log("includes - 是否包含5:", hasNumber5);

// Array.from() - 从类数组或可迭代对象创建数组
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
const realArray = Array.from(arrayLike);
console.log("Array.from:", realArray);

// 11. 对象增强
console.log("\n🎨 11. 对象增强：");

const propName = "dynamicProp";
const value = "动态值";

// 属性简写
const x = 10, y = 20;
const point = { x, y }; // 等同于 { x: x, y: y }

// 方法简写
const calculator = {
    add(a, b) { return a + b; },    // 等同于 add: function(a, b) { ... }
    multiply(a, b) { return a * b; }
};

// 计算属性名
const dynamicObject = {
    [propName]: value,
    [`${propName}_2`]: "另一个动态值"
};

console.log("属性简写:", point);
console.log("方法简写:", calculator.add(5, 3));
console.log("计算属性名:", dynamicObject);

// 12. Map 和 Set - 新的数据结构
console.log("\n🗺️ 12. Map 和 Set：");

// Map - 键值对集合，键可以是任意类型
const userMap = new Map();
userMap.set("name", "张三");
userMap.set("age", 25);
userMap.set(123, "数字键");

console.log("Map 操作:");
console.log("获取值:", userMap.get("name"));
console.log("是否存在:", userMap.has("age"));
console.log("Map 大小:", userMap.size);

// Set - 唯一值的集合
const uniqueNumbers = new Set([1, 2, 3, 3, 4, 4, 5]);
uniqueNumbers.add(6);
uniqueNumbers.add(3); // 不会重复添加

console.log("Set 去重:", Array.from(uniqueNumbers));
console.log("Set 大小:", uniqueNumbers.size);

// 13. Symbol - 新的原始类型
console.log("\n🔣 13. Symbol：");

// 创建唯一标识符
const sym1 = Symbol("description");
const sym2 = Symbol("description");
console.log("Symbol 唯一性:", sym1 === sym2); // false

// Symbol 作为对象属性
const uniqueKey = Symbol("unique");
const symbolObject = {
    [uniqueKey]: "这是一个 Symbol 属性",
    normalProp: "普通属性"
};

console.log("Symbol 属性:", symbolObject[uniqueKey]);

console.log("\n=== ES6 特性学习完成 ===");
console.log("💡 ES6 让 JavaScript 更现代、更强大、更易用！");
console.log("🎯 这些特性现在是 JavaScript 开发的标准工具");
