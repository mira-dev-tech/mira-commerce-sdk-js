# Changelog

Formato: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).
As operações são geradas da OpenAPI do Mirá Commerce — cada versão traz o que
mudou no contrato da API, não no código deste pacote.

## [0.3.0] — 2026-07-19

Primeira publicação depois de um intervalo grande: o pacote estava **33 operações
atrás** da API. Nada foi removido nem renomeado — só adições.

### Adicionado — Assinaturas (recorrência)

Módulo novo. A renovação é um **pedido normal**: a cada ciclo o core cria o
pedido pela mesma pipeline do checkout e emite um link de pagamento.

- `createSubscription`, `listSubscriptions`, `getSubscription`, `updateSubscription`
- `pauseSubscription`, `resumeSubscription`, `cancelSubscription`
- `skipNextSubscriptionCycle`, `runSubscriptionNow`
- `listSubscriptionRuns` — histórico ciclo → pedido

A adesão é idempotente por `source_order_id`: repetir a chamada para o mesmo
pedido devolve a assinatura existente com `200` em vez de duplicar.

### Adicionado — Assinaturas do comprador (sessão `mc_sess_`)

Área do cliente sem bearer do tenant. O `customer_id` vem **sempre da sessão** —
enviá-lo em query ou body não tem efeito. Assinatura de outro comprador devolve
`404`, não `403`, para não confirmar existência.

- `customerListSubscriptions`, `customerSubscriptionDetail`
- `customerPauseSubscription`, `customerResumeSubscription`
- `customerCancelSubscription`, `customerSkipNextSubscription`

### Adicionado — Payment link

Cobrança por link a partir de um `order_id` — reutilizável para abandono de
carrinho, cobrança pelo admin e B2B, não só para renovação.

- `createPaymentLink`, `listPaymentLinks`, `cancelPaymentLink`
- Públicas, autenticadas pelo token da URL (sem bearer):
  `getPublicPaymentLink`, `publicPaymentLinkPaymentIntent`,
  `publicPaymentLinkConfirmPayment`, `publicPaymentLinkPaymentStatus`

⚠️ `publicPaymentLinkPaymentIntent` responde um shape **discriminado por `mode`**:
`embedded` (cartão/voucher — monta widget), `redirect` (**Pix e boleto** — manda
para a URL/QR) ou `offline`. Tratar apenas `embedded` quebra Pix e boleto, que
são os meios típicos de um link de renovação.

### Adicionado — pendências de versões anteriores

Estas já existiam na API e faltavam no pacote:

- Cupões e promoções: `GET`/`PATCH` por id
- `getTenantSettings` / `updateTenantSettings`
- `markSettlementPaid`
- `assistProductDescription`
- Pedidos do comprador: `customerListOrders`, `customerOrderDetail`
- Checkout: `checkoutPaymentIntent`, `checkoutConfirmPayment`, `checkoutPaymentStatus`
- `uploadProductMedia`, `getPlatformBilling`
- ERP: presets, discover e fluxos

### Notas

Sem breaking change — `0.2.0` continua a compilar. O salto de minor reflecte o
tamanho da superfície nova.

O pacote não expõe helper de orquestração para o fluxo do payment link; quem
renderiza a própria página de pagamento encadeia as quatro operações públicas
na ordem `get → payment-intent → confirm-payment → payment-status`.

## [0.2.0] — 2026-07-16

Publicação inicial no npm.
