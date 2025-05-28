import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MinimalLayout from "./layouts/MinimalLayout";
import { ProtectedRoute } from "./utils/ProtectedRoute";

import HomePage from "./pages/HomePage";
import CampaignList from "./pages/CampaignList";
import Campaign from "./pages/Campaign";
import CampaignCreationPage from "./pages/CampaignCreation";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <>
      <main>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/campaigns" element={<CampaignList />} />
            <Route path="/campaign/:id" element={<Campaign />} />
            <Route
              path="/create-campaign"
              element={
                <ProtectedRoute>
                  <CampaignCreationPage />
                </ProtectedRoute>
              }
            />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route element={<MinimalLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}
