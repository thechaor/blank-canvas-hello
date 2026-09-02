import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contato — Fale com a equipe da loja" },
      {
        name: "description",
        content:
          "Precisa de ajuda com um pedido ou quer avaliar uma carta? Entre em contato com nossa equipe.",
      },
      { property: "og:title", content: "Contato — Fale com a equipe da loja" },
      {
        property: "og:description",
        content: "Canais de atendimento para pedidos, trocas e avaliações.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="py-12 max-w-2xl">
      <h1 className="text-3xl font-bold text-white">Contato</h1>
      <p className="mt-3 text-white/80">
        Escreva para contato@example.com — respondemos em até 1 dia útil.
      </p>
    </div>
  );
}
