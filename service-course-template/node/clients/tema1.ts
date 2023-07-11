// node/clients/analyticsClient.ts
import { AppClient, InstanceOptions, IOContext } from '@vtex/api'

export default class Tema1 extends AppClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('https://upb3.vtexcommercestable.com.br/api/dataentities/course_backend_product_list/schemas/dateFormularSJ', context, options)
  }

  public async getLiveUsers(): Promise<LiveUsersProduct[]> {
    return this.http.get('')
  }
}

export interface LiveUsersProduct {
  slug: string
  liveUsers: number
}