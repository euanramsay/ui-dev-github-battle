import React from 'react'
import ReactDOM from 'react-dom'
import Popular from './components/Popular'
import Battle from './components/Battle'

import './index.css'

// Component
// State
// Lifecycle
// UI

class App extends React.Component {
  render() {
    return (
      <div className="constainer">
        <Popular />
        <Battle />
      </div>
    )
  }
}

ReactDOM.render(
  // React Element
  // Where to render the element to
  <App />,
  document.getElementById('app')
)
