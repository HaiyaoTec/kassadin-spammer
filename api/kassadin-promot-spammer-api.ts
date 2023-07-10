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

export interface SelectOption{
    value:string
    label:string
}

export interface SpammerLoginResp {
    agentToken: string;
}

export interface SpammerLoginParam {
    userName: string;
    password: string;
}

export interface Spammer {
    userName: string;
}

export interface SpammerCheckParam {
    uId: string;
    whatsApp: string;
    spammerName: string;
}

export interface SpammerOrderResp {
    curPage?: number;
    curCount?: number;
    totalCount?: number;
    totalPage?: number;
    items?: SpammerOrder[];
}

export interface SpammerOrder {
    id?: number;
    uId?: string;
    whatsApp?: string;

    /** @format int64 */
    checkTime?: number;
    memberName?: string;
    status?: number; //0 pending 1 completed
    depositAmount?: number;
    riskLevel?:number
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
 * @title service-promo
 * @version 1.0
 * @baseUrl http://localhost:8080
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Spammer
     * @name SpammerLogin
     * @summary spammer 登录
     * @request POST:/main/promo/spammer/login
     */
    spammerLogin = (body: SpammerLoginParam, params: RequestParams = {}) =>
        this.request<SpammerLoginResp, any>({
            path: `/main/promo/spammer/login`,
            method: "POST",
            body: body,
            type: ContentType.Json,
            format: "json",
            ...params,
        });

    /**
     * No description
     *
     * @tags Spammer
     * @name GetSpammerMembers
     * @summary 小组成员列表
     * @request GET:/main/promo/spammer/member
     * @secure
     */
    getSpammerMembers = (params: RequestParams = {}) =>
        this.request<Spammer[], any>({
            path: `/main/promo/spammer/member`,
            method: "GET",
            secure: true,
            format: "json",
            ...params,
        });

    /**
     * No description
     *
     * @tags Spammer
     * @name SpammerCheck
     * @summary spammer 登记
     * @request POST:/main/promo/spammer/check
     * @secure
     */
    spammerCheck = (body: SpammerCheckParam, params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/main/promo/spammer/check`,
            method: "POST",
            body: body,
            secure: true,
            type: ContentType.Json,
            ...params,
        });

    /**
     * No description
     *
     * @tags Spammer
     * @name SpammerRefresh
     * @summary spammer刷新订单
     * @request GET:/main/promo/spammer/refresh/{id}
     * @secure
     */
    spammerRefresh = (id: number, params: RequestParams = {}) =>
        this.request<any, any>({
            path: `/main/promo/spammer/refresh/${id}`,
            method: "GET",
            secure: true,
            ...params,
        });

    /**
     * No description
     *
     * @tags Spammer
     * @name GetSpammerOrder
     * @summary spammer 订单列表
     * @request GET:/main/promo/spammer/order
     * @secure
     */
    getSpammerOrder = (query: { page: number; count: number; uIdOrWa?: string }, params: RequestParams = {}) =>
        this.request<SpammerOrderResp, any>({
            path: `/main/promo/spammer/order`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        });
}
