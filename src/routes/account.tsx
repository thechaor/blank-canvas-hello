import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Minha Conta — Pedidos e preferências" },
      {
        name: "description",
        content:
          "Acesse sua conta para acompanhar pedidos, dados de entrega e preferências da coleção.",
      },
      { property: "og:title", content: "Minha Conta — Pedidos e preferências" },
      {
        property: "og:description",
        content: "Acompanhe pedidos e gerencie seus dados de conta.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold text-white">Minha Conta</h1>
      <p className="mt-3 text-white/80">
        Faça login pelo ícone de usuário no topo para ver seus dados e pedidos.
      </p>
    </div>
  );
}
