import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useMemo } from "react";
import { 
  ArrowRight, 
  Check, 
  Loader2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Search, 
  SlidersHorizontal, 
  Info,
  Flame,
  Zap,
  Eye,
  Award,
  Layers,
  Gem
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { LoginDialog } from "@/components/login-dialog";
import { CardDetailsDialog, CardHoverContent, type CardDetails } from "@/components/card-details-dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TCG Vault - Loja Premium de Cartas Pokémon Raras" },
      { name: "description", content: "Compre cartas de Pokémon colecionáveis, raras, VMAX e VSTAR com garantia de autenticidade e envio seguro." },
      { property: "og:title", content: "TCG Vault - Loja Premium de Cartas Pokémon Raras" },
      { property: "og:description", content: "Compre cartas de Pokémon colecionáveis e raras na TCG Vault." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const products: CardDetails[] = [
  {
    id: 1,
    name: "Charizard VMAX",
    set: "Brilliant Stars",
    price: 249.90,
    rarity: "Ultra Rare",
    image: "https://images.pokemontcg.io/swsh9/154.png",
    type: "Fogo",
    color: "from-orange-500/20 to-red-500/20",
    badge: "Destaque",
    description: "O lendário Charizard VMAX domina o campo de batalha com seu poder de fogo avassalador. Uma das cartas mais icônicas e desejadas por colecionadores do mundo inteiro.",
    hp: 330,
    attack: "G-Max Wildfire",
    weakness: "Água",
    resistance: "Lutador",
    retreatCost: 3,
    artist: "Mitsuhiro Arita",
    releaseYear: 2022,
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
    badge: "Mais Vendido",
    description: "O mascote mais amado de Pokémon! Pikachu V traz choques elétricos devastadores e é uma peça essencial para qualquer coleção que se preze.",
    hp: 190,
    attack: "Thunderbolt",
    weakness: "Lutador",
    resistance: "Metal",
    retreatCost: 1,
    artist: "Sowsow",
    releaseYear: 2020,
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
    description: "Mewtwo VSTAR canaliza seu poder psíquico incomparável. Uma carta rara que combina força bruta com a elegância do Pokémon mais poderoso já criado.",
    hp: 280,
    attack: "Psy Purge",
    weakness: "Sombrio",
    resistance: "Lutador",
    retreatCost: 2,
    artist: "5ban Graphics",
    releaseYear: 2022,
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
    description: "Gengar VMAX emerge das sombras com seu ataque G-Max Swallow. Uma carta assustadoramente poderosa que assombra os decks dos oponentes.",
    hp: 320,
    attack: "G-Max Swallow",
    weakness: "Sombrio",
    resistance: "Lutador",
    retreatCost: 2,
    artist: "PLANETA Mochizuki",
    releaseYear: 2021,
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
    description: "O lendário Pokémon guardião dos mares. Lugia V é uma carta majestosa que representa poder e proteção, essencial para colecionadores sérios.",
    hp: 220,
    attack: "Aero Dive",
    weakness: "Elétrico",
    resistance: "Lutador",
    retreatCost: 2,
    artist: "Akira Komayama",
    releaseYear: 2022,
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
    badge: "Colecionador",
    description: "Rayquaza VMAX, o Pokémon céu, desce das nuvens com poder celestial. Uma das cartas mais valiosas e impressionantes da era VMAX.",
    hp: 320,
    attack: "Max Burst",
    weakness: "Fada",
    resistance: "Lutador",
    retreatCost: 2,
    artist: "PLANETA Igarashi",
    releaseYear: 2021,
  },
];

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
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

function ProductCard({
  product,
  index,
  onViewDetails,
}: {
  product: CardDetails;
  index: number;
  onViewDetails: (product: CardDetails) => void;
}) {
  const { ref, visible } = useRevealOnScroll();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdding || isAdded) return;

    setIsAdding(true);

    setTimeout(() => {
      addItem(
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
        quantity,
      );
      setIsAdding(false);
      setIsAdded(true);
      setQuantity(1);

      setTimeout(() => {
        setIsAdded(false);
      }, 1800);
    }, 450);
  };

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <HoverCard openDelay={150} closeDelay={100}>
        <HoverCardTrigger asChild>
          <div
            className="tech-card tech-card-hover relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/30 p-5 transition-all duration-300 cursor-pointer bg-card/30 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5"
            onClick={() => onViewDetails(product)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onViewDetails(product);
              }
            }}
          >
            {/* Ambient glow */}
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

            {/* Top badges */}
            <div className="relative z-10 mb-3 flex items-center justify-between">
              <span className="tech-chip">
                <Award className="h-3 w-3" />
                {product.badge}
              </span>
              <span className="rounded-lg border border-border/30 bg-card/60 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-muted-foreground">
                {product.rarity}
              </span>
            </div>

            {/* Card image */}
            <div className="relative z-10 mx-auto flex aspect-[3/4] w-full max-w-[200px] items-center justify-center overflow-hidden rounded-xl bg-black/20 p-3">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                loading="lazy"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(product);
                }}
                className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:bg-black/60 hover:scale-105"
                aria-label={`Ver detalhes de ${product.name}`}
              >
                <Eye className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Card info */}
            <div className="relative z-10 mt-4 flex flex-1 flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {product.name}
                  </h3>
                  <span className="rounded-lg bg-secondary/60 px-2 py-0.5 text-[8px] font-semibold text-muted-foreground">
                    {product.type}
                  </span>
                </div>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{product.set}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/30">
                <div className="flex items-baseline justify-between mb-3">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-medium uppercase tracking-wider text-muted-foreground">Preço</span>
                    <span className="text-lg font-black tracking-tight text-foreground">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <span className="text-[9px] font-medium text-emerald-400/80 flex items-center gap-1">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
                    Disponível
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-8 items-center rounded-xl border border-border/40 bg-card/30 p-0.5">
                    <button
                      type="button"
                      className="flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuantity((q) => Math.max(1, q - 1));
                      }}
                      aria-label="Diminuir"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-foreground">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      className="flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuantity((q) => Math.min(99, q + 1));
                      }}
                      aria-label="Aumentar"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    className="h-8 flex-1 gap-1.5 rounded-xl text-xs font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                    onClick={handleAddToCart}
                    disabled={isAdding || isAdded}
                  >
                    {isAdding ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Salvando...
                      </>
                    ) : isAdded ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        Adicionado
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Comprar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          side="right"
          align="center"
          sideOffset={14}
          className="z-50 w-auto border-border/40 bg-popover/90 p-4 backdrop-blur-2xl rounded-2xl"
        >
          <CardHoverContent card={product} />
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

function Index() {
  const [selectedCard, setSelectedCard] = useState<CardDetails | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const { isAuthenticated, user } = useAuth();

  const handleViewDetails = (product: CardDetails) => {
    setSelectedCard(product);
    setDialogOpen(true);
  };

  const scrollToProducts = () => {
    const el = document.getElementById("produtos");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const types = ["all", "Fogo", "Elétrico", "Psíquico", "Fantasma", "Voador", "Dragão"];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.set.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === "all" || p.type.toLowerCase() === selectedType.toLowerCase();
      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType]);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/30 py-20 sm:py-28">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-60 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-[400px] w-[600px] rounded-full bg-primary/3 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="tech-chip-filled">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Colecionismo de Alto Nível</span>
            </div>

            <h1 className="mt-6 max-w-3xl text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              O cofre definitivo para <span className="tech-gradient-text">Mestres Pokémon</span>.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
              Explore cartas raras, edições limitadas e lendárias com histórico verificado, envio blindado e garantia vitalícia de originalidade.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                size="lg"
                className="h-11 rounded-2xl px-7 text-sm font-bold shadow-lg shadow-primary/25 transition-all hover:scale-[1.02]"
                onClick={scrollToProducts}
              >
                Explorar Catálogo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              {!isAuthenticated && (
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-2xl border-border/30 bg-card/30 px-6 text-sm font-semibold backdrop-blur-sm hover:bg-accent"
                  onClick={() => setLoginOpen(true)}
                >
                  Criar Conta
                </Button>
              )}
            </div>

            {/* Value Props */}
            <div className="mt-14 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="glass-panel flex items-center gap-3.5 rounded-2xl border border-border/20 p-4 text-left transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Autenticidade Garantida</h4>
                  <p className="text-[9px] text-muted-foreground">Inspeção rigorosa de cada card</p>
                </div>
              </div>

              <div className="glass-panel flex items-center gap-3.5 rounded-2xl border border-border/20 p-4 text-left transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Embalagem Blindada</h4>
                  <p className="text-[9px] text-muted-foreground">Toploader & sleeve protetor</p>
                </div>
              </div>

              <div className="glass-panel flex items-center gap-3.5 rounded-2xl border border-border/20 p-4 text-left transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <RotateCcw className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Envio com Seguro</h4>
                  <p className="text-[9px] text-muted-foreground">Rastreio em tempo real</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="produtos" className="py-16 sm:py-20 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-primary">
                <Flame className="h-4 w-4" />
                <span>Edições Especiais</span>
              </div>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                Cartas em Destaque
              </h2>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Exibindo itens de alta raridade selecionados para a sua coleção.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou coleção..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-9 w-full rounded-2xl border border-border/30 bg-card/20 px-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 backdrop-blur-sm"
                />
              </div>

              <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {types.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedType(t)}
                    className={`rounded-xl px-2.5 py-1 text-[9px] font-semibold capitalize transition-all ${
                      selectedType === t
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "border border-border/20 bg-card/20 text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    {t === "all" ? "Todos" : t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-border/20 bg-card/20 py-16 text-center backdrop-blur-sm">
              <Info className="h-8 w-8 text-muted-foreground" />
              <h3 className="mt-3 text-base font-bold text-foreground">Nenhuma carta encontrada</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Tente redefinir seus filtros ou buscar por outro termo.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 rounded-xl text-xs"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedType("all");
                }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="border-t border-border/30 bg-gradient-to-b from-card/20 to-background py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="tech-chip">
            <Gem className="h-3 w-3" />
            Comunidade de Colecionadores
          </span>
          <h2 className="mt-4 text-2xl font-extrabold text-foreground sm:text-3xl">
            Procurando uma carta específica para o seu deck?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Nossos curadores monitoram leilões internacionais e estoques globais para encontrar o card exato que falta no seu fichário.
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              className="h-11 rounded-2xl px-6 text-xs font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
              onClick={scrollToProducts}
            >
              Comprar Cartas Agora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <CardDetailsDialog
        card={selectedCard}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </div>
  );
}
