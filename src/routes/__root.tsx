import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Menu, X, ShoppingCart, LogIn, LogOut, User } from "lucide-react";
import { useState } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider, useCart } from "../contexts/cart-context";
import { AuthProvider, useAuth } from "../contexts/auth-context";
import { CartIcon } from "../components/cart-icon";
import { LoginDialog } from "../components/login-dialog";
import PokemonCardBackground from "../components/pokemon-card-background";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:-translate-y-0.5"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:-translate-y-0.5"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-input bg-background/50 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:bg-accent hover:-translate-y-0.5"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TCG Pokedex - Cartas de Pokémon" },
      { name: "description", content: "Compre cartas de Pokémon raras e colecionáveis na TCG Pokedex." },
      { name: "author", content: "TCG Pokedex" },
      { property: "og:title", content: "TCG Pokedex - Cartas de Pokémon" },
      { property: "og:description", content: "Compre cartas de Pokémon raras e colecionáveis na TCG Pokedex." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks: { label: string; to: "/"; hash?: string }[] = [
    { label: "Início", to: "/" },
    { label: "Produtos", to: "/", hash: "produtos" },
    { label: "Sobre", to: "/", hash: "sobre" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <span className="text-lg font-black">P</span>
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">
            TCG <span className="text-primary">Pokedex</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              hash={link.hash || undefined}
              className="text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:scale-[1.02]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/50 px-3 py-1.5 text-sm font-medium text-foreground">
                <User className="h-4 w-4 text-primary" />
                {user?.name}
              </span>
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 rounded-lg border border-input bg-background/50 px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
                aria-label="Sair da conta"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </div>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-input bg-background/50 px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
              aria-label="Entrar na conta"
            >
              <LogIn className="h-4 w-4" />
              Entrar
            </button>
          )}
          <Link to="/cart" className="relative transition-opacity hover:opacity-80" aria-label="Ver carrinho">
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-lg shadow-primary/30">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            to="/#produtos"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:-translate-y-0.5"
          >
            Ver Cartas
          </Link>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-lg p-2 text-foreground transition-all hover:bg-accent md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Abrir menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border/60 bg-background/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:scale-[1.02]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <User className="h-4 w-4 text-primary" />
                  {user?.name}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:scale-[1.02]"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setLoginOpen(true);
                  setMobileOpen(false);
                }}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:scale-[1.02]"
              >
                <LogIn className="h-4 w-4" />
                Entrar
              </button>
            )}
            <Link
              to="/cart"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:scale-[1.02]"
              onClick={() => setMobileOpen(false)}
            >
              <ShoppingCart className="h-4 w-4" />
              Carrinho
              {totalItems > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link
              to="/#produtos"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:-translate-y-0.5"
              onClick={() => setMobileOpen(false)}
            >
              Ver Cartas
            </Link>
          </div>
        </nav>
      )}

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </header>
  );
}

function Footer() {
  return (
    <footer id="sobre" className="border-t border-border/60 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                <span className="text-sm font-black">P</span>
              </span>
              <span className="text-base font-bold tracking-tight text-foreground">
                TCG <span className="text-primary">Pokedex</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Sua loja de cartas de Pokémon. Encontre as cartas mais raras e colecionáveis do mercado.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Navegação</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground transition-all hover:text-foreground hover:scale-[1.02] inline-block">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/#produtos" className="text-sm text-muted-foreground transition-all hover:text-foreground hover:scale-[1.02] inline-block">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/#sobre" className="text-sm text-muted-foreground transition-all hover:text-foreground hover:scale-[1.02] inline-block">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Contato</h3>
            <ul className="mt-3 space-y-2">
              <li className="text-sm text-muted-foreground">contato@tcgpokedex.com</li>
              <li className="text-sm text-muted-foreground">+55 (11) 99999-9999</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border/60 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} TCG Pokedex. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <div className="flex min-h-screen flex-col pokemon-bg">
            <PokemonCardBackground />
            <div className="pokemon-sparkles">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="pokeball-decoration left-8 top-24" />
            <div className="pokeball-decoration right-12 top-1/3 animate-pokeball-float" />
            <div className="pokeball-decoration bottom-24 left-1/4 animate-pokeball-spin" />
            <div className="relative z-10 flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                <Outlet />
              </main>
              <Footer />
              <CartIcon />
            </div>
          </div>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
