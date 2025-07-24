import CitizenLayout from '@/components/layouts/CitizenLayout';
import ReportDetailPage from '@/components/report/ReportDetailPage';
import { PageProps } from '@/types';
import { Report } from '@/types/report';
import { Comment } from '@/types/report/comment';
import { User } from '@/types/user/interface';
import { router as Inertia, usePage } from '@inertiajs/react';
interface ReportDetailPageRouteProps {
    report: Report;
    your_vote: 'upvote' | 'dislike' | null;

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
    confirmedLeader: User[] | null;
    comments: Comment[];
    volunteers: User[];
    volunteerCounts: number;
    [key: string]: unknown;
}
const ReportDetailPageRoute = () => {
    const { props } = usePage<PageProps<ReportDetailPageRouteProps>>();
    const user = props.auth?.user ?? null;
    const report = props.report;
    const myParticipation = props.myParticipation;
    const confirmedLeader = props.confirmedLeader;
    const comments = props.comments;
    const volunteers = props.volunteers;
    const volunteerCounts = props.volunteerCounts;
    const your_vote = props.your_vote;

    const handleBack = () => {
        Inertia.visit(route('report'));
    };
    return (
        <CitizenLayout currentPage="report/{id}">
            <ReportDetailPage
                report={report}
                user={user}
                onBack={handleBack}
                your_vote={your_vote}
                comments={comments}
                confirmedLeader={confirmedLeader ?? []}
                myParticipation={myParticipation}
                volunteers={volunteers}
                volunteerCounts={volunteerCounts}
            />
        </CitizenLayout>
    );
};

export default ReportDetailPageRoute;
