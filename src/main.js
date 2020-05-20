import routes from './routes'
import store from './store-module'

const application = {
  name: process.env.VUE_APP_NAME,
  routes,
  store
}

window._application = application

export default application
