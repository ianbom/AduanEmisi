import { Download, FileText, Image, Play } from 'lucide-react';
export const getTypeIcon = (type: string) => {
    switch (type) {
        case 'Video':
            return <Play size={16} className="text-red-600" />;
        case 'Artikel':
            return <FileText size={16} className="text-blue-600" />;
        case 'Modul PDF':
            return <Download size={16} className="text-green-600" />;
        default:
            return <Image size={16} className="text-gray-600" />;
    }
};

export const getTypeColor = (type: string) => {
    switch (type) {
        case 'Video':
            return 'bg-red-100 text-red-700';
        case 'Artikel':
            return 'bg-blue-100 text-blue-700';
        case 'Modul PDF':
            return 'bg-green-100 text-green-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
};
