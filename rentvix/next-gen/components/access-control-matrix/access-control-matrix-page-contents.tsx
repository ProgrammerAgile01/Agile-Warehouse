"use client";

import {
    Edit,
    Eye,
    Plus,
    Trash2,
    ChevronRight,
    ChevronDown,
    Save,
    RotateCcw,
    BadgeCheck,
    ArrowLeft,
} from "lucide-react";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

/* ======================= Types ======================= */
export type MatrixRow = {
    id: string | number;
    label: string;
    view: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
    approve: boolean;
};

export type MenuNode = { type: "menu"; id: string; label: string };
export type ModuleNode = {
    type: "module";
    id: string;
    label: string;
    children: Array<MenuNode | ModuleNode>;
};
export type GroupNode = {
    type: "group";
    id: string;
    label: string;
    children: ModuleNode[];
};
export type TreeNode = GroupNode | ModuleNode | MenuNode;

export function isParent(n: TreeNode): n is GroupNode | ModuleNode {
    return n.type !== "menu";
}

/* ======================= Header (lebih responsif) ======================= */
export function AccessControlMatrixHeader({
    onAdd,
    onSave,
    onReset,
}: {
    onAdd: () => void;
    onSave?: () => void;
    onReset?: () => void;
}) {
    return (
        <div className="sticky top-16 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 -mx-4 px-4 pt-2 pb-3">
            {/* Back hanya mobile */}
            <div className="mb-1 md:hidden">
                <Link href="/" className="inline-flex">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="
              gap-2
              text-foreground dark:text-foreground
              hover:bg-accent/60 dark:hover:bg-accent/30
              data-[state=open]:bg-accent/60
            "
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Kembali</span>
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                {/* Title + subtitle */}
                <div className="min-w-0">
                    <h1 className="text-lg md:text-2xl font-bold text-foreground truncate">
                        Access Control Matrix
                    </h1>
                    <p className="text-muted-foreground text-xs md:text-sm truncate">
                        Manage permissions for each user level
                    </p>
                </div>

                {/* Aksi */}
                <div className="flex w-full sm:w-auto flex-wrap sm:flex-nowrap gap-2 sm:justify-end overflow-x-auto sm:overflow-visible no-scrollbar -mx-1 px-1">
                    {onReset && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onReset}
                            className="
                shrink-0 whitespace-nowrap
                text-foreground dark:text-foreground
                border-border dark:border-border
                hover:bg-accent/60 dark:hover:bg-accent/30
                bg-transparent
              "
                        >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Reset
                        </Button>
                    )}

                    {onSave && (
                        <Button
                            size="sm"
                            onClick={onSave}
                            className="shrink-0 whitespace-nowrap"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                        </Button>
                    )}

                    <Button
                        onClick={onAdd}
                        variant="secondary"
                        size="sm"
                        className="shrink-0 whitespace-nowrap"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Access Control Matrix
                    </Button>
                </div>
            </div>
        </div>
    );
}

/* ======================= Filters ======================= */
export function AccessControlMatrixFilters({
    searchTerm,
    setSearchTerm,
}: {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
}) {
    return (
        <Card>
            <CardContent className="p-3 md:p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 min-w-0">
                        <Input
                            placeholder="Search menu..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="text-foreground placeholder:text-muted-foreground"
                        />
                    </div>
                    <div className="flex gap-2">{/* placeholder */}</div>
                </div>
            </CardContent>
        </Card>
    );
}

/* ======================= Level Picker ======================= */
export function AccessControlLevelPicker({
    levels,
    selectedLevelId,
    setSelectedLevelId,
}: {
    levels: { id: string | number; nama_level: string; status?: string }[];
    selectedLevelId: string | number | null;
    setSelectedLevelId: (v: string | number | null) => void;
}) {
    const selected = levels.find(
        (l) => String(l.id) === String(selectedLevelId)
    );
    const badge =
        String(selected?.status ?? "").toLowerCase() === "aktif" ? (
            <Badge variant="secondary" className="ml-2 text-[10px]">
                Aktif
            </Badge>
        ) : (
            <Badge variant="destructive" className="ml-2 text-[10px]">
                Nonaktif
            </Badge>
        );

    return (
        <Card>
            <CardContent className="p-3 md:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <div className="text-sm text-muted-foreground">
                        Select User Level
                    </div>
                    <Select
                        value={
                            selectedLevelId !== null
                                ? String(selectedLevelId)
                                : undefined
                        }
                        onValueChange={(v) => setSelectedLevelId(v)}
                    >
                        <SelectTrigger className="w-full sm:w-[260px]">
                            <SelectValue placeholder="Pilih Level User" />
                        </SelectTrigger>
                        <SelectContent>
                            {levels.map((lv) => (
                                <SelectItem
                                    key={String(lv.id)}
                                    value={String(lv.id)}
                                >
                                    <div className="flex items-center">
                                        <span className="truncate">
                                            {lv.nama_level}
                                        </span>
                                        <span className="ml-2 text-[10px] text-muted-foreground">
                                            {lv.status}
                                        </span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {selected && <div className="sm:ml-1">{badge}</div>}
                </div>
            </CardContent>
        </Card>
    );
}

/* ======================= Stats (lebih responsif) ======================= */
export function AccessControlStats({
    totalMenus = 0,
    viewCount = 0,
    addCount = 0,
    editCount = 0,
    deleteCount = 0,
    approveCount = 0,
}: {
    totalMenus?: number;
    viewCount?: number;
    addCount?: number;
    editCount?: number;
    deleteCount?: number;
    approveCount?: number;
}) {
    const Stat = ({
        title,
        value,
        className,
    }: {
        title: string;
        value: number | string;
        className?: string;
    }) => (
        <Card className="h-full">
            <CardContent className="p-3 md:p-4 h-full">
                <div className="h-full min-w-0 flex flex-col items-center justify-center">
                    <div
                        className={`text-2xl md:text-3xl font-extrabold leading-6 ${className} truncate`}
                    >
                        {value}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-0.5 truncate">
                        {title}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
            <Stat
                title="Total Menus"
                value={totalMenus}
                className="text-slate-900 dark:text-slate-100"
            />
            <Stat
                title="View Access"
                value={viewCount}
                className="text-blue-600 dark:text-blue-400"
            />
            <Stat
                title="Add Access"
                value={addCount}
                className="text-emerald-600 dark:text-emerald-400"
            />
            <Stat
                title="Edit Access"
                value={editCount}
                className="text-amber-600 dark:text-amber-400"
            />
            <Stat
                title="Delete Access"
                value={deleteCount}
                className="text-rose-600 dark:text-rose-400"
            />
            <Stat
                title="Approve Access"
                value={approveCount}
                className="text-violet-600 dark:text-violet-400"
            />
        </div>
    );
}

/* ======================= Results Info ======================= */
export function ResultsInfo({
    total,
    currentPage,
    itemsPerPage,
}: {
    total: number;
    currentPage: number;
    itemsPerPage: number;
}) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return (
        <div className="flex justify-between items-center">
            <p className="text-xs md:text-sm text-muted-foreground">
                Showing {startIndex + 1}-
                {Math.min(startIndex + itemsPerPage, total)} of {total} Access
                Control Matrix
            </p>
        </div>
    );
}

/* ======================= Table (Tree View) – DESKTOP ======================= */
export function AccessControlMatrixTable({
    rows,
    tree,
    expanded,
    setExpanded,
    onToggleRow,
    onToggleAllColumn,
}: {
    rows: MatrixRow[];
    tree: GroupNode[];
    expanded: Record<string, boolean>;
    setExpanded: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    onToggleRow: (
        id: MatrixRow["id"],
        key: keyof Omit<MatrixRow, "id" | "label">,
        val: boolean
    ) => void;
    onToggleAllColumn: (
        key: keyof Omit<MatrixRow, "id" | "label">,
        val: boolean
    ) => void;
}) {
    const rowsMap = new Map<string, MatrixRow>(
        rows.map((r) => [String(r.id), r])
    );

    const isCheckedAll = (k: keyof Omit<MatrixRow, "id" | "label">) =>
        rows.length > 0 && rows.every((r) => Boolean(r[k]));
    const isIndeterminate = (k: keyof Omit<MatrixRow, "id" | "label">) =>
        rows.some((r) => Boolean(r[k])) && !rows.every((r) => Boolean(r[k]));

    const toggleExp = (id: string) =>
        setExpanded({ ...expanded, [id]: !expanded[id] });

    type AnyNode = GroupNode | ModuleNode | MenuNode;
    const collectLeafIds = (node: AnyNode): string[] => {
        if ((node as any).type === "menu")
            return [String((node as MenuNode).id)];
        const children = (node as GroupNode | ModuleNode).children as AnyNode[];
        if (!Array.isArray(children)) return [];
        const out: string[] = [];
        for (const c of children) out.push(...collectLeafIds(c));
        return out;
    };

    const getNodeAgg = (
        node: AnyNode,
        k: keyof Omit<MatrixRow, "id" | "label">
    ) => {
        const ids = collectLeafIds(node);
        if (ids.length === 0) return { all: false, any: false, ids };
        let any = false;
        let all = true;
        for (const id of ids) {
            const r = rowsMap.get(String(id));
            const v = Boolean(r?.[k]);
            any = any || v;
            all = all && v;
        }
        return { all, any, ids };
    };

    const onToggleNodeColumn = (
        node: AnyNode,
        k: keyof Omit<MatrixRow, "id" | "label">,
        val: boolean
    ) => {
        const ids = collectLeafIds(node);
        for (const id of ids) onToggleRow(id, k, val);
    };

    const permCols = ["view", "add", "edit", "delete", "approve"] as const;

    const renderNode = (node: AnyNode, depth = 0) => {
        const pad = depth * 20;

        if ((node as any).type !== "menu") {
            const isOpen =
                expanded[(node as GroupNode | ModuleNode).id] ?? true;
            return (
                <TableRow key={(node as any).id}>
                    <TableCell>
                        <div
                            className="flex items-center gap-2 py-3"
                            style={{ paddingLeft: pad }}
                        >
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleExp((node as any).id)}
                                className="h-6 px-1"
                            >
                                {isOpen ? (
                                    <ChevronDown className="h-4 w-4" />
                                ) : (
                                    <ChevronRight className="h-4 w-4" />
                                )}
                            </Button>
                            <span className="font-medium">
                                {(node as any).label}
                            </span>
                        </div>
                    </TableCell>

                    {permCols.map((k) => {
                        const agg = getNodeAgg(node, k);
                        const checked = agg.all;
                        const indeterminate = agg.any && !agg.all;
                        return (
                            <TableCell
                                key={k}
                                className="text-center align-middle"
                            >
                                <div className="flex justify-center">
                                    <Checkbox
                                        checked={checked}
                                        // @ts-expect-error shadcn support indeterminate
                                        indeterminate={indeterminate}
                                        onCheckedChange={(v) =>
                                            onToggleNodeColumn(
                                                node,
                                                k,
                                                Boolean(v)
                                            )
                                        }
                                    />
                                </div>
                            </TableCell>
                        );
                    })}
                </TableRow>
            );
        }

        const leaf = node as MenuNode;
        const row =
            rowsMap.get(String(leaf.id)) ||
            ({
                id: leaf.id,
                label: leaf.label,
                view: false,
                add: false,
                edit: false,
                delete: false,
                approve: false,
            } as MatrixRow);

        return (
            <TableRow key={leaf.id}>
                <TableCell>
                    <div
                        className="flex items-center"
                        style={{ paddingLeft: 40 }}
                    >
                        {leaf.label}
                    </div>
                </TableCell>

                {permCols.map((k) => (
                    <TableCell key={k} className="text-center align-middle">
                        <div className="flex justify-center">
                            <Checkbox
                                checked={Boolean((row as any)[k])}
                                onCheckedChange={(v) =>
                                    onToggleRow(row.id, k, Boolean(v))
                                }
                            />
                        </div>
                    </TableCell>
                ))}
            </TableRow>
        );
    };

    const renderTree = (
        nodes: Array<GroupNode | ModuleNode | MenuNode>,
        depth = 0
    ): JSX.Element[] => {
        const out: JSX.Element[] = [];
        nodes.forEach((n) => {
            out.push(renderNode(n as any, depth));
            const isParent = (n as any).type !== "menu";
            if (isParent && (expanded[(n as any).id] ?? true)) {
                out.push(...renderTree((n as any).children ?? [], depth + 1));
            }
        });
        return out;
    };

    return (
        <Card>
            <CardContent className="p-0">
                <Table className="table-fixed">
                    <colgroup>
                        <col className="w-[44%]" />
                        <col className="w-[11.2%]" />
                        <col className="w-[11.2%]" />
                        <col className="w-[11.2%]" />
                        <col className="w-[11.2%]" />
                        <col className="w-[11.2%]" />
                    </colgroup>

                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-foreground">
                                All Menu
                            </TableHead>

                            {(
                                [
                                    "view",
                                    "add",
                                    "edit",
                                    "delete",
                                    "approve",
                                ] as const
                            ).map((k) => (
                                <TableHead
                                    key={k}
                                    className="text-center align-middle text-foreground"
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <Checkbox
                                            checked={isCheckedAll(k)}
                                            // @ts-expect-error shadcn support indeterminate
                                            indeterminate={isIndeterminate(k)}
                                            onCheckedChange={(v) =>
                                                onToggleAllColumn(k, Boolean(v))
                                            }
                                        />
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            {k === "view" && (
                                                <Eye className="h-3.5 w-3.5" />
                                            )}
                                            {k === "add" && (
                                                <Plus className="h-3.5 w-3.5" />
                                            )}
                                            {k === "edit" && (
                                                <Edit className="h-3.5 w-3.5" />
                                            )}
                                            {k === "delete" && (
                                                <Trash2 className="h-3.5 w-3.5" />
                                            )}
                                            {k === "approve" && (
                                                <BadgeCheck className="h-3.5 w-3.5" />
                                            )}
                                            <span className="capitalize">
                                                {k}
                                            </span>
                                        </div>
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>{renderTree(tree)}</TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

/* ======================= MOBILE CARDS – HIERARKI PENUH ======================= */
export function AccessControlMatrixCardsMobile({
    tree,
    rows,
    onToggleRow,
}: {
    tree: GroupNode[];
    rows: MatrixRow[];
    onToggleRow: (
        id: MatrixRow["id"],
        key: keyof Omit<MatrixRow, "id" | "label">,
        val: boolean
    ) => void;
}) {
    const rowMap = useMemo(
        () => new Map<string, MatrixRow>(rows.map((r) => [String(r.id), r])),
        [rows]
    );

    const [expGroup, setExpGroup] = useState<Record<string, boolean>>({});
    const [expModule, setExpModule] = useState<Record<string, boolean>>({});

    const toggleG = (id: string) =>
        setExpGroup((p) => ({ ...p, [id]: !(p[id] ?? true) }));
    const toggleM = (id: string) =>
        setExpModule((p) => ({ ...p, [id]: !(p[id] ?? true) }));

    const perms = [
        { key: "view", icon: <Eye className="h-3.5 w-3.5" />, label: "View" },
        { key: "add", icon: <Plus className="h-3.5 w-3.5" />, label: "Add" },
        { key: "edit", icon: <Edit className="h-3.5 w-3.5" />, label: "Edit" },
        {
            key: "delete",
            icon: <Trash2 className="h-3.5 w-3.5" />,
            label: "Delete",
        },
        {
            key: "approve",
            icon: <BadgeCheck className="h-3.5 w-3.5" />,
            label: "Approve",
        },
    ] as const;

    return (
        <div className="space-y-3">
            {tree.map((g) => {
                const isOpenG = expGroup[g.id] ?? true;
                return (
                    <Card key={g.id}>
                        <CardContent className="p-3">
                            {/* Group Header */}
                            <button
                                onClick={() => toggleG(g.id)}
                                className="w-full flex items-center justify-between gap-2 py-1"
                            >
                                <div className="font-semibold text-foreground text-left truncate">
                                    {g.label}
                                </div>
                                {isOpenG ? (
                                    <ChevronDown className="h-4 w-4 opacity-70" />
                                ) : (
                                    <ChevronRight className="h-4 w-4 opacity-70" />
                                )}
                            </button>

                            {isOpenG && (
                                <div className="mt-2 space-y-2">
                                    {g.children.map((m) => {
                                        const isOpenM = expModule[m.id] ?? true;

                                        return (
                                            <div
                                                key={m.id}
                                                className="rounded-md border p-2 bg-card/50"
                                            >
                                                {/* Module Header */}
                                                <button
                                                    onClick={() =>
                                                        toggleM(m.id)
                                                    }
                                                    className="w-full flex items-center justify-between gap-2"
                                                >
                                                    <div className="font-medium text-sm text-foreground text-left truncate">
                                                        {m.label}
                                                    </div>
                                                    {isOpenM ? (
                                                        <ChevronDown className="h-4 w-4 opacity-70" />
                                                    ) : (
                                                        <ChevronRight className="h-4 w-4 opacity-70" />
                                                    )}
                                                </button>

                                                {/* Module Body */}
                                                {isOpenM && (
                                                    <div className="mt-2 space-y-2">
                                                        {m.children.map(
                                                            (c: any) => {
                                                                if (
                                                                    c.type ===
                                                                    "menu"
                                                                ) {
                                                                    const r =
                                                                        rowMap.get(
                                                                            String(
                                                                                c.id
                                                                            )
                                                                        ) ||
                                                                        ({
                                                                            id: c.id,
                                                                            label: c.label,
                                                                            view: false,
                                                                            add: false,
                                                                            edit: false,
                                                                            delete: false,
                                                                            approve:
                                                                                false,
                                                                        } as MatrixRow);

                                                                    return (
                                                                        <div
                                                                            key={
                                                                                c.id
                                                                            }
                                                                            className="rounded-md border p-2"
                                                                        >
                                                                            <div className="text-sm font-medium truncate">
                                                                                {
                                                                                    c.label
                                                                                }
                                                                            </div>

                                                                            <div className="grid grid-cols-2 gap-2 mt-2">
                                                                                {perms.map(
                                                                                    (
                                                                                        p
                                                                                    ) => (
                                                                                        <div
                                                                                            key={
                                                                                                p.key
                                                                                            }
                                                                                            className="flex items-center justify-between rounded-md border p-2"
                                                                                        >
                                                                                            <div className="flex items-center gap-2 text-xs">
                                                                                                {
                                                                                                    p.icon
                                                                                                }
                                                                                                <span className="truncate">
                                                                                                    {
                                                                                                        p.label
                                                                                                    }
                                                                                                </span>
                                                                                            </div>
                                                                                            <Checkbox
                                                                                                checked={Boolean(
                                                                                                    (
                                                                                                        r as any
                                                                                                    )[
                                                                                                        p
                                                                                                            .key
                                                                                                    ]
                                                                                                )}
                                                                                                onCheckedChange={(
                                                                                                    v
                                                                                                ) =>
                                                                                                    onToggleRow(
                                                                                                        r.id,
                                                                                                        p.key as keyof Omit<
                                                                                                            MatrixRow,
                                                                                                            | "id"
                                                                                                            | "label"
                                                                                                        >,
                                                                                                        Boolean(
                                                                                                            v
                                                                                                        )
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                    )
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }

                                                                // sub-module
                                                                const sub =
                                                                    c as ModuleNode;
                                                                const isOpenSub =
                                                                    expModule[
                                                                        sub.id
                                                                    ] ?? true;

                                                                return (
                                                                    <div
                                                                        key={
                                                                            sub.id
                                                                        }
                                                                        className="rounded-md border p-2"
                                                                    >
                                                                        <button
                                                                            onClick={() =>
                                                                                toggleM(
                                                                                    sub.id
                                                                                )
                                                                            }
                                                                            className="w-full flex items-center justify-between gap-2"
                                                                        >
                                                                            <div className="font-medium text-sm truncate">
                                                                                {
                                                                                    sub.label
                                                                                }
                                                                            </div>
                                                                            {isOpenSub ? (
                                                                                <ChevronDown className="h-4 w-4 opacity-70" />
                                                                            ) : (
                                                                                <ChevronRight className="h-4 w-4 opacity-70" />
                                                                            )}
                                                                        </button>

                                                                        {isOpenSub && (
                                                                            <div className="mt-2 space-y-2">
                                                                                {sub.children.map(
                                                                                    (
                                                                                        mm: any
                                                                                    ) => {
                                                                                        const r =
                                                                                            rowMap.get(
                                                                                                String(
                                                                                                    mm.id
                                                                                                )
                                                                                            ) ||
                                                                                            ({
                                                                                                id: mm.id,
                                                                                                label: mm.label,
                                                                                                view: false,
                                                                                                add: false,
                                                                                                edit: false,
                                                                                                delete: false,
                                                                                                approve:
                                                                                                    false,
                                                                                            } as MatrixRow);

                                                                                        return (
                                                                                            <div
                                                                                                key={
                                                                                                    mm.id
                                                                                                }
                                                                                                className="rounded-md border p-2"
                                                                                            >
                                                                                                <div className="text-sm font-medium truncate">
                                                                                                    {
                                                                                                        mm.label
                                                                                                    }
                                                                                                </div>
                                                                                                <div className="grid grid-cols-2 gap-2 mt-2">
                                                                                                    {perms.map(
                                                                                                        (
                                                                                                            p
                                                                                                        ) => (
                                                                                                            <div
                                                                                                                key={
                                                                                                                    p.key
                                                                                                                }
                                                                                                                className="flex items-center justify-between rounded-md border p-2"
                                                                                                            >
                                                                                                                <div className="flex items-center gap-2 text-xs">
                                                                                                                    {
                                                                                                                        p.icon
                                                                                                                    }
                                                                                                                    <span className="truncate">
                                                                                                                        {
                                                                                                                            p.label
                                                                                                                        }
                                                                                                                    </span>
                                                                                                                </div>
                                                                                                                <Checkbox
                                                                                                                    checked={Boolean(
                                                                                                                        (
                                                                                                                            r as any
                                                                                                                        )[
                                                                                                                            p
                                                                                                                                .key
                                                                                                                        ]
                                                                                                                    )}
                                                                                                                    onCheckedChange={(
                                                                                                                        v
                                                                                                                    ) =>
                                                                                                                        onToggleRow(
                                                                                                                            r.id,
                                                                                                                            p.key as keyof Omit<
                                                                                                                                MatrixRow,
                                                                                                                                | "id"
                                                                                                                                | "label"
                                                                                                                            >,
                                                                                                                            Boolean(
                                                                                                                                v
                                                                                                                            )
                                                                                                                        )
                                                                                                                    }
                                                                                                                />
                                                                                                            </div>
                                                                                                        )
                                                                                                    )}
                                                                                                </div>
                                                                                            </div>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
