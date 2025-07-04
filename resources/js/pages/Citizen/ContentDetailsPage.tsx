import ContentDetailsPage from '@/components/ContentDetailsPage';
import Navbar from '@/components/Navbar';
import NotificationSidebar from '@/components/NotificationSidebar';
import { useState } from 'react';

const ContentDetailsPageRoute = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const handleNavigate = (page: string) => {
        navigate(`/${page}`);
    };

    const handleBack = () => {
        navigate('/education');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
            <Navbar
                onNavigate={handleNavigate}
                currentPage="education"
                onNotificationClick={() => setIsNotificationOpen(true)}
                onProfileClick={() => navigate('/')}
            />

            <main className="pt-16">
                <ContentDetailsPage contentId={id || '1'} onBack={handleBack} />
            </main>

            <NotificationSidebar
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
        </div>
    );
};

export default ContentDetailsPageRoute;
