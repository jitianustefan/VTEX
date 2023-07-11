import { formatError } from "../utils/formatError"


export async function createClient(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: { logger },
    clients: { reportClient },
    state: {payload}
  } = ctx
  console.log('Body received from frontend: ', payload)
  try {
//     const object = {
//       lastName: "Enache",
//       firstName: "Radu",
//       email: "enache.radu@gmail.com",
//       moreDetails: "Vreau info despre comanda 12322687",
//       status: "Comenzi"
// }
// object
    await reportClient.addNewClient(payload)
    ctx.status = 200
    ctx.body = 'Client added'
    await next()
  } catch(e){
    ctx.status = 500
    ctx.body = 'Error'
    logger.error({
      middleware: 'ADD-REPORT-CLIENTS',
      message: 'Error while adding clients',
      error: formatError(e),
    })
  }


}
