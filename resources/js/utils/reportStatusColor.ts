export const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed':
            return 'bg-green-100 text-green-700';
        case 'on-progress':
            return 'bg-yellow-100 text-yellow-700';
        case 'verified':
            return 'bg-sky-100 text-sky-700';
        case 'rejected':
            return 'bg-red-100 text-red-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
};
