import { PrismaClient, MenuType } from "@prisma/client";
const prisma = new PrismaClient();

const PRODUCT_ID = "ec23de55-565f-432e-836e-83d5c336d23f";
const PRODUCT_CODE = "TIRTABENING";

// util kecil: normalisasi properti opsional
function withDefaults<T extends Record<string, any>>(n: T) {
    return {
        routePath: null,
        icon: null,
        color: null,
        note: null,
        children: [],
        ...n,
    };
}

// Rekursif: buat node + children
async function createNode(
    node: {
        title: string;
        type: MenuType;
        routePath?: string | null;
        icon?: string | null;
        color?: string | null;
        note?: string | null;
        children?: Array<
            Omit<
                Parameters<typeof createNode>[0],
                "parentId" | "level" | "orderNumber"
            >
        >;
    },
    parentId: bigint | null,
    level: number,
    orderNumber: number
): Promise<bigint> {
    const n = withDefaults(node);

    const created = await prisma.mstMenu.create({
        data: {
            parentId, // bigint | null
            level, // root = 1
            orderNumber, // 1..N
            type: n.type,
            title: n.title,
            routePath: n.routePath,
            icon: n.icon,
            color: n.color,
            note: n.note,
            productId: PRODUCT_ID,
            productCode: PRODUCT_CODE,
            isActive: true,
        },
        select: { id: true },
    });

    // CHILDREN: mulai dari index 0 supaya anak pertama ikut dibuat
    for (let i = 0; i < n.children.length; i++) {
        await createNode(
            n.children[i] as any,
            created.id, // parentId = id yang baru
            level + 1, // turun 1 level
            i + 1 // urutan antar-sibling
        );
    }

    return created.id;
}

/* =========================
   STRUKTUR MENU (ROOT = MODULE/GROUP)
========================= */
const tree: Array<{
    title: string;
    type: MenuType;
    routePath?: string | null;
    children?: any[];
}> = [
    {
        title: "Dashboard",
        type: "menu",
    },
    {
        title: "Master",
        type: "module",
        children: [
            {
                title: "Pelanggan",
                type: "menu",
                routePath: "/master/pelanggan",
            },
            { title: "Meteran", type: "menu", routePath: "/master/meteran" },
            {
                title: "Inventaris",
                type: "menu",
                routePath: "/master/inventaris",
            },
            { title: "Tandon", type: "menu", routePath: "/master/tandon" },
            { title: "Blok", type: "menu", routePath: "/master/blok" },
        ],
    },
    {
        title: "Operasional",
        type: "module",
        children: [
            {
                title: "Catat Meter",
                type: "menu",
                routePath: "/operasional/catat-meter",
            },
            {
                title: "Reset Meteran",
                type: "menu",
                routePath: "/operasional/reser-meteran",
            },
            {
                title: "Jadwal Pencatatan",
                type: "menu",
                routePath: "/operasional/jadwal",
            },
        ],
    },
    {
        title: "Distribusi",
        type: "module",
        children: [
            {
                title: "Hirarki",
                type: "menu",
                routePath: "/distribusi/hirarki",
            },
            {
                title: "Rekonsiliasi",
                type: "menu",
                routePath: "/distribusi/rekonsiliasi",
            },
            { title: "Peta", type: "menu", routePath: "/distribusi/peta" },
        ],
    },
    {
        title: "Keuangan",
        type: "module",
        children: [
            { title: "Biaya", type: "menu", routePath: "/keuangan/biaya" },
            {
                title: "Pengeluaran",
                type: "menu",
                routePath: "/keuangan/pengeluaran",
            },
            { title: "Hutang", type: "menu", routePath: "/keuangan/hutang" },
            {
                title: "Pembayaran Hutang",
                type: "menu",
                routePath: "/keuangan/pembayaran-hutang",
            },
            {
                title: "Tagihan Pembayaran",
                type: "menu",
                routePath: "/keuangan/tagihan-pembayaran",
            },
        ],
    },
    {
        title: "Laporan",
        type: "module",
        children: [
            {
                title: "Laporan Summary",
                type: "menu",
                routePath: "/laporan/summary",
            },
            {
                title: "Laporan Catat Meter",
                type: "menu",
                routePath: "/laporan/catat-meter",
            },
            {
                title: "Laporan Konsumsi Zona",
                type: "menu",
                routePath: "/laporan/konsumsi-zona",
            },
            {
                title: "Laporan Status Pembayaran",
                type: "menu",
                routePath: "/laporan/status-pembayaran",
            },
            {
                title: "Laporan Piutang",
                type: "menu",
                routePath: "/laporan/piutang",
            },
            {
                title: "Laporan Hutang",
                type: "menu",
                routePath: "/laporan/hutang",
            },
            {
                title: "Laporan Laba Rugi",
                type: "menu",
                routePath: "/laporan/laba-rugi",
            },
            {
                title: "Laporan Keuangan",
                type: "menu",
                routePath: "/laporan/keuangan",
            },
        ],
    },
    {
        title: "Pengaturan",
        type: "module",
        children: [
            { title: "Pengaturan", type: "menu", routePath: "/pengaturan" },
            {
                title: "WhatsApp Setting",
                type: "menu",
                routePath: "/pengaturan/whatsapp",
            },
        ],
    },
    {
        title: "Petugas",
        type: "group",
        children: [
            { title: "Dashboard", type: "menu", routePath: "/petugas" },
            { title: "Jadwal", type: "menu", routePath: "/petugas/jadwal" },
            { title: "Riwayat", type: "menu", routePath: "/petugas/riwayat" },
            { title: "Profil", type: "menu", routePath: "/petugas/profil" },
        ],
    },
    {
        title: "Warga",
        type: "group",
        children: [
            { title: "Dashboard", type: "menu", routePath: "/warga" },
            { title: "Tagihan", type: "menu", routePath: "/warga/tagihan" },
            { title: "Profil", type: "menu", routePath: "/warga/profil" },
        ],
    },
];

async function main() {
    // bersihkan data lama khusus produk ini
    await prisma.mstMenu.deleteMany({ where: { productCode: PRODUCT_CODE } });

    // ROOT SELALU level = 1
    for (let i = 0; i < tree.length; i++) {
        await createNode(tree[i] as any, null, 1, i + 1);
    }
}

main()
    .then(async () => {
        console.log("✅ Seed mst_menus selesai");
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error("❌ Seed gagal:", e);
        await prisma.$disconnect();
        process.exit(1);
    });
