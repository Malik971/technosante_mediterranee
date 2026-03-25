import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar          from './components/layout/Navbar'
import Footer          from './components/layout/Footer'
import HomePage        from './pages/HomePage'
import QuiSommesNous   from './pages/QuiSommesNous'
import Assistance      from './pages/Assistance'
import Actualites      from './pages/Actualites'
import ArticlePage     from './pages/Actualites/ArticlePage'
import ServiceDetailPage from './pages/ServiceDetail'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-texture-sable">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"                    element={<HomePage />}         />
            <Route path="/qui-sommes-nous"     element={<QuiSommesNous />}    />
            <Route path="/actualites"          element={<Actualites />}       />
            <Route path="/actualites/:slug"    element={<ArticlePage />}      />
            <Route path="/assistance"          element={<Assistance />}       />
            <Route path="/services/:id"        element={<ServiceDetailPage />}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}