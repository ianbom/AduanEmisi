import ContentDetailsPage from '@/components/educational-content/ContentDetailsPage';
import Navbar from '@/components/Navbar';
import NotificationSidebar from '@/components/NotificationSidebar';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
const ContentDetailsPageRoute = () => {
    // const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // const handleNavigate = (page: string) => {
    //     navigate(`/${page}`);
    // };

    // const handleBack = () => {
    //     navigate('/education');
    // };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
            <Navbar
                onNavigate={() => {}}
                currentPage="education"
                onNotificationClick={() => setIsNotificationOpen(true)}
                onProfileClick={() => {}}
            />
            <main className="pt-16">
                <ContentDetailsPage contentId={id || '1'} onBack={() => {}} />
            </main>
            <NotificationSidebar
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
        </div>
    );
};

export default ContentDetailsPageRoute;
