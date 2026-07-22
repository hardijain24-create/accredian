import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Accredian Enterprise | Upskill Your Workforce at Scale",
  description: "Partner with top global institutions to build future-ready teams. Custom upskilling programs, live mentorship, cohort learning, and measurable business ROI.",
  keywords: "workforce upskilling, enterprise learning, B2B training, professional certifications, cohort-based education, accredited business mentoring",
  openGraph: {
    title: "Accredian Enterprise | Workforce Upskilling at Scale",
    description: "Partner with top global institutions to build future-ready teams. Custom upskilling programs, live mentorship, cohort learning, and measurable business ROI.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plusJakartaSans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-text-dark font-body selection:bg-accent-pink/30 selection:text-text-dark">
        {/* Content Wrapper */}
        <div className="relative z-10 min-h-full flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
