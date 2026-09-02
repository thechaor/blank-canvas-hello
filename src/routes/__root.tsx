import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { ThemeRegistry } from "@/components/theme-registry";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import appCss from "../styles.css?url";
import { LayoutDashboard, ShoppingBag, User } from "lucide-react";

export const Route = createRootRouteWithContext()({
  head: () => ({
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <HeadContent>
        <link rel="stylesheet" href={appCss} />
      </HeadContent>
      <AuthProvider>
        <CartProvider>
          <ThemeRegistry>
            <div className="min-h-screen bg-background text-foreground font-sans">
              <header className="border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-8">
                      <Link to="/" className="text-xl font-bold flex items-center gap-2">
                        <LayoutDashboard className="h-6 w-6" />
                        <span>MyApp</span>
                      </Link>
                      <nav className="hidden md:flex items-center gap-6">
                        <Link
                          to="/"
                          className="text-sm font-medium transition-colors hover:text-primary"
                          activeProps={{ className: "text-primary font-semibold" }}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/products"
                          className="text-sm font-medium transition-colors hover:text-primary"
                          activeProps={{ className: "text-primary font-semibold" }}
                        >
                          Produtos
                        </Link>
                        <Link
                          to="/account"
                          className="text-sm font-medium transition-colors hover:text-primary"
                          activeProps={{ className: "text-primary font-semibold" }}
                        >
                          Minha Conta
                        </Link>
                      </nav>
                    </div>
                    <div className="flex items-center gap-4">
                      <Link
                        to="/cart"
                        className="relative p-2 rounded-full hover:bg-accent transition-colors"
                        aria-label="Carrinho"
                      >
                        <ShoppingBag className="h-5 w-5" />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                          0
                        </span>
                      </Link>
                      <Link
                        to="/account"
                        className="p-2 rounded-full hover:bg-accent transition-colors"
                        aria-label="Minha conta"
                      >
                        <User className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </header>
              <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <Outlet />
                </div>
              </main>
              <footer className="border-t border-border bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                      © {new Date().getFullYear()} MyApp. Todos os direitos reservados.
                    </p>
                    <div className="flex items-center gap-6">
                      <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Termos
                      </Link>
                      <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Privacidade
                      </Link>
                      <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Contato
                      </Link>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </ThemeRegistry>
        </CartProvider>
      </AuthProvider>
      <Scripts />
    </>
  );
}