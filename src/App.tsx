import { Routes, Route } from 'react-router-dom';
import { Header } from './components/sections/Header';
import { Footer } from './components/sections/Footer';
import HomePage from './pages/HomePage';
import CampaignList from './pages/CampaignList';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/campaigns" element={<CampaignList />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
