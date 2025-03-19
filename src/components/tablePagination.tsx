'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface TablePaginationProps {
    currentPage: number
    totalItems: number
    itemsPerPage: number
    onPageChange: (page: number) => void
    onItemsPerPageChange: (itemsPerPage: number) => void
    className?: string
}

export function TablePagination({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    className = '',
}: TablePaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    const isPrevDisabled = currentPage <= 1
    const isNextDisabled = currentPage >= totalPages

    return (
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-1 px-4 ${className}`}>
            <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Itens por página</span>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => onItemsPerPageChange(Number(value))}>
                    <SelectTrigger className="h-8 w-[70px] hover:cursor-pointer">
                        <SelectValue placeholder={itemsPerPage.toString()} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col items-center gap-4">
                <div className="text-sm text-muted-foreground whitespace-nowrap">
                    {startItem}-{endItem} de {totalItems} itens
                </div>

                <div className="flex items-center">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={isPrevDisabled}
                        className="h-8 w-8 rounded-r-none hover:cursor-pointer"
                        aria-label="Página anterior"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={isNextDisabled}
                        className="h-8 w-8 rounded-l-none border-l-0 hover:cursor-pointer"
                        aria-label="Próxima página"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
