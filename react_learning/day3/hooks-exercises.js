// 🎯 React Hooks 实战练习题
// 通过这些练习来巩固你的Hooks知识

console.log("=== React Hooks 练习题开始 ===");

// 练习1：基础useState
console.log("\n📝 练习1：基础useState");
console.log(`
任务：创建一个简单的计数器组件
要求：
1. 使用useState管理计数状态
2. 提供增加、减少、重置按钮
3. 显示当前计数值

提示代码框架：
function Counter() {
  // 在这里使用useState
  
  return (
    <div>
      {/* 在这里显示计数和按钮 */}
    </div>
  );
}
`);

// 练习2：表单状态管理
console.log("\n📝 练习2：表单状态管理");
console.log(`
任务：创建用户注册表单
要求：
1. 管理姓名、邮箱、密码字段
2. 实时显示表单预览
3. 提供重置表单功能

提示：
- 可以使用多个useState
- 也可以尝试用一个useState管理整个表单对象
`);

// 练习3：useEffect基础
console.log("\n📝 练习3：useEffect基础");
console.log(`
任务：文档标题同步器
要求：
1. 根据计数值动态更新浏览器标题
2. 组件卸载时恢复原标题
3. 理解依赖数组的作用

提示：
useEffect(() => {
  document.title = \`计数: \${count}\`;
  return () => {
    document.title = 'React App'; // 清理函数
  };
}, [count]); // 依赖数组
`);

// 练习4：数据获取
console.log("\n📝 练习4：数据获取");
console.log(`
任务：用户信息获取器
要求：
1. 组件挂载时获取用户数据
2. 显示加载状态
3. 处理错误情况
4. 提供重新获取按钮

模拟API：
const fetchUser = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (Math.random() > 0.7) throw new Error('网络错误');
  return { id: 1, name: '张三', email: 'zhangsan@example.com' };
};
`);

// 练习5：自定义Hook - useCounter
console.log("\n📝 练习5：自定义Hook - useCounter");
console.log(`
任务：创建可复用的计数器Hook
要求：
1. 提供count值和操作函数
2. 支持自定义初始值和步长
3. 在多个组件中复用

框架：
function useCounter(initialValue = 0, step = 1) {
  // 实现计数器逻辑
  
  return {
    count,
    increment,
    decrement,
    reset
  };
}
`);

// 练习6：自定义Hook - useLocalStorage
console.log("\n📝 练习6：自定义Hook - useLocalStorage");
console.log(`
任务：创建本地存储Hook
要求：
1. 自动同步状态与localStorage
2. 处理JSON序列化/反序列化
3. 处理存储失败的情况

使用示例：
const [name, setName] = useLocalStorage('username', '');
const [settings, setSettings] = useLocalStorage('appSettings', {
  theme: 'light',
  language: 'zh-CN'
});
`);

// 练习7：useReducer练习
console.log("\n📝 练习7：useReducer练习");
console.log(`
任务：使用useReducer重写待办事项
要求：
1. 定义完整的todoReducer
2. 支持增删改查操作
3. 处理不同的action类型

Reducer示例：
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      // 添加待办事项
    case 'TOGGLE_TODO':
      // 切换完成状态
    case 'DELETE_TODO':
      // 删除待办事项
    case 'EDIT_TODO':
      // 编辑待办事项
    default:
      return state;
  }
}
`);

// 练习8：useContext练习
console.log("\n📝 练习8：useContext练习");
console.log(`
任务：实现主题切换功能
要求：
1. 创建ThemeContext
2. 在顶层提供主题状态
3. 在深层组件中消费主题
4. 实现明暗主题切换

组件结构：
App
├── ThemeProvider
├── Header
│   └── ThemeToggle
└── Main
    └── Content (使用主题)
`);

// 练习9：综合练习 - 购物车
console.log("\n📝 练习9：综合练习 - 购物车");
console.log(`
任务：实现完整的购物车功能
要求：
1. 商品列表展示
2. 添加到购物车
3. 购物车商品管理（增删改数量）
4. 总价计算
5. 本地存储持久化

用到的Hooks：
- useState: 管理状态
- useEffect: 数据持久化
- useReducer: 复杂状态管理
- useContext: 全局购物车状态
- 自定义Hook: 封装购物车逻辑
`);

// 练习10：性能优化练习
console.log("\n📝 练习10：性能优化练习");
console.log(`
任务：优化组件性能
要求：
1. 使用useMemo缓存计算结果
2. 使用useCallback缓存函数
3. 理解何时需要优化
4. 避免过度优化

场景：
- 有一个包含1000个商品的列表
- 需要根据搜索词过滤商品
- 需要计算过滤后商品的总价
- 子组件接收函数props

优化点：
- 过滤逻辑用useMemo
- 事件处理函数用useCallback
- 避免不必要的重新渲染
`);

// 实际练习代码示例
console.log("\n🏗️ 实际练习代码示例");

// 示例1：基础计数器（答案）
const counterExample = `
function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);
  
  return (
    <div>
      <h2>计数器: {count}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}
`;

console.log("示例1 - 基础计数器:");
console.log(counterExample);

// 示例2：useLocalStorage自定义Hook（答案）
const useLocalStorageExample = `
function useLocalStorage(key, initialValue) {
  // 初始化状态
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('读取localStorage失败:', error);
      return initialValue;
    }
  });

  // 更新localStorage的函数
  const setValue = (value) => {
    try {
      // 保存状态
      setStoredValue(value);
      // 保存到localStorage
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('保存到localStorage失败:', error);
    }
  };

  return [storedValue, setValue];
}

// 使用示例
function App() {
  const [name, setName] = useLocalStorage('username', '');
  const [count, setCount] = useLocalStorage('count', 0);
  
  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="输入用户名"
      />
      <p>你好, {name}!</p>
      
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
    </div>
  );
}
`;

console.log("\n示例2 - useLocalStorage Hook:");
console.log(useLocalStorageExample);

// 示例3：数据获取Hook（答案）
const useFetchExample = `
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const refetch = () => {
    setData(null);
    setError(null);
    setLoading(true);
    // 会触发useEffect重新执行
  };

  return { data, loading, error, refetch };
}

// 使用示例
function UserProfile({ userId }) {
  const { data: user, loading, error, refetch } = useFetch(\`/api/users/\${userId}\`);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>邮箱: {user.email}</p>
      <button onClick={refetch}>刷新</button>
    </div>
  );
}
`;

console.log("\n示例3 - useFetch Hook:");
console.log(useFetchExample);

// 挑战任务
console.log("\n🏆 挑战任务");
console.log(`
高级挑战：实现一个完整的博客应用

功能要求：
1. 📝 文章列表展示
2. 🔍 搜索和过滤功能
3. 📖 文章详情页面
4. ❤️ 点赞功能
5. 💬 评论系统
6. 🌓 主题切换
7. 💾 本地数据持久化
8. 📱 响应式设计

技术要求：
- 使用所有学过的Hooks
- 创建至少3个自定义Hooks
- 实现Context进行状态管理
- 使用useReducer管理复杂状态
- 性能优化（useMemo, useCallback）
- 错误边界处理
- 加载状态管理

自定义Hooks建议：
1. useLocalStorage - 本地存储
2. useFetch - 数据获取
3. useDebounce - 搜索防抖
4. useToggle - 状态切换
5. usePagination - 分页逻辑

额外加分项：
- TypeScript类型定义
- 单元测试
- 可访问性支持
- 国际化支持
`);

console.log("\n📚 学习建议");
console.log(`
1. 🎯 循序渐进
   - 先掌握useState和useEffect
   - 再学习其他内置Hooks
   - 最后创建自定义Hooks

2. 💡 实践为主
   - 每个练习都要动手实现
   - 尝试不同的实现方式
   - 对比优缺点

3. 🔍 深入理解
   - 理解Hooks的设计理念
   - 掌握使用规则和最佳实践
   - 学会性能优化技巧

4. 🚀 项目应用
   - 在实际项目中使用
   - 创建自己的Hook库
   - 分享和交流经验
`);

console.log("\n=== React Hooks 练习题结束 ===");
console.log("🎉 完成这些练习，你就是Hooks专家了！");
