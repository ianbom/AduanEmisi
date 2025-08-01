export const getStatusClass = (status: string) => {
    switch (status) {
        case 'paid':
            return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200';
        case 'expired':
            return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
        case 'cancelled':
            return 'bg-red-100 text-red-700 hover:bg-red-200';
        default:
            return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
};
