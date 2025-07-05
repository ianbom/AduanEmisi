import { CirclePlus, FileVideo, Image, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';

const Card = ({ children, className = '' }) => (
    <div className={`rounded-lg border bg-white shadow-sm ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ children }) => <div className="p-6 pb-4">{children}</div>;

const CardTitle = ({ children, className = '' }) => (
    <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardContent = ({ children }) => (
    <div className="p-6 pt-0">{children}</div>
);

const Textarea = ({ className = '', ...props }) => (
    <textarea
        className={`w-full resize-none rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${className}`}
        {...props}
    />
);

const Button = ({
    children,
    variant = 'default',
    size = 'md',
    className = '',
    disabled = false,
    onClick,
    ...props
}) => {
    const baseClasses =
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
        default:
            'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
        outline:
            'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-emerald-500',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    return (
        <button
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

const CommentUploadCard = () => {
    const [comment, setComment] = useState('');
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);

        const processedFiles = selectedFiles.map((file) => {
            const fileData = {
                id: Date.now() + Math.random(),
                file: file,
                name: file.name,
                size: file.size,
                type: file.type,
                preview: null,
            };

        
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setFiles((prevFiles) =>
                        prevFiles.map((f) =>
                            f.id === fileData.id
                                ? { ...f, preview: e.target.result }
                                : f,
                        ),
                    );
                };
                reader.readAsDataURL(file);
            }

            return fileData;
        });

        setFiles((prevFiles) => [...prevFiles, ...processedFiles]);

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeFile = (fileId) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleSubmit = () => {
        if (!comment.trim() && files.length === 0) {
            alert('Silakan tambahkan komentar atau unggah file');
            return;
        }


        console.log('Comment:', comment);
        console.log('Files:', files);


        setComment('');
        setFiles([]);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <CirclePlus size={20} className="mr-2" />
                    Tambah Komentar
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-6">
                    <Textarea
                        placeholder="Tambah komentar Anda..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        className="mb-3"
                    />

                    {/* File Preview Section */}
                    {files.length > 0 && (
                        <div className="mb-4 space-y-3">
                            {files.map((file) => (
                                <div key={file.id} className="relative">
                                    {file.type.startsWith('image/') ? (

                                        <div className="relative inline-block max-w-full">
                                            {file.preview ? (
                                                <img
                                                    src={file.preview}
                                                    alt={file.name}
                                                    className="object-contain h-auto max-w-full border border-gray-200 rounded-lg max-h-48"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center w-48 h-32 bg-gray-100 border border-gray-200 rounded-lg">
                                                    <Image
                                                        size={24}
                                                        className="text-gray-400"
                                                    />
                                                </div>
                                            )}
                                            <button
                                                onClick={() =>
                                                    removeFile(file.id)
                                                }
                                                className="absolute p-1 text-white bg-red-500 rounded-full -right-2 -top-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ) : file.type.startsWith('video/') ? (

                                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                                            <div className="flex items-center space-x-3">
                                                <div className="flex-shrink-0">
                                                    <FileVideo
                                                        size={24}
                                                        className="text-blue-500"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {formatFileSize(
                                                            file.size,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    removeFile(file.id)
                                                }
                                                className="flex-shrink-0 p-1 text-red-500 rounded hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (

                                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                                            <div className="flex items-center space-x-3">
                                                <div className="flex-shrink-0">
                                                    <div className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded">
                                                        <span className="text-xs font-medium text-gray-600">
                                                            {file.name
                                                                .split('.')
                                                                .pop()
                                                                ?.toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {formatFileSize(
                                                            file.size,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    removeFile(file.id)
                                                }
                                                className="flex-shrink-0 p-1 text-red-500 rounded hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            multiple
                            accept="image/*,video/*"
                            className="hidden"
                        />
                        <Button
                            variant="outline"
                            size="lg"
                            className="flex items-center justify-center w-full gap-2 sm:w-auto"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Upload size={16} />
                            Unggah Foto/Video
                        </Button>
                        <Button
                            size="lg"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
                            onClick={handleSubmit}
                            disabled={!comment.trim() && files.length === 0}
                        >
                            Kirim
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CommentUploadCard;
