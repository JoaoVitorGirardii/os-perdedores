import { CookieNameENUM } from '@/enums/cookieName'
import { obterCookie, removerCookie } from '@/lib/cookies'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        ['x-app-source']: process.env.NEXT_PUBLIC_APP_SOURCE_VALUE,
    },
})

// Adiciona um interceptor para todas as requisições
instance.interceptors.request.use(
    (config) => {
        const token = obterCookie(CookieNameENUM.TOKEN)

        // Se o token existir, adiciona ao cabeçalho de autorização
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
    },
    function (error) {
        if (error instanceof AxiosError) {
            toast.error(error.response?.data.error)

            if (error.response?.status === 401) {
                removerCookie(CookieNameENUM.TOKEN)
                removerCookie(CookieNameENUM.USER)
            }

            return Promise.reject(error.response?.data)
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
    },
)

export const api = instance
