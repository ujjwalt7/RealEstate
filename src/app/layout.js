
import "./globals.css";
import RootLayoutShell from "./RootLayoutShell";

export const metadata = {
  title: 'Varsha Infra | Trusted Real Estate Agency',
  description: 'Varsha Infra is a leading real estate agency specializing in residential, commercial, and land transactions. Trusted by thousands for transparent, secure, and expert property services.',
  openGraph: {
    title: 'Varsha Infra | Trusted Real Estate Agency',
    description: 'Varsha Infra is a leading real estate agency specializing in residential, commercial, and land transactions. Trusted by thousands for transparent, secure, and expert property services.',
    url: 'https://varshainfra.com',
    siteName: 'Varsha Infra',
    images: [
      {
        url: '/assets/img/logo.svg',
        width: 400,
        height: 400,
        alt: 'Varsha Infra Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <RootLayoutShell>{children}</RootLayoutShell>
      </body>
    </html>
  );
}
