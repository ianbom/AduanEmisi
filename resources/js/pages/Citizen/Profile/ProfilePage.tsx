import CitizenProfilePage from '@/components/citizen/profile/CitizenProfilePage';
import CitizenLayout from '@/components/layouts/CitizenLayout';
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
        <CitizenLayout currentPage="profile">
            <CitizenProfilePage
                user={user as User}
                myReports={myReports}
                myReportsCount={myReportsCount}
            />
        </CitizenLayout>
    );
};
export default ProfilePageRoute;
