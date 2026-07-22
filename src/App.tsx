import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { HomePage } from "./pages/HomePage";
import { BewerbungPage } from "./pages/BewerbungPage";
import { ImpressumPage } from "./pages/ImpressumPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bewerbung" element={<BewerbungPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  );
}
