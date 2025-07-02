# React Hooks 更新模式对比：独立更新 vs 共享更新

## 1. 独立更新模式

独立更新模式指每个组件实例都维护自己的状态，互不影响。这是 React Hooks 的默认行为。

### 示例代码：

```jsx
import { useState } from 'react';

// 计数器组件
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
    </div>
  );
}

// 父组件
function App() {
  return (
    <div>
      <Counter /> {/* 计数器 A */}
      <Counter /> {/* 计数器 B */}
    </div>
  );
}
```

### 特点：
- 每个 `Counter` 组件都有自己独立的 `count` 状态
- 点击按钮只会更新当前组件的计数，不会影响其他组件
- 适用于组件需要维护独立状态的场景

## 2. 共享更新模式

共享更新模式指多个组件共享同一个状态，任何组件更新状态都会影响所有相关组件。

### 示例代码：

```jsx
import { useState, createContext, useContext } from 'react';

// 创建 Context
const CountContext = createContext();

// 计数器组件
function Counter() {
  const { count, setCount } = useContext(CountContext);
  
  return (
    <div>
      <p>共享计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
    </div>
  );
}

// 父组件
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <CountContext.Provider value={{ count, setCount }}>
      <Counter /> {/* 计数器 A */}
      <Counter /> {/* 计数器 B */}
    </CountContext.Provider>
  );
}
```

### 特点：
- 所有 `Counter` 组件共享同一个 `count` 状态
- 任何组件更新状态都会影响所有使用该状态的组件
- 适用于多个组件需要同步状态的场景

## 3. 使用场景对比

### 独立更新适用于：
- 表单输入控件
- 列表中的独立项目
- 独立的计数器、开关等UI组件

### 共享更新适用于：
- 主题切换
- 用户登录状态
- 购物车数据
- 全局配置

## 4. 实现方式对比

### 独立更新：
- 使用 `useState` Hook
- 状态存在于组件内部
- 简单直接，无需额外配置

### 共享更新：
1. **使用 Context**：
   - 创建 Context
   - 使用 Provider 包裹组件
   - 通过 useContext 消费数据

2. **状态提升**：
   - 将状态提升到共同的父组件
   - 通过 props 传递状态和更新函数

## 5. 注意事项

### 独立更新注意点：
- 确保组件确实需要独立状态
- 注意避免重复的状态逻辑

### 共享更新注意点：
- 避免不必要的共享状态（可能导致过度渲染）
- Context 的粒度要适中
- Provider 的位置要合适，避免不必要的重渲染

## 6. 性能优化

### 独立更新模式的优化：
- 使用 `useMemo` 缓存计算结果
- 使用 `useCallback` 缓存回调函数
- 适当使用 `React.memo` 避免不必要的重渲染

```jsx
import { useState, useMemo, useCallback } from 'react';

function OptimizedCounter() {
  const [count, setCount] = useState(0);
  
  // 缓存计算结果
  const doubleCount = useMemo(() => count * 2, [count]);
  
  // 缓存回调函数
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  return (
    <div>
      <p>计数：{count}</p>
      <p>双倍：{doubleCount}</p>
      <button onClick={handleIncrement}>增加</button>
    </div>
  );
}
```

### 共享更新模式的优化：
1. **拆分 Context**：
   - 将不同类型的状态放在不同的 Context 中
   - 避免一个状态变化导致所有消费组件重渲染

2. **使用 Provider 分层**：
```jsx
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          {/* 组件树 */}
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
```

3. **使用 React.memo 和 useMemo**：
```jsx
const MemoizedCounter = React.memo(function Counter({ value, onIncrement }) {
  return (
    <div>
      <p>计数：{value}</p>
      <button onClick={onIncrement}>增加</button>
    </div>
  );
});
```

## 7. 最佳实践总结

### 选择更新模式的原则：
1. **就近原则**：如果状态只在一个组件或其直接子组件中使用，使用独立更新
2. **最小影响**：选择影响范围最小的更新模式
3. **性能优先**：考虑更新模式对性能的影响

### 实施建议：
1. **渐进增强**：
   - 开始时使用简单的独立更新
   - 需要时再升级为共享更新
   - 按需添加性能优化

2. **状态管理策略**：
   - 对于小型应用，useState + Context 足够
   - 中大型应用考虑使用状态管理库
   - 注意状态的颗粒度和组织方式

3. **代码组织**：
   - 相关的状态逻辑放在一起
   - 使用自定义 Hook 封装复杂的状态逻辑
   - 保持组件的单一职责
