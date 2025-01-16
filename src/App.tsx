import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { Route } from 'lucide-react'
import { BrowserRouter as Router, Route, Routes, Link, Navigate  } from 'react-router-dom';
import Base from './components/navBar/base';
import Login from './components/login/login';
import { Providers } from './Providers';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Providers>
      <Router>
          {
        
            localStorage.getItem('token')?<Base></Base>:
            <Routes>
                    <Route path="/*" element={<Login/>}/>
            </Routes>
          }
      </Router>
    </Providers>
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  )
}

export default App
