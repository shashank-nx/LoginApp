import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import successiveLogo from '../public/successive-logo.svg';
import HeaderComponent from '../components/Header';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login Page  ',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <HeaderComponent logo={successiveLogo}/>
                <div id='componentBody'>
                    {children}
                </div>
            </body>
        </html>
    )
}
