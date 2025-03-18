import { TriangleAlert } from 'lucide-react'

export function MsgDefaultTabelaVazia() {
    return (
        <div className="flex justify-center gap-2">
            <TriangleAlert className="text-orange-500" />
            <span>Nenhum dado encontrado</span>
        </div>
    )
}
