import './App.css'
// or using a ESM bundler which resolves CSS files as modules:
import "@blueprintjs/core/lib/css/blueprint.css";
// include blueprint-icons.css for icon font support
import "@blueprintjs/icons/lib/css/blueprint-icons.css";


import { Navbar } from './components/Navbar'
import { Body } from './components/Body';
function App() {



  return (
    <>
      <Navbar />
      <Body />
    </>
  )
}

export default App
