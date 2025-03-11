export function TopMenu() {
    return (
        <div className="bg-sidebar-primary text-gray-100 rounded-b-full">
            <ul className="flex gap-4 p-4 px-8">
                <li>
                    <a href="/home">HOME</a>
                </li>
                <li>ITENS PERDIDOS</li>
                <li>
                    <a href="/top10">TOP 10</a>
                </li>
                <li>
                    <a href="/cadastro/item-perdido">CADASTRO</a>
                </li>
            </ul>
        </div>
    )
}
