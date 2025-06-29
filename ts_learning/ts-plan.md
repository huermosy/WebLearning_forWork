# 🛡️ TypeScript 护甲铸造（5天出师）

**目标**：类型系统 + 接口 + 泛型 + React集成

## 🔍 前置要求
- JavaScript + React 基础

## 📅 详细学习计划

### Day 1：类型基础与类型推断

#### 1. 什么是 TypeScript？
- **一句话概括**：它是加了 “类型系统” 的 JavaScript。就像给你的代码穿上了一层智能盔甲，可以在你写代码的时候就发现很多潜在的错误。
- **核心优势**：代码更健壮、可读性更高、编辑器支持更强大（自动补全、错误提示）。

#### 2. 基本类型与类型注解
- **类型注解**：使用 `: 类型` 的语法，明确告诉 TS 这个变量应该是什么类型。

```typescript
let heroName: string = "蜘蛛侠";    // 字符串
let age: number = 25;             // 数字
let hasSuperPower: boolean = true;  // 布尔值
let skills: string[] = ["吐丝", "爬墙"]; // 字符串数组

// 如果你尝试给它一个错误的类型，TS会立刻报错
// heroName = 123; // Error!
```

#### 3. 类型推断
- 如果你声明变量时就赋值，TS 会足够聪明地 **推断** 出它的类型，此时可以省略类型注解。

```typescript
let city = "纽约"; // TS 会自动推断出 city 是 string 类型
```

#### 4. 联合类型与类型别名
- **联合类型 (`|`)**：表示一个值可以是多种类型之一。
- **类型别名 (`type`)**：给一个复杂的类型起一个别名，方便复用。

```typescript
// ID 可以是数字或字符串
type UserID = string | number;

let myId: UserID = "12345";
myId = 54321; // 也可以是数字
```

#### 5. 今日实战练习
- **任务**：写一个类型安全的加法函数，它只接受数字作为参数，并返回数字。

```typescript
function add(a: number, b: number): number {
  return a + b;
}

const result = add(5, 10); // 15
// const errorResult = add('5', '10'); // TS 会在这里报错，防止了运行时错误
```

---

### Day 2：接口与类型约束

#### 1. `interface`：定义对象的 “形状”
- `interface` 用来描述一个对象应该包含哪些属性和方法。

```typescript
interface User {
  readonly id: number; // readonly 表示这个属性一旦赋值就不能修改
  name: string;
  age?: number; // ? 表示这个属性是可选的
  sayHello: () => void; // 一个不返回任何值的方法
}

const user: User = {
  id: 1,
  name: "钢铁侠",
  sayHello: () => {
    console.log("Hello, I am Iron Man.");
  },
};

// user.id = 2; // Error! 因为 id 是只读的
```

#### 2. `interface` vs `type`
- **共同点**：都能描述对象或函数的形状。
- **不同点**：`interface` 可以被 “继承” 和 “合并”，更适合定义公共的 API 形状。`type` 更灵活，适合定义联合类型、元组等。
- **建议**：能用 `interface` 的地方就用 `interface`，其他情况用 `type`。

#### 3. 今日实战练习
- **任务**：定义一个“英雄”接口 `Hero`，包含 `name` (string) 和 `skills` (string 数组) 属性。然后创建一个函数，接收一个符合 `Hero` 接口的对象，并打印出英雄的名字和他的第一个技能。

```typescript
interface Hero {
  name: string;
  skills: string[];
}

function printFirstSkill(hero: Hero) {
  console.log(`英雄: ${hero.name}`);
  console.log(`第一个技能: ${hero.skills[0] || '没有技能'}`);
}

const thor: Hero = { name: "雷神", skills: ["雷电风暴", "喵喵锤"] };
printFirstSkill(thor);
```

---

### Day 3：泛型与类型工具

#### 1. 泛型：类型的 “参数”
- **泛型** 允许你在定义函数或类的时候不预先指定具体的类型，而在使用的时候再指定。这大大增强了代码的复用性。

```typescript
// T 是一个类型变量，像一个占位符
function wrapInArray<T>(input: T): T[] {
  return [input];
}

const stringArray = wrapInArray("hello"); // T 被推断为 string，返回 string[]
const numberArray = wrapInArray(123);   // T 被推断为 number，返回 number[]
```

#### 2. 常用类型工具
- TypeScript 内置了很多方便的类型工具，用于转换和操作现有类型。
  - `Partial<T>`：将 `T` 的所有属性变为可选。
  - `Pick<T, K>`：从 `T` 中挑选出指定的属性 `K` 来创建一个新类型。

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// 更新一个 todo，我们可能只需要部分属性
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const myTodo: Todo = { title: '学习TS', description: '...', completed: false };
const updatedTodo = updateTodo(myTodo, { completed: true });
```

#### 3. 今日实战练习
- **任务**：实现一个泛型 `Queue` (队列) 类，它应该有 `enqueue` (入队) 和 `dequeue` (出队) 两个方法。

```typescript
class Queue<T> {
  private data: T[] = [];

  enqueue(item: T): void {
    this.data.push(item);
  }

  dequeue(): T | undefined {
    return this.data.shift();
  }
}

const numberQueue = new Queue<number>();
numberQueue.enqueue(1);
numberQueue.enqueue(2);
console.log(numberQueue.dequeue()); // 1

const stringQueue = new Queue<string>();
stringQueue.enqueue("A");
console.log(stringQueue.dequeue()); // "A"
```

---

### Day 4：TypeScript 与 React 集成

#### 1. 给组件 Props 添加类型
- 这是在 React 中使用 TS 最核心的部分。通过给 `props` 定义类型，你可以确保组件被正确地使用。

```tsx
// 定义 Props 的类型
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

// React.FC (Function Component) 是一个泛型，用于定义函数组件
const MyButton: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
```

#### 2. `useState` 的类型
- `useState` 通常能自动推断类型。如果初始值是 `null` 或 `undefined`，你可能需要手动指定类型。

```tsx
// 类型被自动推断为 number
const [count, setCount] = useState(0);

// 需要手动指定类型，因为初始值是 null
interface UserProfile { name: string; email: string; }
const [user, setUser] = useState<UserProfile | null>(null);
```

#### 3. 事件对象类型
- React 的事件对象也有自己的类型，比如 `React.MouseEvent` (鼠标事件) 和 `React.ChangeEvent` (表单输入变化事件)。

#### 4. 今日实战练习
- **任务**：用 TS 重写一个“计数器”组件，`props` 可以控制每次增加的步长 `step`。

```tsx
import { useState } from 'react';

interface CounterProps {
  initialValue?: number;
  step?: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue = 0, step = 1 }) => {
  const [count, setCount] = useState(initialValue);

  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    // e 的类型是 React.MouseEvent<HTMLButtonElement>
    setCount(prevCount => prevCount + step);
  };

  return (
    <div>
      <p>当前计数值: {count}</p>
      <button onClick={handleIncrement}>+{step}</button>
    </div>
  );
};

// 使用
// <Counter step={5} />
```

---

### Day 5：实战与类型防御

#### 1. 类型守卫 (Type Guards)
- 当你有一个联合类型时，类型守卫可以帮助你在代码块中 **收窄** 类型范围，从而安全地访问特定类型的属性。

```typescript
function printId(id: string | number) {
  if (typeof id === 'string') {
    // 在这个代码块里，TS 知道 id 是 string
    console.log(id.toUpperCase());
  } else {
    // 在这里，TS 知道 id 是 number
    console.log(id.toFixed(2));
  }
}
```

#### 2. 类型断言 (Type Assertion)
- 有时候你比 TS 更清楚一个值的类型。类型断言允许你 **强制** 告诉 TS “相信我，我知道这是什么类型”。请谨慎使用，因为它会绕过类型检查。

```typescript
const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement;
```

#### 3. `tsconfig.json`
- 这是 TS 项目的配置文件，它告诉 TS 编译器如何工作。最重要的配置项是 `compilerOptions`，其中 `"strict": true` 是最佳实践，它会开启所有严格的类型检查选项。

#### 4. 今日实战练习
- **任务**：将你在 React 学习中写的 `Todo` (待办事项) JavaScript 组件，用 TypeScript 进行完全重构。为 `todo` 项定义 `interface`，为所有 `props` 和事件处理函数添加类型。

## 📚 资源推荐
- 类型游乐场：[TypeScript Playground](https://www.typescriptlang.org/play)
- 官方指南：[TS for JS Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- 实战类型：[React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
