export function mapFeatureRow(r: any) {
    // normalizer helper
    const pick = <T = any>(...vals: any[]): T | undefined =>
        vals.find((v) => v !== undefined && v !== null);

    // item type
    const rawType = String(
        pick(r.item_type, r.itemType, r.type, "FEATURE")
    ).toUpperCase();
    const item_type = rawType === "SUBFEATURE" ? "SUBFEATURE" : "FEATURE";

    // module: jangan paksa "General"; biarkan kosong untuk fitur global
    const module_name =
        pick(
            r.module_name,
            r.moduleName,
            r.module,
            r.menu?.module_name,
            r.menu?.moduleName
        ) ?? "";

    // active flag
    const is_active = Boolean(
        pick(r.is_active, r.isActive) ?? (r.deletedAt ? false : true)
    );

    // price & trial
    const price_addon = Number(pick(r.price_addon, r.priceAddon, 0));
    const trial_available = Boolean(
        pick(r.trial_available, r.trialAvailable, false)
    );
    const trial_days = pick(r.trial_days, r.trialDays, null);

    // parent (kirim id & code kalau ada)
    const parent_id =
        pick(r.parent_id, r.parentId) != null
            ? String(pick(r.parent_id, r.parentId))
            : null;
    const parent_code =
        pick(r.parent_code, r.parentCode) != null
            ? String(pick(r.parent_code, r.parentCode))
            : undefined;

    return {
        id: String(pick(r.id, r.feature_id, "")),
        feature_code: String(
            pick(r.feature_code, r.featureCode, r.code, r.slug, "")
        ),
        name: String(pick(r.name, r.title, "")),
        description: pick(r.description) ? String(r.description) : "",
        module_name, // "" => dianggap Global di FE
        item_type, // FEATURE | SUBFEATURE
        parent_id, // boleh null
        parent_code, // optional, kalau ada
        is_active,
        order_number: Number(pick(r.order_number, r.orderNumber, r.sort, 0)),
        price_addon,
        trial_available,
        trial_days: trial_days === null ? null : Number(trial_days),
        created_at: pick(r.created_at, r.createdAt, null),
        updated_at: pick(r.updated_at, r.updatedAt, null),
        product_code: String(
            pick(r.product_code, r.productCode, process.env.PRODUCT_CODE, "")
        ),
    };
}

export function mapMenuRow(r: any) {
    return {
        id: r.id != null ? Number(r.id) : 0,
        parent_id: r.parent_id ?? null,
        title: String(r.title ?? r.name ?? "Menu"),
        icon: String(r.icon ?? ""),
        route_path: String(r.route_path ?? r.path ?? ""),
        order_number: Number(r.order_number ?? r.order ?? 0),
        is_active: Boolean(r.is_active ?? true),
        product_code: String(r.product_code ?? process.env.PRODUCT_CODE ?? ""),
        type: String(r.type ?? "menu"),
    };
}

export function productMeta() {
    return {
        product_code: String(process.env.PRODUCT_CODE ?? "TIRTABENING"),
        product_name: String(process.env.PRODUCT_NAME ?? "Tirta Bening"),
        description: "Water metering & billing.",
        category: "Utilities",
        status: "Active",
    };
}
