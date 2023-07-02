import { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Spinner from './components/Spinner/index.tsx'
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react'

const LazyApp = lazy(() => import('./App'))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-llnfo3nio0yfmqyn.us.auth0.com"
      clientId="50dYLe87ibse6rw1QYHlkJZ5Iy4QrcQI"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Provider store={store}>
        <Suspense fallback={<Spinner />}>
          <LazyApp />
        </Suspense>
      </Provider>
    </Auth0Provider>
  </BrowserRouter>
)
