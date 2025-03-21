import { TopMenu } from '@/components/top-menu'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Os perdedores',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main>
            <TopMenu />
            {children}
        </main>
    )
}
