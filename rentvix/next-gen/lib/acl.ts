// lib/acl.ts
export type Perm = {
    menu_id: number | null;
    menu_key: string | null;
    view: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
    approve: boolean;
};

export function buildPermIndex(perms: Perm[]) {
    const byId = new Map<number, Perm>();
    const byKey = new Map<string, Perm>();
    for (const p of perms) {
        if (p.menu_id != null) byId.set(p.menu_id, p);
        if (p.menu_key) byKey.set(p.menu_key, p);
    }
    return { byId, byKey };
}

/** Return true jika menu diizinkan tampil (punya view=true) */
export function canView(
    acmKeyOrId: string | number,
    idx: ReturnType<typeof buildPermIndex>
) {
    if (typeof acmKeyOrId === "number") {
        const p = idx.byId.get(acmKeyOrId);
        return !!(p && p.view);
    }
    const p = idx.byKey.get(acmKeyOrId);
    return !!(p && p.view);
}
