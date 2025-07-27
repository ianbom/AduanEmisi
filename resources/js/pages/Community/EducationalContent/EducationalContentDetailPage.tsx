import ContentDetailsPage from '@/components/educational-content/ContentDetailsPage';
import CommunityLayout from '@/components/layouts/CommunityLayout';
import { PageProps } from '@/types';
import { Content } from '@/types/content';
import { router as Inertia, usePage } from '@inertiajs/react';
interface ContentDetailsPageRouteProps {
    content: Content;
    [key: string]: unknown;
}
const ContentDetailPageRoute = () => {
    const { props } = usePage<PageProps<ContentDetailsPageRouteProps>>();
    const content = props.content;
    const handleBack = () => {
        Inertia.visit(route('education'));
    };
    return (
        <CommunityLayout currentPage="community/education/{id}">
            <ContentDetailsPage content={content} onBack={handleBack} />
        </CommunityLayout>
    );
};

export default ContentDetailPageRoute;
