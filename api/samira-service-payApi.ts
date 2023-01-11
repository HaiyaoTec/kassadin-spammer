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

export interface VerifyResult {
  /**
   * 订单类型
   * @format int32
   */
  code?: number;
  data?: string;
}

export interface Verify {
  /** 支付数据 */
  package?: string;

  /** 0:IOS,1:GOOGLE */
  channel: number;
  productId: string;
  purchaseToken: string;
  thirdOrderNo?: string;

  /** 本次验证是否为补单 */
  isReplenishment: boolean;
}

export interface Merchandise {
  /** 商品ID */
  id?: string;

  /** 商品名 */
  name?: string;

  /**
   * 商品价格
   * @format double
   */
  money?: number;

  /** 说明1 */
  describe1?: string;

  /** 说明2 */
  describe2?: string;

  /** 奖励 */
  reward?: string;

  /** 附加奖励 */
  additionalReward?: string;

  /** 活动商品到期时间 */
  time?: number;

  /** 是否最佳 */
  best?: boolean;

  /** 图标 */
  icon?: string;

  /** 是否首充 */
  isFirstPay?: boolean;

  /**
   * 基础金币
   * @format int64
   */
  baseGold?: number;

  /**
   * 加成金币
   * @format int64
   */
  addGold?: number;
}

export interface Store {
  items?: any;
  freeMerchandise?: FreeMerchandise;
  diamond?: Diamond;
  bonusCard?: BonusCard;
}

export interface FreeMerchandise {
  /** 免费礼包奖励 */
  result?: string;

  /** 剩余时间 */
  time?: number;

  /** 是否已领取 */
  state?: boolean;
}

export interface Diamond {
  /** 累计次数 */
  size?: number;

  /** 奖励结果 */
  result?: string;

  /** 次数要求 */
  requirements?: number;
}

export interface BonusCard {
  /** 当前生效的加成比例 0没有 */
  proportion?: number;

  /** 加成卡结束时间 */
  endTime?: number;

  /** 加成卡列表 */
  list?: number[];

  /** 活动开启状态 */
  "activeState  "?: boolean;
}

export interface AdditionalApi {
  /** 是否通过加成页面进入金币礼包 */
  type?: boolean;
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
 * @title samira-service-pay
 * @version 1.0
 * @baseUrl http://localhost:3000
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags pay
   * @name Verify
   * @summary Your GET endpoint
   * @request GET:/verify
   * @secure
   */
  verify = (data: Verify, params: RequestParams = {}) =>
    this.request<VerifyResult, any>({
      path: `/verify`,
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
   * @tags store
   * @name LoadingMerchandiseList
   * @summary 加载商品列表
   * @request GET:/store/loadingMerchandiseList
   * @secure
   */
  loadingMerchandiseList = (params: RequestParams = {}) =>
    this.request<Store, any>({
      path: `/store/loadingMerchandiseList`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags store
   * @name ReceiveFreeMerchandise
   * @summary 领取免费礼包
   * @request GET:/store/receiveFreeMerchandise
   * @secure
   */
  receiveFreeMerchandise = (params: RequestParams = {}) =>
    this.request<FreeMerchandise, any>({
      path: `/store/receiveFreeMerchandise`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags store
   * @name ReceiveDiamond
   * @summary 领取钻石奖励
   * @request GET:/store/receiveDiamond
   * @secure
   */
  receiveDiamond = (params: RequestParams = {}) =>
    this.request<Diamond, any>({
      path: `/store/receiveDiamond`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags store
   * @name AdditionalApi
   * @summary 附加API
   * @request POST:/store/additionalApi
   * @secure
   */
  additionalApi = (data: AdditionalApi, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/store/additionalApi`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
