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

export interface CoinGoods {
  /** 价格 */
  price?: number;
  id: number;
  /** 金额 */
  income?: number;
  background?: string;
}

export interface ListGoodsRes {
  lock: boolean
  goods: CoinGoods[]
}

export interface CoinOrderPage {
  /** @format int64 */
  curPage?: number;

  /** @format int64 */
  curCount?: number;

  /** @format int64 */
  totalPage?: number;

  /** @format int64 */
  totalCount?: number;
  items?: CoinOrder[];
}

export interface CoinOrder {
  orderNo?: string;

  /** 充值玩家id */
  receiverUid?: string;

  /** 商品价格 */
  price?: number;

  /** 商品到账 */
  income?: number;

  /**
   * 创建时间
   * @format int64
   */
  createTime?: number;

  /** 订单状态 */
  state?: number;

  /**
   * 到账时间
   * @format int64
   */
  completeTime?: number;
}

export interface PayResponse {
  /** 支付渠道为WAYANG_PAY时，此字段返回的是支付码 */
  payUrl?: string;

  /** 充值单号 */
  rechargNO?: string;
}

export interface CoinOrderBulletin {
  /** 用户名 */
  username?: string;

  /** 充值金额 */
  income?: number;

  /**
   * 创建时间
   * @format int64
   */
  createTime?: number;
}

export interface ProxyUserRank {
  /** 用户名 */
  username?: string;

  /** 头像 */
  avatar?: string;

  /** 到账金额 */
  income?: number;

  /** 数量 */
  count?: number;
}

export interface CoinOrderCreate {
  /** 商品id */
  id: number;

  /** 玩家id */
  receiverUid: string;
  portKey: string;
  extra?: string;
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
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8080" });
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
 * @title samira-service-proxy
 * @version 1.0
 * @baseUrl http://localhost:8080
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags proxy
   * @name ListOrder
   * @summary 金币订单列表
   * @request GET:/proxy/coinOrder
   * @secure
   */
  listOrder = (query: { curPage: number; curCount: number; receiverUid?: string }, params: RequestParams = {}) =>
    this.request<CoinOrderPage, any>({
      path: `/proxy/coinOrder`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags proxy
   * @name BuyCoin
   * @summary 创建金币订单
   * @request POST:/proxy/coinOrder
   * @secure
   */
  buyCoin = (data: CoinOrderCreate, params: RequestParams = {}) =>
    this.request<PayResponse, any>({
      path: `/proxy/coinOrder`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags proxy
   * @name ListProxyRank
   * @summary 代理排行榜
   * @request GET:/proxy/proxyRank
   */
  listProxyRank = (params: RequestParams = {}) =>
    this.request<ProxyUserRank[], any>({
      path: `/proxy/proxyRank`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags proxy
   * @name ListGoods
   * @summary 金币商品列表
   * @request GET:/proxy/coinGoods
   */
  listGoods = (params: RequestParams = {}) =>
    this.request<ListGoodsRes, any>({
      path: `/proxy/coinGoods`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags proxy
   * @name ListBulletin
   * @summary 金币订单弹幕
   * @request GET:/proxy/coinOrderBulletin
   */
  listBulletin = (params: RequestParams = {}) =>
    this.request<CoinOrderBulletin[], any>({
      path: `/proxy/coinOrderBulletin`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags proxy
   * @name GetOrder
   * @summary 金币订单详情
   * @request GET:/proxy/coinOrder/{orderNo}
   * @secure
   */
  getOrder = (orderNo: string, params: RequestParams = {}) =>
    this.request<CoinOrder, any>({
      path: `/proxy/coinOrder/${orderNo}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
