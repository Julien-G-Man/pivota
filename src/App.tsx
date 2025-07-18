
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Pay from "./pages/Pay";
import Wallet from "./pages/Wallet";
import History from "./pages/History";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { ThemeToggle } from "./components/ThemeToggle";

// New page imports
import BankTransfer from "./pages/transfers/BankTransfer";
import PivotaTransfer from "./pages/transfers/PivotaTransfer";
import P2PTransfer from "./pages/transfers/P2PTransfer";
import MomoTransfer from "./pages/transfers/MomoTransfer";
import Airtime from "./pages/Airtime";
import Data from "./pages/Data";
import Support from "./pages/Support";
import Finance from "./pages/Finance";
import Rewards from "./pages/Rewards";
import Cards from "./pages/Cards";
import InvestmentAdvisor from "./pages/InvestmentAdvisor";

// Profile section pages
import PersonalInfo from "./pages/profile/PersonalInfo";
import Security from "./pages/profile/Security";
import Notifications from "./pages/profile/Notifications";
import Settings from "./pages/profile/Settings";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem("user");
  return user ? <Navigate to="/home" /> : children;
};

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AuthRoute><Landing /></AuthRoute>} />
              <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
              <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
              <Route path="/home" element={<PrivateRoute><Index /></PrivateRoute>} />
              <Route path="/pay" element={<PrivateRoute><Pay /></PrivateRoute>} />
              <Route path="/wallet" element={<PrivateRoute><Wallet /></PrivateRoute>} />
              <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              
              {/* Profile Sections */}
              <Route path="/profile/personal-info" element={<PrivateRoute><PersonalInfo /></PrivateRoute>} />
              <Route path="/profile/security" element={<PrivateRoute><Security /></PrivateRoute>} />
              <Route path="/profile/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
              <Route path="/profile/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
              
              {/* Transfer Routes */}
              <Route path="/transfer/bank" element={<PrivateRoute><BankTransfer /></PrivateRoute>} />
              <Route path="/transfer/pivota" element={<PrivateRoute><PivotaTransfer /></PrivateRoute>} />
              <Route path="/transfer/p2p" element={<PrivateRoute><P2PTransfer /></PrivateRoute>} />
              <Route path="/transfer/momo" element={<PrivateRoute><MomoTransfer /></PrivateRoute>} />
              
              {/* Other Routes */}
              <Route path="/airtime" element={<PrivateRoute><Airtime /></PrivateRoute>} />
              <Route path="/data" element={<PrivateRoute><Data /></PrivateRoute>} />
              <Route path="/support" element={<PrivateRoute><Support /></PrivateRoute>} />
              <Route path="/finance" element={<PrivateRoute><Finance /></PrivateRoute>} />
              <Route path="/rewards" element={<PrivateRoute><Rewards /></PrivateRoute>} />
              <Route path="/cards" element={<PrivateRoute><Cards /></PrivateRoute>} />
              <Route path="/invest" element={<PrivateRoute><InvestmentAdvisor /></PrivateRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
