# @mira-commerce/checkout-sdk

Helpers TypeScript para **checkout headless** no
[Mira Commerce](https://mira-dev.tech) — camada fina sobre o
[`@mira-commerce/client-sdk`](https://www.npmjs.com/package/@mira-commerce/client-sdk)
que codifica as boas práticas do funil (ex.: `placeCheckoutOrder` exige
`idempotencyKey` por assinatura).

```bash
npm install @mira-commerce/client-sdk @mira-commerce/checkout-sdk
```

## Uso (no seu BFF — o comprador nunca vê estes tokens)

```ts
import { createCommerceClient } from "@mira-commerce/client-sdk";
import {
  createCheckoutSession,
  patchCheckoutSession,
  placeCheckoutOrder,
} from "@mira-commerce/checkout-sdk";

const client = createCommerceClient({
  baseUrl: "https://api.mira-dev.tech/v1",
  token: process.env.MC_API_TOKEN,
  memberId: MEMBER_ID,
});

const session = await createCheckoutSession(client, {
  memberId: MEMBER_ID,
  warehouseId: WAREHOUSE_ID,
  channel: "web",
});
// guarde session.sessionToken em cookie httpOnly

await patchCheckoutSession(client, session.id, sessionToken, {
  cart: [{ sku: "SKU-001", qty: 2, selected: true }],
  customer_email: "maria@example.com",
});

const placed = await placeCheckoutOrder(client, {
  sessionId: session.id,
  sessionToken,
  idempotencyKey: crypto.randomUUID(),
});
if (placed.checkout_url) redirect(placed.checkout_url);
```

## Documentação

O passo a passo completo do funil (estado da sessão, identidade do comprador,
tratamento de erros, pagamento embutido) está no
[guia de storefront](https://github.com/mira-dev-tech/mira-commerce-storefront-guide) —
docs 03 e 04.
