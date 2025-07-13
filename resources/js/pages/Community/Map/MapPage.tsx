import CommunityLayout from '@/components/layouts/CitizenLayout';
import MapPage from '@/components/map/MapPage';
import { PageProps } from '@/types';
import { City, District, Province } from '@/types/area/interface';
import { Report } from '@/types/report';
import { usePage } from '@inertiajs/react';
interface MapPageRouteProps {
    reports: Report[];
    provinces: Province[];
    cities: City[];
    districts: District[];
    [key: string]: unknown;
}
const MapPageRoute = () => {
    const { props } = usePage<PageProps<MapPageRouteProps>>();
    const reports = props.reports || [];
    const provinces = props.provinces || [];
    const cities = props.cities || [];
    const districts = props.districts || [];
    const handleDetailReport = (id: number | string) => {
        window.location.href = `/report/${id}`;
    };
    return (
        <CommunityLayout currentPage="community.map">
            <MapPage
                reports={reports}
                provinces={provinces}
                cities={cities}
                districts={districts}
                onViewReport={handleDetailReport}
            />
        </CommunityLayout>
    );
};

export default MapPageRoute;
