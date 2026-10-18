import type { Metadata, Viewport } from "next";
import { Fira_Code, Fira_Sans, Space_Grotesk } from "next/font/google";
import { SiteChrome } from "@/components/site-chrome";
import { SiteFooter } from "@/components/site-footer";
import { profile } from "@/lib/profile";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Fira_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const description =
  "Portfolio of Jabran Khan, a Full Stack AI Mobile Engineer in Lahore. React Native, TypeScript, Node.js, Express.js, and MongoDB across mobile apps, wallets, and AI-powered features.";

export const metadata: Metadata = {
  title: {
    default: "Jabran Khan — Full Stack AI Mobile Engineer",
    template: "%s — Jabran Khan",
  },
  description,
  authors: [{ name: profile.name }],
  openGraph: {
    title: "Jabran Khan — Full Stack AI Mobile Engineer",
    description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jabran Khan — Full Stack AI Mobile Engineer",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#05080e",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  sameAs: [profile.linkedin, profile.github],
  knowsLanguage: ["English", "Urdu"],
  knowsAbout: [
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Large language models",
  ],
};

const quickViewScript = `try{if(localStorage.getItem("quick-view")==="1")document.documentElement.classList.add("is-quick")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}
    >
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: quickViewScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <SiteChrome />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
