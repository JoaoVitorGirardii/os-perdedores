import { RotateCw } from 'lucide-react'

export type LoadingProps = {
    isLoading: boolean
    msgLoadin?: string
}

export function Loading({ isLoading, msgLoadin }: LoadingProps) {
    if (!isLoading) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 backdrop-blur-xs bg-white/20 dark:bg-black/20"></div>
            <div className="relative z-10 flex items-center justify-center rounded-lg px-6 py-4 ">
                <RotateCw className="mr-3 size-8 animate-spin text-primary" />
                <span className="text-2xl">{msgLoadin ? msgLoadin : 'Carregando'}</span>
            </div>
        </div>
    )
}
