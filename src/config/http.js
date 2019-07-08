import axios from 'axios';

axios.defaults.headers.common['Authorization'] = '123';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截器
axios.interceptors.request.use(config => {
  console.log(`~~~ (\`・ω・´) 调试信息 start ~~~`);
  console.info(`~~ ${config.method} ${config.url} ~~`, config);
  console.log(`~~~ (\`・ω・´) 调试信息 end ~~~`);
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(response => {
  return response;
}, error => {
  console.warn(`~~~ ( ×ω× ) 错误信息 start ~~~`);
  console.warn(`~~ error ${error.request._url} ~~`, error.response);
  console.warn(`~~~ ( ×ω× ) 错误信息 end ~~~`);
  return Promise.reject(error);
});

export default axios;
