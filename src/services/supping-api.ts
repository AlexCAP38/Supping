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
  /**
   * Сумма заработанная за день
   * @min 1
   */
  totalValue?: number;
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
    | "EXTERNAL_SERVER_ERROR"
    | "OLD_PASSWORD_INCORRECT";
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
  auto?: boolean;
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

export interface ApiStartRentRequest {
  /**
   * Время начала аренды
   * @format time
   * @example "00:00:00"
   */
  startTime: string;
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
  status?: "HOME" | "PRE_RENT" | "RENTED" | "NO_ACTIVE" | "DELETE";
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
  status?: "ACTIVE" | "HOLD" | "WAIT_PAYMENT" | "PAID" | "ERROR" | "DELETED" | "DELETE_SHORT_TIME";
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
   * Сумма предоплаты аренды
   * @format double
   * @min 1
   */
  preRentCost?: number;
  /**
   * Таймстемп записи
   * @format date-time
   */
  createdAt?: string;
}

export interface ApiPreRentRequest {
  /**
   * Время начала аренды
   * @format double
   */
  preRentCost: number;
  description?: string;
}

export interface ApiStopRentRequest {
  /**
   * Дата и время завершения аренды
   * @format date-time
   * @example "2025-01-01T00:00:00Z"
   */
  endTime: string;
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
  auto?: boolean;
}

export interface ApiUserUpdateRequest {
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  department?: string;
  email?: string;
  messenger?: string;
}

export interface ApiAccountResponse {
  /**
   * Идентификатор
   * @format uuid
   */
  userId?: string;
  /** Логин пользователя */
  login?: string;
  /** Роль пользователя */
  role?: "ADMIN" | "USER" | "SYSTEM";
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
  /** Роль */
  role: "ADMIN" | "USER" | "SYSTEM";
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
  /** Возвращать только актуальный список */
  actualOnly?: boolean;
  /** Статус записи аренды */
  status?: "ACTIVE" | "HOLD" | "WAIT_PAYMENT" | "PAID" | "ERROR" | "DELETED" | "DELETE_SHORT_TIME";
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
  sort?: SortObject[];
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
  sort?: SortObject[];
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  paged?: boolean;
  unpaged?: boolean;
}

export interface SortObject {
  direction?: string;
  nullHandling?: string;
  ascending?: boolean;
  property?: string;
  ignoreCase?: boolean;
}

export interface ApiItemFilterRequest {
  /** Сортировка полученного результата */
  sort?: ApiFilterSort;
  /**
   * Текст поиска
   * @min 0
   * @max 50
   */
  search?: string;
  /** инвентаря */
  itemStatus?: "HOME" | "PRE_RENT" | "RENTED" | "NO_ACTIVE" | "DELETE";
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

export interface ApiResetPasswordRequest {
  /**
   * Логин
   * @min 3
   * @max 50
   * @minLength 3
   * @maxLength 50
   */
  login: string;
  /**
   * Установить пароль
   * @min 3
   * @max 50
   * @minLength 3
   * @maxLength 50
   */
  password: string;
}

export interface ApiAuthRequest {
  /**
   * Логин
   * @min 3
   * @max 50
   */
  login: string;
  /**
   * Пароль
   * @min 8
   * @max 256
   */
  password: string;
}

export interface ApiChangePasswordRequest {
  /**
   * Старый пароль
   * @min 8
   * @max 256
   * @minLength 8
   * @maxLength 256
   */
  oldPassword: string;
  /**
   * Новый пароль
   * @min 8
   * @max 256
   * @minLength 8
   * @maxLength 256
   */
  newPassword: string;
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
 * @contact Supping (https://front.supping.justwind.ru/)
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
     * @secure
     */
    getUser: (id: string, params: RequestParams = {}) =>
      this.request<ApiUserResponse, AppException>({
        path: `/v1/users/${id}`,
        method: "GET",
        secure: true,
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
     * @secure
     */
    updateUser: (id: string, data: ApiUpdateUserRequest, params: RequestParams = {}) =>
      this.request<ApiUserResponse, AppException>({
        path: `/v1/users/${id}`,
        method: "PUT",
        body: data,
        secure: true,
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
     * @secure
     */
    getStock: (id: string, params: RequestParams = {}) =>
      this.request<ApiStockResponse, AppException>({
        path: `/v1/stocks/${id}`,
        method: "GET",
        secure: true,
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
     * @secure
     */
    updateStock: (id: string, data: ApiUpdateStockRequest, params: RequestParams = {}) =>
      this.request<ApiStockResponse, AppException>({
        path: `/v1/stocks/${id}`,
        method: "PUT",
        body: data,
        secure: true,
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
     * @secure
     */
    deleteStock: (id: string, params: RequestParams = {}) =>
      this.request<string[], AppException>({
        path: `/v1/stocks/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Записи аренды
     * @name StartRent
     * @summary Запустить аренду
     * @request PUT:/v1/rents/{itemId}/start
     * @secure
     */
    startRent: (itemId: string, data: ApiStartRentRequest, params: RequestParams = {}) =>
      this.request<ApiRentResponse, AppException>({
        path: `/v1/rents/${itemId}/start`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Записи аренды
     * @name PreRent
     * @summary Предварительная аренда
     * @request PUT:/v1/rents/{itemId}/preRent
     * @secure
     */
    preRent: (itemId: string, data: ApiPreRentRequest, params: RequestParams = {}) =>
      this.request<ApiRentResponse, AppException>({
        path: `/v1/rents/${itemId}/preRent`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Записи аренды
     * @name StopRent
     * @summary Остановить аренду
     * @request PUT:/v1/rents/{id}/stop
     * @secure
     */
    stopRent: (id: string, data: ApiStopRentRequest, params: RequestParams = {}) =>
      this.request<ApiRentResponse, AppException>({
        path: `/v1/rents/${id}/stop`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Записи аренды
     * @name ErrorRent
     * @summary Ошибочная аренда
     * @request PUT:/v1/rents/{id}/status/error
     * @secure
     */
    errorRent: (id: string, params: RequestParams = {}) =>
      this.request<ApiRentResponse, AppException>({
        path: `/v1/rents/${id}/status/error`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Записи аренды
     * @name PaymentRent
     * @summary Оплата аренды
     * @request PUT:/v1/rents/{id}/payment
     * @secure
     */
    paymentRent: (id: string, data: ApiUpdateRentRequest, params: RequestParams = {}) =>
      this.request<ApiRentResponse, AppException>({
        path: `/v1/rents/${id}/payment`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
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
     * @secure
     */
    getItem: (id: string, params: RequestParams = {}) =>
      this.request<ApiItemResponse, AppException>({
        path: `/v1/items/${id}`,
        method: "GET",
        secure: true,
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
     * @secure
     */
    updateItem: (id: string, data: ApiUpdateItemRequest, params: RequestParams = {}) =>
      this.request<ApiItemResponse, AppException>({
        path: `/v1/items/${id}`,
        method: "PUT",
        body: data,
        secure: true,
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
     * @secure
     */
    deleteItem: (id: string, params: RequestParams = {}) =>
      this.request<ApiItemResponse, AppException>({
        path: `/v1/items/${id}`,
        method: "DELETE",
        secure: true,
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
     * @secure
     */
    enableItem: (id: string, params: RequestParams = {}) =>
      this.request<ApiItemResponse, AppException>({
        path: `/v1/items/enable/${id}`,
        method: "PUT",
        secure: true,
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
     * @secure
     */
    disableItem: (id: string, params: RequestParams = {}) =>
      this.request<ApiItemResponse, AppException>({
        path: `/v1/items/disable/${id}`,
        method: "PUT",
        secure: true,
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
     * @secure
     */
    getType: (id: string, params: RequestParams = {}) =>
      this.request<ApiItemTypeResponse, AppException>({
        path: `/v1/item-types/${id}`,
        method: "GET",
        secure: true,
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
     * @secure
     */
    updateType: (id: string, data: ApiItemTypeRequest, params: RequestParams = {}) =>
      this.request<ApiItemTypeResponse, AppException>({
        path: `/v1/item-types/${id}`,
        method: "PUT",
        body: data,
        secure: true,
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
     * @secure
     */
    deleteType: (id: string, params: RequestParams = {}) =>
      this.request<string[], AppException>({
        path: `/v1/item-types/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name UpdateAccount
     * @summary Update account
     * @request PUT:/v1/account/update
     * @secure
     */
    updateAccount: (data: ApiUserUpdateRequest, params: RequestParams = {}) =>
      this.request<ApiAccountResponse, AppException>({
        path: `/v1/account/update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
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
     * @secure
     */
    findAllByFilter: (data: ApiFilterRequest, params: RequestParams = {}) =>
      this.request<ApiUserResponse[], AppException>({
        path: `/v1/users/list`,
        method: "POST",
        body: data,
        secure: true,
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
     * @secure
     */
    setActiveUser: (id: string, params: RequestParams = {}) =>
      this.request<ApiUserResponse, AppException>({
        path: `/v1/users/active/${id}`,
        method: "POST",
        secure: true,
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
     * @secure
     */
    createUser: (data: ApiUserRequest, params: RequestParams = {}) =>
      this.request<ApiUserResponse, AppException>({
        path: `/v1/users/`,
        method: "POST",
        body: data,
        secure: true,
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
     * @secure
     */
    findAllByFilter1: (data: ApiFilterRequest, params: RequestParams = {}) =>
      this.request<ApiStockResponse[], AppException>({
        path: `/v1/stocks/list`,
        method: "POST",
        body: data,
        secure: true,
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
     * @secure
     */
    createStock: (data: ApiStockRequest, params: RequestParams = {}) =>
      this.request<ApiStockResponse, AppException>({
        path: `/v1/stocks/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Записи аренды
     * @name FindAllByFilter2
     * @summary Получить фильтрованный список аренды
     * @request POST:/v1/rents/list
     * @secure
     */
    findAllByFilter2: (data: ApiRentFilterRequest, params: RequestParams = {}) =>
      this.request<ApiDailyRentResponse, AppException>({
        path: `/v1/rents/list`,
        method: "POST",
        body: data,
        secure: true,
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
     * @secure
     */
    findAllByFilter3: (data: ApiItemFilterRequest, params: RequestParams = {}) =>
      this.request<ApiItemResponse[], AppException>({
        path: `/v1/items/list`,
        method: "POST",
        body: data,
        secure: true,
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
     * @secure
     */
    getFile: (id: string, params: RequestParams = {}) =>
      this.request<string, AppException>({
        path: `/v1/items/img/${id}`,
        method: "GET",
        secure: true,
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
     * @secure
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
        secure: true,
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
     * @secure
     */
    createItem: (data: ApiItemRequest, params: RequestParams = {}) =>
      this.request<ApiItemResponse, AppException>({
        path: `/v1/items/`,
        method: "POST",
        body: data,
        secure: true,
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
     * @secure
     */
    findAllByFilter4: (data: ApiFilterRequest, params: RequestParams = {}) =>
      this.request<ApiItemTypeResponse[], AppException>({
        path: `/v1/item-types/list`,
        method: "POST",
        body: data,
        secure: true,
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
     * @secure
     */
    createType: (data: ApiItemTypeRequest, params: RequestParams = {}) =>
      this.request<ApiItemTypeResponse, AppException>({
        path: `/v1/item-types/`,
        method: "POST",
        body: data,
        secure: true,
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
     * @secure
     */
    postData: (data: ApiDataRequest, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/v1/esp/data/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name ResetPassword
     * @summary Account reset password
     * @request POST:/v1/account/resetPassword
     * @secure
     */
    resetPassword: (data: ApiResetPasswordRequest, params: RequestParams = {}) =>
      this.request<ApiAccountResponse, AppException>({
        path: `/v1/account/resetPassword`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name Login
     * @request POST:/v1/account/login
     * @secure
     */
    login: (data: ApiAuthRequest, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/v1/account/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name ChangePassword
     * @summary Account change password
     * @request POST:/v1/account/changePassword
     * @secure
     */
    changePassword: (data: ApiChangePasswordRequest, params: RequestParams = {}) =>
      this.request<ApiAccountResponse, AppException>({
        path: `/v1/account/changePassword`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Записи аренды
     * @name GetRentItem
     * @summary Запись аренды
     * @request GET:/v1/rents/{id}/
     * @secure
     */
    getRentItem: (id: string, params: RequestParams = {}) =>
      this.request<ApiRentResponse, AppException>({
        path: `/v1/rents/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags esp-controller
     * @name Status
     * @request GET:/v1/esp/status/
     * @secure
     */
    status: (params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/v1/esp/status/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags esp-controller
     * @name Ping
     * @request GET:/v1/esp/ping/
     * @secure
     */
    ping: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/v1/esp/ping/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name InfoAccount
     * @summary Account info
     * @request GET:/v1/account/info
     * @secure
     */
    infoAccount: (params: RequestParams = {}) =>
      this.request<ApiAccountResponse, AppException>({
        path: `/v1/account/info`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
