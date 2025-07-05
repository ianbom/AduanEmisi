'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

interface AttendanceFormModalProps {
    open: boolean;
    onClose: () => void;
    teamLeader: string;
    members: { id: number; name: string }[];
}

export default function AttendanceFormModal({
    open,
    onClose,
    teamLeader,
    members,
}: AttendanceFormModalProps) {
    const [attendance, setAttendance] = useState<{ [id: number]: boolean }>({});

    const handleCheckboxChange = (id: number) => {
        setAttendance((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const totalPresent = Object.values(attendance).filter(Boolean).length;

    const handleSave = () => {
        // Contoh logika simpan
        console.log('Hadir:', attendance);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Presensi Kehadiran Anggota</DialogTitle>
                </DialogHeader>

                {/* Ketua */}
                <div className="mb-4 space-y-1">
                    <Label htmlFor="leader">Ketua Tim</Label>
                    <Input
                        id="leader"
                        value={teamLeader}
                        disabled
                        className="text-gray-900 bg-gray-100 border-gray-400"
                    />
                </div>

                {/* Anggota */}
                <ScrollArea className="pr-2 mb-4 h-60">
                    <div className="space-y-4">
                        {members.map((member) => (
                            <div
                                key={member.id}
                                className="flex items-center gap-2"
                            >
                                <Checkbox
                                    id={`member-${member.id}`}
                                    checked={attendance[member.id] || false}
                                    onCheckedChange={() =>
                                        handleCheckboxChange(member.id)
                                    }
                                />
                                <Label htmlFor={`member-${member.id}`}>
                                    {member.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* Info Presensi */}
                <div className="mb-4 text-sm text-gray-600">
                    Jumlah Anggota Volunteer:{' '}
                    <span className="font-semibold">{members.length}</span>
                    <br />
                    Jumlah Anggota Hadir:{' '}
                    <span className="font-semibold">{totalPresent}</span>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Batal
                    </Button>
                    <Button
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={handleSave}
                    >
                        Simpan
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
