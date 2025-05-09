import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CampaignList from './pages/CampaignList';
import NotFound from './pages/NotFound';
import { Header } from './components/sections/Header';
import { Footer } from './components/sections/Footer';

export default function App() {
  return (
    <>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/campaigns" element={<CampaignList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}
