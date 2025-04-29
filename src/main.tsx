import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Header } from './components/sections/Header'
import { Footer } from './components/sections/Footer'
import { CTAComponent } from './components/sections/CTA'
import { Hero } from './components/sections/Hero'
import { Card } from './components/atomic/Card'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <Hero />
    <Card imageSrc='/assets/img/test.jpg' title='დაეხმარეთ გოგიჩას ავიდეს ვერცხლში' barPercentage={99} moneyRaised={234.56}/>
    <CTAComponent />
    <Footer />
  </StrictMode>,
)
