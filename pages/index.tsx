import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>Welcome to Foireann</h1>

      <Image
        src="/foireannDark.svg"
        alt="Foireann Logo"
        width={200}
        height={200}
      />

      <div>
        <Link href="/clubs">Go to club selector</Link>
      </div>

      <a href="https://web.gaaservers.net">Login to Foireann</a>
    </main>
  );
}
