import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { 
  ArrowLeft, 
  Check, 
  Loader2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Trash2, 
  LogIn, 
  User, 
  ShieldCheck, 
  Lock, 
  Truck,
  Sparkles,
  Shield,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { LoginDialog } from "@/components/login-dialog";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Carrinho de Compras - TCG Vault" },
      { name: "description", content: "Revise suas cartas Pokémon selecionadas e conclua seu pedido com segurança total na TCG Vault." },
      { property: "og:title", content: "Carrinho de Compras - TCG Vault" },
      { property: "og:description", content: "Revise suas cartas e finalize a compra com garantia de autenticidade." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cep: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) return;

    if (!isAuthenticated) {
      setLoginOpen(true);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOrderPlaced(true);
      clearCart();
    }, 700);
  };

  if (isOrderPlaced) {
    return (
      <div className="mx-auto flex min-h-[75vh] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="glass-panel w-full max-w-md rounded-2xl border border-border/30 p-8 text-center shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
            <Check className="h-8 w-8"/>
          </div>
          <h2 className="mt-5 text-2xl font-black tracking-tight text-foreground">
            Pedido Confirmado!
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Parabéns, <strong className="text-foreground">{user?.name || formData.name || "Colecionador"}</strong>! Seu pedido foi registrado com sucesso e será enviado com embalagem protetora e seguro total.
          </p>
          <div className="mt-6 rounded-xl border border-border/40 bg-card/60 p-4 text-left text-xs">
            <div className="flex items-center justify-between font-semibold text-foreground">
              <span>Status do Envio</span>
              <span className="font-bold text-primary">Preparando Envio Blindado</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              O código de rastreamento será enviado para <span className="font-medium text-foreground">{user?.email || formData.email}</span>.
            </p>
          </div>
          <div className="mt-6">
            <Link to="/">
              <Button className="h-11 w-full rounded-xl text-xs font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.01]">
                Voltar ao Catálogo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[75vh] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="glass-panel w-full max-w-md rounded-2xl border border-border/30 p-8 text-center shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/80 text-muted-foreground">
            <ShoppingBag className="h-8 w-8"/>
          </div>
          <h2 className="mt-4 text-xl font-bold tracking-tight text-foreground">
            Seu carrinho está vazio
          </h2>
          <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
            Explore nossa seleção de cartas raras para adicionar cards lendários e colecionáveis ao seu deck.
          </p>
          <div className="mt-6">
            <Link hash="produtos" to="/">
              <Button className="h-11 rounded-xl px-6 text-xs font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                Explorar Cartas em Destaque
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Link className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground" hash="produtos" to="/">
        <ArrowLeft className="h-3.5 w-3.5"/>
        Continuar Comprando
      </Link>

      <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Finalizar Pedido
        </h1>
        <span className="text-xs font-medium text-muted-foreground">
          {totalItems} {totalItems === 1 ? "carta selecionada" : "cartas selecionadas"}
        </span>
      </div>

      {isAuthenticated ? (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/10 px-4 py-2.5 text-xs text-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary"/>
            <span>Comprando como <strong>{user?.name}</strong> ({user?.email})</span>
          </div>
          <span className="text-[11px] font-semibold text-primary">Checkout Rápido Ativo</span>
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-start gap-3 rounded-xl border border-border/40 bg-card/40 p-3.5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
            <LogIn className="h-4 w-4 text-primary"/>
            <span>Possui uma conta de colecionador? Acesse para preencher seus dados automaticamente.</span>
          </div>
          <Button className="h-8 rounded-lg border-border/40 bg-card/50 text-xs font-semibold hover:bg-accent" onClick="{()"> setLoginOpen(true)} size="sm" variant="outline">
            Acessar Conta
          </Button>
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          <div className="glass-panel rounded-2xl border border-border/30 p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between border-b border-border/30 pb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Itens no Carrinho
              </h2>
              <span className="text-[10px] font-semibold text-muted-foreground">
                Total: {totalItems} {totalItems === 1 ? "item" : "itens"}
              </span>
            </div>

            <div className="divide-y divide-border/30">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="flex h-20 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black/30 p-1 border border-border/20">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-foreground">
                      {item.name}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-muted-foreground">
                      R$ {item.price.toFixed(2).replace(".", ",")} un.
                    </p>
                    <p className="mt-1 text-[11px] font-bold text-primary">
                      Subtotal: R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-8 items-center rounded-xl border border-border/40 bg-card/50 p-0.5">
                      <button
                        type="button"
                        className="flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="h-3 w-3"/>
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="h-3 w-3"/>
                      </button>
                    </div>

                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-border/30 bg-card/30 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remover ${item.name}`}
                    >
                      <Trash2 className="h-3.5 w-3.5"/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel flex items-center gap-3 rounded-2xl border border-border/30 p-4 text-xs text-muted-foreground">
            <Truck className="h-5 w-5 shrink-0 text-primary"/>
            <span>Todos os cards são enviados com protetor rígido (toploader) profissional e embalagem antiestática com seguro integral.</span>
          </div>
        </div>

        <div className="space-y-4 lg:col-span-5">
          <div className="glass-panel rounded-2xl border border-border/30 p-5 sm:p-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Resumo da Compra
            </h2>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({totalItems} {totalItems === 1 ? "item" : "itens"})</span>
                <span className="font-semibold text-foreground">
                  R$ {totalPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Frete Seguro Brasil</span>
                <span className="font-semibold text-emerald-400">Grátis</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Embalagem Toploader Rígida</span>
                <span className="font-semibold text-foreground">Inclusa</span>
              </div>
              <div className="border-t border-border/40 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-foreground">Total</span>
                <span className="text-xl font-black text-primary">
                  R$ {totalPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-border/30 p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2 border-b border-border/30 pb-3">
              <Lock className="h-4 w-4 text-primary"/>
              <h2 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Dados de Envio & Destinatário
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <Label className="text-xs font-semibold text-muted-foreground" htmlFor="name">
                  Nome Completo
                </Label>
                <Input className="mt-1 h-10 rounded-xl border-border/40 bg-card/50 text-xs backdrop-blur-sm" id="name" name="name" onChange="{handleInputChange}" placeholder="Nome do destinatário" required value="{formData.name}"/>
              </div>

              <div>
                <Label className="text-xs font-semibold text-muted-foreground" htmlFor="email">
                  E-mail de Confirmação
                </Label>
                <Input className="mt-1 h-10 rounded-xl border-border/40 bg-card/50 text-xs backdrop-blur-sm" id="email" name="email" onChange="{handleInputChange}" placeholder="destinatario@email.com" required type="email" value="{formData.email}"/>
              </div>

              <div>
                <Label className="text-xs font-semibold text-muted-foreground" htmlFor="address">
                  Endereço com Número e Bairro
                </Label>
                <Input className="mt-1 h-10 rounded-xl border-border/40 bg-card/50 text-xs backdrop-blur-sm" id="address" name="address" onChange="{handleInputChange}" placeholder="Av. Paulista, 1000 - Apto 42, Bela Vista" required value="{formData.address}"/>
              </div>

              <div>
                <Label className="text-xs font-semibold text-muted-foreground" htmlFor="cep">
                  CEP
                </Label>
                <Input className="mt-1 h-10 rounded-xl border-border/40 bg-card/50 text-xs backdrop-blur-sm" id="cep" name="cep" onChange="{handleInputChange}" placeholder="01310-100" value="{formData.cep}"/>
              </div>

              <div className="pt-2">
                <Button className="h-11 w-full rounded-xl text-xs font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.01]" disabled="{isSubmitting}" type="submit">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                      Processando Pedido Seguro...
                    </>
                  ) : (
                    "Confirmar e Finalizar Pedido"
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400"/>
                <span>Transação 100% segura com garantia TCG Vault</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <LoginDialog onOpenChange="{setLoginOpen}" onSuccess="{()" open="{loginOpen}"> {
          setIsSubmitting(true);
          setTimeout(() => {
            setIsSubmitting(false);
            setIsOrderPlaced(true);
            clearCart();
          }, 700);
        }}
      />
    </div>
  );
}
