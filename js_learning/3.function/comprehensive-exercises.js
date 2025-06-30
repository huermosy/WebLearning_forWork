// 🎯 JavaScript 函数综合练习
// 结合ES6特性的实战练习题

console.log("=== JavaScript 函数与ES6综合练习 ===");

// 练习1：温度转换器（使用箭头函数和默认参数）
console.log("\n🌡️ 练习1：温度转换器");

const celsiusToFahrenheit = (celsius = 0) => (celsius * 9/5) + 32;
const fahrenheitToCelsius = (fahrenheit = 32) => (fahrenheit - 32) * 5/9;

// 测试
console.log("0°C 转华氏度:", celsiusToFahrenheit(0));
console.log("100°C 转华氏度:", celsiusToFahrenheit(100));
console.log("32°F 转摄氏度:", fahrenheitToCelsius(32));
console.log("100°F 转摄氏度:", fahrenheitToCelsius(100).toFixed(2));

// 练习2：数组工具函数集合（使用展开运算符和解构）
console.log("\n🔧 练习2：数组工具函数集合");

const ArrayUtils = {
    // 找最大值
    findMax: (...numbers) => Math.max(...numbers),
    
    // 数组去重
    removeDuplicates: arr => [...new Set(arr)],
    
    // 数组分组
    groupBy: (array, key) => {
        return array.reduce((groups, item) => {
            const group = item[key];
            groups[group] = groups[group] || [];
            groups[group].push(item);
            return groups;
        }, {});
    },
    
    // 数组分块
    chunk: (array, size) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    },
    
    // 数组扁平化
    flatten: arr => arr.reduce((flat, item) => 
        Array.isArray(item) ? [...flat, ...ArrayUtils.flatten(item)] : [...flat, item], [])
};

// 测试数组工具
console.log("最大值:", ArrayUtils.findMax(1, 5, 3, 9, 2));
console.log("去重:", ArrayUtils.removeDuplicates([1, 2, 2, 3, 3, 4]));

const students = [
    {name: "张三", grade: "A", class: "1班"},
    {name: "李四", grade: "B", class: "1班"},
    {name: "王五", grade: "A", class: "2班"}
];
console.log("按班级分组:", ArrayUtils.groupBy(students, "class"));

console.log("数组分块:", ArrayUtils.chunk([1, 2, 3, 4, 5, 6, 7], 3));
console.log("数组扁平化:", ArrayUtils.flatten([1, [2, 3], [4, [5, 6]]]));

// 练习3：字符串处理器（使用模板字符串和正则表达式）
console.log("\n📝 练习3：字符串处理器");

class StringProcessor {
    static countWords(text) {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    }
    
    static capitalize(text) {
        return text.replace(/\b\w/g, l => l.toUpperCase());
    }
    
    static isPalindrome(text) {
        const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, '');
        return cleaned === cleaned.split('').reverse().join('');
    }
    
    static generateSlug(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    }
    
    static extractEmails(text) {
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        return text.match(emailRegex) || [];
    }
}

// 测试字符串处理器
console.log("单词计数:", StringProcessor.countWords("Hello world, how are you?"));
console.log("首字母大写:", StringProcessor.capitalize("hello world javascript"));
console.log("是回文:", StringProcessor.isPalindrome("A man a plan a canal Panama"));
console.log("生成slug:", StringProcessor.generateSlug("Hello World! This is a Test"));
console.log("提取邮箱:", StringProcessor.extractEmails("联系我们: admin@example.com 或 support@test.org"));

// 练习4：高级购物车系统（使用类、闭包、Symbol）
console.log("\n🛒 练习4：高级购物车系统");

const CART_PRIVATE = Symbol('cartPrivate');

class ShoppingCart {
    constructor(currency = 'CNY') {
        this[CART_PRIVATE] = {
            items: new Map(),
            currency: currency,
            discounts: [],
            taxes: 0.08
        };
    }
    
    addItem(product, quantity = 1) {
        const {items} = this[CART_PRIVATE];
        const existingItem = items.get(product.id) || {product, quantity: 0};
        existingItem.quantity += quantity;
        items.set(product.id, existingItem);
        return this;
    }
    
    removeItem(productId, quantity = null) {
        const {items} = this[CART_PRIVATE];
        const item = items.get(productId);
        
        if (!item) return this;
        
        if (quantity === null || quantity >= item.quantity) {
            items.delete(productId);
        } else {
            item.quantity -= quantity;
        }
        return this;
    }
    
    applyDiscount(discountFn) {
        this[CART_PRIVATE].discounts.push(discountFn);
        return this;
    }
    
    getSubtotal() {
        const {items} = this[CART_PRIVATE];
        return Array.from(items.values())
            .reduce((total, {product, quantity}) => total + (product.price * quantity), 0);
    }
    
    getDiscountAmount() {
        const {discounts} = this[CART_PRIVATE];
        const subtotal = this.getSubtotal();
        return discounts.reduce((total, discountFn) => total + discountFn(subtotal), 0);
    }
    
    getTaxAmount() {
        const {taxes} = this[CART_PRIVATE];
        return (this.getSubtotal() - this.getDiscountAmount()) * taxes;
    }
    
    getTotal() {
        return this.getSubtotal() - this.getDiscountAmount() + this.getTaxAmount();
    }
    
    getSummary() {
        const {items, currency} = this[CART_PRIVATE];
        return {
            items: Array.from(items.values()).map(({product, quantity}) => ({
                name: product.name,
                price: product.price,
                quantity,
                subtotal: product.price * quantity
            })),
            subtotal: this.getSubtotal(),
            discount: this.getDiscountAmount(),
            tax: this.getTaxAmount(),
            total: this.getTotal(),
            currency
        };
    }
}

// 创建商品
const products = [
    {id: 1, name: "MacBook Pro", price: 15999},
    {id: 2, name: "iPhone 15", price: 5999},
    {id: 3, name: "AirPods", price: 1299}
];

// 创建购物车并添加商品
const cart = new ShoppingCart('CNY');
cart.addItem(products[0], 1)
    .addItem(products[1], 2)
    .addItem(products[2], 1);

// 应用折扣
cart.applyDiscount(subtotal => subtotal > 20000 ? subtotal * 0.1 : 0); // 满20000减10%
cart.applyDiscount(subtotal => 500); // 固定减500

console.log("购物车摘要:", cart.getSummary());

// 练习5：异步任务管理器（使用Promise和async/await）
console.log("\n⏰ 练习5：异步任务管理器");

class TaskManager {
    constructor() {
        this.tasks = new Map();
        this.taskId = 0;
    }
    
    // 创建延迟任务
    createDelayedTask(name, delay, result = null) {
        const id = ++this.taskId;
        const promise = new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                if (Math.random() > 0.1) { // 90% 成功率
                    resolve({id, name, result: result || `${name} 执行成功`, delay});
                } else {
                    reject(new Error(`${name} 执行失败`));
                }
            }, delay);
            
            this.tasks.set(id, {
                id, name, delay, promise, timeoutId,
                status: 'pending',
                startTime: Date.now()
            });
        });
        
        // 更新任务状态
        promise
            .then(result => this.tasks.get(id).status = 'completed')
            .catch(error => this.tasks.get(id).status = 'failed');
            
        return {id, promise};
    }
    
    // 并行执行多个任务
    async runParallel(tasks) {
        console.log(`开始并行执行 ${tasks.length} 个任务...`);
        const startTime = Date.now();
        
        try {
            const results = await Promise.all(tasks.map(task => task.promise));
            const endTime = Date.now();
            console.log(`并行任务完成，耗时: ${endTime - startTime}ms`);
            return results;
        } catch (error) {
            console.error("并行任务中有失败:", error.message);
            throw error;
        }
    }
    
    // 顺序执行任务
    async runSequential(tasks) {
        console.log(`开始顺序执行 ${tasks.length} 个任务...`);
        const startTime = Date.now();
        const results = [];
        
        for (const task of tasks) {
            try {
                const result = await task.promise;
                results.push(result);
                console.log(`任务 ${result.name} 完成`);
            } catch (error) {
                console.error(`任务失败: ${error.message}`);
                results.push({error: error.message});
            }
        }
        
        const endTime = Date.now();
        console.log(`顺序任务完成，耗时: ${endTime - startTime}ms`);
        return results;
    }
    
    // 获取任务状态
    getTaskStatus() {
        const stats = {pending: 0, completed: 0, failed: 0};
        for (const task of this.tasks.values()) {
            stats[task.status]++;
        }
        return stats;
    }
}

// 使用任务管理器
const taskManager = new TaskManager();

// 创建任务
const task1 = taskManager.createDelayedTask("数据获取", 1000);
const task2 = taskManager.createDelayedTask("图像处理", 1500);
const task3 = taskManager.createDelayedTask("文件上传", 800);

// 并行执行演示
async function demonstrateTaskManager() {
    try {
        // 并行执行
        const parallelResults = await taskManager.runParallel([task1, task2, task3]);
        console.log("并行结果:", parallelResults.map(r => r.name));
        
        // 创建新任务用于顺序执行演示
        const task4 = taskManager.createDelayedTask("任务4", 500);
        const task5 = taskManager.createDelayedTask("任务5", 300);
        
        // 顺序执行
        await taskManager.runSequential([task4, task5]);
        
        // 显示统计信息
        console.log("任务统计:", taskManager.getTaskStatus());
        
    } catch (error) {
        console.error("任务管理器演示失败:", error.message);
    }
}

// 启动演示（注释掉异步部分，避免输出延迟）
// demonstrateTaskManager();
console.log("异步任务管理器创建完成（可在浏览器中测试完整功能）");

// 练习6：函数组合与管道（高阶函数应用）
console.log("\n🔧 练习6：函数组合与管道");

// 函数组合工具
const compose = (...fns) => value => fns.reduceRight((acc, fn) => fn(acc), value);
const pipe = (...fns) => value => fns.reduce((acc, fn) => fn(acc), value);

// 基础函数
const add = x => y => x + y;
const multiply = x => y => x * y;
const square = x => x * x;
const toString = x => x.toString();
const toUpperCase = str => str.toUpperCase();
const addPrefix = prefix => str => `${prefix}${str}`;

// 数学运算组合
const mathOperation = compose(
    toString,
    square,
    add(10),
    multiply(2)
);

console.log("组合函数 compose(toString, square, add(10), multiply(2))(3):", mathOperation(3));

// 字符串处理管道
const stringPipeline = pipe(
    toString,
    toUpperCase,
    addPrefix("RESULT: ")
);

console.log("管道函数 pipe(toString, toUpperCase, addPrefix)(42):", stringPipeline(42));

// 数据处理管道
const processData = pipe(
    data => data.filter(x => x % 2 === 0), // 过滤偶数
    data => data.map(x => x * 2),          // 翻倍
    data => data.reduce((sum, x) => sum + x, 0) // 求和
);

console.log("数据处理管道 [1,2,3,4,5,6] ->", processData([1, 2, 3, 4, 5, 6]));

console.log("\n=== 综合练习完成 ===");
console.log("🎉 恭喜！你已经掌握了JavaScript函数和ES6的核心概念");
console.log("💪 现在你可以开始更复杂的项目开发了！");
