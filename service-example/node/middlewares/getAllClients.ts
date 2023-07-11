import { formatError } from "../utils/formatError"


export async function getAllClients(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: { logger },
    clients: { reportClient },
  } = ctx
  console.log('Middleware')
  try {
    const reportClients = await reportClient.getClients()
    ctx.status = 200
    ctx.body = reportClients
    await next()
  } catch(e){
    logger.error({
      middleware: 'GET-REPORT-CLIENTS',
      message: 'Error while getting clients',
      error: formatError(e),
    })
  }


}
