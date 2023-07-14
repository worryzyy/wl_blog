[[toc]]

## 一些八股文！！

### 闭包

能够读取其他函数内部变量的函数

```js
function fn() {
  var n = 999
  function fn1() {
    console.log(n)
  }
  return fn1
}
var result = fn1()
result() //999
```

函数 fn1 就是闭包，闭包的好处在于：

1. 可以读取函数内部变量

2.让变量的值保存在内存中

针对第二点：

```js
function f1() {
  var n = 999
  nAdd = function () {
    n += 1
  }
  function f2() {
    alert(n)
  }
  return f2
}
var result = f1()
result() // 999
nAdd()
result() // 1000
```

可以看到函数 f1 中的局部变量 n 一直保存在内存中，并没有在 f1 调用后被自动清除
