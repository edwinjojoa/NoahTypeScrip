import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { publicRoutes, privateRoutes } from './config.routes'

import { NonAuthLayout } from '@components/layouts/nonAuthLayout/nonAuth.layout'
import { DefaultLayout } from '@components/layouts/defaultLayout/default.layout'

import AppRoutePrivate from './private.routes'
import AppRoutePublic from './public.routes'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route key={`r-pub-${index}`} path={route.path} element={<AppRoutePublic />}>
            <Route path="" element={<NonAuthLayout>{route.component}</NonAuthLayout>} />
          </Route>
        ))}
        {privateRoutes.map((route, index) => (
          <Route key={`r-prv-${index}`} path={route.path} element={<AppRoutePrivate />}>
            <Route path="" element={<DefaultLayout>{route.component}</DefaultLayout>} />
          </Route>
        ))}
      </Routes>
    </Router>
  )
}

export default AppRouter
