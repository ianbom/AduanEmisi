'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Province } from '@/types/area/interface';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { router as Inertia } from '@inertiajs/react';
import axios from 'axios';
import {
    ArrowLeft,
    Camera,
    FileVideo,
    Info,
    MapPin,
    Upload,
    X,
} from 'lucide-react';

import { useState } from 'react';

interface PageProps {
    provinces: Province[];
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            phone: string | null;
            province_id: number | null;
            city_id: number | null;
            district_id: number | null;
            address: string | null;
        };
    };
    onBack: () => void;
}

const EditProfilePage = ({ provinces, onBack, auth }: PageProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: auth.user?.name || '',
        phone: auth.user?.phone || '',
        address: auth.user?.address || '',
        province_id: auth.user?.province_id?.toString() || '',
        city_id: auth.user?.city_id?.toString() || '',
        district_id: auth.user?.district_id?.toString() || '',
    });

    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const selectedProvince = provinces.find(
        (p) => p.id.toString() === formData.province_id,
    );
    const cities = selectedProvince?.cities ?? [];
    const selectedCity = cities.find(
        (c) => c.id.toString() === formData.city_id,
    );
    const districts = selectedCity?.districts ?? [];
    const handleInputChange = (field: string, value: string) => {
        if (field === 'province_id') {
            setFormData((prev) => ({
                ...prev,
                province_id: value,
                city_id: '',
                district_id: '',
            }));
        }
        // kalau kota berubah, kosongkan district
        else if (field === 'city_id') {
            setFormData((prev) => ({
                ...prev,
                city_id: value,
                district_id: '',
            }));
        } else {
            setFormData((prev) => ({ ...prev, [field]: value }));
        }
    };

    const handleFileUpload = (files: FileList | null) => {
        if (files) {
            const newFiles = Array.from(files).filter((file) => {
                // Validasi ukuran file (max 10MB)
                if (file.size > 10 * 1024 * 1024) {
                    alert(`File ${file.name} terlalu besar. Maksimal 10MB.`);
                    return false;
                }
                return true;
            });
            setUploadedFiles((prev) => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        const requiredFields = [
            { field: 'name', name: 'Nama Lengkap' },
            { field: 'phone', name: 'Nomor Telepon' },
            { field: 'address', name: 'Alamat' },
            { field: 'province_id', name: 'Provinsi' },
            { field: 'city_id', name: 'Kota/Kabupaten' },
            { field: 'district_id', name: 'Kecamatan' },
        ];

        for (const { field, name } of requiredFields) {
            if (!formData[field as keyof typeof formData]) {
                alert(`${name} wajib diisi.`);
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('phone', formData.phone);
        data.append('address', formData.address);
        data.append('province_id', formData.province_id);
        data.append('city_id', formData.city_id);
        data.append('district_id', formData.district_id);

        uploadedFiles.forEach((file) => {
            data.append('media[]', file);
        });

        try {
            const response = await axios.post('/reports', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Report submitted:', response.data);
            alert('Laporan berhasil dikirim!');

            // Reset form
            setFormData({
                province_id: String(auth.user.province_id ?? ''),
                city_id: String(auth.user.city_id ?? ''),
                district_id: String(auth.user.district_id ?? ''),
                address: auth.user.address ?? '',
                phone: auth.user.phone ?? '',
                name: auth.user.name ?? '',
            });

            setUploadedFiles([]);

            // Redirect ke halaman laporan
            Inertia.visit('/profile');
        } catch (error: any) {
            console.error('Error submitting report:', error);

            if (error.response) {
                const { status, data } = error.response;

                if (status === 422) {
                    // Error validasi
                    const errors = data.errors || {};
                    const errorMessages = Object.values(errors).flat();
                    alert('Validasi gagal:\n' + errorMessages.join('\n'));
                } else if (status === 401) {
                    // Belum login
                    alert('Anda belum login. Silakan login terlebih dahulu.');
                    // Redirect ke login jika perlu
                    // window.location.href = '/login';
                } else if (status === 413) {
                    // File terlalu besar
                    alert(
                        'File yang diunggah terlalu besar. Maksimal 10MB per file.',
                    );
                } else if (status === 500) {
                    // Server error
                    alert(
                        'Terjadi kesalahan pada server. Silakan coba lagi nanti.',
                    );
                } else {
                    // Error lain
                    alert(
                        'Terjadi kesalahan: ' +
                            (data.message || 'Unknown error'),
                    );
                }
            } else if (error.request) {
                // Network error
                alert(
                    'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
                );
            } else {
                // Error lainnya
                alert(
                    'Terjadi kesalahan yang tidak terduga. Silakan coba lagi.',
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="text-gray-600 hover:text-emerald-600"
                    disabled={isSubmitting}
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Kembali ke Profil Saya
                </Button>
                <div className="space-x-1 text-sm text-gray-500">
                    <span className="cursor-pointer hover:underline">Home</span>
                    <span className="cursor-pointer hover:underline">
                        / Profil
                    </span>{' '}
                    /
                    <span className="font-medium text-gray-700">
                        Edit Profil
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Bagian Atas: Info Pengguna (Kiri) dan Foto Profil (Kanan) */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Info Pengguna - Kiri */}
                    <div className="flex flex-col space-y-6">
                        <Card className="flex h-full flex-col">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Info
                                        size={20}
                                        className="mr-2 text-emerald-600"
                                    />
                                    Informasi Pengguna
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        Nama Lengkap{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="Masukkan nama lengkap Anda"
                                        value={formData.name}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">
                                        Nomor Telepon{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="phone"
                                        placeholder="Masukkan nomor telepon Anda"
                                        value={formData.phone}
                                        type="phone"
                                        onChange={(e) =>
                                            handleInputChange(
                                                'phone',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Alamat Pengguna - Kanan */}
                    <div className="flex flex-col space-y-6">
                        <Card className="flex h-full flex-col">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <MapPin
                                        size={20}
                                        className="mr-2 text-emerald-600"
                                    />
                                    Alamat Pengguna
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-6">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <div className="space-y-2">
                                            <Label>
                                                Provinsi{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </Label>
                                            <Select
                                                value={formData.province_id}
                                                onValueChange={(v) =>
                                                    handleInputChange(
                                                        'province_id',
                                                        v,
                                                    )
                                                }
                                                disabled={isSubmitting}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih provinsi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {provinces.map((prov) => (
                                                        <SelectItem
                                                            key={prov.id}
                                                            value={prov.id.toString()}
                                                        >
                                                            {prov.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>
                                                Kota/Kabupaten{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </Label>
                                            <Select
                                                value={formData.city_id}
                                                onValueChange={(v) =>
                                                    handleInputChange(
                                                        'city_id',
                                                        v,
                                                    )
                                                }
                                                disabled={
                                                    !cities.length ||
                                                    isSubmitting
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih kota" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {cities.map((city) => (
                                                        <SelectItem
                                                            key={city.id}
                                                            value={city.id.toString()}
                                                        >
                                                            {city.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>
                                                Kecamatan{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </Label>
                                            <Select
                                                value={formData.district_id}
                                                onValueChange={(v) =>
                                                    handleInputChange(
                                                        'district_id',
                                                        v,
                                                    )
                                                }
                                                disabled={
                                                    !districts.length ||
                                                    isSubmitting
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih kecamatan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {districts.map((d) => (
                                                        <SelectItem
                                                            key={d.id}
                                                            value={d.id.toString()}
                                                        >
                                                            {d.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">
                                            Alamat Lengkap{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Textarea
                                            id="address"
                                            placeholder="Masukkan detail alamat Anda"
                                            rows={3}
                                            value={formData.address}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'address',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Bagian Bawah: Alamat Pengguna - Full Width */}
                <div className="w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Camera
                                    size={20}
                                    className="mr-2 text-emerald-600"
                                />
                                Foto Profil Pengguna
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-emerald-400">
                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={(e) =>
                                        handleFileUpload(e.target.files)
                                    }
                                    className="hidden"
                                    id="file-upload"
                                    disabled={isSubmitting}
                                />
                                <label
                                    htmlFor="file-upload"
                                    className={`cursor-pointer ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
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
                                        PNG, JPG, JPEG hingga 2MB
                                    </p>
                                </label>
                            </div>

                            {/* File Previews */}
                            {uploadedFiles.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                    {uploadedFiles.map((file, index) => (
                                        <div
                                            key={index}
                                            className="group relative"
                                        >
                                            <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100">
                                                {file.type.startsWith(
                                                    'image/',
                                                ) ? (
                                                    <img
                                                        src={URL.createObjectURL(
                                                            file,
                                                        )}
                                                        alt={file.name}
                                                        className="h-full w-full rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <FileVideo
                                                        size={24}
                                                        className="text-gray-400"
                                                    />
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeFile(index)
                                                }
                                                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                                disabled={isSubmitting}
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
                </div>

                {/* Tombol Submit */}
                <div className="flex flex-col justify-start gap-4 rounded-lg border border-gray-200 bg-white p-3 shadow-sm sm:flex-row">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onBack}
                        className="sm:w-auto"
                        disabled={isSubmitting}
                    >
                        Batal
                    </Button>
                    <Button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
                        size="lg"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Mengirim...' : 'Kirim Laporan'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditProfilePage;
