// 需要什么模块API直接按需导入就行了
import type { AxiosError } from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 处理查询参数为数组的情况
import * as qs from 'qs'
// 配置默认baseURL
const curBaseURL = 'http://172.25.10.214:8080/api/'
import {Api as ServicePayApi} from './samira-service-proxyApi'
// @ts-ignore
import {Api as ServiceUserApi} from './samira-service-user-httpApi'
// baseAPI
const baseAPIMap = new Map()
baseAPIMap.set('ServicePayApi', ServicePayApi)
baseAPIMap.set('ServiceUserApi', ServiceUserApi)
// 默认请求中间件
const requestMiddleWare = async (config: AxiosRequestConfig) => {
  config = {
    ...config,
    baseURL:curBaseURL,
    headers: {
      "main_token":'123',
    },
    paramsSerializer: (params: any) => {
      return qs.stringify(params, { arrayFormat: 'comma' })
    },
    timeout: 10000,
    timeoutErrorMessage: 'network timeout',
  }
  return config
}

// 默认响应中间件
const responseMiddleWare = (res: AxiosResponse) => {
  return res
}

const responseErrHandler = (error: AxiosError) => {
  return new Promise<Response>((resolve, reject) => {
    if (error.message === 'network timeout') {
      // notification.open({
      //   // @ts-ignore
      //   message: `请检查网络状态`,
      //   // @ts-ignore
      //   description: '请求超时',
      //   duration: 4.5,
      // });
      return
    }
    // @ts-ignore
    // if (error?.response?.data?.errCode===1) useRouter()?.replace({name:'login'})
    // notification.open({
    //   // @ts-ignore
    //   message: `${error?.response?.data?.errSpace??'服务器'}错误(${error?.response?.data?.errCode})`,
    //   // @ts-ignore
    //   description: error?.response?.data?.errMsg??'未知的错误',
    //   duration: 4.5,
    // });
    reject()
  })
}

const result: Record<string, any> = {}

// @ts-ignore
for (const [key, value] of baseAPIMap) {
  // eslint-disable-next-line new-cap
  result[key] = new value({
    // baseURL,
  })
  result[key].instance.interceptors.request.use(requestMiddleWare)
  result[key].instance.interceptors.response.use(responseMiddleWare, responseErrHandler)
}

interface mainApi {
  ServiceUserApi:ServiceUserApi<unknown>
  ServicePayApi:ServicePayApi<unknown>
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const mainApi: mainApi = {
  ServicePayApi:result.ServicePayApi,
  ServiceUserApi:result.ServiceUserApi
}

export default mainApi
