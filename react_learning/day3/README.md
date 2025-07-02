# ⚛️ React Hooks 完全学习指南

欢迎来到React Hooks的世界！这里将带你从零开始，深入理解和掌握React Hooks的核心概念和实际应用。

## 🎯 学习目标

完成本模块学习后，你将能够：
- 🔥 熟练使用useState和useEffect这两个最核心的Hooks
- 🚀 理解Hooks的设计理念和使用规则
- 💪 编写自定义Hooks来复用状态逻辑
- 🛠️ 在实际项目中灵活运用各种Hooks
- 🧠 理解Hooks与类组件的区别和优势

## 📚 什么是Hooks？

### 核心概念
Hooks是React 16.8引入的新特性，它让你在**函数组件**中使用状态和其他React特性。

### 为什么需要Hooks？
```javascript
// 😰 传统类组件的问题
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.increment = this.increment.bind(this); // 需要绑定this
  }
  
  increment() {
    this.setState({ count: this.state.count + 1 });
  }
  
  componentDidMount() {
    document.title = `计数: ${this.state.count}`;
  }
  
  componentDidUpdate() {
    document.title = `计数: ${this.state.count}`;
  }
  
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.increment}>+1</button>
      </div>
    );
  }
}

// 😍 使用Hooks的函数组件
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `计数: ${count}`;
  }, [count]);
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

## 🔥 核心Hooks详解

### 1. useState - 状态管理之王

#### 基本用法
```javascript
import { useState } from 'react';

function MyComponent() {
  // 声明一个state变量
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [user, setUser] = useState({ name: '', email: '' });
  
  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="输入姓名"
      />
      
      <button onClick={() => setUser({...user, name: name})}>
        更新用户
      </button>
    </div>
  );
}
```

#### 高级用法
```javascript
function AdvancedState() {
  // 函数式更新（推荐）
  const [count, setCount] = useState(0);
  
  const increment = () => {
    // ✅ 正确：使用函数式更新
    setCount(prevCount => prevCount + 1);
  };
  
  const incrementTwice = () => {
    // ❌ 错误：直接使用当前值
    setCount(count + 1);
    setCount(count + 1); // 还是只增加1
    
    // ✅ 正确：使用函数式更新
    setCount(prev => prev + 1);
    setCount(prev => prev + 1); // 正确增加2
  };
  
  // 复杂状态管理
  const [state, setState] = useState({
    name: '',
    email: '',
    preferences: {
      theme: 'light',
      notifications: true
    }
  });
  
  const updatePreferences = (newPrefs) => {
    setState(prevState => ({
      ...prevState,
      preferences: {
        ...prevState.preferences,
        ...newPrefs
      }
    }));
  };
  
  return (
    // JSX...
  );
}
```

### 2. useEffect - 副作用处理专家

#### 基本概念
副作用（Side Effects）是指组件渲染过程之外的操作：
- 🌐 数据获取（API调用）
- 📄 DOM操作
- ⏰ 定时器
- 🎧 事件监听器
- 🧹 清理工作

#### 基本用法
```javascript
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 1. 无依赖数组：每次渲染后都执行
  useEffect(() => {
    console.log('组件渲染了');
  });
  
  // 2. 空依赖数组：只在挂载时执行一次
  useEffect(() => {
    fetchData();
  }, []); // <- 空数组很重要！
  
  // 3. 有依赖的effect：当依赖变化时执行
  useEffect(() => {
    document.title = `数据加载${loading ? '中' : '完成'}`;
  }, [loading]); // <- 依赖loading
  
  // 4. 带清理的effect
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('定时器执行');
    }, 1000);
    
    // 返回清理函数
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('获取数据失败:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <div>加载中...</div>;
  return <div>数据: {JSON.stringify(data)}</div>;
}
```

#### useEffect的依赖数组规则
```javascript
function EffectRules() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // ❌ 错误：使用了count但没有声明依赖
  useEffect(() => {
    document.title = `计数: ${count}`;
  }, []); // 缺少count依赖
  
  // ✅ 正确：声明了所有依赖
  useEffect(() => {
    document.title = `计数: ${count}`;
  }, [count]);
  
  // ✅ 正确：不需要依赖的情况
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + 1); // 使用函数式更新，不依赖count
    }, 1000);
    
    return () => clearInterval(timer);
  }, []); // 空数组是正确的
}
```

## 🎨 其他重要Hooks

### 3. useContext - 全局状态共享
```javascript
import { createContext, useContext, useState } from 'react';

// 创建Context
const ThemeContext = createContext();

// Provider组件
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Main />
    </ThemeContext.Provider>
  );
}

// 消费Context
function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <header style={{ background: theme === 'dark' ? '#333' : '#fff' }}>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        切换主题
      </button>
    </header>
  );
}
```

### 4. useReducer - 复杂状态管理
```javascript
import { useReducer } from 'react';

// 定义reducer
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { 
        id: Date.now(), 
        text: action.text, 
        completed: false 
      }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id 
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  
  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', text });
  };
  
  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', id });
  };
  
  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', id });
  };
  
  return (
    <div>
      {/* TodoApp的JSX */}
    </div>
  );
}
```

### 5. useRef - 引用和DOM操作
```javascript
import { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef(null);
  const countRef = useRef(0);
  
  useEffect(() => {
    // 组件挂载时自动聚焦
    inputRef.current.focus();
  }, []);
  
  const handleClick = () => {
    // 直接操作DOM
    inputRef.current.focus();
    
    // useRef可以存储任何可变值
    countRef.current += 1;
    console.log('点击次数:', countRef.current);
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>聚焦输入框</button>
    </div>
  );
}
```

## 🛠️ 自定义Hooks

自定义Hooks是Hooks最强大的功能之一，让你可以提取和复用组件逻辑。

### 创建自定义Hook
```javascript
// useCounter - 计数器Hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// 在组件中使用
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);
  
  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}
```

### 实用的自定义Hooks
```javascript
// 1. useLocalStorage - 本地存储
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('本地存储失败:', error);
    }
  };

  return [storedValue, setValue];
}

// 2. useFetch - 数据获取
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// 3. useDebounce - 防抖
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

## 🚨 Hooks使用规则

### Rules of Hooks
1. **只在最顶层调用Hooks** - 不要在循环、条件或嵌套函数中调用
2. **只在React函数中调用Hooks** - 在React函数组件或自定义Hook中

```javascript
// ❌ 错误示例
function BadComponent() {
  if (someCondition) {
    const [count, setCount] = useState(0); // 违反规则1
  }
  
  for (let i = 0; i < 3; i++) {
    useEffect(() => {}); // 违反规则1
  }
  
  return <div>Bad Component</div>;
}

// ✅ 正确示例
function GoodComponent() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    if (someCondition) {
      // 条件逻辑放在Hook内部
      doSomething();
    }
  }, []);
  
  return <div>Good Component</div>;
}
```

## 🎯 实战项目：待办事项应用

让我们用Hooks构建一个完整的待办事项应用：

```javascript
import { useState, useEffect, useReducer } from 'react';

// 自定义Hook：本地存储
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('存储失败:', error);
    }
  };

  return [storedValue, setValue];
}

// Reducer用于管理待办事项
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, {
        id: Date.now(),
        text: action.text,
        completed: false,
        createdAt: new Date().toISOString()
      }];
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE':
      return state.filter(todo => todo.id !== action.id);
    case 'EDIT':
      return state.map(todo =>
        todo.id === action.id
          ? { ...todo, text: action.text }
          : todo
      );
    case 'LOAD':
      return action.todos;
    default:
      return state;
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [filter, setFilter] = useLocalStorage('todoFilter', 'all');
  const [inputText, setInputText] = useState('');

  // 从本地存储加载待办事项
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      dispatch({ type: 'LOAD', todos: JSON.parse(savedTodos) });
    }
  }, []);

  // 保存待办事项到本地存储
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 添加待办事项
  const addTodo = () => {
    if (inputText.trim()) {
      dispatch({ type: 'ADD', text: inputText.trim() });
      setInputText('');
    }
  };

  // 过滤待办事项
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // 统计信息
  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length
  };

  return (
    <div className="todo-app">
      <h1>我的待办清单</h1>
      
      {/* 输入区域 */}
      <div className="input-section">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="今天要做什么？"
        />
        <button onClick={addTodo}>添加</button>
      </div>

      {/* 过滤器 */}
      <div className="filters">
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? 'active' : ''}
          >
            {f === 'all' ? '全部' : f === 'active' ? '进行中' : '已完成'}
          </button>
        ))}
      </div>

      {/* 统计信息 */}
      <div className="stats">
        总计: {stats.total} | 进行中: {stats.active} | 已完成: {stats.completed}
      </div>

      {/* 待办列表 */}
      <div className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => dispatch({ type: 'TOGGLE', id: todo.id })}
            onDelete={() => dispatch({ type: 'DELETE', id: todo.id })}
            onEdit={(text) => dispatch({ type: 'EDIT', id: todo.id, text })}
          />
        ))}
      </div>
    </div>
  );
}

// 待办事项组件
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(editText.trim());
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
          onBlur={handleEdit}
          autoFocus
        />
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
      />
      <span 
        className="todo-text"
        onDoubleClick={() => setIsEditing(true)}
      >
        {todo.text}
      </span>
      <button onClick={() => setIsEditing(true)}>编辑</button>
      <button onClick={onDelete}>删除</button>
    </div>
  );
}

export default TodoApp;
```

## 📈 性能优化

### 避免不必要的重新渲染
```javascript
import { useState, useMemo, useCallback } from 'react';

function OptimizedComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  // useMemo: 缓存计算结果
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]); // 只有items变化时才重新计算

  // useCallback: 缓存函数
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // 永远不变的函数

  const handleAddItem = useCallback((item) => {
    setItems(prev => [...prev, item]);
  }, []);

  return (
    <div>
      <p>计数: {count}</p>
      <p>总价值: {expensiveValue}</p>
      <button onClick={handleClick}>增加计数</button>
      <ItemList items={items} onAddItem={handleAddItem} />
    </div>
  );
}
```

## 🔗 学习资源

### 官方文档
- [React Hooks 官方文档](https://reactjs.org/docs/hooks-intro.html)
- [Hooks API 参考](https://reactjs.org/docs/hooks-reference.html)

### 最佳实践
1. **总是包含依赖** - 在useEffect的依赖数组中包含所有使用的变量
2. **使用函数式更新** - 在setState中使用函数避免闭包陷阱
3. **分离关注点** - 使用多个useState而不是一个大对象
4. **创建自定义Hooks** - 复用状态逻辑
5. **合理使用useCallback和useMemo** - 避免过度优化

### 常见问题

#### Q: 什么时候使用useReducer而不是useState？
A: 当状态逻辑复杂、有多个子值或下一个state依赖于之前的state时。

#### Q: 如何在useEffect中正确处理异步操作？
A: 不能直接将async函数传给useEffect，而应该在内部定义async函数。

#### Q: 为什么我的useEffect无限循环执行？
A: 可能是依赖数组中的引用类型对象每次都是新的，检查依赖项是否正确。

## 🎉 总结

Hooks让React函数组件变得非常强大：
- ✅ 更简洁的代码
- ✅ 更好的逻辑复用
- ✅ 更容易测试
- ✅ 更灵活的组合

掌握Hooks是现代React开发的必备技能，继续练习和探索，你会发现Hooks的强大之处！

---

**下一步**：学习Context API和全局状态管理，让你的React应用程序更加强大！🚀
