import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/animations/PageTransition";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import IELTS from "./pages/IELTS";
import PTE from "./pages/PTE";
import Destinations from "./pages/Destinations";
import CountryDetail from "./pages/CountryDetail";
import Contact from "./pages/Contact";
import Apply from "./pages/Apply";
import ApplyIELTS from "./pages/ApplyIELTS";
import FreeConsultation from "./pages/FreeConsultation";
import Events from "./pages/Events";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAds from "./pages/admin/AdminAds";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminPlaceholder from "./components/admin/Placeholder";
import ManageHome from "./pages/admin/pages/ManageHome";
import ManageIELTS from "./pages/admin/pages/ManageIELTS";
import ManagePTE from "./pages/admin/pages/ManagePTE";
import ManageAbout from "./pages/admin/pages/ManageAbout";
import ManageDestinations from "./pages/admin/pages/ManageDestinations";
import ManageServices from "./pages/admin/pages/ManageServices";
import ManageEvents from "./pages/admin/pages/ManageEvents";
import ManageContact from "./pages/admin/pages/ManageContact";
import StudentLogin from "./pages/StudentLogin";
import ScrollToTop from "./components/shared/ScrollToTop";
import { CMSProvider } from "./context/CMSContext";
const queryClient = new QueryClient();

// Animated Routes Component
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/ielts" element={<PageTransition><IELTS /></PageTransition>} />
        <Route path="/pte" element={<PageTransition><PTE /></PageTransition>} />
        <Route path="/destinations" element={<PageTransition><Destinations /></PageTransition>} />
        <Route path="/destinations/:country" element={<PageTransition><CountryDetail /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/apply" element={<PageTransition><Apply /></PageTransition>} />
        <Route path="/apply-ielts" element={<PageTransition><ApplyIELTS /></PageTransition>} />
        <Route path="/free-consultation" element={<PageTransition><FreeConsultation /></PageTransition>} />

        <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
        <Route path="/success" element={<PageTransition><Success /></PageTransition>} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="ads" element={<AdminAds />} />
          <Route path="pages/home" element={<ManageHome />} />
          <Route path="pages/ielts" element={<ManageIELTS />} />
          <Route path="pages/pte" element={<ManagePTE />} />
          <Route path="pages/about" element={<ManageAbout />} />
          <Route path="pages/destinations" element={<ManageDestinations />} />
          <Route path="pages/services" element={<ManageServices />} />
          <Route path="pages/events" element={<ManageEvents />} />
          <Route path="pages/contact" element={<ManageContact />} />
          <Route path="media" element={<AdminPlaceholder title="Gallery & Media Manager" />} />
          <Route path="students" element={<AdminPlaceholder title="Student Applications" />} />
          <Route path="destinations" element={<AdminPlaceholder title="Destinations Manager" />} />
          <Route path="settings" element={<AdminPlaceholder title="Admin Settings" />} />

          <Route index element={<AdminDashboard />} />
        </Route>

        <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
        <Route path="/student/login" element={<PageTransition><StudentLogin /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <CMSProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
            <ScrollToTop />
            <AnimatedRoutes />
          </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </CMSProvider>
);

export default App;
