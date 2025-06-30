// 🎭 JavaScript 闭包深度解析
// 闭包是JavaScript最重要且最难理解的概念之一

console.log("=== 闭包 (Closure) 深度学习 ===");

// 1. 什么是闭包？
console.log("\n📚 1. 闭包基本概念：");
console.log("闭包 = 函数 + 函数能够访问的外部变量环境");
console.log("简单说：内部函数可以访问外部函数的变量，即使外部函数已经执行完毕");

// 2. 最简单的闭包示例
console.log("\n🔍 2. 最简单的闭包：");

function outerFunction(x) {
    // 外部函数的变量
    let outerVariable = x;
    
    // 内部函数（闭包）
    function innerFunction(y) {
        // 可以访问外部函数的变量
        return outerVariable + y;
    }
    
    return innerFunction;
}

const closure = outerFunction(10);
console.log("闭包调用结果:", closure(5)); // 15
console.log("outerFunction已执行完，但closure仍能访问outerVariable");

// 3. 经典闭包问题 - 循环中的闭包
console.log("\n⚠️ 3. 经典闭包陷阱：");

// 问题代码：使用 var
console.log("问题：var 在循环中的闭包陷阱");
var funcsWithVar = [];
for (var i = 0; i < 3; i++) {
    funcsWithVar[i] = function() {
        return i; // 这里的 i 是同一个变量的引用
    };
}

// 所有函数都返回 3（循环结束时i的值）
console.log("var 结果:", funcsWithVar[0](), funcsWithVar[1](), funcsWithVar[2]());

// 解决方案1：使用 let
console.log("解决方案1：使用 let");
var funcsWithLet = [];
for (let j = 0; j < 3; j++) {
    funcsWithLet[j] = function() {
        return j; // 每次循环 j 都是新的块级作用域变量
    };
}
console.log("let 结果:", funcsWithLet[0](), funcsWithLet[1](), funcsWithLet[2]());

// 解决方案2：立即执行函数表达式(IIFE)
console.log("解决方案2：使用 IIFE");
var funcsWithIIFE = [];
for (var k = 0; k < 3; k++) {
    funcsWithIIFE[k] = (function(index) {
        return function() {
            return index; // 每个函数都有自己的 index 副本
        };
    })(k);
}
console.log("IIFE 结果:", funcsWithIIFE[0](), funcsWithIIFE[1](), funcsWithIIFE[2]());

// 4. 实用闭包模式 - 模块模式
console.log("\n🏗️ 4. 模块模式（私有变量）：");

function createModule(moduleName) {
    // 私有变量（外部无法直接访问）
    let privateVariable = 0;
    let privateArray = [];
    
    // 私有方法
    function privateMethod() {
        return "这是私有方法";
    }
    
    // 返回公共接口
    return {
        // 公共方法
        publicMethod: function() {
            return `${moduleName} 模块：${privateMethod()}`;
        },
        
        increment: function() {
            privateVariable++;
            return privateVariable;
        },
        
        decrement: function() {
            privateVariable--;
            return privateVariable;
        },
        
        getValue: function() {
            return privateVariable;
        },
        
        addToArray: function(item) {
            privateArray.push(item);
            return privateArray.length;
        },
        
        getArray: function() {
            return [...privateArray]; // 返回副本，保护原数组
        },
        
        reset: function() {
            privateVariable = 0;
            privateArray = [];
            return "模块已重置";
        }
    };
}

const myModule = createModule("计数器");
console.log(myModule.publicMethod());
console.log("递增:", myModule.increment());
console.log("递增:", myModule.increment());
console.log("获取值:", myModule.getValue());
console.log("添加元素:", myModule.addToArray("item1"));
console.log("添加元素:", myModule.addToArray("item2"));
console.log("获取数组:", myModule.getArray());
console.log(myModule.reset());

// 5. 闭包计数器的多种实现
console.log("\n🔢 5. 闭包计数器的各种实现：");

// 基础计数器
function createBasicCounter(initialValue = 0) {
    let count = initialValue;
    return function() {
        return ++count;
    };
}

// 功能完整的计数器
function createAdvancedCounter(initialValue = 0, step = 1) {
    let count = initialValue;
    
    return {
        next: () => count += step,
        prev: () => count -= step,
        get: () => count,
        set: (value) => count = value,
        reset: () => count = initialValue,
        step: (newStep) => step = newStep
    };
}

// 支持多个实例的计数器工厂
function CounterFactory() {
    let instances = [];
    
    return {
        create: function(name, initialValue = 0) {
            const counter = {
                name: name,
                value: initialValue,
                increment: () => ++counter.value,
                decrement: () => --counter.value,
                get: () => counter.value
            };
            instances.push(counter);
            return counter;
        },
        
        getAllCounters: () => instances.map(c => ({name: c.name, value: c.value})),
        
        getTotalValue: () => instances.reduce((sum, c) => sum + c.value, 0)
    };
}

const basicCounter = createBasicCounter(5);
console.log("基础计数器:", basicCounter(), basicCounter(), basicCounter());

const advancedCounter = createAdvancedCounter(10, 2);
console.log("高级计数器 - next:", advancedCounter.next());
console.log("高级计数器 - next:", advancedCounter.next());
console.log("高级计数器 - prev:", advancedCounter.prev());
console.log("高级计数器 - get:", advancedCounter.get());

const factory = CounterFactory();
const counter1 = factory.create("计数器1", 0);
const counter2 = factory.create("计数器2", 100);
counter1.increment();
counter1.increment();
counter2.decrement();
console.log("计数器工厂:", factory.getAllCounters());
console.log("总计:", factory.getTotalValue());

// 6. 闭包在事件处理中的应用
console.log("\n🎯 6. 闭包在事件处理中的应用：");

function createEventHandler(elementId, eventType) {
    let clickCount = 0;
    
    return function(event) {
        clickCount++;
        console.log(`元素 ${elementId} 的 ${eventType} 事件被触发第 ${clickCount} 次`);
        
        // 返回一个包含状态的对象
        return {
            elementId: elementId,
            eventType: eventType,
            clickCount: clickCount,
            timestamp: new Date().toISOString()
        };
    };
}

// 模拟事件处理
const buttonHandler = createEventHandler("myButton", "click");
console.log("模拟点击事件:");
console.log(buttonHandler({ target: "button" }));
console.log(buttonHandler({ target: "button" }));
console.log(buttonHandler({ target: "button" }));

// 7. 闭包实现缓存（记忆化）
console.log("\n💾 7. 闭包实现缓存功能：");

function memoize(fn) {
    const cache = {};
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (key in cache) {
            console.log(`从缓存获取: ${key}`);
            return cache[key];
        }
        
        console.log(`计算并缓存: ${key}`);
        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
    };
}

// 斐波那契函数（递归，性能较差）
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 使用缓存优化的斐波那契函数
const memoizedFibonacci = memoize(function(n) {
    if (n <= 1) return n;
    return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
});

console.log("缓存演示:");
console.log("第一次计算 fib(10):", memoizedFibonacci(10));
console.log("第二次计算 fib(10):", memoizedFibonacci(10)); // 从缓存获取
console.log("计算 fib(11):", memoizedFibonacci(11)); // 会使用之前缓存的 fib(10)

// 8. 闭包实现防抖和节流
console.log("\n⏱️ 8. 防抖和节流函数：");

// 防抖函数：延迟执行，如果在延迟期间再次调用，则重新开始计时
function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// 节流函数：限制函数执行频率
function throttle(func, limit) {
    let inThrottle;
    
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 测试函数
function testFunction(message) {
    console.log(`执行: ${message} - ${new Date().toLocaleTimeString()}`);
}

const debouncedFunction = debounce(testFunction, 1000);
const throttledFunction = throttle(testFunction, 1000);

console.log("防抖测试（1秒内多次调用只执行最后一次）:");
debouncedFunction("防抖1");
setTimeout(() => debouncedFunction("防抖2"), 500);
setTimeout(() => debouncedFunction("防抖3"), 800);

console.log("节流测试（1秒内最多执行一次）:");
throttledFunction("节流1");
setTimeout(() => throttledFunction("节流2"), 500);
setTimeout(() => throttledFunction("节流3"), 800);

// 9. 闭包的内存管理
console.log("\n🧠 9. 闭包的内存管理：");

function createMemoryDemo() {
    let data = new Array(1000000).fill("大量数据"); // 模拟大量数据
    let smallData = "小数据";
    
    // 好的做法：只返回需要的数据
    return {
        getSmallData: () => smallData,
        getDataSize: () => data.length,
        cleanup: () => {
            data = null; // 手动清理大数据
            console.log("大数据已清理");
        }
    };
}

const memoryDemo = createMemoryDemo();
console.log("小数据:", memoryDemo.getSmallData());
console.log("数据大小:", memoryDemo.getDataSize());
memoryDemo.cleanup(); // 清理内存

// 10. 闭包最佳实践总结
console.log("\n✅ 10. 闭包最佳实践：");

console.log(`
闭包最佳实践：

1. 🎯 明确目的：
   - 创建私有变量和方法
   - 实现模块模式
   - 保持状态

2. 🚫 避免陷阱：
   - 循环中的闭包问题
   - 内存泄漏（及时清理不需要的引用）
   - 过度使用导致性能问题

3. 💡 实用场景：
   - 事件处理器
   - 回调函数
   - 函数工厂
   - 缓存和记忆化
   - 防抖和节流

4. 🔧 调试技巧：
   - 使用 console.log 跟踪变量
   - 理解作用域链
   - 注意 this 指向问题
`);

console.log("\n=== 闭包学习完成 ===");
console.log("🎉 恭喜！你已经掌握了JavaScript最重要的概念之一");
console.log("💪 现在你可以使用闭包创建强大而优雅的代码了！");
