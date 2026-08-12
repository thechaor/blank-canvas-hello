import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Star, Sparkles, Shield, Zap, Package, Layers } from "lucide-react";

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
      <DialogContent className="max-w-2xl overflow-hidden p-0">
        <div className="grid gap-0 sm:grid-cols-2">
          <div className="relative flex items-center justify-center bg-gradient-to-br p-6">
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-40`} />
            <img
              src={card.image}
              alt={card.name}
              className="relative z-10 aspect-[3/4] w-full max-w-[280px] rounded-lg object-cover shadow-2xl shadow-primary/20"
            />
            <Badge className="absolute left-4 top-4 z-20 bg-background/80 backdrop-blur-sm">
              {card.badge}
            </Badge>
          </div>

          <div className="flex flex-col p-6">
            <DialogHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <DialogTitle className="text-2xl font-bold text-foreground">
                    {card.name}
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-sm text-muted-foreground">
                    {card.set} · {card.releaseYear}
                  </DialogDescription>
                </div>
                <div className="flex items-center gap-1 rounded-lg bg-primary/10 px-2.5 py-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-primary">4.9</span>
                </div>
              </div>
            </DialogHeader>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {card.rarity}
              </Badge>
              <Badge variant="outline">{card.type}</Badge>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {card.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border/60 bg-background/50 p-3">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Shield className="h-3.5 w-3.5" />
                  HP
                </div>
                <p className="mt-1 text-lg font-bold text-foreground">{card.hp}</p>
              </div>
              <div className="rounded-lg border border-border/60 bg-background/50 p-3">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Zap className="h-3.5 w-3.5" />
                  Ataque
                </div>
                <p className="mt-1 text-sm font-semibold text-foreground">{card.attack}</p>
              </div>
              <div className="rounded-lg border border-border/60 bg-background/50 p-3">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Package className="h-3.5 w-3.5" />
                  Fraqueza
                </div>
                <p className="mt-1 text-sm font-semibold text-foreground">{card.weakness}</p>
              </div>
              <div className="rounded-lg border border-border/60 bg-background/50 p-3">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Layers className="h-3.5 w-3.5" />
                  Resistência
                </div>
                <p className="mt-1 text-sm font-semibold text-foreground">{card.resistance}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
              <div>
                <p className="text-xs text-muted-foreground">Preço</p>
                <p className="text-2xl font-bold text-foreground">
                  R$ {card.price.toFixed(2).replace(".", ",")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Custo de recuo</p>
                <p className="text-lg font-semibold text-foreground">{card.retreatCost}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Artista</p>
                <p className="text-sm font-medium text-foreground">{card.artist}</p>
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
        <img
          src={card.image}
          alt={card.name}
          className="h-24 w-16 shrink-0 rounded-md object-cover shadow-lg shadow-primary/20"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-bold text-foreground">{card.name}</h4>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-muted-foreground">4.9</span>
            </div>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{card.set} · {card.releaseYear}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px] px-2 py-0.5">
              {card.rarity}
            </Badge>
            <Badge variant="outline" className="text-[10px] px-2 py-0.5">
              {card.type}
            </Badge>
          </div>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {card.description}
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-md border border-border/60 bg-background/50 p-2">
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
            <Shield className="h-3 w-3" />
            HP
          </div>
          <p className="mt-0.5 text-sm font-bold text-foreground">{card.hp}</p>
        </div>
        <div className="rounded-md border border-border/60 bg-background/50 p-2">
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
            <Zap className="h-3 w-3" />
            Ataque
          </div>
          <p className="mt-0.5 truncate text-xs font-semibold text-foreground">{card.attack}</p>
        </div>
        <div className="rounded-md border border-border/60 bg-background/50 p-2">
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
            <Package className="h-3 w-3" />
            Fraqueza
          </div>
          <p className="mt-0.5 text-xs font-semibold text-foreground">{card.weakness}</p>
        </div>
        <div className="rounded-md border border-border/60 bg-background/50 p-2">
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
            <Layers className="h-3 w-3" />
            Resistência
          </div>
          <p className="mt-0.5 text-xs font-semibold text-foreground">{card.resistance}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2.5">
        <div>
          <p className="text-[10px] text-muted-foreground">Preço</p>
          <p className="text-base font-bold text-foreground">
            R$ {card.price.toFixed(2).replace(".", ",")}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-muted-foreground">Recuo</p>
          <p className="text-sm font-semibold text-foreground">{card.retreatCost}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-muted-foreground">Artista</p>
          <p className="text-xs font-medium text-foreground">{card.artist}</p>
        </div>
      </div>
    </div>
  );
}
