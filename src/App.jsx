import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Registration from "./pages/Registration";
import OrganizationSetup from "./pages/OrganizationSetup";
import ChatbotIntegration from "./pages/ChatbotIntegration";
import ChatbotDemo from "./pages/ChatbotDemo";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route
          path="/setup-organization"
          element={
            <ProtectedRoute>
              <OrganizationSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot-integration"
          element={
            <ProtectedRoute>
              <ChatbotIntegration />
            </ProtectedRoute>
          }
        />
        <Route path="chatbot-demo" element={<ChatbotDemo />} />
        {/* Catch-all route for 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600">Page not found</p>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
