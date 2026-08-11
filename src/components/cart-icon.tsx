import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

export function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link
      to="/cart"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/30 transition-all hover:scale-110 hover:shadow-primary/50"
      aria-label={`Ver carrinho com ${totalItems} ${totalItems === 1 ? "item" : "itens"}`}
    >
      <ShoppingCart className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground shadow-lg">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
