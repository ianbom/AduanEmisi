import { StatItem } from '@/types/homepage/statItem';
import StatCounter from './StatCounter';

const stats: StatItem[] = [
    { label: 'Laporan Aktif', value: '247', color: 'text-blue-600' },
    { label: 'Misi Selesai', value: '92', color: 'text-green-600' },
    { label: 'Volunteer Aktif', value: '345', color: 'text-purple-600' },
    { label: 'Komunitas', value: '27', color: 'text-orange-600' },
];

const StatSection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-green-100 to-white py-20">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
            <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-blue-100/20 blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-100/20 blur-3xl"></div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <StatCounter key={index} stat={stat} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatSection;
