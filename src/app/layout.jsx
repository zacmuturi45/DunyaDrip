import localFont from "next/font/local";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { FlagProvider } from "./contexts/flagcontext";
import { CartProvider } from "./contexts/cart_context";
import CartPage from "./components/cart_page";
import { AuthProvider } from "./contexts/auth_context";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Dunya Drip",
  description: "Achieve the Prime of your Life through our innovative health and wellness solutions.",
};

export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const { data: { session } } = await supabase.auth.getSession();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <FlagProvider>
          <CartProvider>
            <AuthProvider initialSession={session} initialUser={user}>
              <Navbar />
              <CartPage />
              <main>{children} <Toaster /></main>
              <Footer />
            </AuthProvider>
          </CartProvider>
        </FlagProvider>
      </body>
    </html>
  );
}
