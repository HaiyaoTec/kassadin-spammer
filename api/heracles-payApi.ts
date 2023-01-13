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

export interface OpenRequest {
  /** 任务唯一描述符 */
  key?: string;

  /** 某任务的某一阶段的唯一描述符 */
  stageKey?: string;
}

export interface OpenMission {
  /** 已获取金额 */
  totalReward?: number;

  /** 任务列表 */
  frontMissions?: FrontMission[];
}

export interface RewardOrder {
  key?: string;
  stageKey?: string;
  userId?: number;
  description?: string;
  awards?: string;

  /**
   * 阶段奖励时间
   * @format int64
   */
  rewardTime?: number;

  /** 余额奖励的订单金额 */
  amount?: number;
}

export interface FrontMission {
  /** 任务唯一描述符 */
  key?: string;

  /** 图标地址 */
  icon?: string;

  /** 任务标题 */
  title?: string;

  /** 任务描述 */
  description?: string;

  /** 该任务每阶段的描述 */
  stages?: MissionStage[];

  /**
   * 任务开始生效的时间
   * @format int64
   */
  startTime?: number;

  /**
   * 任务结束时间
   * @format int64
   */
  endTime?: number;

  /** 任务状态（0-未开始,1-执行中,2-已过期,3-已下线,） */
  state?: number;

  /** 任务类型(sign-签到任务,novice-新手任务,daily-日常任务,advanced-高级任务) */
  type?: string;

  /** 任务跳转地址 */
  target?: string;
}

export interface MissionStage {
  /** 任务阶段唯一描述符 */
  stageKey?: string;

  /** 任务阶段序号 */
  index?: number;

  /** 任务阶段标题 */
  title?: string;

  /** 任务阶段描述 */
  description?: string;

  /** 奖励内容 */
  awards?: object[];

  /** 一系列奖励相关的订单号 */
  awardOrders?: string[];

  /** 该阶段领奖状态（0-未领奖，1-已领奖） */
  awardState?: number;

  /** 该阶段进度 */
  progress?: Progress[];

  /** 该阶段是否完成 */
  state?: boolean;

  /**
   * 领奖时间
   * @format int64
   */
  rewardTime?: number;
}

export interface Progress {
  /** 当前进度 */
  current?: object;

  /** 总目标 */
  target?: object;

  /** 进度描述 */
  desc?: string;
}

export interface AdvertisementOpen {
  id?: number;
  imageUrl?: string;
  linkUrl?: string;
  group?: string;
  groupName?: string;
  description?: string;

  /** 权重 */
  weight?: number;
  tags?: string;
  tagNames?: string;

  /** @format int64 */
  createTime?: number;
}

export interface PayOrder {
  orderNo?: string;
  userId?: number;
  state?: number;

  /** 货币 */
  currency?: string;

  /** 支付链接 */
  payUrl?: string;

  /** 用户支付金额 */
  amountPay?: number;

  /**
   * 若手续费平台承担，则 [amountIncome] 等同于 [amountPay] 字段
   * 手续费用户承担，则 [amountIncome] 等同于 [amountPay] - [amountFee]
   */
  amountIncome?: number;

  /** 渠道手续费 */
  amountFee?: number;

  /** 三方订单号 */
  thirdNo?: string;

  /**
   * 订单创建时间
   * @format int64
   */
  createTime?: number;

  /** 交易地址 */
  txId?: string;
  channelKey?: string;
  portKey?: string;

  /** 链 */
  chain?: string;
}

export interface ICurrency {
  code?: string;
  fullName?: string;
  decimal?: number;
}

export interface ConverPage {
  curPage?: number;
  totalPage?: number;
  curCount?: number;
  totalCount?: number;
  items?: PayOrder[];
}

export interface PayPortInfo {
  channelKey?: string;
  portKey?: string;
  state?: object;
  icon?: string;
  title?: string;
  categoryRegex?: object;
  extra?: object;
  weight?: number;
  rechargeRangeMax?: number;
  rechargeRangeMin?: number;
}

export interface PayBank {
  portKey?: string;
  title?: string;
  icon?: string;

  /** 链名称 */
  chain?: string;

  /** 0 -下线 1-上线 2-维护 */
  state?: string;

  /** 渠道key */
  channelKey?: string;
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
 * @title heracles-ad
 * @version 1.0
 * @baseUrl http://localhost:3000
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags pay
   * @name QueryOrderState
   * @summary 查询订单状态
   * @request GET:/heracles/pay/orders/{orderNo}
   * @secure
   */
  queryOrderState = (orderNo: string, params: RequestParams = {}) =>
    this.request<PayOrder, any>({
      path: `/heracles/pay/orders/${orderNo}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });

  /**
   * @description 订单状态描述 - Pending(0, "待支付") - SUBMIT_FAILED(1, "提交订单失败") - PAYED_SUCCESS(2, "支付成功") - PAYED_FAILED(3, "支付失败") - DELIVERING(4, "发货中") - AUTO_DELIVERY_SUCCESS(5, "自动交货成功") - AUTO_DELIVERY_FAILED(6, "自动交货失败") - MANUAL_DELIVERY_SUCCESS(7, "手动交货成功") - MANUAL_DELIVERY_FAILED(8, "手动交货失败") - TIMEOUT_CANCEL(9, "超时取消") - MANUAL_CANCEL(10, "手动取消")
   *
   * @tags pay
   * @name QueryOrderHistory
   * @summary 订单历史
   * @request GET:/heracles/pay/orders
   * @secure
   */
  queryOrderHistory = (
    query: { page: number; count: number; currency?: string; startTime?: number; endTime?: number; state?: number[] },
    params: RequestParams = {},
  ) =>
    this.request<ConverPage, any>({
      path: `/heracles/pay/orders`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags pay
   * @name GetPorts
   * @summary 支付端口
   * @request GET:/heracles/pay/ports
   * @secure
   */
  getPorts = (query: { currency: string; country?: string }, params: RequestParams = {}) =>
    this.request<PayPortInfo[], any>({
      path: `/heracles/pay/ports`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags pay
   * @name GetBanks
   * @summary 支付银行
   * @request GET:/heracles/pay/banks
   * @secure
   */
  getBanks = (query: { currency: string; country?: string }, params: RequestParams = {}) =>
    this.request<PayBank[], any>({
      path: `/heracles/pay/banks`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
}
