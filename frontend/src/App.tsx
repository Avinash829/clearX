
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import SignupLanding from "./pages/SignupLanding";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import RetailerSignup from "./pages/RetailerSignup";
import CustomerSignup from "./pages/CustomerSignup";
import DeliveryAgentSignup from "./pages/DeliveryAgentSignup";
import RetailerDashboard from "./pages/RetailerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import DeliveryAgentDashboard from "./pages/DeliveryAgentDashboard";
import ProfilePage from "./pages/ProfilePage";
import BuyNow from "./pages/BuyNow";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/signup" element={<SignupLanding />} />
          <Route path="/signup/retailer" element={<RetailerSignup />} />
          <Route path="/signup/customer" element={<CustomerSignup />} />
          <Route path="/signup/agent" element={<DeliveryAgentSignup />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/retailer-dashboard" element={<RetailerDashboard />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/delivery-dashboard" element={<DeliveryAgentDashboard />} />
          <Route path="/dashboard/retailer" element={<RetailerDashboard />} />
          <Route path="/dashboard/customer" element={<CustomerDashboard />} />
          <Route path="/dashboard/agent" element={<DeliveryAgentDashboard />} />
          <Route path="/buy-now/:productId" element={<BuyNow />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/retailer-profile" element={<ProfilePage />} />
          <Route path="/customer-profile" element={<ProfilePage />} />
          <Route path="/delivery-profile" element={<ProfilePage />} />
          <Route path="/settings" element={<ProfilePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
