import Feature from './components/Feature/Feature'
import Home from './components/Home/Home'
import NavBar from './components/Navigation/NavBar'
import News from './components/News/News'
import Sidebar from './components/Sidebar/Sidebar'

function App() {
  return (
    <div className=''>
      <Sidebar/>
      <NavBar/>
      <Home/>
      <News/>
      <Feature/>
    </div>
  )
}

export default App
