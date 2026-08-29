import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

export function CartIcon() {
  const { totalItems } = useCart();

  if (totalItems === 0) return null;

  return (
    <Link aria-label={`Ver carrinho com ${totalItems} ${totalItems === 1 ? "item" : "itens"}`} className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/95 text-primary-foreground shadow-2xl shadow-primary/30 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-primary hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background sm:bottom-8 sm:right-8" to="/cart">
      <ShoppingBag className="h-6 w-6"/>
      <span className="absolute -right-1.5 -top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-background px-1.5 text-[10px] font-black text-foreground shadow-md ring-2 ring-primary">
        {totalItems}
      </span>
    </Link>
  );
}
