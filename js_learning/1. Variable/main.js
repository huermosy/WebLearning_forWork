const PI = 3.14159; // 常量，圆周率
const calcBtn = document.getElementById('calcBtn');
const radiusInput = document.getElementById('radius');
const resultDiv = document.getElementById('result');

calcBtn.addEventListener('click', () => {
  let radius = Number(radiusInput.value); // 变量，半径
  if (isNaN(radius) || radius < 0) {
    resultDiv.textContent = '请输入有效的非负半径！';
    return;
  }
  let area = PI * radius * radius; // 变量，面积
  resultDiv.textContent = `半径为 ${radius} 的圆面积是：${area.toFixed(2)}`;
});
