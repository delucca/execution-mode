import { ServerConfig } from './types'

const { PORT, NODE_ENV, HOST, URL, HTTPS_KEY, HTTPS_CERT, CODESPACES, APP_ENV } = process.env

const config: ServerConfig = {
  port: PORT ? Number.parseInt(PORT, 10) : 3000,
  dev: NODE_ENV !== 'production',
  host: HOST ?? 'local.getbud.co',
  url: URL,
  isCodespace: CODESPACES?.toUpperCase() === 'TRUE' && APP_ENV?.toUpperCase() === 'CODESPACE',
  https: {
    key: HTTPS_KEY ?? 'key.key',
    cert: HTTPS_CERT ?? 'cert.cert',
  },
}

export default config
