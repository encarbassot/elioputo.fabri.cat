import './App.css'
import ScrollController from './components/elio-react-animations/ScrollController/ScrollController.jsx'
import Vid from './components/Vid/Vid.jsx'
import Footer from './components/Footer/Footer.jsx'

const elements = [
  {component: <Vid/>, top: 0, height: 250 },
  {component: <Vid/>, top: 250, height: 300 },
  { component: <h1>@elioputo</h1>, top: 40, height: 200 },
  { component: <h1 className='Fabricat'>FABRICAT</h1>, top: 300, height: 150 },
    // { component: <Footer/>, height: 30, fromBottom: true },

]

function App() {
  return<>
    <ScrollController elements={elements} />
    <Footer/>
  </>
}

export default App