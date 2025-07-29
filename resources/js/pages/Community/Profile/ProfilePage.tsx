import CommunityProfilePage from '@/components/community/CommunityProfilePage';
import CommunityLayout from '@/components/layouts/CommunityLayout';
import { PageProps } from '@/types';
import { Report } from '@/types/report';
import { Mission } from '@/types/report/mission';
import { User } from '@/types/user/interface';
import { usePage } from '@inertiajs/react';

interface ProfilePageRouteProps {
    myReports: Report[];
    myReportsCount: number;
    myMissions: Mission[];
    myMissionCounts: number;
    [key: string]: unknown;
}
const ProfilePageRoute = () => {
    const { props } = usePage<PageProps<ProfilePageRouteProps>>();
    const user = props.auth?.user;
    const myReports = props.myReports;
    const myReportsCount = props.myReportsCount;
    const myMissions = props.myMissions;
    const myMissionCounts = props.myMissionCounts;
    return (
        <CommunityLayout currentPage="community/profile">
            <CommunityProfilePage
                user={user as User}
                myReports={myReports}
                myReportsCount={myReportsCount}
                myMissions={myMissions}
                myMissionCounts={myMissionCounts}
            />
        </CommunityLayout>
    );
};
export default ProfilePageRoute;
