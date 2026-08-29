import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

export function CartIcon() {
  const { totalItems } = useCart();

  if (totalItems === 0) return null;

  return (
    <Link
      to="/cart"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/90 text-primary-foreground shadow-xl shadow-primary/25 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-primary hover:shadow-2xl hover:shadow-primary/35 sm:bottom-8 sm:right-8"
      aria-label={`Ver carrinho com ${totalItems} ${totalItems === 1 ? "item" : "itens"}`}
    >
      <ShoppingBag className="h-5 w-5" />
      <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[9px] font-black text-background shadow-md">
        {totalItems}
      </span>
    </Link>
  );
}
