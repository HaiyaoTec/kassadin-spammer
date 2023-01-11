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
  deviceNumber: string;

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

export interface Achievement {
  items?: AchievementItem[];
}

export interface AchievementItem {
  /** 成就id */
  id?: number;

  /**
   * 当前进度
   * @format double
   */
  process?: number;

  /** 完成时间 */
  finishAt?: number;

  /** 当前成就等级 */
  level?: number;

  /** 成就额外内容 */
  content?: string;

  /** 成就奖励 */
  reward?: string;

  /** @format double */
  total?: number;

  /** 成就状态 */
  status?: number;

  /** 简介 */
  title?: string;

  /** 成就名称 */
  name?: string;

  /** 成就类型 */
  type?: number;
}

export interface AchievementReq {
  achievementId: number;
}

export interface AchievementReward {
  reward?: string;
  next?: AchievementItem;
}

export interface UserInfo {
  userId?: number;
  nickName?: string;
  headPortrait?: string;

  /** @format email */
  email?: string;
}

export interface UserItem {
  id?: number;
  itemId?: number;

  /** 道具有效期 -1永不过期 */
  overdueTime?: number;

  /** 使用状态 0 未使用 1 已使用 */
  usingState?: number;

  /** 使用到期时间 没有使用为 -1 */
  usingOverdueTime?: number;

  /** 奖励类型 */
  rewardType?: string;

  /** 奖励code */
  rewardCode?: number;

  /** 道具数量 */
  size?: number;

  /** 道具状态 0暂停 1使用中 */
  state?: number;
}

export interface UserItemId {
  id?: number;
}

export interface AchievementUpdate {
  items?: AchievementItem[];
}

export interface IsBindingThirdParty {
  type?: string;
  state?: boolean;
}

export interface Password {
  /** 密码 */
  password?: string;
}

export interface PhoneNumber {
  /** 手机号 */
  phone?: string;
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
 * @title samira-service-user
 * @version 1.0
 * @baseUrl http://localhost:3000
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags user
   * @name LoginDeviceNumber
   * @summary 设备号登陆
   * @request GET:/login/deviceNumber
   */
  loginDeviceNumber = (data: Login, params: RequestParams = {}) =>
    this.request<Token, any>({
      path: `/login/deviceNumber`,
      method: "GET",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags user
   * @name LoginGoogleId
   * @summary 谷歌登陆
   * @request GET:/login/googleId
   */
  loginGoogleId = (data: Login, params: RequestParams = {}) =>
    this.request<Token, any>({
      path: `/login/googleId`,
      method: "GET",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags user
   * @name LoginFaceBookId
   * @summary faceBook登陆
   * @request GET:/login/faceBookId
   */
  loginFaceBookId = (data: Login, params: RequestParams = {}) =>
    this.request<Token, any>({
      path: `/login/faceBookId`,
      method: "GET",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags user
   * @name LoginAppleId
   * @summary 苹果登陆
   * @request GET:/login/appleId
   */
  loginAppleId = (data: Login, params: RequestParams = {}) =>
    this.request<Token, any>({
      path: `/login/appleId`,
      method: "GET",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Achievement
   * @name GetAchievements
   * @summary Your GET endpoint
   * @request GET:/achievement
   * @secure
   */
  getAchievements = (params: RequestParams = {}) =>
    this.request<Achievement, any>({
      path: `/achievement`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags achievement
   * @name GetReward
   * @summary Your GET endpoint
   * @request GET:/achievement/getReward
   * @secure
   */
  getReward = (data: AchievementReq, params: RequestParams = {}) =>
    this.request<AchievementReward, any>({
      path: `/achievement/getReward`,
      method: "GET",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags user
   * @name UpdateUserInfo
   * @summary 修改用户信息
   * @request POST:/updateUserInfo
   * @secure
   */
  updateUserInfo = (data: UserInfo, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/updateUserInfo`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags item
   * @name LoadingItems
   * @summary 加载用户所有道具
   * @request GET:/loading/items
   */
  loadingItems = (params: RequestParams = {}) =>
    this.request<UserItem[], any>({
      path: `/loading/items`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags item
   * @name Using
   * @summary 使用一个道具
   * @request POST:/item/using
   * @secure
   */
  using = (data: UserItemId, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/item/using`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags userNotify
   * @name NotifyAchievementUpdate
   * @request HEAD:/notify/achievementUpdate
   */
  notifyAchievementUpdate = (params: RequestParams = {}) =>
    this.request<AchievementUpdate, any>({
      path: `/notify/achievementUpdate`,
      method: "HEAD",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags user
   * @name IsBindingThirdParty
   * @summary 该设备是否绑定过第三方
   * @request GET:/login/isBindingThirdParty
   */
  isBindingThirdParty = (data: Login, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/login/isBindingThirdParty`,
      method: "GET",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
