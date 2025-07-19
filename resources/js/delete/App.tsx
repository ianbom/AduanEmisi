// @ts-nocheck
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContentDetailsPage from './Pages/ContentDetailsPage';
import CreateReportPage from './Pages/CreateReportPage';
import EducationalContentPage from './Pages/EducationalContentPage';
import HomePage from './Pages/HomePage';
import Index from './Pages/Index';
import MapPage from './Pages/MapPage';
import NotFound from './Pages/NotFound';
import ReportDetailsPage from './Pages/ReportDetailsPage';
import ReportsPage from './Pages/ReportsPage';

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route
                        path="/create-report"
                        element={<CreateReportPage />}
                    />
                    <Route
                        path="/report-details/:id"
                        element={<ReportDetailsPage />}
                    />
                    <Route
                        path="/education"
                        element={<EducationalContentPage />}
                    />
                    <Route
                        path="/content-details/:id"
                        element={<ContentDetailsPage />}
                    />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
