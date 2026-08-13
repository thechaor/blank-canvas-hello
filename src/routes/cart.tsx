import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Loader2, Minus, Plus, ShoppingCart, Trash2, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { LoginDialog } from "@/components/login-dialog";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Carrinho - TCG Pokedex" },
      { name: "description", content: "Revise seus itens e finalize sua compra de cartas de Pokémon na TCG Pokedex." },
      { property: "og:title", content: "Carrinho - TCG Pokedex" },
      { property: "og:description", content: "Revise seus itens e finalize sua compra de cartas de Pokémon." },
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
    }, 800);
  };

  if (isOrderPlaced) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <Card className="max-w-md text-center">
          <CardHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="mt-4 text-2xl">Pedido realizado!</CardTitle>
            <CardDescription>
              Obrigado, {user?.name || formData.name || "colecionador"}! Seu pedido foi confirmado e será enviado para o endereço informado.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Link to="/">
              <Button>Voltar para a loja</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <Card className="max-w-md text-center">
          <CardHeader>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="mt-4 text-2xl">Seu carrinho está vazio</CardTitle>
            <CardDescription>
              Adicione cartas incríveis à sua coleção e volte aqui para finalizar a compra.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Link to="/#produtos">
              <Button>Explorar cartas</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Link
        to="/#produtos"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Continuar comprando
      </Link>

      <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
        Seu carrinho
      </h1>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        {totalItems} {totalItems === 1 ? "item" : "itens"} no carrinho
      </p>

      {isAuthenticated ? (
        <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-foreground">
          <User className="h-4 w-4 text-primary" />
          Logado como {user?.email}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-start gap-3 rounded-lg border border-border/60 bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LogIn className="h-4 w-4 text-primary" />
            Faça login para finalizar sua compra mais rápido.
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLoginOpen(true)}
          >
            <LogIn className="h-4 w-4" />
            Entrar agora
          </Button>
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden border-border/60">
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{item.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    R$ {item.price.toFixed(2).replace(".", ",")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Diminuir quantidade de ${item.name}`}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium text-foreground">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Aumentar quantidade de ${item.name}`}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remover ${item.name} do carrinho`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Resumo do pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">
                  R$ {totalPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Frete</span>
                <span className="font-semibold text-foreground">Grátis</span>
              </div>
              <div className="mt-4 border-t border-border/60 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-extrabold text-primary">
                    R$ {totalPrice.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 border-border/60">
            <CardHeader>
              <CardTitle className="text-lg">Dados para entrega</CardTitle>
              <CardDescription>
                Preencha seus dados para finalizar o pedido.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço de entrega</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Rua, número, cidade, CEP"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    "Finalizar pedido"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <LoginDialog
        open={loginOpen}
        onOpenChange={setLoginOpen}
        onSuccess={() => {
          setIsSubmitting(true);
          setTimeout(() => {
            setIsSubmitting(false);
            setIsOrderPlaced(true);
            clearCart();
          }, 800);
        }}
      />
    </div>
  );
}
