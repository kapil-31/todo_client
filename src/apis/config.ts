import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import queryString from 'query-string'
const baseURL = 'http://localhost:8080/api/v1'
const request = axios.create({
  baseURL: process.env.REACT_BASE_URL || baseURL,
  paramsSerializer(params) {
    return queryString.stringify(params)
  },
})

// interceptors
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.headers['Content-Type'] = 'application/json'
    // authorization key set here
    return config
  }
)

// request interceptor
request.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  if (response && response.data) return response.data
  return response
})
export { request }
