// All code related to remote calls comes up
// It should be central utility to patch headers such as cookies before any api call
// access-token, Cookie // Start a loader, exception handling {error: true, data: {message: "", errorCode: ""}}, 
/*
the client can be extended as follows according to the need for configuration:-
const reqs = new req(baseurl,config)
reqs.get().then( res=>console.log(res));
*/

import { message } from 'antd';
import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import { AUTHORISATION_PATH } from '../constants/urls';
import { configType } from '../models/config-type'

const CLIENT_ERROR_CODES = [400, 403, 404]

declare module 'axios' {
    export interface AxiosRequestConfig {
        handlerEnabled: boolean;
    }
}

type errormetadata ={
    data?:{
            code?: string,
            message?: string
        }
}

type errordata = {
    data?: errormetadata
}

class HttpClient {
    protected readonly instance: AxiosInstance;

    public constructor() {
        this.instance = axios.create({
            handlerEnabled: true
        });
        this.instance.interceptors.response.use(
            this._handleResponse,
            this._handleError,
        );
    }

    protected _handleResponse = ({ data }: AxiosResponse) => data;
    
    protected _handleError = (error: AxiosError) => {
        if(CLIENT_ERROR_CODES.includes(error.response.status)) {
            let err :errordata= { data: error.response.data}
            message.error(`Error ${err.data.data.code} due to ${err.data.data.message}`)
        }
        if (error.response.status === 401) {
            window.location.href = AUTHORISATION_PATH;
        }
        return Promise.reject(error.response);
    }

    public get = (url: string) => {
        return this.instance.get(url);
    }

    public post = (url: string, body: any) => {
        return this.instance.post(url, body);
    }

    public put = (url: string, body: any) => {
        return this.instance.put(url, body);
    }

    public delete = (url: string) => {
        return this.instance.delete(url);
    }
}

const httpInstance = new HttpClient();

export default httpInstance;

