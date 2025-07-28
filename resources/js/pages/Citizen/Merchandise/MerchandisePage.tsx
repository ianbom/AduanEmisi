import CitizenLayout from '@/components/layouts/CitizenLayout';
import MerchandisePage from '@/components/merchandise/MerchandisePage';
import { PageProps } from '@/types';
import { router as Inertia, usePage } from '@inertiajs/react';

interface Merchandise {
    id: number;
    name: string;
    description: string;
    image_url: string;
    points_cost: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface MerchandisePageRouteProps {
    merchandise: Merchandise[];
    [key: string]: unknown;
}

const MerchandisePageRoute = () => {
    const { props } = usePage<PageProps<MerchandisePageRouteProps>>();
    const merchandise = props.merchandise || [];
    const userPoints = props.userPoints
    const handleViewDetails = (merchandiseId: number) => {
        Inertia.visit(route('merchandise.show', { id: merchandiseId }));
    };

    console.log('point', userPoints);

    // const handlePurchase = (merchandiseId: number) => {

    //     Inertia.post(route('merchandise.purchase', { id: merchandiseId }));
    // };

    return (
        <CitizenLayout currentPage="merchandise">
            <MerchandisePage
                merchandise={merchandise}
                onViewDetails={handleViewDetails}

                userPoints={userPoints}
            />
        </CitizenLayout>
    );
};

export default MerchandisePageRoute;
