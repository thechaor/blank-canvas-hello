import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Produtos — Cartas raras e colecionáveis" },
      {
        name: "description",
        content:
          "Explore o catálogo completo de cartas raras, holográficas e colecionáveis disponíveis na loja.",
      },
      { property: "og:title", content: "Produtos — Cartas raras e colecionáveis" },
      {
        property: "og:description",
        content: "Explore o catálogo completo de cartas raras e colecionáveis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold text-white">Produtos</h1>
      <p className="mt-3 text-white/80">
        O catálogo completo está na página inicial, na seção de produtos.
      </p>
      <Link
        to="/"
        hash="produtos"
        className="mt-6 inline-block text-sm font-medium text-primary hover:underline"
      >
        Ver produtos
      </Link>
    </div>
  );
}
