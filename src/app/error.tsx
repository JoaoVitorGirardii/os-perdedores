'use client'
import { Rotas } from '@/enums/rotas'
import Link from 'next/link'

export default function ErroPageNotFound() {
    return (
        <div>
            Pagina não encontrada
            <Link href={Rotas.HOME}>HOME</Link>
        </div>
    )
}
