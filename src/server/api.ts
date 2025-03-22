// import { SessionStorageENUM } from '@/enums/sessionStorage'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
const instance = axios.create({
    baseURL: 'http://localhost:3333/api',
})

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
                // sessionStorage.removeItem(SessionStorageENUM.TOKEN)
                // sessionStorage.removeItem(SessionStorageENUM.USER)
            }
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
    },
)

export const api = instance
