"use client";

import {
    Car,
    Calendar,
    FileText,
    ArrowRightLeft,
    RotateCcw,
    CreditCard,
    Settings,
    Users,
    BarChart3,
    Wrench,
    History,
    UserCheck,
    Wallet,
    Fuel,
    TrendingUp,
    DollarSign,
    PieChart,
    Activity,
    Shield,
    MessageSquare,
    Bell,
    Receipt,
    Database,
    LogIn,
    Gift,
    Share2,
    BookOpen,
    HelpCircle,
    Video,
    MessageCircle,
    Home,
    ChevronRight,
    ArrowLeft,
    ChevronDown,
    Package,
    Palette,
    Zap,
    Building,
    BadgeIcon as IdCard,
    Star,
    UserCog,
    Lock,
    UserPlus,
    Truck,
    Info,
    Archive,
    FileSpreadsheet,
    CheckSquare,
    FolderOpen,
    Clipboard,
    Filter,
    Globe,
    Save,
    Folder,
    Clock,
    Map,
    Cog,
    Bookmark,
    AlertTriangle,
    EyeOff,
    Target,
    Sliders,
    Navigation,
    Compass,
    Upload,
    ThumbsUp,
    Factory,
    Store,
    Plus,
    Key,
    ShoppingCart,
    Tag,
    Trash2,
    Smartphone,
    Eye,
    MapPin,
    Phone,
    Laptop,
    Monitor,
    Unlock,
    Award,
    Download,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    useSidebar,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/lib/contexts/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Mobile nav
import { MobileTabBar } from "@/components/navigation/mobile-tab-bar";
import { MobileMenuDrawer } from "@/components/navigation/mobile-menu-drawer";

/* ===== Header kecil untuk Group ===== */
function GroupHeader({ name, color }: { name: string; color?: string }) {
    return (
        <div className="px-4 pt-4 pb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: color || "#94a3b8" }}
                />
                <span className="uppercase tracking-wider">{name}</span>
            </div>
        </div>
    );
}

/* ====== Sumber data menu (JANGAN DIUBAH) – generator isi di sini ====== */
const menuItems: any = [
    {
        id: "booking-order",
        icon: BookOpen,
        labelKey: "Booking Order" as any,
        description: "Modul Booking & Order",
        descriptionId: "Modul Booking & Order",
        count: 8,
        items: [
            {
                icon: Archive,
                labelKey: "Daftar Booking" as any,
                href: "/daftar-booking",
            },
            {
                icon: FileSpreadsheet,
                labelKey: "Form Booking Baru" as any,
                href: "/form-booking-baru",
            },
            {
                icon: CheckSquare,
                labelKey: "Approval Booking" as any,
                href: "/approval-booking",
            },
            {
                icon: FolderOpen,
                labelKey: "Booking Dari Pelanggan" as any,
                href: "/booking-dari-pelanggan",
            },
            {
                icon: Clipboard,
                labelKey: "Riwayat Booking" as any,
                href: "/riwayat-booking",
            },
            {
                icon: Calendar,
                labelKey: "Jadwal Booking Kalender" as any,
                href: "/jadwal-booking-kalender",
            },
            {
                icon: Filter,
                labelKey: "Filter Dan Pencarian" as any,
                href: "/filter-dan-pencarian",
            },
            {
                icon: Globe,
                labelKey: "Sinkronisasi Kontrak" as any,
                href: "/sinkronisasi-kontrak",
            },
        ],
        groupId: "1",
        groupName: "Operasional Harian",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "kontrak-serah-terima",
        icon: FileSpreadsheet,
        labelKey: "Kontrak Serah Terima" as any,
        description: "Modul Kontrak & Serah Terima",
        descriptionId: "Modul Kontrak & Serah Terima",
        count: 8,
        items: [
            {
                icon: Archive,
                labelKey: "Daftar Kontrak" as any,
                href: "/daftar-kontrak",
            },
            {
                icon: FileText,
                labelKey: "Buat Kontrak Baru" as any,
                href: "/buat-kontrak-baru",
            },
            {
                icon: Clipboard,
                labelKey: "Kontrak Digital Dan E Signature" as any,
                href: "/kontrak-digital-dan-e-signature",
            },
            {
                icon: CheckSquare,
                labelKey: "Checklist Serah Terima" as any,
                href: "/checklist-serah-terima",
            },
            {
                icon: Car,
                labelKey: "Upload Foto Unit" as any,
                href: "/upload-foto-unit",
            },
            {
                icon: Save,
                labelKey: "Riwayat Serah Terima" as any,
                href: "/riwayat-serah-terima",
            },
            {
                icon: FileSpreadsheet,
                labelKey: "Cetak Kontrak" as any,
                href: "/cetak-kontrak",
            },
            {
                icon: Share2,
                labelKey: "Tautkan Ke Transaksi" as any,
                href: "/tautkan-ke-transaksi",
            },
        ],
        groupId: "1",
        groupName: "Operasional Harian",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "transaksi",
        icon: Receipt,
        labelKey: "Transaksi" as any,
        description: "Modul Transaksi",
        descriptionId: "Modul Transaksi",
        count: 8,
        items: [
            {
                icon: Folder,
                labelKey: "Daftar Transaksi" as any,
                href: "/daftar-transaksi",
            },
            {
                icon: FileText,
                labelKey: "Buat Tagihan Baru" as any,
                href: "/buat-tagihan-baru",
            },
            {
                icon: Wallet,
                labelKey: "Pembayaran" as any,
                href: "/pembayaran",
            },
            {
                icon: Info,
                labelKey: "Status Pembayaran" as any,
                href: "/status-pembayaran",
            },
            {
                icon: Receipt,
                labelKey: "Riwayat Pembayaran" as any,
                href: "/riwayat-pembayaran",
            },
            {
                icon: Clock,
                labelKey: "Reminder Otomatis" as any,
                href: "/reminder-otomatis",
            },
            {
                icon: Clipboard,
                labelKey: "Export Invoice Kwitansi" as any,
                href: "/export-invoice",
            },
            {
                icon: Archive,
                labelKey: "Riwayat Refund Denda" as any,
                href: "/riwayat-refund-dan-denda",
            },
        ],
        groupId: "1",
        groupName: "Operasional Harian",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "kalender-jadwal",
        icon: Calendar,
        labelKey: "Kalender Jadwal" as any,
        description: "Modul Kalender & Jadwal",
        descriptionId: "Modul Kalender & Jadwal",
        count: 6,
        items: [
            {
                icon: Clock,
                labelKey: "Kalender Booking" as any,
                href: "/kalender-booking",
            },
            {
                icon: Car,
                labelKey: "Jadwal Mobil" as any,
                href: "/jadwal-driver",
            },
            {
                icon: Map,
                labelKey: "Jadwal Antar Jemput" as any,
                href: "/jadwal-antar-jemput",
            },
            {
                icon: Info,
                labelKey: "Notifikasi Overdue" as any,
                href: "/notifikasi-overdue",
            },
            {
                icon: Cog,
                labelKey: "Sinkronisasi Otomatis" as any,
                href: "/sinkronisasi-otomatis",
            },
            {
                icon: Calendar,
                labelKey: "Tampilan Kalender Visual" as any,
                href: "/tampilan-kalender-visual",
            },
        ],
        groupId: "1",
        groupName: "Operasional Harian",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "pelanggan",
        icon: Users,
        labelKey: "Pelanggan" as any,
        description: "Modul Pelanggan",
        descriptionId: "Modul Pelanggan",
        count: 7,
        items: [
            {
                icon: Database,
                labelKey: "Daftar Pelanggan" as any,
                href: "/daftar-pelanggan",
            },
            {
                icon: Users,
                labelKey: "Detail Profil Pelanggan" as any,
                href: "/detail-profil-pelanggan",
            },
            {
                icon: FileText,
                labelKey: "Upload Dokumen Legal" as any,
                href: "/upload-dokumen-legal",
            },
            {
                icon: Bookmark,
                labelKey: "Riwayat Sewa" as any,
                href: "/riwayat-sewa",
            },
            {
                icon: AlertTriangle,
                labelKey: "Blacklist Pelanggan" as any,
                href: "/blacklist-pelanggan",
            },
            {
                icon: EyeOff,
                labelKey: "Pelanggan Berisiko" as any,
                href: "/pelanggan-berisiko",
            },
            {
                icon: FileSpreadsheet,
                labelKey: "Verifikasi Data" as any,
                href: "/verifikasi-data",
            },
        ],
        groupId: "6",
        groupName: "Data & Armada",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "kendaraan-armada",
        icon: Car,
        labelKey: "Kendaraan Armada" as any,
        description: "Modul Kendaraan (Armada)",
        descriptionId: "Modul Kendaraan (Armada)",
        count: 9,
        items: [
            {
                icon: Folder,
                labelKey: "Daftar Kendaraan" as any,
                href: "/daftar-kendaraan",
            },
            {
                icon: Car,
                labelKey: "Detail Kendaraan" as any,
                href: "/detail-kendaraan",
            },
            {
                icon: Info,
                labelKey: "Status Armada" as any,
                href: "/status-armada",
            },
            {
                icon: Activity,
                labelKey: "Jadwal Servis Perawatan" as any,
                href: "/jadwal-servis-dan-perawatan",
            },
            {
                icon: FileSpreadsheet,
                labelKey: "Riwayat Perawatan" as any,
                href: "/riwayat-perawatan",
            },
            {
                icon: CheckSquare,
                labelKey: "Legalitas Kendaraan" as any,
                href: "/legalitas-kendaraan",
            },
            {
                icon: Clock,
                labelKey: "Reminder Kendaraan" as any,
                href: "/reminder-kendaraan",
            },
            {
                icon: Target,
                labelKey: "Qr Code Armada" as any,
                href: "/qr-code-armada",
            },
            {
                icon: Sliders,
                labelKey: "Penilaian Kpi Armada" as any,
                href: "/penilaian-dan-kpi-armada",
            },
        ],
        groupId: "6",
        groupName: "Data & Armada",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "driver",
        icon: Users,
        labelKey: "Driver" as any,
        description: "Modul Driver",
        descriptionId: "Modul Driver",
        count: 6,
        items: [
            {
                icon: Users,
                labelKey: "Data Driver" as any,
                href: "/data-driver",
            },
            {
                icon: Calendar,
                labelKey: "Jadwal Tugas" as any,
                href: "/jadwal-tugas",
            },
            {
                icon: FileSpreadsheet,
                labelKey: "Riwayat Perjalanan" as any,
                href: "/riwayat-perjalanan",
            },
            {
                icon: Wallet,
                labelKey: "Laporan Uang Saku" as any,
                href: "/laporan-uang-saku",
            },
            {
                icon: Receipt,
                labelKey: "Gaji Kompensasi" as any,
                href: "/gaji-dan-kompensasi",
            },
            {
                icon: PieChart,
                labelKey: "Kpi Driver" as any,
                href: "/kpi-driver",
            },
        ],
        groupId: "6",
        groupName: "Data & Armada",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "gps-pelacakan",
        icon: Compass,
        labelKey: "Gps Pelacakan" as any,
        description: "Modul GPS & Pelacakan",
        descriptionId: "Modul GPS & Pelacakan",
        count: 5,
        items: [
            {
                icon: Map,
                labelKey: "Peta Real Time" as any,
                href: "/peta-real-time",
            },
            {
                icon: Navigation,
                labelKey: "Rute Jejak Perjalanan" as any,
                href: "/rute-dan-jejak-perjalanan",
            },
            {
                icon: Target,
                labelKey: "Estimasi Bbm" as any,
                href: "/estimasi-bbm",
            },
            { icon: Info, labelKey: "Status Gps" as any, href: "/status-gps" },
            {
                icon: Cog,
                labelKey: "Integrasi Kontrak" as any,
                href: "/integrasi-kontrak",
            },
        ],
        groupId: "6",
        groupName: "Data & Armada",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "laporan",
        icon: FileText,
        labelKey: "Laporan" as any,
        description: "Modul Laporan",
        descriptionId: "Modul Laporan",
        count: 9,
        items: [
            {
                icon: FileText,
                labelKey: "Laporan Transaksi" as any,
                href: "/laporan-transaksi",
            },
            {
                icon: FileText,
                labelKey: "Laporan Booking Order" as any,
                href: "/laporan-booking-order",
            },
            {
                icon: FileText,
                labelKey: "Laporan Pelanggan" as any,
                href: "/laporan-pelanggan",
            },
            {
                icon: FileText,
                labelKey: "Laporan Armada" as any,
                href: "/laporan-armada",
            },
            {
                icon: FileText,
                labelKey: "Laporan Driver" as any,
                href: "/laporan-driver",
            },
            {
                icon: FileText,
                labelKey: "Laporan Keuangan Kas" as any,
                href: "/laporan-keuangan-kas",
            },
            {
                icon: FileText,
                labelKey: "Laporan Harga Paket" as any,
                href: "/laporan-harga-paket",
            },
            {
                icon: FileText,
                labelKey: "Laporan Laba Rugi" as any,
                href: "/laporan-laba-rugi",
            },
            {
                icon: FileText,
                labelKey: "Export Print Center" as any,
                href: "/export-print-center",
            },
        ],
        groupId: "10",
        groupName: "Analitik & Keuangan",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "keuangan-kas",
        icon: DollarSign,
        labelKey: "Keuangan Kas" as any,
        description: "Modul Keuangan & Kas",
        descriptionId: "Modul Keuangan & Kas",
        count: 30,
        items: [
            {
                icon: FileText,
                labelKey: "Pengeluaran Harian" as any,
                href: "/pengeluaran-harian",
            },
            {
                icon: Receipt,
                labelKey: "Pengeluaran Mingguanbulanan" as any,
                href: "/pengeluaran-mingguan-bulanan",
            },
            {
                icon: CreditCard,
                labelKey: "Kategori Biaya" as any,
                href: "/kategori-biaya",
            },
            {
                icon: Upload,
                labelKey: "Upload Bukti Bayar" as any,
                href: "/upload-bukti-bayar",
            },
            {
                icon: DollarSign,
                labelKey: "Pengeluaran Operasional" as any,
                href: "/pengeluaran-operasional",
            },
            {
                icon: FileText,
                labelKey: "Input Uang Saku" as any,
                href: "/input-uang-saku",
            },
            {
                icon: CheckSquare,
                labelKey: "Riwayat Penggunaan" as any,
                href: "/riwayat-penggunaan",
            },
            {
                icon: Receipt,
                labelKey: "Sisa Saldo" as any,
                href: "/sisa-saldo",
            },
            {
                icon: Wallet,
                labelKey: "Uang Saku Driver" as any,
                href: "/uang-saku-driver",
            },
            {
                icon: Bookmark,
                labelKey: "Input Kasbon" as any,
                href: "/input-kasbon",
            },
            {
                icon: TrendingUp,
                labelKey: "Riwayat Pelunasan" as any,
                href: "/riwayat-pelunasan",
            },
            {
                icon: CreditCard,
                labelKey: "Persetujuan Kasbon" as any,
                href: "/persetujuan-kasbon",
            },
            {
                icon: Clipboard,
                labelKey: "Kasbon Karyawan" as any,
                href: "/kasbon-karyawan",
            },
            {
                icon: FileText,
                labelKey: "Daftar Transaksi" as any,
                href: "/daftar-transaksi",
            },
            {
                icon: ThumbsUp,
                labelKey: "Approval Pengeluaran" as any,
                href: "/approval-pengeluaran",
            },
            {
                icon: Factory,
                labelKey: "Riwayat Disetujuiditolak" as any,
                href: "/riwayat-disetujui-ditolak",
            },
            {
                icon: FileSpreadsheet,
                labelKey: "History Approval" as any,
                href: "/history-approval",
            },
            {
                icon: Navigation,
                labelKey: "Input Perawatan" as any,
                href: "/input-perawatan",
            },
            {
                icon: BookOpen,
                labelKey: "Kategori Perawatan" as any,
                href: "/kategori-perawatan",
            },
            {
                icon: Calendar,
                labelKey: "Jadwal Perawatan" as any,
                href: "/jadwal-perawatan",
            },
            {
                icon: Upload,
                labelKey: "Upload Bukti" as any,
                href: "/upload-bukti",
            },
            {
                icon: Store,
                labelKey: "Relasi Ke Unit" as any,
                href: "/relasi-unit",
            },
            {
                icon: Calendar,
                labelKey: "Riwayat Perawatan" as any,
                href: "/riwayat-perawatabn",
            },
            {
                icon: FileText,
                labelKey: "Laporan Biaya" as any,
                href: "/laporan-biaya",
            },
            {
                icon: DollarSign,
                labelKey: "Pengeluaran Perawatan Kendaraan" as any,
                href: "/pengeluaran-perawatan-kendaraan",
            },
        ],
        nestedItems: [
            {
                id: "nid_99",
                icon: DollarSign,
                label: "Pengeluaran Operasional",
                items: [
                    {
                        icon: FileText,
                        label: "Pengeluaran Harian",
                        href: "/pengeluaran-harian",
                    },
                    {
                        icon: Receipt,
                        label: "Pengeluaran Mingguan/Bulanan",
                        href: "/pengeluaran-mingguan-bulanan",
                    },
                    {
                        icon: CreditCard,
                        label: "Kategori Biaya",
                        href: "/kategori-biaya",
                    },
                    {
                        icon: Upload,
                        label: "Upload Bukti Bayar",
                        href: "/upload-bukti-bayar",
                    },
                ],
            },
            {
                id: "nid_104",
                icon: Wallet,
                label: "Uang Saku Driver",
                items: [
                    {
                        icon: FileText,
                        label: "Input Uang Saku",
                        href: "/input-uang-saku",
                    },
                    {
                        icon: CheckSquare,
                        label: "Riwayat Penggunaan",
                        href: "/riwayat-penggunaan",
                    },
                    { icon: Receipt, label: "Sisa Saldo", href: "/sisa-saldo" },
                ],
            },
            {
                id: "nid_108",
                icon: Clipboard,
                label: "Kasbon Karyawan",
                items: [
                    {
                        icon: Bookmark,
                        label: "Input Kasbon",
                        href: "/input-kasbon",
                    },
                    {
                        icon: TrendingUp,
                        label: "Riwayat & Pelunasan",
                        href: "/riwayat-pelunasan",
                    },
                    {
                        icon: CreditCard,
                        label: "Persetujuan Kasbon",
                        href: "/persetujuan-kasbon",
                    },
                ],
            },
            {
                id: "nid_112",
                icon: FileSpreadsheet,
                label: "History & Approval",
                items: [
                    {
                        icon: FileText,
                        label: "Daftar Transaksi",
                        href: "/daftar-transaksi",
                    },
                    {
                        icon: ThumbsUp,
                        label: "Approval Pengeluaran",
                        href: "/approval-pengeluaran",
                    },
                    {
                        icon: Factory,
                        label: "Riwayat Disetujui/Ditolak",
                        href: "/riwayat-disetujui-ditolak",
                    },
                ],
            },
            {
                id: "nid_116",
                icon: DollarSign,
                label: "Pengeluaran Perawatan Kendaraan",
                items: [
                    {
                        icon: Navigation,
                        label: "Input Perawatan",
                        href: "/input-perawatan",
                    },
                    {
                        icon: BookOpen,
                        label: "Kategori Perawatan",
                        href: "/kategori-perawatan",
                    },
                    {
                        icon: Calendar,
                        label: "Jadwal Perawatan",
                        href: "/jadwal-perawatan",
                    },
                    {
                        icon: Upload,
                        label: "Upload Bukti",
                        href: "/upload-bukti",
                    },
                    {
                        icon: Store,
                        label: "Relasi ke Unit",
                        href: "/relasi-unit",
                    },
                    {
                        icon: Calendar,
                        label: "Riwayat Perawatan",
                        href: "/riwayat-perawatabn",
                    },
                    {
                        icon: FileText,
                        label: "Laporan Biaya",
                        href: "/laporan-biaya",
                    },
                ],
            },
        ],
        groupId: "10",
        groupName: "Analitik & Keuangan",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "harga-paket-sewa",
        icon: CreditCard,
        labelKey: "Harga Paket Sewa" as any,
        description: "Modul Harga & Paket Sewa",
        descriptionId: "Modul Harga & Paket Sewa",
        count: 24,
        items: [
            {
                icon: Package,
                labelKey: "Harga Sewa Harian" as any,
                href: "/harga-sewa-harian",
            },
            {
                icon: DollarSign,
                labelKey: "Harga Sewa Mingguanbulanan" as any,
                href: "/harga-sewa-mingguan-bulanan",
            },
            {
                icon: Car,
                labelKey: "Harga Per Tipe Kendaraan" as any,
                href: "/harga-tipe-kendaraan",
            },
            {
                icon: FileSpreadsheet,
                labelKey: "Daftar Harga Sewa" as any,
                href: "/daftar-harga-sewa",
            },
            { icon: Fuel, labelKey: "Biaya Bbm" as any, href: "/biaya-bbm" },
            {
                icon: CreditCard,
                labelKey: "Biaya Tol Parkir" as any,
                href: "/biaya-tol-parkir",
            },
            {
                icon: Home,
                labelKey: "Biaya Penginapan" as any,
                href: "/biaya-penginapan",
            },
            {
                icon: Receipt,
                labelKey: "Biaya Lainnya" as any,
                href: "/biaya-lainnya",
            },
            {
                icon: Plus,
                labelKey: "Tambahan Biaya" as any,
                href: "/tambahan-biaya",
            },
            {
                icon: Building,
                labelKey: "Paket All In" as any,
                href: "/paket-all-in",
            },
            {
                icon: Key,
                labelKey: "Paket Lepas Kunci" as any,
                href: "/paket-lepas-kunci",
            },
            {
                icon: Store,
                labelKey: "Paket Event Khusus" as any,
                href: "/paket-event-khusus",
            },
            {
                icon: Package,
                labelKey: "Paket Sewa" as any,
                href: "/paket-sewa",
            },
            {
                icon: Info,
                labelKey: "Kode Kupon Diskon" as any,
                href: "/kode-kupon-diskon",
            },
            {
                icon: Calendar,
                labelKey: "Diskon Berdasarkan Hari" as any,
                href: "/diskon-hari",
            },
            {
                icon: Bell,
                labelKey: "Promo Khusus" as any,
                href: "/promo-khusus",
            },
            {
                icon: ShoppingCart,
                labelKey: "Promo Diskon" as any,
                href: "/promo-diskon",
            },
            {
                icon: BarChart3,
                labelKey: "Kalkulator Sewa" as any,
                href: "/kalkulator-sewa",
            },
            {
                icon: DollarSign,
                labelKey: "Simulasi Harga" as any,
                href: "/simulasi-harga",
            },
        ],
        nestedItems: [
            {
                id: "nid_124",
                icon: FileSpreadsheet,
                label: "Daftar Harga Sewa",
                items: [
                    {
                        icon: Package,
                        label: "Harga Sewa Harian",
                        href: "/harga-sewa-harian",
                    },
                    {
                        icon: DollarSign,
                        label: "Harga Sewa Mingguan/Bulanan",
                        href: "/harga-sewa-mingguan-bulanan",
                    },
                    {
                        icon: Car,
                        label: "Harga per Tipe Kendaraan",
                        href: "/harga-tipe-kendaraan",
                    },
                ],
            },
            {
                id: "nid_128",
                icon: Plus,
                label: "Tambahan Biaya",
                items: [
                    { icon: Fuel, label: "Biaya BBM", href: "/biaya-bbm" },
                    {
                        icon: CreditCard,
                        label: "Biaya Tol & Parkir",
                        href: "/biaya-tol-parkir",
                    },
                    {
                        icon: Home,
                        label: "Biaya Penginapan",
                        href: "/biaya-penginapan",
                    },
                    {
                        icon: Receipt,
                        label: "Biaya Lainnya",
                        href: "/biaya-lainnya",
                    },
                ],
            },
            {
                id: "nid_133",
                icon: Package,
                label: "Paket Sewa",
                items: [
                    {
                        icon: Building,
                        label: "Paket All-In",
                        href: "/paket-all-in",
                    },
                    {
                        icon: Key,
                        label: "Paket Lepas Kunci",
                        href: "/paket-lepas-kunci",
                    },
                    {
                        icon: Store,
                        label: "Paket Event Khusus",
                        href: "/paket-event-khusus",
                    },
                ],
            },
            {
                id: "nid_137",
                icon: ShoppingCart,
                label: "Promo & Diskon",
                items: [
                    {
                        icon: Info,
                        label: "Kode Kupon Diskon",
                        href: "/kode-kupon-diskon",
                    },
                    {
                        icon: Calendar,
                        label: "Diskon Berdasarkan Hari",
                        href: "/diskon-hari",
                    },
                    {
                        icon: Bell,
                        label: "Promo Khusus",
                        href: "/promo-khusus",
                    },
                ],
            },
            {
                id: "nid_141",
                icon: DollarSign,
                label: "Simulasi Harga",
                items: [
                    {
                        icon: BarChart3,
                        label: "Kalkulator Sewa",
                        href: "/kalkulator-sewa",
                    },
                ],
            },
        ],
        groupId: "10",
        groupName: "Analitik & Keuangan",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "penawaran",
        icon: Tag,
        labelKey: "Penawaran" as any,
        description: "Modul Penawaran",
        descriptionId: "Modul Penawaran",
        count: 22,
        items: [
            {
                icon: FileText,
                labelKey: "Form Penawaran" as any,
                href: "/form-penawaran",
            },
            {
                icon: Truck,
                labelKey: "Pilih Kendaraan" as any,
                href: "/pilih-kendaraan",
            },
            {
                icon: Plus,
                labelKey: "Tambah Biaya Tambahan" as any,
                href: "/tambah-biaya-tambahan",
            },
            {
                icon: BookOpen,
                labelKey: "Buat Penawaran Baru" as any,
                href: "/buat-penawaran-baru",
            },
            {
                icon: Activity,
                labelKey: "Riwayat Penawaran" as any,
                href: "/riwayat-penawaran",
            },
            {
                icon: Info,
                labelKey: "Status Penawaran" as any,
                href: "/status-penawaran",
            },
            {
                icon: Filter,
                labelKey: "Filter Cari Penawaran" as any,
                href: "/filter-cari-penawaran",
            },
            {
                icon: FileText,
                labelKey: "Daftar Penawaran" as any,
                href: "/daftar-penawaran",
            },
            {
                icon: CheckSquare,
                labelKey: "Checklist Validasi" as any,
                href: "/checklist-validasi",
            },
            {
                icon: Shield,
                labelKey: "Auto Konversi" as any,
                href: "/auto-konversi",
            },
            {
                icon: Clipboard,
                labelKey: "Konversi Ke Booking" as any,
                href: "/konversi-ke-booking",
            },
            {
                icon: FileText,
                labelKey: "Desain Pdf Penawaran" as any,
                href: "/desain-pdf-otomatis",
            },
            {
                icon: MessageSquare,
                labelKey: "Wa Otomatis" as any,
                href: "/wa-otomatis",
            },
            {
                icon: FileSpreadsheet,
                labelKey: "Template Penawaran" as any,
                href: "/template-penawaran",
            },
            { icon: Clock, labelKey: "Log Aksi" as any, href: "/log-aksi" },
            {
                icon: Activity,
                labelKey: "Tracking Aktivitas" as any,
                href: "/tracking-activitas",
            },
            {
                icon: Activity,
                labelKey: "Histori Log" as any,
                href: "/history-log",
            },
        ],
        nestedItems: [
            {
                id: "nid_143",
                icon: BookOpen,
                label: "Buat Penawaran Baru",
                items: [
                    {
                        icon: FileText,
                        label: "Form Penawaran",
                        href: "/form-penawaran",
                    },
                    {
                        icon: Truck,
                        label: "Pilih Kendaraan",
                        href: "/pilih-kendaraan",
                    },
                    {
                        icon: Plus,
                        label: "Tambah Biaya Tambahan",
                        href: "/tambah-biaya-tambahan",
                    },
                ],
            },
            {
                id: "nid_147",
                icon: FileText,
                label: "Daftar Penawaran",
                items: [
                    {
                        icon: Activity,
                        label: "Riwayat Penawaran",
                        href: "/riwayat-penawaran",
                    },
                    {
                        icon: Info,
                        label: "Status Penawaran",
                        href: "/status-penawaran",
                    },
                    {
                        icon: Filter,
                        label: "Filter & Cari Penawaran",
                        href: "/filter-cari-penawaran",
                    },
                ],
            },
            {
                id: "nid_151",
                icon: Clipboard,
                label: "Konversi ke Booking",
                items: [
                    {
                        icon: CheckSquare,
                        label: "Checklist Validasi",
                        href: "/checklist-validasi",
                    },
                    {
                        icon: Shield,
                        label: "Auto Konversi",
                        href: "/auto-konversi",
                    },
                ],
            },
            {
                id: "nid_154",
                icon: FileSpreadsheet,
                label: "Template Penawaran",
                items: [
                    {
                        icon: FileText,
                        label: "Desain PDF Penawaran",
                        href: "/desain-pdf-otomatis",
                    },
                    {
                        icon: MessageSquare,
                        label: "WA Otomatis",
                        href: "/wa-otomatis",
                    },
                ],
            },
            {
                id: "nid_157",
                icon: Activity,
                label: "Histori & Log",
                items: [
                    { icon: Clock, label: "Log Aksi", href: "/log-aksi" },
                    {
                        icon: Activity,
                        label: "Tracking Aktivitas",
                        href: "/tracking-activitas",
                    },
                ],
            },
        ],
        groupId: "10",
        groupName: "Analitik & Keuangan",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "manajemen-pengguna-hak-akses",
        icon: Cog,
        labelKey: "Manajemen Pengguna Hak Akses" as any,
        description: "Modul Manajemen Pengguna & Hak Akses",
        descriptionId: "Modul Manajemen Pengguna & Hak Akses",
        count: 23,
        items: [
            {
                icon: Users,
                labelKey: "Daftar Role" as any,
                href: "/daftar-role",
            },
            {
                icon: Plus,
                labelKey: "Tambahedit Role" as any,
                href: "/tambah-edit-role",
            },
            {
                icon: Clipboard,
                labelKey: "Duplikat Role" as any,
                href: "/duplikat-role",
            },
            {
                icon: Users,
                labelKey: "Level Pengguna" as any,
                href: "/level-pengguna",
            },
            {
                icon: Clipboard,
                labelKey: "Otorisasi Menu" as any,
                href: "/otorisasi-menu",
            },
            { icon: Users, labelKey: "Per Role" as any, href: "/per-role" },
            { icon: Factory, labelKey: "Per Menu" as any, href: "/per-menu" },
            {
                icon: Key,
                labelKey: "Hak Akses Role" as any,
                href: "/hak-akses-role",
            },
            {
                icon: Users,
                labelKey: "Daftar Pengguna" as any,
                href: "/daftar-pengguna",
            },
            {
                icon: Plus,
                labelKey: "Tambahedit Pengguna" as any,
                href: "/tambah-edit-pengguna",
            },
            {
                icon: Trash2,
                labelKey: "Reset Password" as any,
                href: "/reset-password",
            },
            {
                icon: Cog,
                labelKey: "Manajemen Akun" as any,
                href: "/manajemen-akun",
            },
            {
                icon: Activity,
                labelKey: "Riwayat Aksi Pengguna" as any,
                href: "/riwayat-aksi-pengguna",
            },
            {
                icon: Filter,
                labelKey: "Filter Log" as any,
                href: "/filter-log",
            },
            {
                icon: Activity,
                labelKey: "Audit Log" as any,
                href: "/log-audit",
            },
            {
                icon: Lock,
                labelKey: "Batasan Login" as any,
                href: "/batasan-login",
            },
            {
                icon: Key,
                labelKey: "Autentikasi 2 Langkah" as any,
                href: "/autentifikasi-2-langkah",
            },
            {
                icon: Settings,
                labelKey: "Pengaturan Keamanan" as any,
                href: "/pengaturan-keamanan",
            },
        ],
        nestedItems: [
            {
                id: "nid_160",
                icon: Users,
                label: "Level Pengguna",
                items: [
                    { icon: Users, label: "Daftar Role", href: "/daftar-role" },
                    {
                        icon: Plus,
                        label: "Tambah/Edit Role",
                        href: "/tambah-edit-role",
                    },
                    {
                        icon: Clipboard,
                        label: "Duplikat Role",
                        href: "/duplikat-role",
                    },
                ],
            },
            {
                id: "nid_161",
                icon: Key,
                label: "Hak Akses Role",
                items: [
                    {
                        icon: Clipboard,
                        label: "Otorisasi Menu",
                        href: "/otorisasi-menu",
                    },
                    { icon: Users, label: "Per Role", href: "/per-role" },
                    { icon: Factory, label: "Per Menu", href: "/per-menu" },
                ],
            },
            {
                id: "nid_162",
                icon: Cog,
                label: "Manajemen Akun",
                items: [
                    {
                        icon: Users,
                        label: "Daftar Pengguna",
                        href: "/daftar-pengguna",
                    },
                    {
                        icon: Plus,
                        label: "Tambah/Edit Pengguna",
                        href: "/tambah-edit-pengguna",
                    },
                    {
                        icon: Trash2,
                        label: "Reset Password",
                        href: "/reset-password",
                    },
                ],
            },
            {
                id: "nid_163",
                icon: Activity,
                label: "Audit Log",
                items: [
                    {
                        icon: Activity,
                        label: "Riwayat Aksi Pengguna",
                        href: "/riwayat-aksi-pengguna",
                    },
                    { icon: Filter, label: "Filter Log", href: "/filter-log" },
                ],
            },
            {
                id: "nid_164",
                icon: Settings,
                label: "Pengaturan Keamanan",
                items: [
                    {
                        icon: Lock,
                        label: "Batasan Login",
                        href: "/batasan-login",
                    },
                    {
                        icon: Key,
                        label: "Autentikasi 2 Langkah",
                        href: "/autentifikasi-2-langkah",
                    },
                ],
            },
        ],
        groupId: "15",
        groupName: "Sistem & Pengaturan",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "setting-whatsapp-sender",
        icon: Phone,
        labelKey: "Setting Whatsapp Sender" as any,
        description: "Modul Setting Whatsapp Sender",
        descriptionId: "Modul Setting Whatsapp Sender",
        count: 18,
        items: [
            {
                icon: Smartphone,
                labelKey: "List Nomor Wa" as any,
                href: "/list-nomer-wa",
            },
            {
                icon: Plus,
                labelKey: "Tambah Sender" as any,
                href: "/tambah-sender",
            },
            {
                icon: Info,
                labelKey: "Status Koneksi" as any,
                href: "/status-koneksi",
            },
            {
                icon: DollarSign,
                labelKey: "Daftar Sender" as any,
                href: "/daftar-sender",
            },
            {
                icon: Wrench,
                labelKey: "Tipe Sender" as any,
                href: "/tipe-sender",
            },
            {
                icon: Settings,
                labelKey: "Pengaturan Default" as any,
                href: "/pengaturan-default",
            },
            {
                icon: Info,
                labelKey: "Jenis Sender" as any,
                href: "/jenis-sender",
            },
            {
                icon: Key,
                labelKey: "Token Endpoint" as any,
                href: "/token-endpoint",
            },
            {
                icon: Factory,
                labelKey: "Webhook Callback" as any,
                href: "/webhook-callback",
            },
            {
                icon: Sliders,
                labelKey: "Integrasi Api" as any,
                href: "/integrasi-api",
            },
            {
                icon: Calendar,
                labelKey: "Log Pengiriman" as any,
                href: "/log-pengiriman",
            },
            {
                icon: MapPin,
                labelKey: "Resend Manual" as any,
                href: "/resend-manual",
            },
            {
                icon: BarChart3,
                labelKey: "Statistik Wa" as any,
                href: "/statistik-wa",
            },
            {
                icon: Eye,
                labelKey: "Monitoring Log" as any,
                href: "/monitoring-log",
            },
        ],
        nestedItems: [
            {
                id: "nid_178",
                icon: DollarSign,
                label: "Daftar Sender",
                items: [
                    {
                        icon: Smartphone,
                        label: "List Nomor WA",
                        href: "/list-nomer-wa",
                    },
                    {
                        icon: Plus,
                        label: "Tambah Sender",
                        href: "/tambah-sender",
                    },
                    {
                        icon: Info,
                        label: "Status Koneksi",
                        href: "/status-koneksi",
                    },
                ],
            },
            {
                id: "nid_179",
                icon: Info,
                label: "Jenis Sender",
                items: [
                    {
                        icon: Wrench,
                        label: "Tipe Sender",
                        href: "/tipe-sender",
                    },
                    {
                        icon: Settings,
                        label: "Pengaturan Default",
                        href: "/pengaturan-default",
                    },
                ],
            },
            {
                id: "nid_180",
                icon: Sliders,
                label: "Integrasi API",
                items: [
                    {
                        icon: Key,
                        label: "Token & Endpoint",
                        href: "/token-endpoint",
                    },
                    {
                        icon: Factory,
                        label: "Webhook & Callback",
                        href: "/webhook-callback",
                    },
                ],
            },
            {
                id: "nid_181",
                icon: Eye,
                label: "Monitoring & Log",
                items: [
                    {
                        icon: Calendar,
                        label: "Log Pengiriman",
                        href: "/log-pengiriman",
                    },
                    {
                        icon: MapPin,
                        label: "Resend Manual",
                        href: "/resend-manual",
                    },
                    {
                        icon: BarChart3,
                        label: "Statistik WA",
                        href: "/statistik-wa",
                    },
                ],
            },
        ],
        groupId: "15",
        groupName: "Sistem & Pengaturan",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "membership-paket-fitur",
        icon: ThumbsUp,
        labelKey: "Membership Paket Fitur" as any,
        description: "Modul Membership & Paket Fitur",
        descriptionId: "Modul Membership & Paket Fitur",
        count: 22,
        items: [
            {
                icon: Sliders,
                labelKey: "List Paket" as any,
                href: "/list-paket",
            },
            {
                icon: Plus,
                labelKey: "Tambahedit Paket" as any,
                href: "/tambah-edit-paket",
            },
            {
                icon: Clipboard,
                labelKey: "Duplikat Paket" as any,
                href: "/duplikat-paket",
            },
            {
                icon: Package,
                labelKey: "Daftar Paket" as any,
                href: "/daftar-paket",
            },
            {
                icon: Cog,
                labelKey: "Fitur Per Paket" as any,
                href: "/fitur-per-paket",
            },
            {
                icon: FileText,
                labelKey: "Preview Hak Akses" as any,
                href: "/preview-hak-akses",
            },
            {
                icon: Wrench,
                labelKey: "Konfigurasi Fitur" as any,
                href: "/konfigurasi-fitur",
            },
            {
                icon: Calendar,
                labelKey: "Status Member" as any,
                href: "/status-member",
            },
            {
                icon: Activity,
                labelKey: "Histori Pembelian" as any,
                href: "/history-pembelian",
            },
            {
                icon: TrendingUp,
                labelKey: "Upgrade Otomatis" as any,
                href: "/upgrade-otomatis",
            },
            {
                icon: Users,
                labelKey: "Manajemen Membership" as any,
                href: "/manajemen-membership",
            },
            {
                icon: DollarSign,
                labelKey: "Integrasi Payment" as any,
                href: "/integrasi-payment",
            },
            {
                icon: CreditCard,
                labelKey: "Tagihan Otomatis" as any,
                href: "/tagihan-otomatis",
            },
            {
                icon: Wallet,
                labelKey: "Pembayaran Tagihan" as any,
                href: "/pembayaran-tagihan",
            },
            {
                icon: Activity,
                labelKey: "Log Aktivitas Paket" as any,
                href: "/log-aktivitas-paket",
            },
            {
                icon: Package,
                labelKey: "Paket Populer" as any,
                href: "/paket-populer",
            },
            {
                icon: Eye,
                labelKey: "Log Monitoring" as any,
                href: "/log-monitoring",
            },
        ],
        nestedItems: [
            {
                id: "nid_192",
                icon: Package,
                label: "Daftar Paket",
                items: [
                    { icon: Sliders, label: "List Paket", href: "/list-paket" },
                    {
                        icon: Plus,
                        label: "Tambah/Edit Paket",
                        href: "/tambah-edit-paket",
                    },
                    {
                        icon: Clipboard,
                        label: "Duplikat Paket",
                        href: "/duplikat-paket",
                    },
                ],
            },
            {
                id: "nid_193",
                icon: Wrench,
                label: "Konfigurasi Fitur",
                items: [
                    {
                        icon: Cog,
                        label: "Fitur per Paket",
                        href: "/fitur-per-paket",
                    },
                    {
                        icon: FileText,
                        label: "Preview Hak Akses",
                        href: "/preview-hak-akses",
                    },
                ],
            },
            {
                id: "nid_194",
                icon: Users,
                label: "Manajemen Membership",
                items: [
                    {
                        icon: Calendar,
                        label: "Status Member",
                        href: "/status-member",
                    },
                    {
                        icon: Activity,
                        label: "Histori Pembelian",
                        href: "/history-pembelian",
                    },
                    {
                        icon: TrendingUp,
                        label: "Upgrade Otomatis",
                        href: "/upgrade-otomatis",
                    },
                ],
            },
            {
                id: "nid_195",
                icon: Wallet,
                label: "Pembayaran & Tagihan",
                items: [
                    {
                        icon: DollarSign,
                        label: "Integrasi Payment",
                        href: "/integrasi-payment",
                    },
                    {
                        icon: CreditCard,
                        label: "Tagihan Otomatis",
                        href: "/tagihan-otomatis",
                    },
                ],
            },
            {
                id: "nid_196",
                icon: Eye,
                label: "Log & Monitoring",
                items: [
                    {
                        icon: Activity,
                        label: "Log Aktivitas Paket",
                        href: "/log-aktivitas-paket",
                    },
                    {
                        icon: Package,
                        label: "Paket Populer",
                        href: "/paket-populer",
                    },
                ],
            },
        ],
        groupId: "15",
        groupName: "Sistem & Pengaturan",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "sop-digital-log-aktivitas",
        icon: Monitor,
        labelKey: "Sop Digital Log Aktivitas" as any,
        description: "Modul SOP Digital & Log Aktivitas",
        descriptionId: "Modul SOP Digital & Log Aktivitas",
        count: 18,
        items: [
            {
                icon: FileSpreadsheet,
                labelKey: "Daftar Sop Per Modul" as any,
                href: "/daftar-sop-per-modul",
            },
            {
                icon: FileText,
                labelKey: "Detail Langkah Sop" as any,
                href: "/detail-langkah-sop",
            },
            {
                icon: Upload,
                labelKey: "Upload Update Sop" as any,
                href: "/upload-update-sop",
            },
            {
                icon: Laptop,
                labelKey: "Sop Digital" as any,
                href: "/sop-digital",
            },
            {
                icon: FileText,
                labelKey: "Form Checklist Harian" as any,
                href: "/form-checklist-harian",
            },
            {
                icon: ThumbsUp,
                labelKey: "Approval Supervisor" as any,
                href: "/approval-supervisor",
            },
            {
                icon: CheckSquare,
                labelKey: "Checklist Proses" as any,
                href: "/checklist-proses",
            },
            {
                icon: Users,
                labelKey: "Riwayat Login Aksi" as any,
                href: "/riwayat-login-user",
            },
            {
                icon: Filter,
                labelKey: "Filter Per Modul" as any,
                href: "/filter-per-modul",
            },
            {
                icon: FileSpreadsheet,
                labelKey: "Export Log" as any,
                href: "/export-log",
            },
            {
                icon: Activity,
                labelKey: "Log Aktivitas User" as any,
                href: "/log-aktivitas-user",
            },
            {
                icon: Bell,
                labelKey: "Peringatan Pelanggaran Sop" as any,
                href: "/peringatan-pelanggran-sop",
            },
            {
                icon: AlertTriangle,
                labelKey: "Notifikasi Aktivitas Aneh" as any,
                href: "/notifikasi-aktivitas-aneh",
            },
            {
                icon: Eye,
                labelKey: "Audit Monitoring" as any,
                href: "/audit-monitoring",
            },
        ],
        nestedItems: [
            {
                id: "nid_209",
                icon: Laptop,
                label: "SOP Digital",
                items: [
                    {
                        icon: FileSpreadsheet,
                        label: "Daftar SOP per Modul",
                        href: "/daftar-sop-per-modul",
                    },
                    {
                        icon: FileText,
                        label: "Detail Langkah SOP",
                        href: "/detail-langkah-sop",
                    },
                    {
                        icon: Upload,
                        label: "Upload / Update SOP",
                        href: "/upload-update-sop",
                    },
                ],
            },
            {
                id: "nid_210",
                icon: CheckSquare,
                label: "Checklist Proses",
                items: [
                    {
                        icon: FileText,
                        label: "Form Checklist Harian",
                        href: "/form-checklist-harian",
                    },
                    {
                        icon: ThumbsUp,
                        label: "Approval Supervisor",
                        href: "/approval-supervisor",
                    },
                ],
            },
            {
                id: "nid_211",
                icon: Activity,
                label: "Log Aktivitas User",
                items: [
                    {
                        icon: Users,
                        label: "Riwayat Login & Aksi",
                        href: "/riwayat-login-user",
                    },
                    {
                        icon: Filter,
                        label: "Filter Per Modul",
                        href: "/filter-per-modul",
                    },
                    {
                        icon: FileSpreadsheet,
                        label: "Export Log",
                        href: "/export-log",
                    },
                ],
            },
            {
                id: "nid_212",
                icon: Eye,
                label: "Audit & Monitoring",
                items: [
                    {
                        icon: Bell,
                        label: "Peringatan Pelanggaran SOP",
                        href: "/peringatan-pelanggran-sop",
                    },
                    {
                        icon: AlertTriangle,
                        label: "Notifikasi Aktivitas Aneh",
                        href: "/notifikasi-aktivitas-aneh",
                    },
                ],
            },
        ],
        groupId: "15",
        groupName: "Sistem & Pengaturan",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "master-data",
        icon: Settings,
        labelKey: "Master Data" as any,
        description: "Modul Master Data",
        descriptionId: "Modul Master Data",
        count: 0,
        items: [],
        groupId: "15",
        groupName: "Sistem & Pengaturan",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "aplikasi-pelanggan",
        icon: Smartphone,
        labelKey: "Aplikasi Pelanggan" as any,
        description: "Modul Aplikasi Pelanggan",
        descriptionId: "Modul Aplikasi Pelanggan",
        count: 28,
        items: [
            { icon: Phone, labelKey: "Nikno Hp" as any, href: "/nik-nohp" },
            {
                icon: Unlock,
                labelKey: "Login Pelanggan" as any,
                href: "/login-pelanggan",
            },
            {
                icon: FileText,
                labelKey: "Form Booking" as any,
                href: "/form-booking",
            },
            {
                icon: Info,
                labelKey: "Status Booking" as any,
                href: "/status-booking",
            },
            {
                icon: Activity,
                labelKey: "Riwayat Sewa" as any,
                href: "/riwayat-sewa",
            },
            {
                icon: Car,
                labelKey: "Booking Kendaraan" as any,
                href: "/booking-kendaraan",
            },
            {
                icon: Star,
                labelKey: "Input Kupon" as any,
                href: "/input-kupon",
            },
            {
                icon: Award,
                labelKey: "Reward Point" as any,
                href: "/reward-point",
            },
            {
                icon: Award,
                labelKey: "Kupon Reward" as any,
                href: "/kupon-reward",
            },
            {
                icon: Info,
                labelKey: "Status Order" as any,
                href: "/status-order",
            },
            {
                icon: FileText,
                labelKey: "Broadcast Info" as any,
                href: "/broadcast-info",
            },
            { icon: Bell, labelKey: "Notifikasi" as any, href: "/notifikasi" },
            {
                icon: Eye,
                labelKey: "Lihat Tagihan" as any,
                href: "/lihat-tagihan",
            },
            {
                icon: Wallet,
                labelKey: "Bayar Online" as any,
                href: "/bayar-online",
            },
            {
                icon: Download,
                labelKey: "Cetak Invoice" as any,
                href: "/cetak-invoice",
            },
            {
                icon: Wallet,
                labelKey: "Pembayaran" as any,
                href: "/pembayaran",
            },
            {
                icon: MessageSquare,
                labelKey: "Live Chat Admin" as any,
                href: "/live-chat-admin",
            },
            {
                icon: Info,
                labelKey: "Faq Tutorial" as any,
                href: "/faq-tutorial",
            },
            {
                icon: Tag,
                labelKey: "Bantuan Dukungan" as any,
                href: "/bantuan-dukungan",
            },
            {
                icon: MapPin,
                labelKey: "Gps Lokasi" as any,
                href: "/gps-lokasi",
            },
            {
                icon: Zap,
                labelKey: "Tracking Order" as any,
                href: "/tracking-order",
            },
        ],
        nestedItems: [
            {
                id: "nid_223",
                icon: Unlock,
                label: "Login Pelanggan",
                items: [{ icon: Phone, label: "NIK/No HP", href: "/nik-nohp" }],
            },
            {
                id: "nid_224",
                icon: Car,
                label: "Booking Kendaraan",
                items: [
                    {
                        icon: FileText,
                        label: "Form Booking",
                        href: "/form-booking",
                    },
                    {
                        icon: Info,
                        label: "Status Booking",
                        href: "/status-booking",
                    },
                    {
                        icon: Activity,
                        label: "Riwayat Sewa",
                        href: "/riwayat-sewa",
                    },
                ],
            },
            {
                id: "nid_225",
                icon: Award,
                label: "Kupon & Reward",
                items: [
                    { icon: Star, label: "Input Kupon", href: "/input-kupon" },
                    {
                        icon: Award,
                        label: "Reward Point",
                        href: "/reward-point",
                    },
                ],
            },
            {
                id: "nid_226",
                icon: Bell,
                label: "Notifikasi",
                items: [
                    {
                        icon: Info,
                        label: "Status Order",
                        href: "/status-order",
                    },
                    {
                        icon: FileText,
                        label: "Broadcast Info",
                        href: "/broadcast-info",
                    },
                ],
            },
            {
                id: "nid_227",
                icon: Wallet,
                label: "Pembayaran",
                items: [
                    {
                        icon: Eye,
                        label: "Lihat Tagihan",
                        href: "/lihat-tagihan",
                    },
                    {
                        icon: Wallet,
                        label: "Bayar Online",
                        href: "/bayar-online",
                    },
                    {
                        icon: Download,
                        label: "Cetak Invoice",
                        href: "/cetak-invoice",
                    },
                ],
            },
            {
                id: "nid_228",
                icon: Tag,
                label: "Bantuan & Dukungan",
                items: [
                    {
                        icon: MessageSquare,
                        label: "Live Chat Admin",
                        href: "/live-chat-admin",
                    },
                    {
                        icon: Info,
                        label: "FAQ & Tutorial",
                        href: "/faq-tutorial",
                    },
                ],
            },
            {
                id: "nid_229",
                icon: Zap,
                label: "Tracking Order",
                items: [
                    {
                        icon: MapPin,
                        label: "GPS & Lokasi",
                        href: "/gps-lokasi",
                    },
                ],
            },
        ],
        groupId: "21",
        groupName: "Pelanggan & Dukungan",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "share-aplikasi-ke-teman",
        icon: Share2,
        labelKey: "Share Aplikasi Ke Teman" as any,
        description: "Modul Share Aplikasi ke Teman",
        descriptionId: "Modul Share Aplikasi ke Teman",
        count: 8,
        items: [
            {
                icon: Share2,
                labelKey: "Salin Bagikan" as any,
                href: "/salin-bagikan",
            },
            {
                icon: TrendingUp,
                labelKey: "Riwayat Referral" as any,
                href: "/riwayat-referral",
            },
            {
                icon: Clipboard,
                labelKey: "Referral Link" as any,
                href: "/referral-link",
            },
            {
                icon: Factory,
                labelKey: "Poin Diskon" as any,
                href: "/point-diskon",
            },
            {
                icon: FileText,
                labelKey: "Syarat Ketentuan" as any,
                href: "/syarat-ketentuan",
            },
            {
                icon: Award,
                labelKey: "Reward Referral" as any,
                href: "/reward-referral",
            },
        ],
        nestedItems: [
            {
                id: "nid_244",
                icon: Clipboard,
                label: "Referral Link",
                items: [
                    {
                        icon: Share2,
                        label: "Salin & Bagikan",
                        href: "/salin-bagikan",
                    },
                    {
                        icon: TrendingUp,
                        label: "Riwayat Referral",
                        href: "/riwayat-referral",
                    },
                ],
            },
            {
                id: "nid_245",
                icon: Award,
                label: "Reward Referral",
                items: [
                    {
                        icon: Factory,
                        label: "Poin / Diskon",
                        href: "/point-diskon",
                    },
                    {
                        icon: FileText,
                        label: "Syarat & Ketentuan",
                        href: "/syarat-ketentuan",
                    },
                ],
            },
        ],
        groupId: "21",
        groupName: "Pelanggan & Dukungan",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "bantuan-panduan-pengguna",
        icon: BookOpen,
        labelKey: "Bantuan Panduan Pengguna" as any,
        description: "Modul Bantuan & Panduan Pengguna",
        descriptionId: "Modul Bantuan & Panduan Pengguna",
        count: 13,
        items: [
            {
                icon: Eye,
                labelKey: "Lihat Panduan" as any,
                href: "/lihat-panduan",
            },
            {
                icon: Download,
                labelKey: "Download Pdf" as any,
                href: "/download-pdf",
            },
            {
                icon: BookOpen,
                labelKey: "Manual Book" as any,
                href: "/manual-book",
            },
            {
                icon: FileText,
                labelKey: "Daftar Pertanyaan Umum" as any,
                href: "/daftar-pertanyaan-umum",
            },
            { icon: FileText, labelKey: "Faq" as any, href: "/faq" },
            {
                icon: Smartphone,
                labelKey: "Tonton Video" as any,
                href: "/video-tutorial",
            },
            {
                icon: MessageSquare,
                labelKey: "Live Chat Wa" as any,
                href: "/live-chat-wa",
            },
            {
                icon: FileSpreadsheet,
                labelKey: "Form Bantuan" as any,
                href: "/form-bantuan",
            },
            {
                icon: Phone,
                labelKey: "Hubungi Cs" as any,
                href: "/hubungin-cs",
            },
        ],
        nestedItems: [
            {
                id: "nid_250",
                icon: BookOpen,
                label: "Manual Book",
                items: [
                    {
                        icon: Eye,
                        label: "Lihat Panduan",
                        href: "/lihat-panduan",
                    },
                    {
                        icon: Download,
                        label: "Download PDF",
                        href: "/download-pdf",
                    },
                ],
            },
            {
                id: "nid_251",
                icon: FileText,
                label: "FAQ",
                items: [
                    {
                        icon: FileText,
                        label: "Daftar Pertanyaan Umum",
                        href: "/daftar-pertanyaan-umum",
                    },
                ],
            },
            {
                id: "nid_252",
                icon: Monitor,
                label: "Video Tutorial",
                items: [
                    {
                        icon: Smartphone,
                        label: "Tonton Video",
                        href: "/video-tutorial",
                    },
                ],
            },
            {
                id: "nid_253",
                icon: Phone,
                label: "Hubungi CS",
                items: [
                    {
                        icon: MessageSquare,
                        label: "Live Chat / WA",
                        href: "/live-chat-wa",
                    },
                    {
                        icon: FileSpreadsheet,
                        label: "Form Bantuan",
                        href: "/form-bantuan",
                    },
                ],
            },
        ],
        groupId: "21",
        groupName: "Pelanggan & Dukungan",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "notifikasi-reminder",
        icon: Info,
        labelKey: "Notifikasi Reminder" as any,
        description: "Modul Notifikasi & Reminder",
        descriptionId: "Modul Notifikasi & Reminder",
        count: 6,
        items: [
            {
                icon: Bell,
                labelKey: "Pengingat Jatuh Tempo" as any,
                href: "/pengingat-jatuh-tempo",
            },
            {
                icon: AlertTriangle,
                labelKey: "Pengingat Overdue" as any,
                href: "/pengingat-overdue",
            },
            {
                icon: Info,
                labelKey: "Notifikasi Proses" as any,
                href: "/notifikasi-proses",
            },
            {
                icon: Factory,
                labelKey: "Broadcast Sistem" as any,
                href: "/broadcast-sistem",
            },
            {
                icon: Settings,
                labelKey: "Pengaturan Notifikasi" as any,
                href: "/pengaturan-notifikasi",
            },
            {
                icon: Clock,
                labelKey: "Log Histori Notifikasi" as any,
                href: "/log-history-notifikasi",
            },
        ],
        groupId: "25",
        groupName: "Kontrol & Insight",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "dashboard",
        icon: Home,
        labelKey: "Dashboard" as any,
        description: "Modul Dashboard",
        descriptionId: "Modul Dashboard",
        count: 7,
        items: [
            {
                icon: BarChart3,
                labelKey: "Statistik Harian" as any,
                href: "/statistik-harian",
            },
            {
                icon: Wallet,
                labelKey: "Ringkasan Transaksi" as any,
                href: "/ringkasan-transaksi",
            },
            {
                icon: Calendar,
                labelKey: "Booking Kalender" as any,
                href: "/booking-calendar",
            },
            {
                icon: Car,
                labelKey: "Unit Tersedia Vs Disewa" as any,
                href: "/unit-tersedia-vs-sewa",
            },
            {
                icon: Bell,
                labelKey: "Reminder Penting Hari Ini" as any,
                href: "/reminder-penting-hari-ini",
            },
            {
                icon: TrendingUp,
                labelKey: "Insight Otomatis" as any,
                href: "/insight-otomatis",
            },
            {
                icon: Navigation,
                labelKey: "Pintasan Modul" as any,
                href: "/pintasan-modul",
            },
        ],
        groupId: "25",
        groupName: "Kontrol & Insight",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "penilaian-kpi",
        icon: TrendingUp,
        labelKey: "Penilaian Kpi" as any,
        description: "Modul Penilaian & KPI",
        descriptionId: "Modul Penilaian & KPI",
        count: 4,
        items: [
            {
                icon: Car,
                labelKey: "Kpi Kendaraan" as any,
                href: "/kpi-kendaraan",
            },
            { icon: Users, labelKey: "Kpi Driver" as any, href: "/kpi-driver" },
            {
                icon: Phone,
                labelKey: "Kpi Staff Admincs" as any,
                href: "/kpi/staff-admincs",
            },
            {
                icon: DollarSign,
                labelKey: "Kpi Transaksi Keuangan" as any,
                href: "/kpi/transaksi-keuangan",
            },
        ],
        groupId: "25",
        groupName: "Kontrol & Insight",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
    {
        id: "pelacakan-pengawasan-cerdas",
        icon: Eye,
        labelKey: "Pelacakan Pengawasan Cerdas" as any,
        description: "Modul Pelacakan & Pengawasan Cerdas",
        descriptionId: "Modul Pelacakan & Pengawasan Cerdas",
        count: 20,
        items: [
            {
                icon: Clock,
                labelKey: "Posisi Unit Real Time" as any,
                href: "/posisi-unit-real-time",
            },
            {
                icon: Map,
                labelKey: "Live Gps Tracking" as any,
                href: "/live-gps-tracking",
            },
            {
                icon: Activity,
                labelKey: "Log Perjalanan" as any,
                href: "/rute-history-perjalanan",
            },
            {
                icon: Plus,
                labelKey: "Kalkulasi Otomatis" as any,
                href: "/kalkulasi-otomatis",
            },
            {
                icon: Fuel,
                labelKey: "Estimasi Konsumsi Bbm" as any,
                href: "/estimasi-konsumsi-bbm",
            },
            {
                icon: AlertTriangle,
                labelKey: "Wilayah Terlarang" as any,
                href: "/wilayah-terlarang",
            },
            {
                icon: Info,
                labelKey: "Area Aman Geofence" as any,
                href: "/area-aman",
            },
            {
                icon: Monitor,
                labelKey: "Live Rekam Kamera" as any,
                href: "/live-rekam-kamera",
            },
            {
                icon: Factory,
                labelKey: "Integrasi Cctv Mobil" as any,
                href: "/integrasi-cctv-mobil",
            },
            {
                icon: Eye,
                labelKey: "Pengenalan Wajah" as any,
                href: "/pengenalan-wajah",
            },
            {
                icon: Users,
                labelKey: "Face Recognition Driver" as any,
                href: "/face-recognition-driver",
            },
            { icon: Info, labelKey: "Ai Alert" as any, href: "/ai-alert" },
            {
                icon: AlertTriangle,
                labelKey: "Deteksi Aktivitas Mencurigakan" as any,
                href: "/deteksi-aktivitas-mencurigakan",
            },
        ],
        nestedItems: [
            {
                id: "nid_277",
                icon: Map,
                label: "Live GPS Tracking",
                items: [
                    {
                        icon: Clock,
                        label: "Posisi Unit Real-Time",
                        href: "/posisi-unit-real-time",
                    },
                ],
            },
            {
                id: "nid_278",
                icon: MapPin,
                label: "Rute & Histori Perjalanan",
                items: [
                    {
                        icon: Activity,
                        label: "Log Perjalanan",
                        href: "/rute-history-perjalanan",
                    },
                ],
            },
            {
                id: "nid_279",
                icon: Fuel,
                label: "Estimasi Konsumsi BBM",
                items: [
                    {
                        icon: Plus,
                        label: "Kalkulasi Otomatis",
                        href: "/kalkulasi-otomatis",
                    },
                ],
            },
            {
                id: "nid_280",
                icon: Info,
                label: "Area Aman (GeoFence)",
                items: [
                    {
                        icon: AlertTriangle,
                        label: "Wilayah Terlarang",
                        href: "/wilayah-terlarang",
                    },
                ],
            },
            {
                id: "nid_281",
                icon: Factory,
                label: "Integrasi CCTV Mobil",
                items: [
                    {
                        icon: Monitor,
                        label: "Live & Rekam Kamera",
                        href: "/live-rekam-kamera",
                    },
                ],
            },
            {
                id: "nid_282",
                icon: Users,
                label: "Face Recognition Driver",
                items: [
                    {
                        icon: Eye,
                        label: "Pengenalan Wajah",
                        href: "/pengenalan-wajah",
                    },
                ],
            },
            {
                id: "nid_283",
                icon: AlertTriangle,
                label: "Deteksi Aktivitas Mencurigakan",
                items: [{ icon: Info, label: "AI Alert", href: "/ai-alert" }],
            },
        ],
        groupId: "25",
        groupName: "Kontrol & Insight",
        groupColor: "#3b82f6",
        iconBg: "bg-primary/15",
        iconColor: "text-primary",
        activeBorder: "border-primary/40",
        borderColor: "border-border",
        hoverBorder: "hover:border-primary/30",
    },
];
/*======================================================================*/

/** 👉 Export agar dipakai juga oleh drawer mobile */
export const appSidebarMenuItems = menuItems;

/* ====== Sidebar Bersama (desktop) ====== */
function SharedSidebar() {
    const { t, language } = useLanguage();
    const router = useRouter(); // <-- SATU-SATUNYA deklarasi router
    const pathname = usePathname();
    const { isMobile, state } = useSidebar();

    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const [selectedModule, setSelectedModule] = useState<string | null>(null);
    const [expandedNestedItems, setExpandedNestedItems] = useState<string[]>(
        []
    );

    // Kelompokkan modul by group
    const groups = useMemo(() => {
        const map: Record<
            string,
            { id: string; name: string; color?: string; modules: any[] }
        > = {};
        for (const m of menuItems as any[]) {
            const key = m.groupId ?? m.groupName ?? "0";
            if (!map[key]) {
                map[key] = {
                    id: String(key),
                    name: m.groupName || "Kelompok",
                    color: m.groupColor,
                    modules: [],
                };
            }
            map[key].modules.push(m);
        }
        Object.values(map).forEach((g) =>
            g.modules.sort((a, b) => (a.count ?? 0) - (b.count ?? 0))
        );
        return Object.values(map);
    }, []);

    // Auto-select berdasarkan path
    useEffect(() => {
        const found = (() => {
            for (const g of groups) {
                for (const mod of g.modules) {
                    if (
                        mod.items?.some((it: any) =>
                            pathname.startsWith(it.href)
                        )
                    )
                        return { gid: g.id, mid: mod.id };
                    if (
                        mod.nestedItems?.some((ni: any) =>
                            ni.items?.some((sit: any) =>
                                pathname.startsWith(sit.href)
                            )
                        )
                    )
                        return { gid: g.id, mid: mod.id };
                }
            }
            return null;
        })();
        if (found) {
            setSelectedGroup(found.gid);
            setSelectedModule(found.mid);
        }
    }, [pathname, groups]);

    const handleNavigation = (href: string) => {
        router.push(href);
        if (isMobile)
            (
                document.querySelector(
                    '[data-sidebar="trigger"]'
                ) as HTMLButtonElement | null
            )?.click();
    };
    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);
    const toggleNestedItem = (id: string) =>
        setExpandedNestedItems((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );

    // === Level 3: Submenu ===
    if (selectedModule) {
        const group = groups.find((g) => g.id === selectedGroup);
        const module = group?.modules.find((m) => m.id === selectedModule);
        if (!module) return null;

        const hasNested =
            Array.isArray(module.nestedItems) && module.nestedItems.length > 0;

        return (
            <div className="flex flex-col h-full bg-background text-foreground">
                <SidebarHeader className="border-b border-border/50 p-4 bg-gradient-to-r from-muted/30 to-muted/10 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedModule(null)}
                            className="p-2 hover:bg-muted/60 rounded-lg"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div
                            className={`p-2.5 rounded-xl ${module.iconBg} shadow-sm`}
                        >
                            <module.icon
                                className={`h-5 w-5 ${module.iconColor}`}
                            />
                        </div>
                        {(!isMobile || state === "expanded") && (
                            <div>
                                <h3 className="font-semibold text-sm">
                                    {module.label ?? module.labelKey ?? "Modul"}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    {language === "id"
                                        ? module.descriptionId
                                        : module.description}
                                </p>
                            </div>
                        )}
                    </div>
                </SidebarHeader>

                <SidebarContent className="p-4 flex-1 overflow-y-auto sidebar-scrollbar">
                    {!hasNested ? (
                        <div className="space-y-2">
                            {module.items?.map((item: any) => (
                                <Button
                                    key={item.href}
                                    variant="ghost"
                                    className={`w-full justify-start gap-3 h-12 rounded-xl ${
                                        isActive(item.href)
                                            ? "bg-primary/10 text-primary border border-primary/20"
                                            : "hover:bg-muted/60"
                                    }`}
                                    onClick={() => handleNavigation(item.href)}
                                >
                                    <item.icon
                                        className={`h-4 w-4 ${
                                            isActive(item.href)
                                                ? "text-primary"
                                                : ""
                                        }`}
                                    />
                                    {(!isMobile || state === "expanded") && (
                                        <>
                                            <span className="text-sm font-medium">
                                                {item.label ?? item.labelKey}
                                            </span>
                                            {isActive(item.href) && (
                                                <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                                            )}
                                        </>
                                    )}
                                </Button>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {module.nestedItems.map((nestedItem: any) => (
                                <Collapsible
                                    key={nestedItem.id}
                                    open={expandedNestedItems.includes(
                                        nestedItem.id
                                    )}
                                    onOpenChange={() =>
                                        toggleNestedItem(nestedItem.id)
                                    }
                                >
                                    <CollapsibleTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start gap-3 h-12 rounded-xl"
                                        >
                                            <nestedItem.icon className="h-4 w-4" />
                                            {(!isMobile ||
                                                state === "expanded") && (
                                                <>
                                                    <span className="text-sm font-medium flex-1 text-left">
                                                        {nestedItem.label}
                                                    </span>
                                                    <ChevronDown
                                                        className={`h-4 w-4 transition-transform ${
                                                            expandedNestedItems.includes(
                                                                nestedItem.id
                                                            )
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                    />
                                                </>
                                            )}
                                        </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="space-y-1 mt-1">
                                        {nestedItem.items.map(
                                            (subItem: any) => (
                                                <Button
                                                    key={subItem.href}
                                                    variant="ghost"
                                                    className={`w-full justify-start gap-3 h-10 rounded-lg ml-6 ${
                                                        isActive(subItem.href)
                                                            ? "bg-primary/10 text-primary border border-primary/20"
                                                            : "text-muted-foreground hover:bg-muted/40"
                                                    }`}
                                                    onClick={() =>
                                                        handleNavigation(
                                                            subItem.href
                                                        )
                                                    }
                                                >
                                                    <subItem.icon
                                                        className={`h-3.5 w-3.5 ${
                                                            isActive(
                                                                subItem.href
                                                            )
                                                                ? "text-primary"
                                                                : ""
                                                        }`}
                                                    />
                                                    {(!isMobile ||
                                                        state ===
                                                            "expanded") && (
                                                        <>
                                                            <span className="text-xs font-medium">
                                                                {subItem.label ??
                                                                    subItem.labelKey}
                                                            </span>
                                                            {isActive(
                                                                subItem.href
                                                            ) && (
                                                                <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full" />
                                                            )}
                                                        </>
                                                    )}
                                                </Button>
                                            )
                                        )}
                                    </CollapsibleContent>
                                </Collapsible>
                            ))}
                        </div>
                    )}
                </SidebarContent>
            </div>
        );
    }

    // === Level 2: Daftar Modul per Group ===
    if (selectedGroup) {
        const group = groups.find((g) => g.id === selectedGroup);
        if (!group) return null;

        const hasActiveInModule = (module: any) =>
            module.items?.some((it: any) => isActive(it.href)) ||
            module.nestedItems?.some((ni: any) =>
                ni.items?.some((sit: any) => isActive(sit.href))
            );

        return (
            <div className="flex flex-col h-full bg-background text-foreground">
                <SidebarHeader className="border-b border-border/50 p-4 bg-gradient-to-r from-muted/30 to-muted/10 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setSelectedGroup(null);
                                setSelectedModule(null);
                            }}
                            className="p-2 hover:bg-muted/60 rounded-lg"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="p-2.5 rounded-xl bg-muted/40 shadow-sm">
                            <Building className="h-5 w-5 text-muted-foreground" />
                        </div>
                        {(!isMobile || state === "expanded") && (
                            <div>
                                <h3 className="font-semibold text-sm">
                                    {group.name}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    Pilih modul
                                </p>
                            </div>
                        )}
                    </div>
                </SidebarHeader>

                <SidebarContent className="p-4 flex-1 overflow-y-auto sidebar-scrollbar">
                    <div className="space-y-3">
                        {group.modules.map((module: any) => {
                            const active = hasActiveInModule(module);
                            return (
                                <Card
                                    key={module.id}
                                    className={`cursor-pointer transition-all group rounded-xl shadow-sm hover:shadow-md bg-card border-border ${
                                        active
                                            ? `${module.activeBorder} bg-gradient-to-br from-muted/30 to-muted/10`
                                            : `${module.borderColor} hover:bg-gradient-to-br hover:from-muted/20 hover:to-muted/5`
                                    }`}
                                    onClick={() => setSelectedModule(module.id)}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`p-2.5 rounded-xl ${module.iconBg} shadow-sm`}
                                            >
                                                <module.icon
                                                    className={`h-5 w-5 ${module.iconColor}`}
                                                />
                                            </div>
                                            {(!isMobile ||
                                                state === "expanded") && (
                                                <>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-semibold text-sm truncate">
                                                                {module.label ??
                                                                    module.labelKey}
                                                            </h3>
                                                            <Badge
                                                                variant="secondary"
                                                                className="text-xs px-2 py-0.5 bg-muted/60 border-0 font-medium"
                                                            >
                                                                {module.count}
                                                            </Badge>
                                                            {active && (
                                                                <div className="w-2 h-2 bg-primary rounded-full" />
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-muted-foreground truncate">
                                                            {language === "id"
                                                                ? module.descriptionId
                                                                : module.description}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground/80 mt-1">
                                                            {module.items
                                                                ?.length ??
                                                                module
                                                                    .nestedItems
                                                                    ?.length ??
                                                                0}{" "}
                                                            menu
                                                        </p>
                                                    </div>
                                                    <ChevronRight
                                                        className={`h-4 w-4 ${
                                                            active
                                                                ? "text-primary"
                                                                : "text-muted-foreground"
                                                        }`}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </SidebarContent>
            </div>
        );
    }

    // === Level 1: Daftar Group ===
    return (
        <div className="flex flex-col h-full bg-background text-foreground">
            <SidebarHeader className="border-b border-border/50 p-4 bg-gradient-to-r from-muted/30 to-muted/10 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary shadow-lg ring-2 ring-primary/20">
                        <img
                            src="/rentvix-logo.png"
                            alt="RentVix"
                            className="h-7 w-7 object-contain"
                        />
                    </div>
                    {(!isMobile || state === "expanded") && (
                        <div>
                            <h2 className="text-base font-bold tracking-tight">
                                RentVix
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Pro Dashboard
                            </p>
                        </div>
                    )}
                </div>
            </SidebarHeader>

            <SidebarContent className="flex-1 overflow-y-auto sidebar-scrollbar">
                <div className="p-4">
                    {/* Dashboard Card */}
                    <Card
                        className={`mb-6 cursor-pointer transition-all rounded-xl shadow-sm bg-card border-border ${
                            pathname === "/"
                                ? "border-primary/40 bg-gradient-to-br from-primary/5 to-primary/10"
                                : "hover:border-primary/30 hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10"
                        }`}
                        onClick={() => router.push("/")}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/30 shadow-sm">
                                    <Home className="h-5 w-5 text-primary" />
                                </div>
                                {(!isMobile || state === "expanded") && (
                                    <>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-sm">
                                                Dashboard
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                Ringkasan dan statistik
                                            </p>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Group Cards */}
                    <div className="space-y-3">
                        {groups.map((g) => {
                            const totalFeatures = g.modules.reduce(
                                (acc, m) =>
                                    acc +
                                    (m.items?.length ??
                                        m.nestedItems?.length ??
                                        0),
                                0
                            );
                            return (
                                <Card
                                    key={g.id}
                                    className="cursor-pointer transition-all group rounded-xl shadow-sm bg-card border-border hover:border-primary/30 hover:bg-gradient-to-br hover:from-muted/20 hover:to-muted/5"
                                    onClick={() => setSelectedGroup(g.id)}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="p-2.5 rounded-xl shadow-sm"
                                                style={{
                                                    backgroundColor:
                                                        (g.color || "#e5e7eb") +
                                                        "33",
                                                }}
                                            >
                                                <Building
                                                    className="h-5 w-5"
                                                    style={{
                                                        color:
                                                            g.color ||
                                                            "#64748b",
                                                    }}
                                                />
                                            </div>
                                            {(!isMobile ||
                                                state === "expanded") && (
                                                <>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-semibold text-sm truncate">
                                                                {g.name}
                                                            </h3>
                                                            <Badge
                                                                variant="secondary"
                                                                className="text-xs px-2 py-0.5 bg-muted/60 border-0 font-medium"
                                                            >
                                                                {
                                                                    g.modules
                                                                        .length
                                                                }
                                                            </Badge>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground truncate">
                                                            Kelompok modul
                                                        </p>
                                                        <p className="text-xs text-muted-foreground/80 mt-1">
                                                            {totalFeatures} menu
                                                        </p>
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                                </>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </SidebarContent>
        </div>
    );
}

export function AppSidebar() {
    return (
        <Sidebar
            variant="inset"
            className="border-r border-border/50 bg-background"
        >
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-hidden sidebar-scrollbar">
                    <SharedSidebar />
                </div>
            </div>
        </Sidebar>
    );
}

/** 🔥 Wrapper responsif — otomatis sidebar di desktop & bottom menu di mobile */
export function AppNavigationResponsive({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="min-h-dvh w-full flex">
            {/* Desktop: Sidebar */}
            <div className="hidden lg:block">
                <AppSidebar />
            </div>

            {/* Konten */}
            <div className="flex-1 min-w-0 pb-24 lg:pb-0">{children}</div>

            {/* Mobile: Bottom Tab + Drawer */}
            <MobileTabBar onOpenMenu={() => setOpen(true)} />
            <MobileMenuDrawer
                items={appSidebarMenuItems as any[]}
                open={open}
                setOpen={setOpen}
            />
        </div>
    );
}
