import CommunityLayout from '@/components/layouts/CommunityLayout';
import ReportsPage from '@/components/report/ReportsPage';
import { PageProps } from '@/types';
import { Province } from '@/types/profile';
import { Report } from '@/types/report';
import { router as Inertia, usePage } from '@inertiajs/react';
interface ReportPageRouteProps {
    reports: { data: Report[] };
    provinces: {
        provinces: Province[];
    };
    myReports: boolean;
    [key: string]: unknown;
}
const ReportPageRoute = ({ myReports }: { myReports: boolean }) => {
    const { props } = usePage<PageProps<ReportPageRouteProps>>();
    const reports = props.reports?.data || [];
    const provinces = props.provinces;

    const handleViewDetails = (id: number) => {
        Inertia.visit(route('community.report.show', { id }));
    };
    const handleCreateReport = () => {
        Inertia.visit(route('community.create.report'));
    };
    return (
        <CommunityLayout
            currentPage={myReports ? 'community/my-report' : 'community/report'}
        >
            <ReportsPage
                provinces={provinces}
                myReports={myReports}
                reports={reports}
                onViewDetails={handleViewDetails}
                onCreateReport={handleCreateReport}
            />
        </CommunityLayout>
    );
};

export default ReportPageRoute;
