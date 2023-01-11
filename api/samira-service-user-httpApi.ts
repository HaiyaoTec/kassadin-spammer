/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Token {
  token?: string;

  /** 第三方昵称 */
  thirdPartyName?: string;

  /** 第三方邮箱 */
  thirdPartyEmail?: string;

  /** 第三方头像 */
  thirdPartyAvatar?: string;
}

export interface Login {
  /** 操作系统 */
  os?: string;

  /** 设备型号 */
  equipment?: string;

  /** 设备号 */
  deviceNumber?: string;

  /** 谷歌登陆时传的token */
  googleToken?: string;

  /** faceBook登陆后返回的用户ID */
  faceBookId?: string;

  /** faceBook登陆后返回的token */
  faceBookToken?: string;

  /** 苹果用户ID */
  appleId?: string;

  /** 苹果登陆token */
  appleToken?: string;

  /** 手机号 */
  phoneNumber?: string;

  /** 登陆验证码 */
  verificationCode?: string;

  /** 用户uId */
  uId?: number;

  /** 登陆密码 */
  password?: string;
}

export interface Password {
  /** 密码 */
  password?: string;
}

export interface PhoneNumber {
  /** 手机号 */
  phone: string;

  /**
   *   DISTRIBUTE(1, "已分发"),
   *   USE(2, "已使用"),
   *   DOWNLOAD(3, "已下载")
   */
  state?: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:3000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
          ...(requestParams.headers || {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title samira-service-user-http
 * @version 1.0
 * @baseUrl http://localhost:3000
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags httpUser
   * @name LoginPhoneNumber
   * @summary 手机号登陆
   * @request POST:/login/phoneNumber
   */
  loginPhoneNumber = (data: Login, params: RequestParams = {}) =>
    this.request<Token, any>({
      path: `/login/phoneNumber`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags httpUser
   * @name LoginSendVerificationCode
   * @summary 发送验证码
   * @request POST:/login/sendVerificationCode
   */
  loginSendVerificationCode = (data: Login, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/login/sendVerificationCode`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags httpUser
   * @name LoginPassword
   * @summary 密码登陆
   * @request POST:/login/password
   */
  loginPassword = (data: Login, params: RequestParams = {}) =>
    this.request<Token, any>({
      path: `/login/password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags httpUser
   * @name LoginSetPassword
   * @summary 设置密码
   * @request POST:/login/setPassword
   * @secure
   */
  loginSetPassword = (data: Password, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/login/setPassword`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags httpUser
   * @name LoadingPhoneNumberList
   * @summary 加载潜在用户列表
   * @request GET:/loading/phoneNumberList
   * @secure
   */
  loadingPhoneNumberList = (params: RequestParams = {}) =>
    this.request<PhoneNumber[], any>({
      path: `/loading/phoneNumberList`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags httpUser
   * @name PotentialUserUsePhoneNumber
   * @summary 代理用户使用手机号
   * @request POST:/potentialUser/usePhoneNumber
   * @secure
   */
  potentialUserUsePhoneNumber = (data: PhoneNumber, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/potentialUser/usePhoneNumber`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
