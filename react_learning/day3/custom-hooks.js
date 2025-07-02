// 🎯 React 自定义Hooks大全
// 这些都是实际项目中非常有用的自定义Hooks

// 1. useLocalStorage - 本地存储Hook
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// 使用示例：
// const [name, setName] = useLocalStorage('user-name', '');

// 2. useFetch - 数据获取Hook
export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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
  }, [url, JSON.stringify(options)]);

  const refetch = () => {
    setData(null);
    setError(null);
    setLoading(true);
    // 重新触发useEffect
  };

  return { data, loading, error, refetch };
}

// 使用示例：
// const { data, loading, error, refetch } = useFetch('/api/users');

// 3. useDebounce - 防抖Hook
export function useDebounce(value, delay) {
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

// 使用示例：
// const [searchTerm, setSearchTerm] = useState('');
// const debouncedSearchTerm = useDebounce(searchTerm, 500);

// 4. useToggle - 切换状态Hook
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, { toggle, setTrue, setFalse }];
}

// 使用示例：
// const [isVisible, { toggle, setTrue, setFalse }] = useToggle();

// 5. useWindowSize - 窗口尺寸Hook
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}

// 使用示例：
// const { width, height } = useWindowSize();

// 6. usePrevious - 获取前一个值Hook
export function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
}

// 使用示例：
// const [count, setCount] = useState(0);
// const prevCount = usePrevious(count);

// 7. useInterval - 定时器Hook
export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// 使用示例：
// const [count, setCount] = useState(0);
// useInterval(() => setCount(count + 1), 1000);

// 8. useOnScreen - 元素可见性Hook
export function useOnScreen(ref, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      observer.unobserve(ref.current);
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}

// 使用示例：
// const ref = useRef();
// const isVisible = useOnScreen(ref);

// 9. useForm - 表单处理Hook
export function useForm(initialValues, validationRules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const setValue = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const setTouched = (name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const validate = () => {
    const newErrors = {};
    
    Object.keys(validationRules).forEach(field => {
      const rule = validationRules[field];
      const value = values[field];
      
      if (rule.required && (!value || value.trim() === '')) {
        newErrors[field] = rule.required;
      } else if (rule.pattern && !rule.pattern.test(value)) {
        newErrors[field] = rule.message || '格式不正确';
      } else if (rule.minLength && value.length < rule.minLength) {
        newErrors[field] = `最少需要${rule.minLength}个字符`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    setValue,
    setTouched,
    validate,
    reset
  };
}

// 使用示例：
// const { values, errors, setValue, validate } = useForm(
//   { email: '', password: '' },
//   {
//     email: {
//       required: '邮箱不能为空',
//       pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//       message: '邮箱格式不正确'
//     },
//     password: {
//       required: '密码不能为空',
//       minLength: 6
//     }
//   }
// );

// 10. useAsync - 异步操作Hook
export function useAsync(asyncFunction, immediate = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await asyncFunction(...args);
      setData(result);
      return result;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { data, loading, error, execute };
}

// 使用示例：
// const fetchUser = async (id) => {
//   const response = await fetch(`/api/users/${id}`);
//   return response.json();
// };
// const { data: user, loading, error, execute } = useAsync(fetchUser, false);

// 11. useKeyPress - 按键监听Hook
export function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return keyPressed;
}

// 使用示例：
// const enterPressed = useKeyPress('Enter');
// const escapePressed = useKeyPress('Escape');

// 12. useClipboard - 剪贴板Hook
export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (error) {
      console.error('Failed to copy:', error);
      setCopied(false);
      return false;
    }
  };

  return { copied, copy };
}

// 使用示例：
// const { copied, copy } = useClipboard();
// <button onClick={() => copy('Hello World')}>
//   {copied ? '已复制!' : '复制'}
// </button>

// 13. useCounter - 计数器Hook
export function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(initialValue);
  const set = (value) => setCount(value);

  return {
    count,
    increment,
    decrement,
    reset,
    set
  };
}

// 使用示例：
// const { count, increment, decrement, reset } = useCounter(0, 1);

// 14. useArray - 数组操作Hook
export function useArray(initialValue = []) {
  const [array, setArray] = useState(initialValue);

  const push = (element) => {
    setArray(prev => [...prev, element]);
  };

  const remove = (index) => {
    setArray(prev => prev.filter((_, i) => i !== index));
  };

  const update = (index, newElement) => {
    setArray(prev => prev.map((item, i) => i === index ? newElement : item));
  };

  const clear = () => {
    setArray([]);
  };

  const filter = (callback) => {
    setArray(prev => prev.filter(callback));
  };

  return {
    array,
    set: setArray,
    push,
    remove,
    update,
    clear,
    filter
  };
}

// 使用示例：
// const { array: todos, push: addTodo, remove: removeTodo } = useArray([]);

// 15. useGeolocation - 地理位置Hook
export function useGeolocation() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: null, lng: null },
    error: null
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        loaded: true,
        error: { code: 0, message: 'Geolocation not supported' }
      }));
      return;
    }

    const onSuccess = (position) => {
      setLocation({
        loaded: true,
        coordinates: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        error: null
      });
    };

    const onError = (error) => {
      setLocation(prev => ({
        ...prev,
        loaded: true,
        error
      }));
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
}

// 使用示例：
// const { loaded, coordinates, error } = useGeolocation();

// 实际项目中的完整组件示例
export function SearchableUserList() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data: users, loading, error } = useFetch(
    `/api/users?search=${debouncedSearchTerm}`
  );
  const { copied, copy } = useClipboard();

  return (
    <div>
      <input
        type="text"
        placeholder="搜索用户..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {loading && <div>搜索中...</div>}
      {error && <div>错误: {error}</div>}
      
      {users && (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} ({user.email})
              <button onClick={() => copy(user.email)}>
                {copied ? '已复制!' : '复制邮箱'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 这些自定义Hooks的优势：
// 1. 逻辑复用 - 在多个组件间共享状态逻辑
// 2. 关注点分离 - 将复杂逻辑从组件中抽离
// 3. 易于测试 - 可以单独测试Hook逻辑
// 4. 易于维护 - 集中管理相关的状态和副作用
