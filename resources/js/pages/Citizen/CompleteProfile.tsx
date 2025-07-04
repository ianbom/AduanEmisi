import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

// Types
interface Province {
    id: number;
    name: string;
}

interface City {
    id: number;
    name: string;
    province_id: number;
}

interface Subdistrict {
    id: number;
    name: string;
    city_id: number;
}

interface PageProps {
    provinces: Province[];
    cities: City[];
    subdistricts: Subdistrict[];
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
}

interface FormData {
    province_id: string;
    city_id: string;
    subdistrict_id: string;
    address: string;
    phone: string;
    name: string;
    email: string;
}

export default function CompleteProfile() {
    const { provinces, cities, subdistricts, auth } =
        usePage<PageProps>().props;
    const [filteredCities, setFilteredCities] = useState<City[]>([]);
    const [filteredSubdistricts, setFilteredSubdistricts] = useState<
        Subdistrict[]
    >([]);

    const { data, setData, post, processing, errors, reset } =
        useForm<FormData>({
            province_id: '',
            city_id: '',
            subdistrict_id: '',
            address: '',
            phone: '',
            name: auth.user.name || '',
            email: auth.user.email || '',
        });

    // Filter cities based on selected province
    useEffect(() => {
        if (data.province_id) {
            const filtered = cities.filter(
                (city) => city.province_id === parseInt(data.province_id),
            );
            setFilteredCities(filtered);
            setData((prev) => ({ ...prev, city_id: '', subdistrict_id: '' }));
        } else {
            setFilteredCities([]);
        }
    }, [data.province_id, cities]);

    // Filter subdistricts based on selected city
    useEffect(() => {
        if (data.city_id) {
            const filtered = subdistricts.filter(
                (subdistrict) => subdistrict.city_id === parseInt(data.city_id),
            );
            setFilteredSubdistricts(filtered);
            setData((prev) => ({ ...prev, subdistrict_id: '' }));
        } else {
            setFilteredSubdistricts([]);
        }
    }, [data.city_id, subdistricts]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('profile.complete'));
    };

    return (
        <>
            <Head title="Lengkapi Profile" />

            <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <div className="overflow-hidden bg-white shadow-lg rounded-xl">
                        {/* Header */}
                        <div className="px-6 py-8 bg-gradient-to-r from-blue-600 to-indigo-600">
                            <div className="text-center">
                                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-white rounded-full">
                                    <svg
                                        className="w-10 h-10 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <h1 className="mb-2 text-3xl font-bold text-white">
                                    Lengkapi Profile Anda
                                </h1>
                                <p className="text-blue-100">
                                    Silahkan lengkapi informasi profile Anda
                                    untuk melanjutkan
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="px-6 py-8 space-y-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h2 className="pb-2 text-lg font-semibold text-gray-900 border-b border-gray-200">
                                    Informasi Pribadi
                                </h2>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block mb-1 text-sm font-medium text-gray-700"
                                        >
                                            Nama Lengkap *
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            className={`w-full rounded-lg border px-3 py-2 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                errors.name
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                            }`}
                                            placeholder="Masukkan nama lengkap"
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-1 text-sm font-medium text-gray-700"
                                        >
                                            Email *
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            className={`w-full rounded-lg border px-3 py-2 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                errors.email
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                            }`}
                                            placeholder="Masukkan email"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block mb-1 text-sm font-medium text-gray-700"
                                    >
                                        Nomor Telepon *
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData('phone', e.target.value)
                                        }
                                        className={`w-full rounded-lg border px-3 py-2 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.phone
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        placeholder="Contoh: 08123456789"
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Address Information */}
                            <div className="space-y-4">
                                <h2 className="pb-2 text-lg font-semibold text-gray-900 border-b border-gray-200">
                                    Informasi Alamat
                                </h2>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div>
                                        <label
                                            htmlFor="province_id"
                                            className="block mb-1 text-sm font-medium text-gray-700"
                                        >
                                            Provinsi *
                                        </label>
                                        {/* <select
                                            id="province_id"
                                            value={data.province_id}
                                            onChange={(e) => setData('province_id', e.target.value)}
                                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                                errors.province_id ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        >
                                            <option value="">Pilih Provinsi</option>
                                            {provinces.map((province) => (
                                                <option key={province.id} value={province.id}>
                                                    {province.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.province_id && (
                                            <p className="mt-1 text-sm text-red-600">{errors.province_id}</p>
                                        )} */}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="city_id"
                                            className="block mb-1 text-sm font-medium text-gray-700"
                                        >
                                            Kota/Kabupaten *
                                        </label>
                                        <select
                                            id="city_id"
                                            value={data.city_id}
                                            onChange={(e) =>
                                                setData(
                                                    'city_id',
                                                    e.target.value,
                                                )
                                            }
                                            disabled={!data.province_id}
                                            className={`w-full rounded-lg border px-3 py-2 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 ${
                                                errors.city_id
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                            }`}
                                        >
                                            <option value="">
                                                Pilih Kota/Kabupaten
                                            </option>
                                            {filteredCities.map((city) => (
                                                <option
                                                    key={city.id}
                                                    value={city.id}
                                                >
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.city_id && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.city_id}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="subdistrict_id"
                                            className="block mb-1 text-sm font-medium text-gray-700"
                                        >
                                            Kecamatan *
                                        </label>
                                        <select
                                            id="subdistrict_id"
                                            value={data.subdistrict_id}
                                            onChange={(e) =>
                                                setData(
                                                    'subdistrict_id',
                                                    e.target.value,
                                                )
                                            }
                                            disabled={!data.city_id}
                                            className={`w-full rounded-lg border px-3 py-2 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 ${
                                                errors.subdistrict_id
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                            }`}
                                        >
                                            <option value="">
                                                Pilih Kecamatan
                                            </option>
                                            {filteredSubdistricts.map(
                                                (subdistrict) => (
                                                    <option
                                                        key={subdistrict.id}
                                                        value={subdistrict.id}
                                                    >
                                                        {subdistrict.name}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                        {errors.subdistrict_id && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.subdistrict_id}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="address"
                                        className="block mb-1 text-sm font-medium text-gray-700"
                                    >
                                        Alamat Lengkap *
                                    </label>
                                    <textarea
                                        id="address"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData('address', e.target.value)
                                        }
                                        rows={3}
                                        className={`w-full resize-none rounded-lg border px-3 py-2 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.address
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        placeholder="Masukkan alamat lengkap (nama jalan, RT/RW, dll)"
                                    />
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full px-4 py-3 font-semibold text-white transition-all duration-200 transform rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center">
                                            <svg
                                                className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Menyimpan...
                                        </span>
                                    ) : (
                                        'Simpan Profile'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
