import { Routes, Route } from 'react-router-dom'
import privateRoutes from '~/routes'
import MainLayout from './layouts/MainLayout'
import ProtectedRoute from './components/ProtectedRoute'
import AuthRoute from './components/AuthRoute'
import Login from './pages/Login'
import Loading from '~/components/Loading'
import CustomAlert from '~/components/Alert'
function App() {
  
  return (
    <>
      <Routes>
        {
          privateRoutes.map((route, index) => {
            const Page = route.component
            let Layout = route.layout || MainLayout
            if (route.layout === null) {
              Layout = ({ children }) => <>{children}</>
            }
            const element = (
              <ProtectedRoute>
                <Layout routePath={route.path}>
                  <Page />
                </Layout>
              </ProtectedRoute>
            )
            return <Route key={index} path={route.path} element={element} />
          })
        }
        <Route path='/login' element={<AuthRoute><Login /></AuthRoute>}/>
      </Routes>
      <Loading />
      <CustomAlert />
    </>
  )
}

export default App;