import routes from '~/configs/routes'
// PAGES 
import Dashboard from '~/pages/Dashboard'
import Store from '~/pages/Store'
import Login from '~/pages/Login'
import NoPermission from '~/pages/NoPermission'
import ProductCatalog from '../pages/ProductCatalog'
import Product from '../pages/Product'
const privateRoutes = [
  {
    path: routes.dashboard,
    component:Dashboard
  }, 
  {
    path: routes.toy,
    component:Store
  },
  {
    path: routes.decoration,
    component:Store
  },
  {
    path:routes.unauthorized, 
    component:NoPermission
  },
  {
    path: routes.productCatalog,
    component:ProductCatalog
  },
  {
    path: routes.product,
    component:Product
  }
]

export default privateRoutes