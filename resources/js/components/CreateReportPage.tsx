import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Camera, MapPin, Upload, X } from 'lucide-react';
import { useState } from 'react';

interface CreateReportPageProps {
    onBack: () => void;
}

const CreateReportPage = ({ onBack }: CreateReportPageProps) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        address: '',
        province: '',
        city: '',
        district: '',
    });
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileUpload = (files: FileList | null) => {
        if (files) {
            const newFiles = Array.from(files);
            setUploadedFiles((prev) => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Submitting report:', formData, uploadedFiles);
    };

    return (
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="mb-4 text-gray-600 hover:text-emerald-600"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Kembali ke Laporan
                </Button>

                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    Buat Laporan Baru
                </h1>
                <p className="text-gray-600">
                    Laporkan masalah lingkungan di sekitar Anda
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Dasar</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Judul Laporan *</Label>
                            <Input
                                id="title"
                                placeholder="Masukkan judul laporan yang jelas dan deskriptif"
                                value={formData.title}
                                onChange={(e) =>
                                    handleInputChange('title', e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">
                                Deskripsi Masalah Detail *
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Jelaskan masalah lingkungan yang Anda temukan secara detail..."
                                rows={5}
                                value={formData.description}
                                onChange={(e) =>
                                    handleInputChange(
                                        'description',
                                        e.target.value,
                                    )
                                }
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Kategori Isu *</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) =>
                                    handleInputChange('category', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih kategori masalah" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pencemaran-air">
                                        Pencemaran Air
                                    </SelectItem>
                                    <SelectItem value="pencemaran-laut">
                                        Pencemaran Laut
                                    </SelectItem>
                                    <SelectItem value="kerusakan-hutan">
                                        Kerusakan Hutan
                                    </SelectItem>
                                    <SelectItem value="sampah-plastik">
                                        Sampah Plastik
                                    </SelectItem>
                                    <SelectItem value="pencemaran-udara">
                                        Pencemaran Udara
                                    </SelectItem>
                                    <SelectItem value="lainnya">
                                        Lainnya
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Location */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <MapPin
                                size={20}
                                className="mr-2 text-emerald-600"
                            />
                            Lokasi Masalah
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Interactive Map Placeholder */}
                        <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100">
                            <div className="text-center">
                                <MapPin
                                    size={48}
                                    className="mx-auto mb-2 text-gray-400"
                                />
                                <p className="text-gray-500">Peta Interaktif</p>
                                <p className="text-sm text-gray-400">
                                    Klik untuk menandai lokasi
                                </p>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                        >
                            <MapPin size={16} className="mr-2" />
                            Gunakan Lokasi Saya Sekarang (GPS)
                        </Button>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="address">
                                    Alamat Lengkap *
                                </Label>
                                <Textarea
                                    id="address"
                                    placeholder="Masukkan alamat lengkap lokasi masalah"
                                    rows={3}
                                    value={formData.address}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'address',
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label>Provinsi *</Label>
                                    <Select
                                        value={formData.province}
                                        onValueChange={(value) =>
                                            handleInputChange('province', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih provinsi" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bali">
                                                Bali
                                            </SelectItem>
                                            <SelectItem value="jabar">
                                                Jawa Barat
                                            </SelectItem>
                                            <SelectItem value="jakarta">
                                                DKI Jakarta
                                            </SelectItem>
                                            <SelectItem value="jateng">
                                                Jawa Tengah
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Kota/Kabupaten *</Label>
                                    <Select
                                        value={formData.city}
                                        onValueChange={(value) =>
                                            handleInputChange('city', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kota" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bandung">
                                                Bandung
                                            </SelectItem>
                                            <SelectItem value="bogor">
                                                Bogor
                                            </SelectItem>
                                            <SelectItem value="jakarta-pusat">
                                                Jakarta Pusat
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Kecamatan *</Label>
                                    <Select
                                        value={formData.district}
                                        onValueChange={(value) =>
                                            handleInputChange('district', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kecamatan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="kuta">
                                                Kuta
                                            </SelectItem>
                                            <SelectItem value="denpasar">
                                                Denpasar
                                            </SelectItem>
                                            <SelectItem value="ubud">
                                                Ubud
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Media Upload */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Camera
                                size={20}
                                className="mr-2 text-emerald-600"
                            />
                            Unggah Foto/Video
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-emerald-400">
                            <input
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                onChange={(e) =>
                                    handleFileUpload(e.target.files)
                                }
                                className="hidden"
                                id="file-upload"
                            />
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer"
                            >
                                <Upload
                                    size={48}
                                    className="mx-auto mb-4 text-gray-400"
                                />
                                <p className="mb-2 text-lg font-medium text-gray-700">
                                    Klik untuk mengunggah atau seret file ke
                                    sini
                                </p>
                                <p className="text-sm text-gray-500">
                                    PNG, JPG, GIF, MP4 hingga 10MB
                                </p>
                            </label>
                        </div>

                        {/* File Previews */}
                        {uploadedFiles.length > 0 && (
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                {uploadedFiles.map((file, index) => (
                                    <div key={index} className="group relative">
                                        <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100">
                                            {file.type.startsWith('image/') ? (
                                                <img
                                                    src={URL.createObjectURL(
                                                        file,
                                                    )}
                                                    alt={file.name}
                                                    className="h-full w-full rounded-lg object-cover"
                                                />
                                            ) : (
                                                <Camera
                                                    size={24}
                                                    className="text-gray-400"
                                                />
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <X size={14} />
                                        </button>
                                        <p className="mt-1 truncate text-xs text-gray-500">
                                            {file.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col justify-end gap-4 sm:flex-row">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onBack}
                        className="sm:w-auto"
                    >
                        Batal
                    </Button>
                    <Button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
                        size="lg"
                    >
                        Kirim Laporan
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateReportPage;
