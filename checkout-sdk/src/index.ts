import type { Client } from "@mira-commerce/client-sdk"

export type CheckoutSessionChannel = "web" | "whatsapp" | "erp" | "api"

export type CreateCheckoutSessionInput = {
  memberId: string
  warehouseId: string
  channel?: CheckoutSessionChannel
  state?: Record<string, unknown>
}

export type PlaceOrderInput = {
  sessionId: string
  sessionToken: string
  idempotencyKey?: string
  captchaToken?: string
}

export type CheckoutSession = {
  id: string
  sessionToken: string
  state?: Record<string, unknown>
}

/**
 * Creates a checkout session (POST /checkout/sessions).
 */
export async function createCheckoutSession(
  client: Client,
  input: CreateCheckoutSessionInput,
): Promise<CheckoutSession> {
  const { data, error } = await client.post({
    url: "/checkout/sessions",
    body: {
      member_id: input.memberId,
      warehouse_id: input.warehouseId,
      channel: input.channel ?? "web",
      state: input.state,
    },
  })
  if (error) {
    throw new Error(typeof error === "string" ? error : "createCheckoutSession failed")
  }
  const payload = data as {
    id: string
    session_token: string
    state?: Record<string, unknown>
  }
  return {
    id: payload.id,
    sessionToken: payload.session_token,
    state: payload.state,
  }
}

/**
 * Patches checkout session state (PATCH /checkout/sessions/{id}).
 */
export async function patchCheckoutSession(
  client: Client,
  sessionId: string,
  sessionToken: string,
  state: Record<string, unknown>,
): Promise<void> {
  const { error } = await client.patch({
    url: `/checkout/sessions/${sessionId}`,
    body: { state },
    headers: { "X-Checkout-Session-Token": sessionToken },
  })
  if (error) {
    throw new Error("patchCheckoutSession failed")
  }
}

/**
 * Places order from session (POST …/place-order) — server-side authoritative.
 */
export async function placeCheckoutOrder(client: Client, input: PlaceOrderInput) {
  const headers: Record<string, string> = {
    "X-Checkout-Session-Token": input.sessionToken,
  }
  if (input.idempotencyKey) {
    headers["Idempotency-Key"] = input.idempotencyKey
  }
  const { data, error } = await client.post({
    url: `/checkout/sessions/${input.sessionId}/place-order`,
    body: input.captchaToken ? { captcha_token: input.captchaToken } : {},
    headers,
  })
  if (error) {
    throw new Error("placeCheckoutOrder failed")
  }
  return data
}

export { createCheckoutSession as createSession, placeCheckoutOrder as placeOrder }
