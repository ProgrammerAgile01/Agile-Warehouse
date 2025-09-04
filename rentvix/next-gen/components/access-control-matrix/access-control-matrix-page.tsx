"use client";

import { useEffect, useMemo, useState } from "react";
import {
    AccessControlMatrixHeader,
    AccessControlLevelPicker,
    AccessControlStats,
    AccessControlMatrixFilters,
    AccessControlMatrixTable,
    AccessControlMatrixCardsMobile,
    ResultsInfo,
    type MatrixRow,
    type GroupNode,
    type ModuleNode,
    type MenuNode,
} from "./access-control-matrix-page-contents";
import { useToast } from "@/hooks/use-toast";
import { SidebarTrigger } from "../ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "../ui/separator";
import {
    fetchData,
    fetchMenusTree,
    saveAccessControlMatrixBulk,
} from "@/lib/api";

/* ====== Mapper: response /menus/tree -> GroupNode/ModuleNode/MenuNode ====== */
/** Bentuk node yang datang dari API (fleksibel) */
type ApiMenuNode = {
    id: number | string;
    title: string;
    type?: string; // "group" | "module" | "menu"
    level?: number; // fallback penentu tipe
    children?: ApiMenuNode[];
};

function mapMenusApiToTreeNodes(apiRoots: ApiMenuNode[]): GroupNode[] {
    // Normalisasi type berdasarkan field "type" atau fallback "level"
    const normalizeType = (node: ApiMenuNode): "group" | "module" | "menu" => {
        const t = String(node.type ?? "").toLowerCase();
        if (t === "group" || t === "module" || t === "menu") return t as any;
        const lvl = typeof node.level === "number" ? node.level : 0;
        if (lvl <= 0) return "group";
        if (lvl === 1) return "module";
        return "menu";
    };

    // Rekursif
    const walk = (n: ApiMenuNode): GroupNode | ModuleNode | MenuNode => {
        const t = normalizeType(n);
        const label = String(n.title ?? "Menu");

        if (t === "menu") {
            const leaf: MenuNode = { type: "menu", id: String(n.id), label };
            return leaf;
        }

        const children = Array.isArray(n.children) ? n.children.map(walk) : [];

        if (t === "group") {
            const g: GroupNode = {
                type: "group",
                id: String(n.id),
                label,
                children: [] as ModuleNode[],
            };
            // Anak group bisa module/menu—pastikan semua module; jika ada "menu" langsung di bawah group,
            // bungkus ke pseudo module bernama label group (agar UI tetap konsisten)
            const modules: ModuleNode[] = [];
            const looseMenus: MenuNode[] = [];
            for (const ch of children) {
                if ((ch as any).type === "module")
                    modules.push(ch as ModuleNode);
                else if ((ch as any).type === "menu")
                    looseMenus.push(ch as MenuNode);
            }
            if (looseMenus.length) {
                modules.unshift({
                    type: "module",
                    id: `${n.id}::_auto`,
                    label,
                    children: looseMenus,
                });
            }
            g.children = modules;
            return g;
        }

        // module
        const m: ModuleNode = {
            type: "module",
            id: String(n.id),
            label,
            children: [],
        };
        // anak module bisa: module lanjutan (submodule) atau menu
        m.children = children as any;
        return m;
    };

    const roots = apiRoots.map(walk);

    // hanya ambil GroupNode di root; jika API mengembalikan module/menu di root, bungkus ke group default
    const groups: GroupNode[] = [];
    const orphans: (ModuleNode | MenuNode)[] = [];
    for (const r of roots) {
        if ((r as any).type === "group") groups.push(r as GroupNode);
        else orphans.push(r as any);
    }
    if (orphans.length) {
        groups.unshift({
            type: "group",
            id: "_ungrouped",
            label: "Ungrouped",
            children: orphans.map((x, i) =>
                (x as any).type === "module"
                    ? (x as ModuleNode)
                    : ({
                          type: "module",
                          id: `_ung_${i}`,
                          label: (x as MenuNode).label,
                          children: [x as MenuNode],
                      } as ModuleNode)
            ),
        });
    }

    // urut label supaya rapi
    groups.forEach((g) => {
        g.children.sort((a, b) => a.label.localeCompare(b.label));
        g.children.forEach((m) => {
            // jika submodule -> urutkan
            (m.children as any[])?.sort?.((a: any, b: any) =>
                a.label.localeCompare(b.label)
            );
        });
    });
    return groups.sort((a, b) => a.label.localeCompare(b.label));
}

const ITEMS_PER_PAGE = 9999;

export function AccessControlMatrixPage() {
    const { toast } = useToast();

    const [levels, setLevels] = useState<
        { id: string | number; nama_level: string; status?: string }[]
    >([]);
    const [selectedLevelId, setSelectedLevelId] = useState<
        string | number | null
    >(null);

    const [rawMatrix, setRawMatrix] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    // === Tree dari API (mst_menus) ===
    const [tree, setTree] = useState<GroupNode[]>([]);
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    // Load levels, matrix, dan tree menu
    useEffect(() => {
        (async () => {
            try {
                const [lvls, matrix, menus] = await Promise.all([
                    fetchData("level_users"),
                    fetchData("access_control_matrices"),
                    // opsional: pass product_code kalau mau filter per produk
                    fetchMenusTree(/* { product_code: "RENTVIX" } */),
                ]);

                const normalizedLevels = (lvls || []).map((x: any) => ({
                    id: x.id,
                    nama_level: x.nama_level ?? x.namaLevel ?? "Level",
                    status: x.status,
                }));

                setLevels(normalizedLevels);
                setRawMatrix(Array.isArray(matrix) ? matrix : []);

                // Map menus ke tree
                const apiNodes = Array.isArray(menus) ? menus : [];
                setTree(mapMenusApiToTreeNodes(apiNodes));

                const firstActive = normalizedLevels.find(
                    (l: any) => String(l.status ?? "").toLowerCase() === "aktif"
                );
                setSelectedLevelId(
                    firstActive?.id ?? normalizedLevels[0]?.id ?? null
                );
            } catch (err: any) {
                toast({
                    title: "Gagal Memuat Data",
                    description: String(
                        err?.message ??
                            "Terjadi kesalahan saat mengambil data dari server"
                    ),
                    variant: "destructive",
                });
            }
        })();
    }, [toast]);

    // Kumpulkan semua leaf-menu (dari tree)
    const allMenusFlat = useMemo(() => {
        type AnyNode = GroupNode | ModuleNode | MenuNode;
        const res: { id: string; label: string }[] = [];
        const collect = (nodes: AnyNode[]) => {
            for (const n of nodes) {
                if ((n as any).type === "menu") {
                    const mn = n as MenuNode;
                    res.push({ id: mn.id, label: mn.label });
                } else {
                    const children = (n as GroupNode | ModuleNode).children as
                        | AnyNode[]
                        | undefined;
                    if (Array.isArray(children) && children.length)
                        collect(children);
                }
            }
        };
        collect(tree as AnyNode[]);
        return res;
    }, [tree]);

    // Rows untuk level terpilih
    const rows: MatrixRow[] = useMemo(() => {
        const mapByMenu: Record<string, any> = {};
        for (const r of rawMatrix) {
            if (String(r.user_level_id) !== String(selectedLevelId)) continue;
            const key = String(
                r.menu_id ?? r.menuId ?? r.menu_key ?? r.menuKey ?? ""
            );
            if (!key) continue;
            mapByMenu[key] = r;
        }

        return allMenusFlat
            .filter((m) =>
                m.label.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((m) => {
                const found = mapByMenu[m.id] ?? {};
                return {
                    id: m.id,
                    label: m.label,
                    view: Boolean(found.view),
                    add: Boolean(found.add),
                    edit: Boolean(found.edit),
                    delete: Boolean(found.delete),
                    approve: Boolean(found.approve),
                } as MatrixRow;
            });
    }, [rawMatrix, selectedLevelId, searchTerm, allMenusFlat]);

    // Stats
    const stats = useMemo(() => {
        const totalMenus = rows.length;
        const viewCount = rows.filter((r) => r.view).length;
        const addCount = rows.filter((r) => r.add).length;
        const editCount = rows.filter((r) => r.edit).length;
        const deleteCount = rows.filter((r) => r.delete).length;
        const approveCount = rows.filter((r) => r.approve).length;
        return {
            totalMenus,
            viewCount,
            addCount,
            editCount,
            deleteCount,
            approveCount,
        };
    }, [rows]);

    // Toggle cell
    const onToggleRow = (
        id: MatrixRow["id"],
        key: keyof Omit<MatrixRow, "id" | "label">,
        val: boolean
    ) => {
        setRawMatrix((prev) => {
            const next = [...prev];
            const idx = next.findIndex(
                (x) =>
                    String(x.user_level_id) === String(selectedLevelId) &&
                    String(x.menu_id ?? x.menuId ?? x.menu_key) === String(id)
            );
            if (idx === -1) {
                next.push({
                    user_level_id: selectedLevelId,
                    // karena menu dari DB (numeric), id kemungkinan numeric -> akan dikirim sebagai menu_id saat saveBulk
                    // untuk konsistensi di memori, simpan di menu_key juga tidak masalah, backend upsert menangani keduanya
                    menu_key: String(id),
                    view: false,
                    add: false,
                    edit: false,
                    delete: false,
                    approve: false,
                    [key]: val,
                });
            } else {
                next[idx] = { ...next[idx], [key]: val };
            }
            return next;
        });
    };

    // Toggle seluruh kolom
    const onToggleAllColumn = (
        key: keyof Omit<MatrixRow, "id" | "label">,
        val: boolean
    ) => {
        setRawMatrix((prev) => {
            const next = [...prev];
            const indexByMenu = new Map<string, number>();
            next.forEach((x, i) => {
                if (String(x.user_level_id) === String(selectedLevelId)) {
                    const k = String(x.menu_id ?? x.menuId ?? x.menu_key);
                    if (!indexByMenu.has(k)) indexByMenu.set(k, i);
                }
            });
            rows.forEach((r) => {
                const k = String(r.id);
                const idx = indexByMenu.get(k);
                if (idx === undefined) {
                    next.push({
                        user_level_id: selectedLevelId,
                        menu_key: String(k),
                        view: false,
                        add: false,
                        edit: false,
                        delete: false,
                        approve: false,
                        [key]: val,
                    });
                } else {
                    next[idx] = { ...next[idx], [key]: val };
                }
            });
            return next;
        });
    };

    // SAVE per level
    async function handleSaveLevel() {
        if (!selectedLevelId) return;
        if (!rows.length) return;

        // saveAccessControlMatrixBulk akan otomatis kirim menu_id (numeric) atau menu_key (string)
        const res = await saveAccessControlMatrixBulk(
            String(selectedLevelId),
            rows
        );
        if (!res?.success)
            throw new Error(res?.message || "Gagal menyimpan izin (bulk).");

        const fresh = await fetchData("access_control_matrices");
        setRawMatrix(Array.isArray(fresh) ? fresh : []);
    }

    // RESET
    async function handleResetLevel() {
        setSearchTerm("");
        setExpanded({});
        const fresh = await fetchData("access_control_matrices");
        setRawMatrix(Array.isArray(fresh) ? fresh : []);
    }

    return (
        <>
            {/* Top bar / Breadcrumb */}
            <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <SidebarTrigger className="-ml-1 h-7 w-7 border border-border text-foreground hover:bg-accent hover:text-foreground dark:border-white/30" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb className="min-w-0">
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink
                                href="/"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Dashboard
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem className="truncate">
                            <BreadcrumbPage className="text-foreground">
                                Access Control Matrix
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="flex flex-1 flex-col">
                <div className="space-y-4 md:space-y-6 p-3 md:p-4">
                    <AccessControlMatrixHeader
                        onAdd={() => {}}
                        onSave={handleSaveLevel}
                        onReset={handleResetLevel}
                    />

                    <AccessControlLevelPicker
                        levels={levels}
                        selectedLevelId={selectedLevelId}
                        setSelectedLevelId={setSelectedLevelId}
                    />

                    <AccessControlStats
                        totalMenus={stats.totalMenus}
                        viewCount={stats.viewCount}
                        addCount={stats.addCount}
                        editCount={stats.editCount}
                        deleteCount={stats.deleteCount}
                        approveCount={stats.approveCount}
                    />

                    <ResultsInfo
                        total={rows.length}
                        currentPage={1}
                        itemsPerPage={ITEMS_PER_PAGE}
                    />

                    <AccessControlMatrixFilters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />

                    {/* Desktop: tabel (tree), Mobile: kartu hierarki */}
                    <div className="hidden md:block">
                        <AccessControlMatrixTable
                            rows={rows}
                            tree={tree}
                            expanded={expanded}
                            setExpanded={setExpanded}
                            onToggleRow={onToggleRow}
                            onToggleAllColumn={onToggleAllColumn}
                        />
                    </div>

                    <div className="md:hidden">
                        <AccessControlMatrixCardsMobile
                            tree={tree}
                            rows={rows}
                            onToggleRow={onToggleRow}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
