// 需要什么模块API直接按需导入就行了
import type { AxiosError } from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 处理查询参数为数组的情况
import * as qs from 'qs'
// 配置默认baseURL
//正式
// https://api.earningrhino.com/api/
//测试
// https://api-samira-proxy.haiyaogame.com/api/
const curBaseURL = typeof window === undefined ?'https://api.earningrhino.com/api/':window.location.origin+'/api/'
import {Api as ServicePayApi} from './samira-service-proxyApi'
import {Api as HeraclesPayApi} from './heracles-payApi'
// @ts-ignore
import {Api as ServiceUserApi, Token} from './samira-service-user-httpApi'
import {delCookie, getLocalStorage} from "../utils";
import {Toast} from "react-vant";
import {Checked, Clear, Passed, Warning} from "@react-vant/icons";
import {ToastOptions, ToastReturnType} from "react-vant/es/toast/PropsType";
import {errorCode} from "./errorCode";
import {Router, useRouter} from "next/router";
// baseAPI
const baseAPIMap = new Map()
baseAPIMap.set('ServicePayApi', ServicePayApi)
baseAPIMap.set('ServiceUserApi', ServiceUserApi)
baseAPIMap.set('HeraclesPayApi',HeraclesPayApi)
Toast.allowMultiple(false)


// 默认请求中间件
const requestMiddleWare = async (config: AxiosRequestConfig) => {
  const token = typeof window === 'undefined'?'':getLocalStorage<Token>('samira-token').token
  config = {
    ...config,
    baseURL:curBaseURL,
    headers: {
    },
    paramsSerializer: (params: any) => {
      return qs.stringify(params, { arrayFormat: 'comma' })
    },
    timeout: 10000,
    timeoutErrorMessage: 'network timeout',
  }
  if (token){ // @ts-ignore
    config.headers['main_token'] = token
  }
  config.headers
  return config
}

// 默认响应中间件
const responseMiddleWare = (res: AxiosResponse) => {
  return res
}
export const MyToast = {
  success:(opts:ToastOptions):ToastReturnType=>{
    return Toast.info(Object.assign({position:'top',iconSize:'20',message:'success',duration:3000,icon:Checked({})},opts))
  },
  warning:(opts:ToastOptions):ToastReturnType=>{
    return Toast.info(Object.assign({position:'top',iconSize:'20',message:'warning',duration:3000,icon:Warning({})},opts))
  },
  error:(opts:ToastOptions):ToastReturnType=>{
    return Toast.info(Object.assign({position:'top',iconSize:'20',message:'error',duration:3000,icon:Clear({})},opts))
  }
}
const responseErrHandler = (error: AxiosError) => {
  return new Promise<Response>((resolve, reject) => {
    if (error.message === 'network timeout') {
      MyToast.error({message:errorCode['-2']})
      reject()
      return
    }
    const errCode = ((error?.response?.data) as any)?.errCode??"-1"

    // @ts-ignore
    if (errCode===1) {
      try {
        localStorage.removeItem('samira-token')
        delCookie('main_token')
        window.location.href = '/login'
      } catch (error) {

      }
    }
    MyToast.error({
      message: errorCode[String(errCode)]?errorCode[String(errCode)]:errorCode["-1"],
    });
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
  HeraclesPayApi:HeraclesPayApi<unknown>
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const mainApi: mainApi = {
  ServicePayApi:result.ServicePayApi,
  ServiceUserApi:result.ServiceUserApi,
  HeraclesPayApi:result.HeraclesPayApi
}

export default mainApi
