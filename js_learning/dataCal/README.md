# 📝 数据类型与运算符练习说明

欢迎来到 JavaScript 数据类型与运算符的学习实践！

## 🎯 学习目标

通过这个练习，你将掌握：
- JavaScript 的基本数据类型（number, string, boolean, undefined, null）
- 复合数据类型（array, object）
- 各种运算符的使用（算术、比较、逻辑、赋值）
- 实际编程场景中的应用

## 📁 文件说明

1. **dataTypes.js** - 包含完整的数据类型与运算符示例代码
2. **index.html** - 交互式学习页面，可以在浏览器中运行
3. **README.md** - 这个说明文件

## 🚀 使用方法

### 方法一：浏览器运行（推荐）
1. 双击打开 `index.html` 文件
2. 点击页面上的不同按钮查看示例
3. 按 F12 打开开发者工具，查看 Console 面板的详细输出
4. 在 Console 中尝试自己的代码

### 方法二：Node.js 运行
```bash
# 在当前目录下运行
node dataTypes.js
```

## 💡 学习建议

1. **逐步学习**：先运行基本数据类型示例，理解每种类型的特点
2. **观察输出**：注意 `typeof` 操作符的输出结果
3. **动手实践**：在控制台中尝试修改变量值，观察结果变化
4. **理解差异**：特别注意 `==` 和 `===` 的区别
5. **实际应用**：思考这些数据类型在实际项目中的应用场景

## 🏋️‍♂️ 练习题

完成以下练习来巩固学习：

### 练习 1：基本类型操作
```javascript
// 创建变量并输出类型
let myName = "你的名字";
let myAge = 你的年龄;
let isStudent = true/false;

console.log("姓名:", myName, "类型:", typeof myName);
// 继续完成其他变量...
```

### 练习 2：数组操作
```javascript
// 创建一个包含你喜欢的食物的数组
let favoriteFoods = ["食物1", "食物2", "食物3"];

// 输出数组长度
// 输出第一个和最后一个元素
// 添加一个新食物
```

### 练习 3：对象操作
```javascript
// 创建一个描述你自己的对象
let myself = {
    name: "你的名字",
    age: 你的年龄,
    hobbies: ["爱好1", "爱好2"],
    // 添加更多属性...
};

// 访问和修改对象属性
```

### 练习 4：运算符应用
```javascript
// 计算两个数的所有算术运算结果
let num1 = 20;
let num2 = 6;

// 实现加减乘除和取余运算
// 使用比较运算符比较两个数
// 结合逻辑运算符创建复合条件
```

## 🔍 常见问题

**Q: 为什么 `typeof null` 返回 "object"？**
A: 这是 JavaScript 的一个历史遗留问题，在实际使用中要特别注意。

**Q: `==` 和 `===` 有什么区别？**
A: `==` 会进行类型转换后比较，`===` 严格比较不进行类型转换。建议优先使用 `===`。

**Q: 什么时候使用 `let`，什么时候使用 `const`？**
A: 如果变量值不会改变，使用 `const`；如果需要重新赋值，使用 `let`。

## 📚 扩展阅读

- [MDN - JavaScript 数据类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)
- [MDN - 表达式和运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators)

---

**下一步**：完成这个练习后，继续学习 [函数的定义与调用](../js-plan.md#3-函数的定义与调用) 部分。

祝学习愉快！🎉
