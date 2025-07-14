import CommunityLayout from '@/components/layouts/CitizenLayout';
import ReportDetailPage from '@/components/report/ReportDetailPage';
import { PageProps } from '@/types';
import { Report } from '@/types/report';
import { router as Inertia, usePage } from '@inertiajs/react';
interface ReportDetailPageRouteProps {
    report: Report;
    [key: string]: unknown;
}
const ReportDetailPageRoute = () => {
    const { props } = usePage<PageProps<ReportDetailPageRouteProps>>();
    const report = props.report;
    const handleBack = () => {
        Inertia.visit(route('community.report'));
    };
    return (
        <CommunityLayout currentPage="community.report/{id}">
            <ReportDetailPage report={report} onBack={handleBack} />
        </CommunityLayout>
    );
};

export default ReportDetailPageRoute;
