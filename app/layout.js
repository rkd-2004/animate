import './globals.css';
import { Inter } from 'next/font/google';
import GradientBackground from '@/components/ui/GradientBackground';
import { ThemeProvider } from '@/components/theme-provider';
import AuthProvider from '@/components/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Interactive Gradient Background',
  description: 'A beautiful interactive background gradient component',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <GradientBackground />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}