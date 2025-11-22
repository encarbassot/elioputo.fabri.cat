import './App.css'
import ScrollController from './components/elio-react-animations/ScrollController/ScrollController.jsx'
import Vid from './fragments/Vid/Vid.jsx'
import Footer from './fragments/Footer/Footer.jsx'
import { Elioputo_H1, Elioputo_text, Elioputo_transparent, Elioputo_brands} from './fragments/elioputo/elioputo.jsx'


const elements = [

  //backgrounds
  {component: <Vid/>, top: 0, height: 250 },
  {component: <Vid/>, top: 250, height: 300 },

  //foregrounds
  { component: <Elioputo_H1/>, top: 80, height: 180 },
  { component: <Elioputo_text/>, top: 150, height: 150 },
  { component: <Elioputo_transparent/>, top: 200, height: 300 },

  { component: <h1 className='Fabricat'>FABRICAT</h1>, top: 300, height: 150 },

  {component: <Elioputo_brands/>, top: 400, height: 300 },
  
  { component: <Footer/>, top: 700, height: 10 },

]

function App() {
  return<>
    <ScrollController elements={elements} />
    {/* <Footer/> */}
  </>
}

export default App