import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Loader2, ShoppingCart, Sparkles, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TCG Pokedex - Cartas de Pokémon Raras e Colecionáveis" },
      { name: "description", content: "Compre cartas de Pokémon raras e colecionáveis na TCG Pokedex. Encontre as melhores cartas do mercado com preços competitivos." },
      { property: "og:title", content: "TCG Pokedex - Cartas de Pokémon Raras e Colecionáveis" },
      { property: "og:description", content: "Compre cartas de Pokémon raras e colecionáveis na TCG Pokedex." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const products = [
  {
    id: 1,
    name: "Charizard VMAX",
    set: "Brilliant Stars",
    price: 249.90,
    rarity: "Ultra Rare",
    image: "https://images.pokemontcg.io/swsh9/154.png",
    type: "Fogo",
    color: "from-orange-500/20 to-red-500/20",
    badge: "Hot",
  },
  {
    id: 2,
    name: "Pikachu V",
    set: "Vivid Voltage",
    price: 189.90,
    rarity: "Ultra Rare",
    image: "https://images.pokemontcg.io/swsh4/188.png",
    type: "Elétrico",
    color: "from-yellow-500/20 to-amber-500/20",
    badge: "Popular",
  },
  {
    id: 3,
    name: "Mewtwo VSTAR",
    set: "Pokémon GO",
    price: 159.90,
    rarity: "VSTAR",
    image: "https://images.pokemontcg.io/sgo/30.png",
    type: "Psíquico",
    color: "from-purple-500/20 to-violet-500/20",
    badge: "Novo",
  },
  {
    id: 4,
    name: "Gengar VMAX",
    set: "Fusion Strike",
    price: 199.90,
    rarity: "Ultra Rare",
    image: "https://images.pokemontcg.io/swsh8/157.png",
    type: "Fantasma",
    color: "from-indigo-500/20 to-purple-500/20",
    badge: "Raro",
  },
  {
    id: 5,
    name: "Lugia V",
    set: "Silver Tempest",
    price: 179.90,
    rarity: "Ultra Rare",
    image: "https://images.pokemontcg.io/swsh12/186.png",
    type: "Voador",
    color: "from-sky-500/20 to-blue-500/20",
    badge: "Lendário",
  },
  {
    id: 6,
    name: "Rayquaza VMAX",
    set: "Evolving Skies",
    price: 299.90,
    rarity: "Secret Rare",
    image: "https://images.pokemontcg.io/swsh7/218.png",
    type: "Dragão",
    color: "from-emerald-500/20 to-green-500/20",
    badge: "Lendário",
  },
];

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  const { ref, visible } = useRevealOnScroll();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (isAdding || isAdded) return;

    setIsAdding(true);

    // Simulate async add to cart
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);

      // Dispatch custom event to update header cart count
      const event = new CustomEvent("cart-updated", {
        detail: { count: 1 },
      });
      window.dispatchEvent(event);

      // Reset added state after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 600);
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className="group relative overflow-hidden border-border/60 bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
        <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
        <CardContent className="relative p-4">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute left-2 top-2">
              <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                {product.badge}
              </Badge>
            </div>
            <div className="absolute right-2 top-2">
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                {product.rarity}
              </Badge>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">{product.name}</h3>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-muted-foreground">4.9</span>
              </div>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{product.set}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-lg font-bold text-foreground">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </span>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {product.type}
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="relative p-4 pt-0">
          <Button
            className="w-full transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20"
            onClick={handleAddToCart}
            disabled={isAdding || isAdded}
          >
            {isAdding ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Adicionando...
              </>
            ) : isAdded ? (
              <>
                <Check className="h-4 w-4" />
                Adicionado!
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Adicionar ao carrinho
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-background">
        {/* Animated background orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-1/4 h-96 w-96 animate-float rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-32 top-1/2 h-96 w-96 animate-float-delayed rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-64 w-64 animate-float-slow rounded-full bg-accent/20 blur-3xl" />
        </div>

        <div
          ref={heroRef}
          className={`relative z-10 mx-auto max-w-4xl px-4 text-center transition-all duration-1000 ease-out sm:px-6 lg:px-8 ${
            heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Novas cartas toda semana
            </span>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Colecione as cartas
            <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              mais raras do mundo
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Explore nossa coleção exclusiva de cartas de Pokémon. Desde clássicos lendários até as edições mais recentes, encontre a carta perfeita para completar sua coleção.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group text-base">
              Explorar Cartas
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              Ver Coleções
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border/60 pt-8">
            <div>
              <p className="text-3xl font-bold text-foreground">500+</p>
              <p className="mt-1 text-sm text-muted-foreground">Cartas disponíveis</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">10k+</p>
              <p className="mt-1 text-sm text-muted-foreground">Colecionadores</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">4.9</p>
              <p className="mt-1 text-sm text-muted-foreground">Avaliação média</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produtos" className="relative bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Cartas em destaque
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              As cartas mais procuradas pelos colecionadores, com preços competitivos e garantia de autenticidade.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-primary py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-64 w-64 animate-float rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 animate-float-delayed rounded-full bg-primary-foreground/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Pronto para começar sua coleção?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Junte-se a milhares de colecionadores que confiam na TCG Pokedex para encontrar as melhores cartas do mercado.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 text-base"
          >
            Começar agora
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
