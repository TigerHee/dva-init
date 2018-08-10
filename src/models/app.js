export default {

  namespace: 'app',

  state: {
    locale: 'en',
    currency: 'CAD',
    ipInfo: {},
    fromCityAirport: {},
    toCityAirport: {},
    departDate: '',
    returnDate: ''
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      // router 传递的参数包括query, state都在此处history.localtion
      return history.listen(({ pathname }) => {
        switch (pathname) {
          case '/':
          console.log('home page... do something here', history.location)
          break;
          case '/result':
          console.log('result page... do something here', history.location)
          break;
          case '/book':
          console.log('book page... do something here', history.location)
          break;
          case '/complete':
          console.log('complete page... do something here', history.location)
          break;
          default:
          break;
        }
      })
    },
  },
  // 异步，相当于vuex actions
  effects: {
    * fetch ({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    }
  },
  // 同步更新state，相当于 Vuex mutations
  reducers: {
    updateState (state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
