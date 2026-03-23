import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar        from './components/layout/Navbar'
import Footer        from './components/layout/Footer'
import HomePage      from './pages/HomePage'
import QuiSommesNous from './pages/QuiSommesNous'
import Assistance    from './pages/Assistance'
import Actualites    from './pages/Actualites'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-texture-sable">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"                element={<HomePage />}      />
            <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
            <Route path="/actualites"      element={<Actualites />}    />
            <Route path="/assistance"      element={<Assistance />}    />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
