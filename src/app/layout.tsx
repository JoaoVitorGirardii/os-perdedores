import type { Metadata } from 'next'
import { Fira_Sans } from 'next/font/google'
import './globals.css'
import { TopMenu } from '@/components/top-menu'

const firaSans = Fira_Sans({
    variable: '--font-fira-sans',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
    title: 'Os perdedores',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR">
            <body className={`${firaSans.variable} antialiased`}>
                <TopMenu />
                {children}
            </body>
        </html>
    )
}
