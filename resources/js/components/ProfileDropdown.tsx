'use client';
import { User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface MenuItem {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    className?: string;
}

interface ProfileDropdownProps {
    user: {
        name: string;
        email: string;
    };
    menuItems: MenuItem[];
}

export default function ProfileDropdown({
    user,
    menuItems,
}: ProfileDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white transition-shadow hover:shadow-lg"
            >
                <User size={20} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-14 z-50 w-52 rounded-lg border bg-white shadow-lg">
                    <div className="border-b p-4">
                        <p className="text-sm font-medium text-gray-800">
                            {user?.name}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <div className="flex flex-col p-2">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={item.onClick}
                                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50 ${item.className}`}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
