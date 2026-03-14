import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboard from "./pages/AdminDashboard";
import CreateMentorPage from "./pages/CreateMentorPage.tsx";
import MentorProfilePage from "./pages/MentorProfilePage";
import AdminLayout from "./AdminLayout";
import CreateSubjectPage from "./pages/CreateSubjectPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { ProtectedRoute } from "./ProtectedLayout.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import BankTransferPaymentPage from "./pages/BankTransferPaymentPage.tsx";
import { MentorListPage } from "./pages/MentorsPage.tsx";
import { UserSync } from "./lib/UserSync.ts";

function App() {
  return (
    <>
      <UserSync />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/mentors" element={<MentorListPage />} />
        {/* <Route element={<ProtectedLayout />}> */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/:code"
          element={
            <ProtectedRoute>
              <BankTransferPaymentPage />
            </ProtectedRoute>
          }
        />
        {/* </Route> */}

        <Route path="/mentor/:mentorId" element={<MentorProfilePage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/mentor" element={<CreateMentorPage />} />
          <Route path="/admin/subject" element={<CreateSubjectPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
