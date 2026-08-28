import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Package, Layers, Sparkles, User, Calendar, CheckCircle2 } from "lucide-react";

export interface CardDetails {
  id: number;
  name: string;
  set: string;
  price: number;
  rarity: string;
  image: string;
  type: string;
  color: string;
  badge: string;
  description: string;
  hp: number;
  attack: string;
  weakness: string;
  resistance: string;
  retreatCost: number;
  artist: string;
  releaseYear: number;
}

interface CardDetailsDialogProps {
  card: CardDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CardDetailsDialog({ card, open, onOpenChange }: CardDetailsDialogProps) {
  if (!card) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden rounded-2xl border border-border/80 bg-popover/95 p-0 shadow-2xl backdrop-blur-2xl">
        <div className="grid gap-0 sm:grid-cols-12">
          {/* Card Presentation Stage */}
          <div className="relative flex flex-col items-center justify-center border-b border-border/60 bg-gradient-to-br from-black/40 via-card to-background p-6 sm:col-span-5 sm:border-b-0 sm:border-r">
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.color} opacity-30 blur-2xl`} />

            <div className="relative z-10 mx-auto aspect-[3/4] w-full max-w-[240px]">
              <img
                src={card.image}
                alt={card.name}
                className="h-full w-full object-contain drop-shadow-[0_16px_30px_rgba(0,0,0,0.6)]"
              />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                {card.badge}
              </span>
              <span className="rounded-md border border-border bg-card/80 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                {card.type}
              </span>
            </div>
          </div>

          {/* Details Column */}
          <div className="flex flex-col p-6 sm:col-span-7">
            <DialogHeader className="text-left">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {card.set}
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs font-medium text-muted-foreground">{card.releaseYear}</span>
                  </div>
                  <DialogTitle className="mt-1 text-2xl font-black tracking-tight text-foreground">
                    {card.name}
                  </DialogTitle>
                </div>
                <Badge variant="outline" className="shrink-0 border-border bg-card font-bold text-xs">
                  {card.rarity}
                </Badge>
              </div>
              <DialogDescription className="sr-only">
                Detalhes completos da carta Pokémon {card.name}
              </DialogDescription>
            </DialogHeader>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {card.description}
            </p>

            {/* Combat & Card Stats */}
            <div className="mt-6">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Atributos da Carta
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-border bg-card/60 p-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                    <Shield className="h-3.5 w-3.5 text-primary" />
                    Pontos de Vida (HP)
                  </div>
                  <p className="mt-1 text-base font-black text-foreground">{card.hp} HP</p>
                </div>

                <div className="rounded-xl border border-border bg-card/60 p-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                    <Zap className="h-3.5 w-3.5 text-amber-400" />
                    Ataque Principal
                  </div>
                  <p className="mt-1 truncate text-xs font-bold text-foreground">{card.attack}</p>
                </div>

                <div className="rounded-xl border border-border bg-card/60 p-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                    <Package className="h-3.5 w-3.5 text-red-400" />
                    Fraqueza
                  </div>
                  <p className="mt-1 text-xs font-bold text-foreground">{card.weakness}</p>
                </div>

                <div className="rounded-xl border border-border bg-card/60 p-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                    <Layers className="h-3.5 w-3.5 text-blue-400" />
                    Resistência
                  </div>
                  <p className="mt-1 text-xs font-bold text-foreground">{card.resistance}</p>
                </div>
              </div>
            </div>

            {/* Collector info footer */}
            <div className="mt-6 border-t border-border/60 pt-4">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <User className="h-3.5 w-3.5 text-primary" />
                  <span>Ilustrador: <strong className="text-foreground">{card.artist}</strong></span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">Valor de Mercado</span>
                  <span className="text-lg font-black text-primary">
                    R$ {card.price.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function CardHoverContent({ card }: { card: CardDetails }) {
  return (
    <div className="w-72">
      <div className="flex items-start gap-3">
        <div className="h-20 w-14 shrink-0 overflow-hidden rounded-lg bg-black/20 p-1">
          <img
            src={card.image}
            alt={card.name}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-xs font-bold text-foreground">{card.name}</h4>
          <p className="text-[10px] text-muted-foreground">{card.set} · {card.releaseYear}</p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary">
              {card.rarity}
            </span>
            <span className="rounded bg-secondary px-1.5 py-0.5 text-[9px] font-semibold text-muted-foreground">
              {card.type}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-1.5 text-[10px]">
        <div className="rounded-lg border border-border bg-card/60 p-1.5">
          <span className="text-muted-foreground block">HP</span>
          <span className="font-bold text-foreground">{card.hp}</span>
        </div>
        <div className="rounded-lg border border-border bg-card/60 p-1.5">
          <span className="text-muted-foreground block truncate">Ataque</span>
          <span className="font-bold text-foreground truncate block">{card.attack}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2 text-xs">
        <span className="text-[10px] text-muted-foreground">Preço à vista</span>
        <span className="font-black text-primary">
          R$ {card.price.toFixed(2).replace(".", ",")}
        </span>
      </div>
    </div>
  );
}
