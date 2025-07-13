import CommunityLayout from '@/components/layouts/CitizenLayout';
import CreateReportPage from '@/components/report/CreateReportPage';
import { PageProps } from '@/types';
import { Province } from '@/types/area/interface';
import { router as Inertia, usePage } from '@inertiajs/react';
interface CreateReportPageRouteProps {
    provinces: Province[];
    [key: string]: unknown;
}
const CreateReportPageRoute = () => {
    const { props } = usePage<PageProps<CreateReportPageRouteProps>>();
    const provinces = props.provinces || [];
    const handleBack = () => {
        Inertia.visit(route('community.report'));
    };
    return (
        <CommunityLayout currentPage="community-create-report">
            <CreateReportPage onBack={handleBack} provinces={provinces} />
        </CommunityLayout>
    );
};
export default CreateReportPageRoute;
