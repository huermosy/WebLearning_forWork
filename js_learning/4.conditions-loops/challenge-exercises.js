// 🏆 JavaScript 条件判断与循环挑战练习
// 完成这些练习来测试你的掌握程度

console.log("=== 🏆 条件判断与循环挑战练习 ===");

// 挑战1：智能成绩分析器
console.log("\n🎯 挑战1：智能成绩分析器");

function analyzeGrades(scores) {
    const analysis = {
        total: scores.length,
        average: 0,
        highest: 0,
        lowest: 100,
        aCount: 0,
        bCount: 0,
        cCount: 0,
        dCount: 0,
        fCount: 0,
        passRate: 0
    };
    
    let sum = 0;
    
    for (const score of scores) {
        // 计算总分
        sum += score;
        
        // 找最高分和最低分
        if (score > analysis.highest) analysis.highest = score;
        if (score < analysis.lowest) analysis.lowest = score;
        
        // 等级统计
        if (score >= 90) {
            analysis.aCount++;
        } else if (score >= 80) {
            analysis.bCount++;
        } else if (score >= 70) {
            analysis.cCount++;
        } else if (score >= 60) {
            analysis.dCount++;
        } else {
            analysis.fCount++;
        }
    }
    
    analysis.average = sum / scores.length;
    analysis.passRate = ((analysis.total - analysis.fCount) / analysis.total * 100);
    
    return analysis;
}

// 测试成绩分析器
const testScores = [95, 87, 92, 78, 85, 91, 76, 88, 94, 82, 89, 77, 93, 86, 79];
const result = analyzeGrades(testScores);

console.log("成绩分析结果:");
console.log(`总人数: ${result.total}`);
console.log(`平均分: ${result.average.toFixed(1)}`);
console.log(`最高分: ${result.highest}, 最低分: ${result.lowest}`);
console.log(`等级分布: A(${result.aCount}) B(${result.bCount}) C(${result.cCount}) D(${result.dCount}) F(${result.fCount})`);
console.log(`及格率: ${result.passRate.toFixed(1)}%`);

// 挑战2：图案生成器
console.log("\n🎨 挑战2：图案生成器");

function generateTriangle(height, char = '*') {
    console.log(`生成高度为${height}的三角形:`);
    for (let i = 1; i <= height; i++) {
        let spaces = ' '.repeat(height - i);
        let stars = char.repeat(2 * i - 1);
        console.log(spaces + stars);
    }
}

function generateDiamond(size, char = '♦') {
    console.log(`生成大小为${size}的菱形:`);
    
    // 上半部分（包括中间）
    for (let i = 1; i <= size; i++) {
        let spaces = ' '.repeat(size - i);
        let diamonds = char.repeat(2 * i - 1);
        console.log(spaces + diamonds);
    }
    
    // 下半部分
    for (let i = size - 1; i >= 1; i--) {
        let spaces = ' '.repeat(size - i);
        let diamonds = char.repeat(2 * i - 1);
        console.log(spaces + diamonds);
    }
}

generateTriangle(5);
console.log();
generateDiamond(4);

// 挑战3：密码强度检测器
console.log("\n🔐 挑战3：密码强度检测器");

function checkPasswordStrength(password) {
    const checks = {
        length: password.length >= 8,
        hasLower: /[a-z]/.test(password),
        hasUpper: /[A-Z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        noRepeat: !/(.)\1{2,}/.test(password), // 不能有3个连续相同字符
        noSequence: !/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789)/i.test(password)
    };
    
    const score = Object.values(checks).filter(Boolean).length;
    let strength;
    
    if (score <= 2) {
        strength = "弱";
    } else if (score <= 4) {
        strength = "中等";
    } else if (score <= 6) {
        strength = "强";
    } else {
        strength = "非常强";
    }
    
    return {
        password: password,
        score: score,
        maxScore: 7,
        strength: strength,
        checks: checks,
        suggestions: getSuggestions(checks)
    };
}

function getSuggestions(checks) {
    const suggestions = [];
    if (!checks.length) suggestions.push("密码长度至少8位");
    if (!checks.hasLower) suggestions.push("添加小写字母");
    if (!checks.hasUpper) suggestions.push("添加大写字母");
    if (!checks.hasNumber) suggestions.push("添加数字");
    if (!checks.hasSpecial) suggestions.push("添加特殊字符 (!@#$%^&*等)");
    if (!checks.noRepeat) suggestions.push("避免连续重复字符");
    if (!checks.noSequence) suggestions.push("避免连续字符序列");
    return suggestions;
}

// 测试密码强度
const testPasswords = [
    "123456",
    "password",
    "Password123",
    "MyP@ssw0rd!",
    "Sup3r$3cur3P@ss!"
];

testPasswords.forEach(pwd => {
    const result = checkPasswordStrength(pwd);
    console.log(`\n密码: "${result.password}"`);
    console.log(`强度: ${result.strength} (${result.score}/${result.maxScore})`);
    if (result.suggestions.length > 0) {
        console.log(`建议: ${result.suggestions.join(', ')}`);
    }
});

// 挑战4：数字序列分析器
console.log("\n🔢 挑战4：数字序列分析器");

function analyzeSequence(numbers) {
    const analysis = {
        isArithmetic: false,
        isGeometric: false,
        isFibonacci: false,
        isPrime: false,
        commonDifference: null,
        commonRatio: null,
        pattern: "未知模式"
    };
    
    // 检查等差数列
    if (numbers.length >= 2) {
        const diff = numbers[1] - numbers[0];
        analysis.isArithmetic = numbers.every((num, i) => 
            i === 0 || num - numbers[i-1] === diff
        );
        if (analysis.isArithmetic) {
            analysis.commonDifference = diff;
            analysis.pattern = `等差数列 (公差: ${diff})`;
        }
    }
    
    // 检查等比数列
    if (numbers.length >= 2 && numbers[0] !== 0) {
        const ratio = numbers[1] / numbers[0];
        analysis.isGeometric = numbers.every((num, i) => 
            i === 0 || Math.abs(num / numbers[i-1] - ratio) < 0.0001
        );
        if (analysis.isGeometric) {
            analysis.commonRatio = ratio;
            analysis.pattern = `等比数列 (公比: ${ratio})`;
        }
    }
    
    // 检查斐波那契数列
    if (numbers.length >= 3) {
        analysis.isFibonacci = numbers.every((num, i) => 
            i < 2 || num === numbers[i-1] + numbers[i-2]
        );
        if (analysis.isFibonacci) {
            analysis.pattern = "斐波那契数列";
        }
    }
    
    // 检查质数序列
    analysis.isPrime = numbers.every(isPrime);
    if (analysis.isPrime) {
        analysis.pattern = "质数序列";
    }
    
    return analysis;
}

function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

// 测试序列分析
const sequences = [
    [2, 5, 8, 11, 14],      // 等差数列
    [1, 3, 9, 27, 81],      // 等比数列
    [0, 1, 1, 2, 3, 5, 8],  // 斐波那契数列
    [2, 3, 5, 7, 11],       // 质数序列
    [1, 4, 9, 16, 25]       // 完全平方数
];

sequences.forEach((seq, index) => {
    const result = analyzeSequence(seq);
    console.log(`\n序列${index + 1}: [${seq.join(', ')}]`);
    console.log(`模式: ${result.pattern}`);
});

// 挑战5：智能排序比较器
console.log("\n🔄 挑战5：智能排序比较器");

function bubbleSort(arr) {
    const array = [...arr]; // 复制数组
    let comparisons = 0;
    let swaps = 0;
    
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            comparisons++;
            if (array[j] > array[j + 1]) {
                // 交换元素
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swaps++;
            }
        }
    }
    
    return { array, comparisons, swaps };
}

function selectionSort(arr) {
    const array = [...arr];
    let comparisons = 0;
    let swaps = 0;
    
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < array.length; j++) {
            comparisons++;
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            swaps++;
        }
    }
    
    return { array, comparisons, swaps };
}

function insertionSort(arr) {
    const array = [...arr];
    let comparisons = 0;
    let swaps = 0;
    
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        
        while (j >= 0) {
            comparisons++;
            if (array[j] > key) {
                array[j + 1] = array[j];
                swaps++;
                j--;
            } else {
                break;
            }
        }
        array[j + 1] = key;
    }
    
    return { array, comparisons, swaps };
}

// 测试排序算法
const testArray = [64, 34, 25, 12, 22, 11, 90, 88, 76, 50, 42];
console.log(`原数组: [${testArray.join(', ')}]`);

const bubbleResult = bubbleSort(testArray);
const selectionResult = selectionSort(testArray);
const insertionResult = insertionSort(testArray);

console.log("\n排序算法性能比较:");
console.log(`冒泡排序: 比较${bubbleResult.comparisons}次, 交换${bubbleResult.swaps}次`);
console.log(`选择排序: 比较${selectionResult.comparisons}次, 交换${selectionResult.swaps}次`);
console.log(`插入排序: 比较${insertionResult.comparisons}次, 交换${insertionResult.swaps}次`);

// 挑战6：数独验证器
console.log("\n🧩 挑战6：数独验证器");

function validateSudoku(board) {
    // 检查行
    function isValidGroup(group) {
        const filtered = group.filter(num => num !== 0);
        return filtered.length === new Set(filtered).size;
    }
    
    // 检查所有行
    for (let row = 0; row < 9; row++) {
        if (!isValidGroup(board[row])) {
            return { valid: false, error: `第${row + 1}行有重复数字` };
        }
    }
    
    // 检查所有列
    for (let col = 0; col < 9; col++) {
        const column = [];
        for (let row = 0; row < 9; row++) {
            column.push(board[row][col]);
        }
        if (!isValidGroup(column)) {
            return { valid: false, error: `第${col + 1}列有重复数字` };
        }
    }
    
    // 检查所有3x3方格
    for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
            const box = [];
            for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
                for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
                    box.push(board[row][col]);
                }
            }
            if (!isValidGroup(box)) {
                return { 
                    valid: false, 
                    error: `第${boxRow + 1}行第${boxCol + 1}列的3x3方格有重复数字` 
                };
            }
        }
    }
    
    return { valid: true, error: null };
}

// 测试数独（简化版，部分填充）
const sudokuBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const sudokuResult = validateSudoku(sudokuBoard);
console.log(`数独验证结果: ${sudokuResult.valid ? '有效' : '无效'}`);
if (!sudokuResult.valid) {
    console.log(`错误: ${sudokuResult.error}`);
}

// 挑战完成总结
console.log("\n🏆 挑战练习完成总结");
console.log("你已经完成了以下挑战:");
console.log("✅ 智能成绩分析器 - 数据统计与分析");
console.log("✅ 图案生成器 - 嵌套循环应用");
console.log("✅ 密码强度检测器 - 复杂条件判断");
console.log("✅ 数字序列分析器 - 模式识别");
console.log("✅ 智能排序比较器 - 算法实现与性能分析");
console.log("✅ 数独验证器 - 多重循环与逻辑验证");
console.log("\n🎉 恭喜！你已经掌握了条件判断与循环的高级应用！");
console.log("💪 现在你有能力解决复杂的编程问题了！");
