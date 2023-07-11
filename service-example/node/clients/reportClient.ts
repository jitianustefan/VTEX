import { ExternalClient, InstanceOptions, IOContext } from "@vtex/api"

const routes = {
  searchClientsRoute: () => `/formular_stefan/search?_fields=_all&_schema=upb3_stefan`,
  addNewClientRoute: () => `/formular_stefan/documents?_schema=upb3_stefan`
}

export default class ReportClient extends ExternalClient {


  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `https://upb3.vtexcommercestable.com.br/api/dataentities`,
      context,
      {
        ...options,
        headers: { ...options?.headers, VtexIdclientAutCookie: context.authToken },
      }
    )
  }

  public async getClients() {
    return this.http.get(routes.searchClientsRoute())
  }

  public async addNewClient(clientObject: any){
  // console.log('addClients ', clientObject)
    return this.http.post(routes.addNewClientRoute(), clientObject)
  }

}
