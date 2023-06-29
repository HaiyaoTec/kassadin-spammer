// 需要什么模块API直接按需导入就行了
import type { AxiosError } from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 处理查询参数为数组的情况
import * as qs from 'qs'
// 配置默认baseURL
//正式
//测试
const curBaseURL = 'https://api-kassadin.haiyaogame.com/api/'
// @ts-ignore
import {Api as SpammerApi, Token} from './kassadin-promot-spammer-api'
import {delCookie, getLocalStorage} from "../utils";
import {Toast} from "react-vant";
import {Checked, Clear, Passed, Warning} from "@react-vant/icons";
import {ToastOptions, ToastReturnType} from "react-vant/es/toast/PropsType";
import {errorCode} from "./errorCode";
import {Router, useRouter} from "next/router";
// baseAPI
const baseAPIMap = new Map()
baseAPIMap.set('SpammerApi', SpammerApi)
Toast.allowMultiple(false)


// 默认请求中间件
const requestMiddleWare = async (config: AxiosRequestConfig) => {
  config = {
    ...config,
    baseURL:curBaseURL,
    headers: {
      agent_token: typeof window !== 'undefined' ? localStorage.getItem('agent_token') || '' : '',
    },
    paramsSerializer: (params: any) => {
      return qs.stringify(params, { arrayFormat: 'comma' })
    },
    timeout: 10000,
    timeoutErrorMessage: 'network timeout',
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
    console.log(errCode)
    // @ts-ignore
    if (errCode===1) {
      try {
        localStorage.removeItem('agent_token')
        delCookie('agent_token')
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
  SpammerApi:SpammerApi<unknown>
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const mainApi: mainApi = {
  SpammerApi:result.SpammerApi
}

export default mainApi
