import { IOClients } from '@vtex/api'
import ReportClient from './reportClient'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get reportClient() {
    return this.getOrSet('reportClient', ReportClient)
  }
}
