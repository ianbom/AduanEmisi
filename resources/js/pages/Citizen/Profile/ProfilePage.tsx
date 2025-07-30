import CitizenProfilePage from '@/components/citizen/profile/CitizenProfilePage';
import CitizenLayout from '@/components/layouts/CitizenLayout';
import { PageProps } from '@/types';
import { Donation } from '@/types/donation/interface';
import { Point } from '@/types/reedem/point';
import { Report } from '@/types/report';
import { Mission } from '@/types/report/mission';
import { User } from '@/types/user/interface';
import { usePage } from '@inertiajs/react';
interface ProfilePageRouteProps {
    myReports: Report[];
    myReportsCount: number;
    myMissions: Mission[];
    myMissionCounts: number;
    myDonations: Donation[];
    myPoints: Point[];
    [key: string]: unknown;
}
const ProfilePageRoute = () => {
    const { props } = usePage<PageProps<ProfilePageRouteProps>>();
    const user = props.auth?.user ?? null;
    const myReports = props.myReports;
    const myReportsCount = props.myReportsCount;
    const myMissions = props.myMissions;
    const myMissionCounts = props.myMissionCounts;
    const myDonations = props.myDonations;
    const myPoints = props.myPoints;
    return (
        <CitizenLayout currentPage="profile">
            <CitizenProfilePage
                user={user as User}
                myPoints={myPoints}
                myReports={myReports}
                myReportsCount={myReportsCount}
                myMissions={myMissions}
                myMissionCounts={myMissionCounts}
                myDonations={myDonations}
            />
        </CitizenLayout>
    );
};
export default ProfilePageRoute;
