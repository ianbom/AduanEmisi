import FeatureSection from '@/components/core/homepage/FeatureSection';
import HeroSection from '@/components/core/homepage/HeroSection';
import QnASection from '@/components/core/homepage/QnASection';
import StatSection from '@/components/core/homepage/StatSection';
import CommunityLayout from '@/components/layouts/CommunityLayout';

const HomePage = () => {
    return (
        <CommunityLayout currentPage="community/homepage">
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
                <HeroSection />
                <StatSection />
                <FeatureSection />
                <QnASection />
            </div>
        </CommunityLayout>
    );
};

export default HomePage;
