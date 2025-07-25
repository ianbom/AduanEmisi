import CitizenLayout from '@/components/layouts/CitizenLayout';
import ReportsPage from '@/components/report/ReportsPage';
import { PageProps } from '@/types';
import { Report } from '@/types/report';
import { Province } from '@/types/area/interface';
import { router as Inertia, usePage } from '@inertiajs/react';

interface ReportsPageRouteProps {
    reports: {
        data: Report[];
    };
    provinces : {
        provinces: Province[];
    }

    myReports: boolean;
    [key: string]: unknown;
}
const ReportsPageRoute = ({ myReports }: { myReports: boolean }) => {
    const { props } = usePage<PageProps<ReportsPageRouteProps>>();
    const reports = props.reports?.data || [];
    const provinces = props.provinces;
    const handleViewDetails = (id: number) => {
        Inertia.visit(route('report.show', { id }));
    };
    const handleCreateReport = () => {
        Inertia.visit(route('create.report'));
    };

    console.log('provinsi',provinces);
    return (
        <CitizenLayout currentPage={myReports ? 'my-report' : 'report'}>
            <ReportsPage
                myReports={myReports}
                reports={reports}
                provinces={provinces}
                onViewDetails={handleViewDetails}
                onCreateReport={handleCreateReport}
            />
        </CitizenLayout>
    );
};

export default ReportsPageRoute;
