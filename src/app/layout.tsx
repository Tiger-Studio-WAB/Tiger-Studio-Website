import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist } from "next/font/google";
import { Noto_Sans_SC } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CodeCopyListener } from "@/components/code-copy-listener";
import { getProfile } from "@/lib/auth";
import { htmlLang } from "@/lib/i18n";
import { getCopy } from "@/lib/locale";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const notoSansSc = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["Tiger Studio", "passion club", "products", "ideas", "student organization"],
  authors: [{ name: site.name, url: site.links.github }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#d72316",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [{ locale, copy }, profile] = await Promise.all([getCopy(), getProfile()]);

  return (
    <html
      lang={htmlLang(locale)}
      className={`${geistSans.className} ${geistSans.variable} ${notoSansSc.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <a className="skip-link" href="#main">
          {copy.skipToMain}
        </a>
        <CodeCopyListener />
        <SiteHeader copy={copy} locale={locale} profile={profile} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter copy={copy} locale={locale} />
      </body>
    </html>
  );
}
