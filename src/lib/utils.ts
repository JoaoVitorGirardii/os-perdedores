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

export function formataValor(e: number | undefined): string {
    if (!e) return 'R$ 00,00'

    const value = e.toLocaleString('pt-BR', { minimumFractionDigits: 2 })

    return `R$ ${value}`
}

export function converteValorStringEmNumero(currencyString: string) {
    const num = currencyString
        .replace(/R\$\s*/g, '') // Remove "R$" and any spaces after it
        .replace(/\./g, '') // Remove dots
        .replace(',', '.') // Replace virgula
        .trim() // Remove espaços
    if (Number(num)) {
        return Number(num)
    }
    return 0
}
