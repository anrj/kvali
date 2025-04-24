import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Header } from './components/sections/Header'
import { Footer } from './components/sections/Footer'
import { CTAComponent } from './components/sections/CTA'
import { Hero } from './components/sections/Hero'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <Hero />
    <CTAComponent />
    <Footer />
  </StrictMode>,
)
