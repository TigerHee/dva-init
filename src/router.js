import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Loadable from 'react-loadable'; 
import dynamic from 'dva/dynamic'; // 异步加载路由

const AsyncIndex = Loadable({
  timeout: 3000,
  loading () {
    return <div>loading....</div>
  },
  loader: () => import('./components/Example')
})

function RouterConfig({ history, app }) {
  // 首页
  const homePage = dynamic({
    app,
    component: () => import('./routes/homePage')
  })
  // 结果页
  const resultPage = dynamic({
    app,
    component: () => import('./routes/resultPage')
  })
  // 下单页
  const bookPage = dynamic({
    app,
    component: () => import('./routes/bookPage')
  })
  // 完成页
  const completePage = dynamic({
    app,
    component: () => import('./routes/completePage')
  })
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={homePage}/>
        <Route path="/result" exact component={resultPage}/>
        <Route path="/book" exact component={bookPage}/>
        <Route path="/complete" exact component={completePage}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
