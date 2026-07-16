# Mira Commerce — SDKs JavaScript/TypeScript

Fonte dos SDKs oficiais do [Mira Commerce](https://mira-dev.tech) publicados
no npm:

| Pacote | npm | O que é |
|--------|-----|---------|
| [`client-sdk/`](client-sdk/) | [`@mira-commerce/client-sdk`](https://www.npmjs.com/package/@mira-commerce/client-sdk) | Cliente tipado da API — uma função por operação, gerado da OpenAPI, zero dependências |
| [`checkout-sdk/`](checkout-sdk/) | [`@mira-commerce/checkout-sdk`](https://www.npmjs.com/package/@mira-commerce/checkout-sdk) | Helpers do funil de checkout headless sobre o client-sdk |

```bash
npm install @mira-commerce/client-sdk @mira-commerce/checkout-sdk
```

## Para quem está construindo uma loja

Comece pelo **guia de storefront** — ele ensina a jornada completa
(autenticação, catálogo, checkout, pagamento, minha conta) e usa estes SDKs no
[doc 07](https://github.com/mira-dev-tech/mira-commerce-storefront-guide/blob/main/docs/07-sdk-typescript.md):

→ [mira-commerce-storefront-guide](https://github.com/mira-dev-tech/mira-commerce-storefront-guide)

## Build local

```bash
npm install -D tsup typescript@5.6
(cd client-sdk && npm run build)
(cd checkout-sdk && npm run build)
```

## Governança

- O `client-sdk` é **gerado** da especificação OpenAPI da plataforma (fonte de
  verdade interna) — mudanças de contrato chegam aqui por regeneração a cada
  release da API, nunca por edição manual do código gerado.
- A versão dos pacotes acompanha a linha da API (`0.2.x` ↔ core API v0.2).
- Escrita restrita à equipe Mirá; forks e issues são bem-vindos.

## Licença

[MIT](LICENSE)
