import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MinimalLayout from "./layouts/MinimalLayout";

import HomePage from "./pages/HomePage";
import CampaignList from "./pages/CampaignList";
import NotFound from "./pages/NotFound";
import SignInPage from "./pages/SignInPage";

export default function App() {
  return (
    <>
      <main>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/campaigns" element={<CampaignList />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route element={<MinimalLayout />}>
            <Route path="/sign-in" element={<SignInPage />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}
