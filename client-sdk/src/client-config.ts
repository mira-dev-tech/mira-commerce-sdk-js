import type { CreateClientConfig } from "./generated/client.gen"

/**
 * Default runtime config for generated fetch client.
 * Override baseUrl and auth via createCommerceClient() in the app facade.
 */
export const createClientConfig: CreateClientConfig = (config) => ({
  baseUrl: "/commerce-api/v1",
  ...config,
})
