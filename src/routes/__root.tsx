import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, ShoppingBag, LogIn, LogOut, User, Sparkles, Shield, Zap } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider, useCart } from "../contexts/cart-context";
import { AuthProvider, useAuth } from "../contexts/auth-context";
import { CartIcon } from "../components/cart-icon";
import { LoginDialog } from "../components/login-dialog";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4">
      <div className="glass-panel max-w-md rounded-2xl p-8 text-center shadow-xl">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Zap className="h-5 w-5"/>
        </span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-foreground">404</h1>
        <h2 className="mt-1 text-base font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-xs text-muted-foreground">
          O conteúdo que você procura não está disponível.
        </p>
        <div className="mt-6">
          <Link className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02]" to="/">
            Voltar ao início
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
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-4">
      <div className="glass-panel max-w-md rounded-2xl p-8 text-center shadow-xl">
        <h1 className="text-lg font-bold tracking-tight text-foreground">
          Ocorreu uma instabilidade
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          Não foi possível carregar as informações. Tente novamente.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02]"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-secondary/60 px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-accent"
          >
            Início
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
      { title: "TCG Vault - Cartas Pokémon Oficiais & Raras" },
      { name: "description", content: "Loja especializada em cartas Pokémon raras, PSA, Ultra Raras e colecionáveis com envio seguro para todo o Brasil." },
      { name: "author", content: "TCG Vault" },
      { property: "og:title", content: "TCG Vault - Cartas Pokémon Oficiais & Raras" },
      { property: "og:description", content: "Encontre cartas de Pokémon raras, VMAX, VSTAR e colecionáveis autênticos com o melhor preço." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "[https://fonts.googleapis.com](https://fonts.googleapis.com)" },
      { rel: "preconnect", href: "[https://fonts.gstatic.com](https://fonts.gstatic.com)", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "[https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..900&display=swap](https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..900&display=swap)" },
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
        <HeadContent/>
      </head>
      <body>
        {children}
        <Scripts/>
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
    { label: "Catálogo", to: "/", hash: "produtos" },
    { label: "Destaques", to: "/", hash: "produtos" },
    { label: "Garantia", to: "/", hash: "sobre" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-3 transition-all hover:scale-[1.02]" to="/">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20">
            <Sparkles className="h-4.5 w-4.5"/>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-black tracking-tight text-foreground">
              TCG <span className="text-primary">Vault</span>
            </span>
            <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Official Cards
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full" hash="{link.hash}" key="{link.label}" to="{link.to}">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-2 rounded-xl border border-border/40 bg-card/50 px-3 py-1.5 text-xs font-semibold text-foreground">
                <User className="h-3.5 w-3.5 text-primary"/>
                {user?.name}
              </span>
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/40 bg-card/30 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                aria-label="Sair da conta"
              >
                <LogOut className="h-3.5 w-3.5"/>
                Sair
              </button>
            </div>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-border/40 bg-card/40 px-4 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-accent hover:border-primary/30"
              aria-label="Entrar na conta"
            >
              <LogIn className="h-3.5 w-3.5 text-primary"/>
              Acessar
            </button>
          )}

          <Link aria-label="Ver carrinho" className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border/40 bg-card/40 text-foreground transition-all hover:bg-accent hover:border-primary/30" to="/cart">
            <ShoppingBag className="h-4.5 w-4.5"/>
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-black text-primary-foreground shadow-lg shadow-primary/30">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-xl border border-border/40 p-2 text-foreground transition-all hover:bg-accent md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border/40 bg-background/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link key="{link.label}" onClick="{()" to="{link.to}"> setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 border-t border-border/40 pt-3 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-foreground">
                    <User className="h-4 w-4 text-primary"/>
                    {user?.name}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4"/>
                    Encerrar sessão
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setLoginOpen(true);
                    setMobileOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border/40 bg-card py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-accent"
                >
                  <LogIn className="h-4 w-4 text-primary"/>
                  Entrar
                </button>
              )}
              <Link onClick="{()" to="/cart"> setMobileOpen(false)}
                className="flex items-center justify-between rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4"/>
                  Carrinho
                </span>
                <span className="rounded-full bg-primary-foreground/20 px-2 py-0.5 text-xs">
                  {totalItems}
                </span>
              </Link>
            </div>
          </div>
        </nav>
      )}

      <LoginDialog onOpenChange="{setLoginOpen}" open="{loginOpen}"/>
    </header>
  );
}

function Footer() {
  return (
    <footer id="sobre" className="border-t border-border/40 bg-card/20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20">
                <Sparkles className="h-4.5 w-4.5"/>
              </div>
              <span className="text-base font-black tracking-tight text-foreground">
                TCG <span className="text-primary">Vault</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground">
              Marketplace premium de cartas colecionáveis de Pokémon. Qualidade avaliada, cards 100% originais e envio blindado para colecionadores exigentes.
            </p>
          </div>

          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-[0.15em] text-foreground">Navegação</h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link className="text-muted-foreground transition-colors hover:text-foreground" to="/">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground transition-colors hover:text-foreground" hash="produtos" to="/">
                  Cartas Ultra Raras
                </Link>
              </li>
              <li>
                <Link className="text-muted-foreground transition-colors hover:text-foreground" to="/cart">
                  Carrinho
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[9px] font-bold uppercase tracking-[0.15em] text-foreground">Atendimento</h3>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li>suporte@tcgvault.com.br</li>
              <li>Seg–Sex · 09h–18h</li>
              <li className="pt-2 text-[9px] text-muted-foreground/80">Envios com seguro total para todo o Brasil.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-6 sm:flex-row">
          <p className="text-[9px] text-muted-foreground">
            © {new Date().getFullYear()} TCG Vault. Pokémon e suas marcas registradas são propriedade da Nintendo / Creatures Inc. / GAME FREAK inc.
          </p>
          <p className="text-[9px] text-muted-foreground flex items-center gap-1.5">
            <Shield className="h-3 w-3 text-primary"/>
            Plataforma segura
          </p>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client="{queryClient}">
      <AuthProvider>
        <CartProvider>
          <div className="relative flex min-h-screen flex-col bg-background selection:bg-primary/20 selection:text-foreground">
            <div className="relative z-10 flex min-h-screen flex-col">
              <Header/>
              <main className="flex-1">
                <Outlet/>
              </main>
              <Footer/>
              <CartIcon/>
            </div>
          </div>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
