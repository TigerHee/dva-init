import dva from 'dva';
import './index.css';
// user BrowserHistory
import createHistory from 'history/createBrowserHistory';


// 1. Initialize
const app = dva({
  history: createHistory(),
  // 此处优先级低于redux state
  initialState: {
    locale: 'fr',
    currency: 'CAD'
  }
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
