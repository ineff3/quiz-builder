import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Quiz Builder',
	description: 'Build your own quiz',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	)
}
