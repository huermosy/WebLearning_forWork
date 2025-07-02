import './App.css'

// 1. 基础问候语组件
function Greeting(props) {
  // props 是一个对象，包含了父组件传来的所有属性
  return <h2 className="greeting">你好，{props.name}！</h2>;
}

// 2. 高级问候语组件
function AdvancedGreeting(props) {
  const { name, time = "今天" } = props; // 使用解构赋值并设置默认值
  
  // 根据传入的时间属性显示不同的问候语
  let greeting = "你好";
  if (time === "早上") {
    greeting = "早上好";
  } else if (time === "下午") {
    greeting = "下午好";
  } else if (time === "晚上") {
    greeting = "晚上好";
  }
  
  return (
    <div className="greeting">
      <h2>{greeting}，{name}！</h2>
      <p>欢迎来到 React 的世界</p>
    </div>
  );
}

// 3. 主应用组件
function App() {
  return (
    <div className="container">
      <h1>React Day 1 - 问候语组件</h1>
      
      <div className="content">
        <h3>基础问候语组件：</h3>
        <Greeting name="张三" />
        <Greeting name="李四" />
        <Greeting name="王五" />
        
        <h3>高级问候语组件：</h3>
        <AdvancedGreeting name="小明" time="早上" />
        <AdvancedGreeting name="小红" time="下午" />
        <AdvancedGreeting name="小刚" time="晚上" />
        <AdvancedGreeting name="小李" /> {/* 使用默认time值 */}
      </div>
    </div>
  )
}

export default App
