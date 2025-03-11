import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formataValorInput(e: React.ChangeEvent<HTMLInputElement>): string {
    const value = e.target.value.replace(/\D/g, '')
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(parseFloat(value) / 100)
    return formattedValue
}
