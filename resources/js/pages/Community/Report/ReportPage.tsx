// @ts-nocheck
import CommunityLayout from '@/components/layouts/CitizenLayout';
import ReportsPage from '@/components/report/ReportsPage';
import { PageProps } from '@/types';
import { Report } from '@/types/report';
import { router as Inertia, usePage } from '@inertiajs/react';

interface ReportPageRouteProps {
    reports: Report[];
    myReports: boolean;
    [key: string]: unknown;
}
const ReportPageRoute = ({ myReports }: { myReports: boolean }) => {
    const { props } = usePage<PageProps<ReportPageRouteProps>>();
    const reports = props.reports?.data || [];
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
                myReports={myReports}
                reports={reports}
                onViewDetails={handleViewDetails}
                onCreateReport={handleCreateReport}
            />
        </CommunityLayout>
    );
};

export default ReportPageRoute;
