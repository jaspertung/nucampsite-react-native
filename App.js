import React from 'react'
import Main from './components/MainComponent'
import { Provider } from 'react-redux'
import { ConfigureStore } from './redux/configureStore'

// creating redux store
const store = ConfigureStore()

export default function App() {
  return (
      <Provider store={store}>
        {/* pass store into Provider component to give Main and all its child components ability to connect to redux store */}
        <Main />
      </Provider>
  )
}

// json-server -H 0.0.0.0 --watch db.json -p 3001 -d 2000