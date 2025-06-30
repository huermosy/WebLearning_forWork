// 🎯 JavaScript 数据类型与运算符实战练习
// Day 1: 数据类型与运算基础

console.log("=== JavaScript 数据类型学习开始 ===");

// 1. 基本数据类型 (Primitive Types)
console.log("\n📝 1. 基本数据类型演示：");

// Number 数字类型
let age = 18;
let price = 99.99;
let temperature = -5;
console.log("数字类型示例:");
console.log("年龄:", age, "类型:", typeof age);
console.log("价格:", price, "类型:", typeof price);
console.log("温度:", temperature, "类型:", typeof temperature);

// String 字符串类型
let name = "小明";
let city = '北京';
let message = `你好，我是${name}，来自${city}`;  // 模板字符串
console.log("\n字符串类型示例:");
console.log("姓名:", name, "类型:", typeof name);
console.log("城市:", city, "类型:", typeof city);
console.log("消息:", message, "类型:", typeof message);

// Boolean 布尔类型
let isStudent = true;
let isGraduated = false;
console.log("\n布尔类型示例:");
console.log("是学生:", isStudent, "类型:", typeof isStudent);
console.log("已毕业:", isGraduated, "类型:", typeof isGraduated);

// Undefined 未定义类型
let undefinedVar;
console.log("\nUndefined 类型示例:");
console.log("未定义变量:", undefinedVar, "类型:", typeof undefinedVar);

// Null 空值类型
let emptyValue = null;
console.log("\nNull 类型示例:");
console.log("空值:", emptyValue, "类型:", typeof emptyValue); // 注意：typeof null 返回 "object"

// 2. 复合数据类型 (Reference Types)
console.log("\n📋 2. 复合数据类型演示：");

// Array 数组类型
let scores = [90, 80, 100, 75, 88];
let fruits = ["苹果", "香蕉", "橘子"];
let mixedArray = [1, "hello", true, null];
console.log("数组类型示例:");
console.log("分数数组:", scores, "类型:", typeof scores);
console.log("水果数组:", fruits, "类型:", typeof fruits);
console.log("混合数组:", mixedArray, "类型:", typeof mixedArray);

// Object 对象类型
let person = {
  name: "小明",
  age: 18,
  isStudent: true,
  hobbies: ["读书", "游戏", "音乐"]
};
console.log("\n对象类型示例:");
console.log("人员信息:", person, "类型:", typeof person);
console.log("访问对象属性 - 姓名:", person.name);
console.log("访问对象属性 - 爱好:", person.hobbies);

// 3. 算术运算符演示
console.log("\n🔢 3. 算术运算符演示：");

let a = 10;
let b = 3;

console.log("原始数值: a =", a, ", b =", b);
console.log("加法 a + b =", a + b);
console.log("减法 a - b =", a - b);
console.log("乘法 a * b =", a * b);
console.log("除法 a / b =", a / b);
console.log("取余 a % b =", a % b); // 余数运算

// 4. 比较运算符演示
console.log("\n⚖️ 4. 比较运算符演示：");

let x = 5;
let y = "5";

console.log("数值比较:");
console.log("x =", x, ", y =", y);
console.log("x == y (相等):", x == y);   // true，会进行类型转换
console.log("x === y (严格相等):", x === y); // false，不进行类型转换
console.log("x != y (不等):", x != y);
console.log("x !== y (严格不等):", x !== y);
console.log("x > 3:", x > 3);
console.log("x < 10:", x < 10);
console.log("x >= 5:", x >= 5);
console.log("x <= 5:", x <= 5);

// 5. 逻辑运算符演示
console.log("\n🧠 5. 逻辑运算符演示：");

let hasDriverLicense = true;
let ageAbove18 = true;
let hasCarInsurance = false;

console.log("驾驶资格检查:");
console.log("有驾照:", hasDriverLicense);
console.log("年满18岁:", ageAbove18);
console.log("有车险:", hasCarInsurance);

console.log("可以开车 (有驾照 && 年满18):", hasDriverLicense && ageAbove18);
console.log("需要买保险 (有驾照 || 有车险):", hasDriverLicense || hasCarInsurance);
console.log("没有车险:", !hasCarInsurance);

// 6. 赋值运算符演示
console.log("\n📝 6. 赋值运算符演示：");

let score = 80;
console.log("初始分数:", score);

score += 10;  // score = score + 10
console.log("加10分后:", score);

score -= 5;   // score = score - 5
console.log("减5分后:", score);

score *= 2;   // score = score * 2
console.log("乘以2后:", score);

score /= 3;   // score = score / 3
console.log("除以3后:", score);

// 7. 字符串运算符演示
console.log("\n🔤 7. 字符串运算符演示：");

let firstName = "张";
let lastName = "三";
let fullName = firstName + lastName;  // 字符串连接
console.log("姓:", firstName);
console.log("名:", lastName);
console.log("全名:", fullName);

let greeting = "你好, ";
greeting += fullName;  // 等同于 greeting = greeting + fullName
console.log("问候语:", greeting);

// 8. 实际应用示例
console.log("\n🎯 8. 实际应用示例：");

// 计算商品总价
let itemPrice = 29.9;
let quantity = 3;
let discount = 0.1;  // 10% 折扣

let subtotal = itemPrice * quantity;
let discountAmount = subtotal * discount;
let totalPrice = subtotal - discountAmount;

console.log("商品单价:", itemPrice, "元");
console.log("购买数量:", quantity, "件");
console.log("小计:", subtotal, "元");
console.log("折扣金额:", discountAmount, "元");
console.log("最终总价:", totalPrice, "元");

// 判断用户年龄段
let userAge = 20;
let ageGroup;

if (userAge < 18) {
  ageGroup = "未成年";
} else if (userAge >= 18 && userAge < 60) {
  ageGroup = "成年人";
} else {
  ageGroup = "老年人";
}

console.log("\n年龄分组示例:");
console.log("用户年龄:", userAge, "岁");
console.log("年龄段:", ageGroup);

console.log("\n=== 数据类型与运算符学习完成 ===");
console.log("💡 建议：在浏览器控制台运行这些代码，观察输出结果！");
