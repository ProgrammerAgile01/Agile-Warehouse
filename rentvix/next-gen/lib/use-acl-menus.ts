// src/lib/hooks/use-acl-menus.ts
"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchMenusTree, fetchPermsForLevel } from "@/lib/api";
import { buildPermIndex, canView, type Perm } from "@/lib/acl";
import * as Icons from "lucide-react";

type ApiNode = {
    id: number | string;
    title: string;
    type?: "group" | "module" | "menu";
    level?: number;
    route_path?: string | null;
    icon?: string | null;
    color?: string | null;
    children?: ApiNode[];
};

// Sidebar expects array of "modules" berkelompok, contoh:
// { id, groupId, groupName, groupColor, label, icon, iconBg, iconColor, items:[{label, href, icon}], nestedItems:[{id,label,items:[...] }] }
export function useAclMenus(opts: {
    productCode?: string;
    levelId: number | string;
}) {
    const { productCode, levelId } = opts;
    const [loading, setLoading] = useState(true);
    const [menuItems, setMenuItems] = useState<any[]>([]); // <- inilah yang dipakai Sidebar & MobileMenuDrawer

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setLoading(true);
                const [tree, perms] = await Promise.all([
                    fetchMenusTree(
                        productCode ? { product_code: productCode } : undefined
                    ),
                    fetchPermsForLevel(levelId),
                ]);

                // Simpan perms ke localStorage bila mau (opsional):
                // setPerms(perms);

                const idx = buildPermIndex(perms as Perm[]);

                // Map API tree → struktur sidebar, sekaligus filter berdasarkan canView(menu_id)
                const mapped = mapTreeToSidebarItems(tree as ApiNode[], idx);
                if (alive) setMenuItems(mapped);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, [productCode, levelId]);

    return { loading, items: menuItems };
}

/* ================= Helpers ================= */

function resolveIcon(name?: string | null) {
    if (!name) return Icons.Folder;
    const key =
        name in Icons
            ? (name as keyof typeof Icons)
            : (pascal(name) as keyof typeof Icons);
    return Icons[key] || Icons.Folder;
}
function pascal(s: string) {
    return s
        .replace(/[-_ ]+/g, " ")
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join("");
}

// warna/icon style sederhana agar tetap cocok dengan UI kamu
const defaultIconBg = "bg-muted/40";
const defaultIconColor = "text-muted-foreground";
const defaultBorder = "border-border";

function mapTreeToSidebarItems(
    roots: ApiNode[],
    idx: ReturnType<typeof buildPermIndex>
) {
    // Normalisasi type bila kosong
    const normalizeType = (n: ApiNode): "group" | "module" | "menu" => {
        const t = String(n.type ?? "").toLowerCase();
        if (t === "group" || t === "module" || t === "menu") return t as any;
        const lvl = typeof n.level === "number" ? n.level : 1;
        return lvl <= 1 ? "group" : lvl === 2 ? "module" : "menu";
    };

    type Module = any; // bentuk modul sesuai Sidebar
    type Group = {
        id: string;
        name: string;
        color?: string;
        modules: Module[];
    };

    const groups: Group[] = [];

    for (const root of roots) {
        const t = normalizeType(root);
        if (t !== "group") {
            // bungkus non-group pada root
            const g: Group = {
                id: "ungrouped",
                name: "Ungrouped",
                color: "#94a3b8",
                modules: [],
            };
            groups.push(g);
            pushNodeIntoGroup(g, root, idx, normalizeType);
        } else {
            const g: Group = {
                id: String(root.id),
                name: root.title,
                color: root.color || undefined,
                modules: [],
            };
            groups.push(g);
            for (const ch of root.children || [])
                pushNodeIntoGroup(g, ch, idx, normalizeType);
        }
    }

    // Bersihkan group kosong & urutkan count
    groups.forEach((g) => {
        g.modules = g.modules.filter((m) => hasAnyItem(m));
        g.modules.forEach((m) => (m.count = countLeafs(m)));
        g.modules.sort((a, b) => (a.count ?? 0) - (b.count ?? 0));
    });

    const allModules = groups.flatMap((g) =>
        g.modules.map((m) => ({
            ...m,
            groupId: g.id,
            groupName: g.name,
            groupColor: g.color,
        }))
    );

    return allModules;
}

function pushNodeIntoGroup(
    group: any,
    node: ApiNode,
    idx: ReturnType<typeof buildPermIndex>,
    normalizeType: (n: ApiNode) => "group" | "module" | "menu"
) {
    const t = normalizeType(node);
    if (t === "menu") {
        // menu langsung di bawah group → bungkus jadi module pseudo
        const Icon = resolveIcon(node.icon);
        const mod = {
            id: `${group.id}::auto_${node.id}`,
            label: group.name,
            icon: Icon,
            iconBg: defaultIconBg,
            iconColor: defaultIconColor,
            borderColor: defaultBorder,
            activeBorder: "border-primary/40",
            items: [],
            nestedItems: [],
        };
        const leaf = menuLeafFrom(node, idx);
        if (leaf) mod.items.push(leaf);
        if (hasAnyItem(mod)) group.modules.push(mod);
        return;
    }

    // module / submodule
    const Icon = resolveIcon(node.icon);
    const mod = {
        id: String(node.id),
        label: node.title,
        icon: Icon,
        iconBg: defaultIconBg,
        iconColor: defaultIconColor,
        borderColor: defaultBorder,
        activeBorder: "border-primary/40",
        items: [] as any[],
        nestedItems: [] as any[],
    };

    // anak-anak: bisa campur menu & module (jadikan nestedItems)
    const menus: ApiNode[] = [];
    const subs: ApiNode[] = [];
    for (const ch of node.children || []) {
        const ct = normalizeType(ch);
        if (ct === "menu") menus.push(ch);
        else subs.push(ch);
    }

    for (const m of menus) {
        const leaf = menuLeafFrom(m, idx);
        if (leaf) mod.items.push(leaf);
    }

    // submodule → nestedItems
    for (const sm of subs) {
        const nested = {
            id: String(sm.id),
            label: sm.title,
            icon: resolveIcon(sm.icon),
            items: [] as any[],
        };
        const smMenus = sm.children || [];
        for (const ch of smMenus) {
            if (normalizeType(ch) !== "menu") continue;
            const leaf = menuLeafFrom(ch, idx);
            if (leaf) nested.items.push(leaf);
        }
        if (nested.items.length) mod.nestedItems.push(nested);
    }

    if (hasAnyItem(mod)) group.modules.push(mod);
}

function menuLeafFrom(n: ApiNode, idx: ReturnType<typeof buildPermIndex>) {
    const idNum = Number(n.id);
    // tampilkan hanya kalau boleh view
    if (!canView(idNum, idx)) return null;
    return {
        id: idNum,
        label: n.title,
        labelKey: n.title,
        href: n.route_path || "/#",
        icon: resolveIcon(n.icon),
    };
}

function hasAnyItem(mod: any) {
    return (
        (mod.items?.length ?? 0) > 0 ||
        (mod.nestedItems?.some((ni: any) => (ni.items?.length ?? 0) > 0) ??
            false)
    );
}
function countLeafs(mod: any) {
    return (
        (mod.items?.length ?? 0) +
        (mod.nestedItems?.reduce(
            (a: number, ni: any) => a + (ni.items?.length ?? 0),
            0
        ) ?? 0)
    );
}
