import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacidade — Como tratamos seus dados" },
      {
        name: "description",
        content:
          "Saiba quais dados coletamos, como usamos e como você pode solicitar a exclusão das suas informações.",
      },
      { property: "og:title", content: "Privacidade — Como tratamos seus dados" },
      {
        property: "og:description",
        content: "Coleta, uso e exclusão de dados pessoais na loja.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="py-12 max-w-2xl">
      <h1 className="text-3xl font-bold text-white">Privacidade</h1>
      <p className="mt-3 text-white/80">
        Coletamos apenas os dados necessários para processar pedidos e nunca
        compartilhamos suas informações com terceiros para fins de marketing.
      </p>
    </div>
  );
}
