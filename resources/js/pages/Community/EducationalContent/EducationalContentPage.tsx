import EducationalContentPage from '@/components/educational-content/EducationalContentPage';
import CommunityLayout from '@/components/layouts/CommunityLayout';
import { PageProps } from '@/types';
import { Content } from '@/types/content';
import { router as Inertia, usePage } from '@inertiajs/react';
interface EducationalContentPageRouteProps {
    contents: {
        data: Content[];
    };
    [key: string]: unknown;
}
const EducationalContentPageRoute = () => {
    const { props } = usePage<PageProps<EducationalContentPageRouteProps>>();
    const contents = props.contents?.data || [];

    const handleViewDetails = (id: number) => {
        Inertia.visit(route('community.content.show', { id }));
    };

    return (
        <CommunityLayout currentPage="community/education">
            <EducationalContentPage
                contents={contents}
                onViewDetails={handleViewDetails}
            />
        </CommunityLayout>
    );
};

export default EducationalContentPageRoute;
