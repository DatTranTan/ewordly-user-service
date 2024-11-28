import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const httpClient = async (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    try {
        const response = await axios({
            url,
            method,
            data,
            ...config
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export default httpClient;