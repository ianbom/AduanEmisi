export const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed':
            return 'bg-emerald-100 text-emerald-700';
        case 'on-progress':
            return 'bg-amber-100 text-amber-700';
        case 'verified':
            return 'bg-blue-100 text-blue-700';
        case 'rejected':
            return 'bg-rose-100 text-rose-700';
        case 'under-authority':
            return 'bg-lime-100 text-lime-700';
        default:
            return 'bg-gray-100 text-slate-700';
    }
};
