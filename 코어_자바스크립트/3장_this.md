# this

JS의 This가 우리가 먼저 학습하였던 JAVA혹은 C#같은 프로그래밍 언어들과 차이가 나는 가장 큰 이유는 JS는 **prototype-based language** 이기 때문입니다.

# 상황에 따라 달라지는 this

일반적으로 저희가 알고있는 `this` 는 일반적으로 클래스로 생성한 인스턴스 객체를 가리킵니다. 하지만 JS에서 `this`는 기본적으로 실행 컨텍스트가 생성될 때 함께 결정되며 어떤 context가 함수를 호출하고 있는지를 가리킵니다.

## 전역공간

JS의 모든 변수는 특정 객체의 프로퍼티로서 동작합니다.

```jsx
var hello = 'hello!';

console.log(hello); // hello!
console.log(window.hello); // hello!
```

JS에서 변수를 선언한다는 것은 전역객체(`window` , `global`)의 프로퍼티에 할당하는 것과 같습니다.

## 함수 vs. 메서드

어떤 함수를 호출할때 함수 이름 앞에 객체가 있는 경우(앞에 `.` 이 있는 경우) 메서드로 호출했다라고 합니다.

메서드내에서의 `this` 는 `.` 앞의 객체를 가리킵니다.

```jsx
var testFunction = function() {
	console.log(this);
}

var object = {
	method: function() {
		console.log(this);
	}
};

testFunction(); // Window
object.method(); // {method: f} === object
```

### 함수 vs. 메서드 내부함수

```jsx
var outerObject = {
	outerMethod: function() {
		console.log(this);
		// var that = this;
    // var self = this;
		var annonymousInnerFunction = function() {
			console.log(this);
			// console.log(that);
			// console.log(self);
		}
		function declarationInnerFunction() {
			console.log(this);
			// console.log(self);
		}

		annonymousInnerFunction();
		declarationInnerFunction();

		var innerObject = {
			innerMethod: annonymousInnerFunction
		}

		innerObject.innerMethod();
	}
};

outerObject.outerMethod();
// {outerMethod: f}
// Window
// Window
// {innerMethod: f}
```

## 생성자 내부 함수에서의 this

본래 객체지향 언어들에서는 `new` 연산자를 통해 클래스를 인스턴스화합니다. JS는 함수에 생성자로서의 역할을 부여했고, 이 역시 `new` 연산자를 통해 사용할 수 있습니다.

`new` 연산자를 통해 생성한 인스턴스의 `this` 는 자기자신을 바라보게 됩니다.

```jsx
var name = "임성호";
var fly = "...?";

var Bee = function() {
	this.name = "벌";
	this.fly = "위이잉";
}
var Butterfly = function() {
	this.name = "나비";
	this.fly = "팔랑팔랑";
}

console.log(Bee.name); // Bee

var notIntended = Bee();
console.log(notIntended); // undefined

var superBee = new Bee();
var magicButterfly = new Butterfly();

console.log(superBee); // {name: "벌", fly: "위이잉"}
console.log(magicButterfly); // {name: "나비", fly: "팔랑팔랑"}
```

# 명시적으로 this를 바인딩하는 법

## Function.prototype.call()

`call()` 메소드는 주어진 `this` 값 및 각각 전달된 인수와 함께 함수를 호출합니다.

```jsx
func.call(thisArg[, arg1[, arg2[, ...]]])
```

### 예시

```jsx
var sungHo = {
	name: '임성호',
	age: 29,
	hobby: 'javascript programming'
}

function hello() {
	console.log('Hello, my name is ' + this.name);
	console.log('I\'m ' + this.age + ' years old');
	console.log('My hobby is ' + this.hobby);
}

hello();
hello.call(sungHo);
// Hello, my name is 임성호
// I'm 29 years old
// My hobby is javascript programming
```

## Function.prototype.apply()

`apply()`메서드는 주어진 `this` 갑과 배열로 제공되는 `arguments` 로 함수를 호출합니다.

```jsx
func.apply(thisArg, [argsArray])
```

### 예시

```jsx
var numbers = [1, 2, 3, 4, 5];
var max = Math.max(numbers);
var applyMax = Math.max.apply(null, numbers);
// var applyMax = Math.max(...numbers);

console.log(max); // NaN
console.log(applyMax); // 5
```

## Function.prototype.bind()

`bind()` 메소드가 호출되면 새로운 함수를 생성합니다.

첫 인자의 value로는 `this` 카워드를 설정하고, 이어지는 인자들은 바인드된 함수의 인수에 제공됩니다.

```jsx
func.bind(thisArg[, arg1[, arg2[, ...]]])
```

### 예시

```jsx
var x = 9;
var object = {
	x: 10,
	getX: function() {
		return this.x;
	}
}
console.log(object.getX()); // 10

var retrieveX = object.getX;
console.log(retrieveX()); // 9

var boundGetX = retrieveX.bind(object);
console.log(boundGetX()); // 10
```