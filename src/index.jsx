import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from './redux/store'
import './index.global.less'

import GetRouter from 'router/router'

/* 初始化 */
renderWithHotReload(GetRouter)

/* 热更新 */
if (module.hot) {
  module.hot.accept('./router/router', () => {
    const getRouter = require('router/router').default
    renderWithHotReload(getRouter)
  })
}

function renderWithHotReload (RootElement) {
  ReactDom.render(
    <AppContainer>
      <Provider store={store}>

        <RootElement history={history} />

      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}
