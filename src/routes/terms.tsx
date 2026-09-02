import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Termos de Uso — Regras da loja" },
      {
        name: "description",
        content:
          "Conheça os termos de uso da loja: compras, envio, trocas e responsabilidades das partes.",
      },
      { property: "og:title", content: "Termos de Uso — Regras da loja" },
      {
        property: "og:description",
        content: "Termos que regem compras, envio e trocas na loja.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="py-12 max-w-2xl">
      <h1 className="text-3xl font-bold text-white">Termos de Uso</h1>
      <p className="mt-3 text-white/80">
        Ao comprar nesta loja você concorda com nossas condições de pagamento, prazos
        de envio e política de trocas em até 7 dias após o recebimento.
      </p>
    </div>
  );
}
