
 ## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8000
npm start

# build for production with minification
npm run build

```
-------
### 技术选型：
> 1. 基础框架：react
> 2. UI库：antd-mobile
> 3. 脚手架：dva

***

### 插件推荐：
> 1. polished (css-in-js css modules)
> 2. react-loadable (可用于骨架屏loading)
> 3. react-intl (多语言，多货币)
> 4. lodash (工具包 类似于underscore)

***

### vs-code 推荐插件：
> 1. auto close tag （自动闭合html标签）
> 2. auto rename tag (自动修改html标签名)
> 3. Bracket Pair Colorizer 2 (代码括号嵌套颜色区分)

***

### vs-code 配置修改：
```javascript
"emmet.includeLanguages": {
    "javascript": "javascriptreact"
},
"emmet.triggerExpansionOnTab": true
```

***

### 创建组件的几种方式：

##### 一. 函数式定义的 无状态组件
```javascript
function HelloComponent (props) {
    return <div>hello {props.name}</div>
}
```
> 1. 无状态，纯展示组件，不涉及到state状态的操作；
> 2. 组件不会被实例化，整体渲染性能得到提升；
> 3. 组件不能访问this对象，若要访问不能通过这种方式创建；
> 4. 组件无法访问生命周期的方法；
> 5. 无状态组件只能访问输入的props，同样的props会得到同样的渲染结果，不会有副作用？？；

tips: 只要有可能，尽量使用无状态组件

##### 二. React.createClass (不推荐)
```javascript
var input = React.createClass({
    propTypes: { // 定义传入props中的属性各种类型
        initialValue: React.propTypes.string
    },
    defaultProps: { // 组件默认props对象
        initialValue: ''
    },
    getInitialState: function () {
        return {
            text: this.props.initialValue || 'placeholder'
        }
    },
    handleChange: function (event) {
        this.setState({
            text: event.target.value
        })
    },
    render: function () {
        return (
            <div>
                Type something:
                <input onChange={this.handleChange} value={this.state.text} />
            </div>
        )
    }
})
```

> 1. 要被实例化，拥有生命周期
> 2. 有状态的

缺点：
> 1. React.createClass会自绑定函数方法（不像React.Component只绑定需要关心的函数）导致不必要的性能开销，增加代码过时的可能性。
> 2. React.createClass的mixins不够自然、直观；React.Component形式非常适合高阶组件（Higher Order Components--HOC）,它以更直观的形式展示了比mixins更强大的功能，并且HOC是纯净的JavaScript，不用担心他们会被废弃

##### 三. React.Component (有状态组件推荐方式)
```javascript
class input extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            text: props.initialValue || 'placeholder'
        }
        // ES6类中函数必须手动绑定
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({
            text: event.target.value
        })
    }
    render () {
        return (
            <div>
                Type something:
                <input onChange={this.handleChange} value={this.state.text} />
            </div>
        )
    }
}
input.propTypes = {
    initialValue: React.PropTypes.string
}
input.defaultProps = {
    initialValue: ''
}
```
区别：
> 函数this绑定：
> createClass中this自动绑定，
> component中不会自动绑定：三种方式绑定
  ```javascript
  // 方式一：构造函数中绑定this
  consutructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }
  // 方式二: 使用bind绑定
  <div onClick={this.handleClick.bind(this)}></div>
  // 方式三： 使用arrow function绑定
  <div onClick={() => {this.handleClick()}}></div>
  ```

***

### 路由跳转：
```javascript
/*
 *  跳转
**/
 
// 方式1: 标签跳转
import { Link } from 'dva/router'
<Link to={{
    pathname: '/result',
    search: '?a=1&b=2',
    state: {
        id: 32
    }
}}></Link>

// 方式2: props.history (不推荐)
props.history.push('/result')

// 方式3: routerRedux
props.dispatch(
    routerRedux.push(
        pathname: '/result',
        search: '?a=1&b=2',
        state: {
            id: 32
        }
    )
)

/*
 *  参数接收
**/
1. modal/app.js/subscriptions/setup 相当于路由守卫，中间件
2. 每个组件中props中location
```

***

### Dva Model 数据流：

![数据流][1]

![数据流2][2]

##### Model 核心概念：

> 1. namespace: 当前 Model 的名称。整个应用的 State，由多个小的 Model 的 State 以 namespace 为 key 合成
> 2. state: 该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出
> 3. reducers: Action 处理器，处理同步动作，用来算出最新的 State
> 4. effects：Action 处理器，处理异步动作
> 5. subscriptions: 订阅，相当于监听

dva 提供多个 effect 函数内部的处理函数，比较常用的是 call 和 put。

> call：执行异步函数
> put：发出一个 Action，类似于 dispatch

##### 获取state的值：

通过connect mapStateToProps函数将需要用到的数据合并到props中，再在组件中取

##### 修改state的值：

通过dispath (被 connect 的 Component 会自动在 props 中拥有 dispatch 方法)
```javascript
// 用法举例：
// model
{
    namespace: 'app',
    reducers: {
        updateState (state, { payload}) {
            return {...state, ...payload}
        }
    }
}

// components event
props.dispatch({
    type: 'app/updateState',
    payload: {
        locale: 'fr'
    }
})
```

***

### http请求：

统一讲用到所有的接口放到src/services/service.js中(方便管理/函数柯里化)

  [1]: https://zos.alipayobjects.com/rmsportal/PPrerEAKbIoDZYr.png
  [2]: https://zos.alipayobjects.com/rmsportal/pHTYrKJxQHPyJGAYOzMu.png
