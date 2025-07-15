import CitizenLayout from '@/components/layouts/CitizenLayout';
import ReportDetailPage from '@/components/report/ReportDetailPage';
import { PageProps } from '@/types';
import { Report } from '@/types/report';
import { User } from '@/types/user/interface';
import { router as Inertia, usePage } from '@inertiajs/react';
interface ReportDetailPageRouteProps {
    report: Report;
    myParticipation:
        | (User & {
              pivot: {
                  is_leader: boolean;
                  participation_status:
                      | 'pending'
                      | 'confirmed'
                      | 'cancelled'
                      | 'attended';
                  certificate_url: string | null;
                  awarded_at: string | null;
              };
          })
        | null;
    confirmedLeader: User | null;
    [key: string]: unknown;
}
const ReportDetailPageRoute = () => {
    const { props } = usePage<PageProps<ReportDetailPageRouteProps>>();
    const report = props.report;
    const myParticipation = props.myParticipation;
    const confirmedLeader = props.confirmedLeader;

    const handleBack = () => {
        Inertia.visit(route('report'));
    };
    return (
        <CitizenLayout currentPage="report/{id}">
            <ReportDetailPage
                report={report}
                onBack={handleBack}
                confirmedLeader={confirmedLeader}
                myParticipation={myParticipation}
            />
        </CitizenLayout>
    );
};

export default ReportDetailPageRoute;
