import CommunityProfilePage from '@/components/community/CommunityProfilePage';
import CommunityLayout from '@/components/layouts/CitizenLayout';
import { PageProps } from '@/types';
import { Report } from '@/types/report';
import { User } from '@/types/user/interface';
import { usePage } from '@inertiajs/react';

interface ProfilePageRouteProps {
    myReports: Report[];
    myReportsCount: number;
    [key: string]: unknown;
}
const ProfilePageRoute = () => {
    const { props } = usePage<PageProps<ProfilePageRouteProps>>();
    const user = props.auth?.user;
    const myReports = props.myReports;
    const myReportsCount = props.myReportsCount;

    return (
        <CommunityLayout currentPage="community/profile">
            <CommunityProfilePage
                user={user as User}
                myReports={myReports}
                myReportsCount={myReportsCount}
            />
        </CommunityLayout>
    );
};
export default ProfilePageRoute;
