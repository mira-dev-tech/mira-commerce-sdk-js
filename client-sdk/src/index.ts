export * from "./generated/index"
export { createClient, type Client } from "./generated/client/index"
export { createClientConfig } from "./client-config"
export type { CreateClientConfig } from "./generated/client.gen"

import { createClient as createSdkClient } from "./generated/client/index"
import { createClientConfig } from "./client-config"

export type CommerceClientOptions = {
  baseUrl?: string
  token?: string
  fetch?: typeof fetch
  /** Tenant (member UUID) — emitido como header X-Tenant-ID para o shared API. */
  memberId?: string
}

/** Creates a configured SDK client instance (Bearer auth + base URL + tenant). */
export function createCommerceClient(options: CommerceClientOptions = {}) {
  const client = createSdkClient(
    createClientConfig({
      baseUrl: options.baseUrl ?? "/commerce-api/v1",
      fetch: options.fetch,
    }),
  )
  const headers: Record<string, string> = {}
  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`
  }
  if (options.memberId) {
    headers["X-Tenant-ID"] = options.memberId
  }
  if (Object.keys(headers).length > 0) {
    client.setConfig({ headers })
  }
  return client
}
