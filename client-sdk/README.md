# @mira-commerce/client-sdk

Cliente TypeScript oficial da API do [Mira Commerce](https://mira-dev.tech) —
gerado da especificação OpenAPI da plataforma. Uma função tipada por operação
da API, `fetch` nativo, zero dependências de runtime.

```bash
npm install @mira-commerce/client-sdk
```

## Uso

```ts
import { createCommerceClient, listProducts, resolvePrice } from "@mira-commerce/client-sdk";

const client = createCommerceClient({
  baseUrl: "https://api.mira-dev.tech/v1",
  token: process.env.COMMERCE_STOREFRONT_BEARER, // Bearer — SÓ server-side/build
  memberId: process.env.NEXT_PUBLIC_MEMBER_ID,   // sua loja (header X-Tenant-ID)
});

const { data: products } = await listProducts({ client, query: { limit: 50 } });
const { data: price } = await resolvePrice({ client, query: { sku: "SKU-001", channel: "web" } });
```

O `createCommerceClient` injeta automaticamente o `Authorization: Bearer` e o
`X-Tenant-ID` em toda chamada. Cada operação tem o mesmo nome do `operationId`
da OpenAPI — o autocomplete do editor substitui a leitura do spec.

## Segurança

Um cliente configurado com `token` só pode existir **server-side ou em build**
— nunca no bundle do browser. As regras completas estão no guia.

## Documentação

- **Guia completo de storefront** (autenticação, catálogo, checkout, pagamento,
  minha conta): [mira-commerce-storefront-guide](https://github.com/mira-dev-tech/mira-commerce-storefront-guide)
- Helpers de checkout headless: [`@mira-commerce/checkout-sdk`](https://www.npmjs.com/package/@mira-commerce/checkout-sdk)

## Versionamento

A versão acompanha a linha da API (`0.2.x` ↔ core API v0.2). O código é gerado
da OpenAPI a cada release — o SDK nunca diverge do contrato.
