import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { ThemeRegistry } from "@/components/theme-registry";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext()({
  component: RootComponent,
});

function RootComponent() {
  const queryClient = new QueryClient();

  return (
    <>
      <HeadContent>
        <link rel="stylesheet" href={appCss} />
      </HeadContent>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <ThemeRegistry>
              <Outlet />
            </ThemeRegistry>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
      <Scripts />
    </>
  );
}