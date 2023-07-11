import type { ClientsConfig, ServiceContext, RecorderState,ParamsContext } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { getAllClients } from './middlewares/getAllClients'
import { createClient } from './middlewares/createClient'
import parsePayload from './utils/parsePayload'

const TIMEOUT_MS = 800

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    status: {
      memoryCache,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context<Payload = unknown> = ServiceContext<Clients, State<Payload>>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State<Payload> extends RecorderState {
    payload: Payload
  }
}

// Export a service that defines route handlers and client options.
export default new Service<Clients, State<never>, ParamsContext>({
  clients,
  routes: {
    // `status` is the route ID from service.json. It maps to an array of middlewares (or a single handler).
    getClients: method({
      GET: [getAllClients],
      POST: [parsePayload, createClient]
    }),
    createClient: method({
      POST: [parsePayload, createClient]
    })
  },
})
