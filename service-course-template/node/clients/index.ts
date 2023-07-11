// node/clients/index.ts
import { IOClients } from '@vtex/api'
import Tema1 from './tema1'

export class Clients extends IOClients {
  public get tema1() {
    return this.getOrSet('tema1', Tema1)
  }
}