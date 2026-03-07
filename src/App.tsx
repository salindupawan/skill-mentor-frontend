import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboard from "./pages/AdminDashboard";
import CreateMentorPage from "./pages/CreateMentorPage";
import MentorProfilePage from "./pages/MentorProfilePage";
import AdminLayout from "./AdminLayout";
import CreateSubjectPage from "./pages/CreateSubjectPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/mentor" element={<MentorProfilePage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/mentor" element={<CreateMentorPage />} />
          <Route path="/admin/subject" element={<CreateSubjectPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
