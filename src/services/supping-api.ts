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

export interface ApiUpdateUserRequest {
  /**
   * Имя
   * @min 3
   * @max 50
   */
  firstName?: string;
  /**
   * Фамилия
   * @min 3
   * @max 50
   */
  lastName?: string;
}

export interface AppException {
  cause?: {
    stackTrace?: {
      classLoaderName?: string;
      moduleName?: string;
      moduleVersion?: string;
      methodName?: string;
      fileName?: string;
      /** @format int32 */
      lineNumber?: number;
      nativeMethod?: boolean;
      className?: string;
    }[];
    message?: string;
    suppressed?: {
      stackTrace?: {
        classLoaderName?: string;
        moduleName?: string;
        moduleVersion?: string;
        methodName?: string;
        fileName?: string;
        /** @format int32 */
        lineNumber?: number;
        nativeMethod?: boolean;
        className?: string;
      }[];
      message?: string;
      localizedMessage?: string;
    }[];
    localizedMessage?: string;
  };
  stackTrace?: {
    classLoaderName?: string;
    moduleName?: string;
    moduleVersion?: string;
    methodName?: string;
    fileName?: string;
    /** @format int32 */
    lineNumber?: number;
    nativeMethod?: boolean;
    className?: string;
  }[];
  code?:
    | "NON_UNIQUE"
    | "INVALID_VALUE"
    | "INVALID_FORMAT"
    | "NOT_FOUND"
    | "INTERNAL_SERVER_ERROR"
    | "EXTERNAL_SERVER_ERROR";
  error?: string;
  message?: string;
  suppressed?: {
    stackTrace?: {
      classLoaderName?: string;
      moduleName?: string;
      moduleVersion?: string;
      methodName?: string;
      fileName?: string;
      /** @format int32 */
      lineNumber?: number;
      nativeMethod?: boolean;
      className?: string;
    }[];
    message?: string;
    localizedMessage?: string;
  }[];
  localizedMessage?: string;
}

export interface ApiUserResponse {
  /**
   * Идентификатор
   * @format uuid
   */
  id?: string;
  /**
   * Имя
   * @min 3
   * @max 50
   */
  firstName?: string;
  /**
   * Фамилия
   * @min 3
   * @max 50
   */
  lastName?: string;
  /** Активный */
  active?: boolean;
}

/** Тип инвентаря */
export interface ApiItemItemTypeRequest {
  /**
   * Идентификатор типа инвентаря
   * @format uuid
   */
  id?: string;
}

export interface ApiUpdateStockRequest {
  /**
   * Название акции
   * @min 3
   * @max 50
   * @minLength 3
   * @maxLength 50
   */
  name: string;
  /** Тип инвентаря */
  type: ApiItemItemTypeRequest;
  /** Статус акции */
  status?: "ACTIVE" | "DISABLE" | "DELETE";
  /**
   * Пороговое значение
   * @format int32
   * @min 1
   * @max 1000
   */
  value?: number;
  /** Ед. из. */
  units?: "MINUTES" | "HOURS" | "DAYS";
  /**
   * Значение в %
   * @format double
   * @min 1
   */
  stock?: number;
}

/** Тип инвентаря */
export interface ApiItemTypeResponse {
  /**
   * Идентификатор
   * @format uuid
   */
  id?: string;
  /**
   * Название
   * @min 3
   * @max 50
   */
  name?: string;
  /**
   * Стоимость за час
   * @format double
   * @min 0
   * @max 10000
   */
  cost?: number;
  /**
   * Описание
   * @min 3
   * @max 1024
   */
  description?: string;
}

export interface ApiStockResponse {
  /**
   * Идентификатор
   * @format uuid
   */
  id?: string;
  /**
   * Название
   * @min 1
   * @max 50
   */
  name?: string;
  /** Тип инвентаря */
  type?: ApiItemTypeResponse;
  /** Статус */
  status?: "ACTIVE" | "DISABLE" | "DELETE";
  /**
   * Пороговое значение
   * @format int32
   * @min 1
   * @max 1000
   */
  value?: number;
  /** Ед. из. */
  units?: "MINUTES" | "HOURS" | "DAYS";
  /**
   * Значение в %
   * @format double
   * @min 1
   */
  stock?: number;
}

export interface ApiUpdateRentRequest {
  /**
   * Заметки данной аренды
   * @min 0
   * @max 1024
   */
  description?: string;
  /**
   * Внесенная сумма за аренду
   * @format int32
   * @min 0
   * @max 100000
   */
  paid?: number;
}

export interface ApiItemResponse {
  /**
   * Идентификатор инвентаря
   * @format uuid
   */
  id?: string;
  /**
   * Номер инвентаря
   * @format int32
   * @min 1
   * @max 100
   */
  number?: number;
  /**
   * Название
   * @min 1
   * @max 50
   */
  name?: string;
  /**
   * Описание
   * @min 1
   * @max 1024
   */
  description?: string;
  /** Тип инвентаря */
  type?: ApiItemTypeResponse;
  /** Статус инвентаря */
  status?: "HOME" | "RENTED_OUT" | "NO_ACTIVE" | "DELETE";
  /**
   * Текущее напряжения в mV
   * @format int32
   * @min 1800
   * @max 5000
   */
  volt?: number;
  /** Низкое напряжение */
  lowEnergy?: boolean;
  /**
   * URL для скачивания изображения
   * @min 1
   * @max 2048
   */
  image?: string;
}

export interface ApiRentResponse {
  /**
   * Инденфекатор
   * @format uuid
   */
  id?: string;
  item?: ApiItemResponse;
  /** Статус аренды */
  status?: "NEW" | "ERROR" | "PAY" | "NO_PAY" | "DELETED" | "DELETE_SHORT_TIME";
  /**
   * Описание
   * @min 1
   * @max 1024
   */
  description?: string;
  /**
   * Время начала аренды
   * @format date-time
   */
  startTime?: string;
  /**
   * Время окончания аренды
   * @format date-time
   */
  endTime?: string;
  /**
   * Время аренды в минутах
   * @format int64
   * @min 1
   * @max 50
   */
  rentTime?: number;
  /**
   * Стоимость аренды
   * @format double
   * @min 1
   */
  rentCost?: number;
  /**
   * Оплаченная сумма аренды
   * @format double
   * @min 1
   */
  rentCostFact?: number;
  /**
   * Таймстемп записи
   * @format date-time
   */
  createdAt?: string;
}

export interface ApiUpdateItemRequest {
  /**
   * Номер инвентаря
   * @format int32
   * @min 1
   * @max 100
   */
  number?: number;
  /**
   * Название
   * @min 3
   * @max 50
   */
  name?: string;
  /**
   * Описание
   * @min 3
   * @max 1024
   */
  description?: string;
  /** Тип инвентаря */
  type?: ApiItemItemTypeRequest;
}

export interface ApiItemTypeRequest {
  /**
   * Название типа
   * @min 3
   * @max 50
   */
  name?: string;
  /**
   * Стоимость за 1 час
   * @format double
   * @min 0
   * @max 1000
   */
  cost?: number;
  /**
   * Описание
   * @min 0
   * @max 1024
   */
  description?: string;
}

export interface ApiFilterRequest {
  /** Сортировка полученного результата */
  sort?: ApiFilterSort;
  /**
   * Текст поиска
   * @min 0
   * @max 50
   */
  search?: string;
}

/** Сортировка полученного результата */
export interface ApiFilterSort {
  /**
   * Поле сортировки
   * @min 1
   * @max 50
   */
  field: string;
  /** Направление сортировки */
  direction: "ASC" | "DESC";
}

export interface ApiUserRequest {
  /**
   * Имя
   * @min 3
   * @max 50
   * @minLength 3
   * @maxLength 50
   */
  firstName: string;
  /**
   * Фамилия
   * @min 3
   * @max 50
   * @minLength 3
   * @maxLength 50
   */
  lastName: string;
  /**
   * Логин
   * @min 3
   * @max 50
   * @minLength 3
   * @maxLength 50
   */
  login: string;
}

export interface ApiStockRequest {
  /**
   * Название акции
   * @min 3
   * @max 50
   * @minLength 3
   * @maxLength 50
   */
  name: string;
  /** Тип инвентаря */
  type: ApiItemItemTypeRequest;
  /** Статус акции */
  status?: "ACTIVE" | "DISABLE" | "DELETE";
  /**
   * Пороговое значение
   * @format int32
   * @min 1
   * @max 1000
   */
  value?: number;
  /** Ед. из. */
  units?: "MINUTES" | "HOURS" | "DAYS";
  /**
   * Значение в %
   * @format double
   * @min 1
   */
  stock?: number;
}

export interface ApiRentFilterRequest {
  /** Сортировка полученного результата */
  sort?: ApiFilterSort;
  /**
   * Текст поиска
   * @min 0
   * @max 50
   */
  search?: string;
  /**
   * Текущая страница
   * @format int32
   * @min 0
   * @max 1000
   */
  page: number;
  /**
   * Количество записей на одной странице
   * @format int32
   * @min 1
   * @max 1000
   */
  size: number;
  /** Статус записи аренды */
  status?: "NEW" | "ERROR" | "PAY" | "NO_PAY" | "DELETED" | "DELETE_SHORT_TIME";
}

export interface ApiDailyRentResponse {
  activeUser?: ApiUserResponse;
  /**
   * Текущая дата
   * @format date-time
   */
  day?: string;
  /**
   * Общая стоимость
   * @format int32
   * @min 1
   */
  totalCost?: number;
  /** Записи аренды */
  rents?: PageApiRentResponse;
}

/** Записи аренды */
export interface PageApiRentResponse {
  /** @format int32 */
  totalPages?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  size?: number;
  content?: ApiRentResponse[];
  /** @format int32 */
  number?: number;
  sort?: SortObject;
  pageable?: PageableObject;
  /** @format int32 */
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
}

export interface PageableObject {
  /** @format int64 */
  offset?: number;
  sort?: SortObject;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  pageNumber?: number;
  paged?: boolean;
  unpaged?: boolean;
}

export interface SortObject {
  empty?: boolean;
  unsorted?: boolean;
  sorted?: boolean;
}

export interface ApiItemRequest {
  /**
   * Номер инвентаря
   * @format int32
   * @min 1
   * @max 100
   */
  number: number;
  /**
   * Название инвентаря
   * @min 3
   * @max 50
   * @minLength 3
   * @maxLength 50
   */
  name: string;
  /** Тип инвентаря */
  type: ApiItemItemTypeRequest;
  /**
   * Описание
   * @min 3
   * @max 1024
   */
  description?: string;
}

export interface ApiDataRequest {
  /** @format int32 */
  counter?: number;
  /** @format int32 */
  serial?: number;
  volt?: string;
  /** @format int32 */
  timestamp?: number;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

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
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

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
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Supping web api docs
 * @version 1.0.0
 * @baseUrl /api
 * @contact Supping <info@kiteportal.ru> (http://kiteportal.ru)
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  v1 = {
    /**
     * No description
     *
     * @tags Пользователи
     * @name GetUser
     * @summary Получить пользователя
     * @request GET:/v1/users/{id}
     */
    getUser: (id: string, params: RequestParams = {}) =>
      this.request<ApiUserResponse, AppException>({
        path: `/v1/users/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Пользователи
     * @name UpdateUser
     * @summary Обновить пользователя
     * @request PUT:/v1/users/{id}
     */
    updateUser: (id: string, data: ApiUpdateUserRequest, params: RequestParams = {}) =>
      this.request<ApiUserResponse, AppException>({
        path: `/v1/users/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Акции и скидки
     * @name GetStock
     * @summary Получить акцию
     * @request GET:/v1/stocks/{id}
     */
    getStock: (id: string, params: RequestParams = {}) =>
      this.request<ApiStockResponse, AppException>({
        path: `/v1/stocks/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Акции и скидки
     * @name UpdateStock
     * @summary Обновить акцию
     * @request PUT:/v1/stocks/{id}
     */
    updateStock: (id: string, data: ApiUpdateStockRequest, params: RequestParams = {}) =>
      this.request<ApiStockResponse, AppException>({
        path: `/v1/stocks/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Акции и скидки
     * @name DeleteStock
     * @summary Удалить акцию
     * @request DELETE:/v1/stocks/{id}
     */
    deleteStock: (id: string, params: RequestParams = {}) =>
      this.request<string[], AppException>({
        path: `/v1/stocks/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Записи аренды
     * @name SetStatusPay
     * @summary Установить статус запись аренды Pay
     * @request PUT:/v1/rents/{id}/status/pay
     */
    setStatusPay: (id: string, data: ApiUpdateRentRequest, params: RequestParams = {}) =>
      this.request<ApiRentResponse, AppException>({
        path: `/v1/rents/${id}/status/pay`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Записи аренды
     * @name SetStatusError
     * @summary Установить статус запись аренды Error
     * @request PUT:/v1/rents/{id}/status/error
     */
    setStatusError: (id: string, params: RequestParams = {}) =>
      this.request<ApiRentResponse, AppException>({
        path: `/v1/rents/${id}/status/error`,
        method: "PUT",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Инвентарь
     * @name GetItem
     * @summary Получить Item
     * @request GET:/v1/items/{id}
     */
    getItem: (id: string, params: RequestParams = {}) =>
      this.request<ApiItemResponse, AppException>({
        path: `/v1/items/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Инвентарь
     * @name UpdateItem
     * @summary Обновить Item
     * @request PUT:/v1/items/{id}
     */
    updateItem: (id: string, data: ApiUpdateItemRequest, params: RequestParams = {}) =>
      this.request<ApiItemResponse, AppException>({
        path: `/v1/items/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Инвентарь
     * @name DeleteItem
     * @summary Удалить Item
     * @request DELETE:/v1/items/{id}
     */
    deleteItem: (id: string, params: RequestParams = {}) =>
      this.request<ApiItemResponse, AppException>({
        path: `/v1/items/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Инвентарь
     * @name EnableItem
     * @summary Включить Item
     * @request PUT:/v1/items/enable/{id}
     */
    enableItem: (id: string, params: RequestParams = {}) =>
      this.request<ApiItemResponse, AppException>({
        path: `/v1/items/enable/${id}`,
        method: "PUT",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Инвентарь
     * @name DisableItem
     * @summary Отключить Item
     * @request PUT:/v1/items/disable/{id}
     */
    disableItem: (id: string, params: RequestParams = {}) =>
      this.request<ApiItemResponse, AppException>({
        path: `/v1/items/disable/${id}`,
        method: "PUT",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Типы инвентаря
     * @name GetType
     * @summary Получить тип
     * @request GET:/v1/item-types/{id}
     */
    getType: (id: string, params: RequestParams = {}) =>
      this.request<ApiItemTypeResponse, AppException>({
        path: `/v1/item-types/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Типы инвентаря
     * @name UpdateType
     * @summary Обновить тип
     * @request PUT:/v1/item-types/{id}
     */
    updateType: (id: string, data: ApiItemTypeRequest, params: RequestParams = {}) =>
      this.request<ApiItemTypeResponse, AppException>({
        path: `/v1/item-types/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Типы инвентаря
     * @name DeleteType
     * @summary Удалить тип
     * @request DELETE:/v1/item-types/{id}
     */
    deleteType: (id: string, params: RequestParams = {}) =>
      this.request<string[], AppException>({
        path: `/v1/item-types/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Пользователи
     * @name FindAllByFilter
     * @summary Получить список пользователей
     * @request POST:/v1/users/list
     */
    findAllByFilter: (data: ApiFilterRequest, params: RequestParams = {}) =>
      this.request<ApiUserResponse[], AppException>({
        path: `/v1/users/list`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Пользователи
     * @name SetActiveUser
     * @summary Сделать пользователя активным
     * @request POST:/v1/users/active/{id}
     */
    setActiveUser: (id: string, params: RequestParams = {}) =>
      this.request<ApiUserResponse, AppException>({
        path: `/v1/users/active/${id}`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Пользователи
     * @name CreateUser
     * @summary Создать пользователя
     * @request POST:/v1/users/
     */
    createUser: (data: ApiUserRequest, params: RequestParams = {}) =>
      this.request<ApiUserResponse, AppException>({
        path: `/v1/users/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Акции и скидки
     * @name FindAllByFilter1
     * @summary Получить список акций
     * @request POST:/v1/stocks/list
     */
    findAllByFilter1: (data: ApiFilterRequest, params: RequestParams = {}) =>
      this.request<ApiStockResponse[], AppException>({
        path: `/v1/stocks/list`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Акции и скидки
     * @name CreateStock
     * @summary Создать акцию
     * @request POST:/v1/stocks/
     */
    createStock: (data: ApiStockRequest, params: RequestParams = {}) =>
      this.request<ApiStockResponse, AppException>({
        path: `/v1/stocks/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Записи аренды
     * @name FindAllByFilter2
     * @summary Получить список Items в аренде
     * @request POST:/v1/rents/list/
     */
    findAllByFilter2: (data: ApiRentFilterRequest, params: RequestParams = {}) =>
      this.request<ApiDailyRentResponse, AppException>({
        path: `/v1/rents/list/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Инвентарь
     * @name FindAllByFilter3
     * @summary Получить список Items
     * @request POST:/v1/items/list
     */
    findAllByFilter3: (data: ApiFilterRequest, params: RequestParams = {}) =>
      this.request<ApiItemResponse[], AppException>({
        path: `/v1/items/list`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Инвентарь
     * @name GetFile
     * @summary Получить файл
     * @request GET:/v1/items/img/{id}
     */
    getFile: (id: string, params: RequestParams = {}) =>
      this.request<string, AppException>({
        path: `/v1/items/img/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Инвентарь
     * @name UploadFile
     * @summary Загрузить файл
     * @request POST:/v1/items/img/{id}
     */
    uploadFile: (
      id: string,
      data: {
        /** @format binary */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiItemResponse, AppException>({
        path: `/v1/items/img/${id}`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Инвентарь
     * @name CreateItem
     * @summary Создать Item
     * @request POST:/v1/items/
     */
    createItem: (data: ApiItemRequest, params: RequestParams = {}) =>
      this.request<ApiItemResponse, AppException>({
        path: `/v1/items/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Типы инвентаря
     * @name FindAllByFilter4
     * @summary Получить список типов
     * @request POST:/v1/item-types/list
     */
    findAllByFilter4: (data: ApiFilterRequest, params: RequestParams = {}) =>
      this.request<ApiItemTypeResponse[], AppException>({
        path: `/v1/item-types/list`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Типы инвентаря
     * @name CreateType
     * @summary Создать тип
     * @request POST:/v1/item-types/
     */
    createType: (data: ApiItemTypeRequest, params: RequestParams = {}) =>
      this.request<ApiItemTypeResponse, AppException>({
        path: `/v1/item-types/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags esp-controller
     * @name PostData
     * @request POST:/v1/esp/data/
     */
    postData: (data: ApiDataRequest, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/v1/esp/data/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Записи аренды
     * @name StartRent
     * @summary Запустить аренду
     * @request GET:/v1/rents/{itemId}/start
     */
    startRent: (itemId: string, params: RequestParams = {}) =>
      this.request<ApiRentResponse, AppException>({
        path: `/v1/rents/${itemId}/start`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Записи аренды
     * @name StopRent
     * @summary Остановить аренду
     * @request GET:/v1/rents/{id}/stop
     */
    stopRent: (id: string, params: RequestParams = {}) =>
      this.request<ApiRentResponse, AppException>({
        path: `/v1/rents/${id}/stop`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags esp-controller
     * @name Status
     * @request GET:/v1/esp/status/
     */
    status: (params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/v1/esp/status/`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags esp-controller
     * @name Ping
     * @request GET:/v1/esp/ping/
     */
    ping: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/v1/esp/ping/`,
        method: "GET",
        ...params,
      }),
  };
}
