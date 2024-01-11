import "@/styles/common.less";
import "@/styles/antd/index.less";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from '@/redux'
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider, App as AntdApp } from "antd";
import 'dayjs/locale/zh-cn';
import "virtual:svg-icons-register";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={zhCN} theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}>
        <AntdApp>
          <App />
        </AntdApp>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
)
