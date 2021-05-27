import React from 'react'
import Main from './components/MainComponent'
import { Provider } from 'react-redux'
import { ConfigureStore } from './redux/configureStore'
import { PersistGate } from 'redux-persist/es/integration/react'
import Loading from './components/LoadingComponent'

// creating redux store
const { persistor, store } = ConfigureStore()

export default function App() {
  return (
      <Provider store={store}>
        {/* pass store into Provider component to give Main and all its child components ability to connect to redux store */}
        <PersistGate
          loading={<Loading/>}
          persistor={persistor}
        >
          {/* prevents app from rendering until redux store has rehydrated fully from client side storage */}
          <Main />
        </PersistGate>
      </Provider>
  )
}

// json-server -H 0.0.0.0 --watch db.json -p 3001 -d 2000