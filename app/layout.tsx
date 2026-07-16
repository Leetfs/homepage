import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "leetfs.com";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Lee — Open Source, Systems & Web";
  const description =
    "Lee 的个人主页：RISC-V、Linux、LLVM、基础设施，以及让技术更开放、更平等的实践。";
  const socialImage = `${origin}/og.png`;

  return {
    title,
    description,
    icons: {
      icon: "/favicon-32x32.png",
      shortcut: "/favicon-32x32.png",
    },
    openGraph: {
      type: "website",
      url: origin,
      siteName: "Lee / Leetfs",
      title,
      description,
      images: [
        {
          url: socialImage,
          width: 1731,
          height: 909,
          alt: "Lee — Build close to the system. Open source, systems and web.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
      creator: "@leetfs1",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
