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
import { OrderProvider } from "./contexts/my_orders_context";
import { SortProvider } from "./contexts/sort_context";

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
  description: "Fashion is not just about clothes, it's a lifestyle. Dunya Drip brings you the latest trends and styles to express yourself.",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
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
        <AuthProvider initialSession={session} initialUser={user}>
          <FlagProvider>
            <CartProvider>
              <OrderProvider>
                <SortProvider>
                  <div className="layout-root">
                    <Navbar />
                    <CartPage />
                    <main>{children} <Toaster /></main>
                    <Footer />
                  </div>
                </SortProvider>
              </OrderProvider>
            </CartProvider>
          </FlagProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
