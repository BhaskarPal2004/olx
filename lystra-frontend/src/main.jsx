import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import App from './App.jsx'
import store from './store/store'
import { Toaster } from 'react-hot-toast'

const persistor = persistStore(store)

function loadGoogleMapsScript(callback) {
  if (window.google && window.google.maps) {
    callback()
    return
  }

  const apiKey = import.meta.env.VITE_MAPS_API_KEY;

  const existingScript = document.querySelector(
    'script[src^="https://maps.googleapis.com/maps/api/js"]'
  )

  if (existingScript) {
    existingScript.addEventListener('load', callback)
    return
  }

  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
  script.async = true
  script.defer = true
  script.onload = callback
  script.onerror = () => {
    console.error('Failed to load Google Maps script')
  }

  document.head.appendChild(script)
}

// Delay app rendering until the Google Maps script is ready
loadGoogleMapsScript(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <Toaster
            position="top-center"
            reverseOrder={true}
            gutter={8}
            toastOptions={{
              duration: 5000,
              removeDelay: 1000,
              style: {
                background: 'gray',
                color: '#fff',
              },
            }}
          />
        </PersistGate>
      </Provider>
    </StrictMode>
  )
})
