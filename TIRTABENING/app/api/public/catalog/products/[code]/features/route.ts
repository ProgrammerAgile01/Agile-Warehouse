import type { NextRequest } from "next/server";
import { assertProductKey } from "@/lib/auth-public";
import { prisma } from "@/lib/prisma";
import { mapFeatureRow } from "@/lib/map";

export const runtime = "nodejs";

export async function GET(
    req: NextRequest,
    ctx: { params: Promise<{ code: string }> }
) {
    const err = assertProductKey(req);
    if (err) return err;

    try {
        // Next.js 15: params harus di-await
        const { code } = await ctx.params;
        const productCode = String(code || "").trim();
        if (!productCode) {
            return Response.json({ message: "Missing code" }, { status: 400 });
        }

        // ⚠️ Model Feature kamu tidak punya productCode / moduleName / isActive.
        // Pakai filter yang ada saja. Anggap "aktif" = deletedAt NULL.
        // Jika app ini single-product, tidak perlu filter by product.
        // Jika multi-product, lakukan filter via relasi (misal menu.productCode) — bisa ditambahkan nanti kalau ada.
        const rows = await prisma.Feature.findMany({
            where: {
                deletedAt: null, // aktif
                // type: { in: ['FEATURE', 'SUBFEATURE'] } // optional kalau enum-nya ada
            },
            orderBy: [{ orderNumber: "asc" }], // JANGAN pakai moduleName karena tidak ada
        });

        const data = (rows ?? []).map(mapFeatureRow); // mapper akan fallback module_name='General'
        return Response.json({ data }, { status: 200 });
    } catch (e: any) {
        console.error("TB features public error:", e);
        return Response.json(
            {
                message: "Internal error (features)",
                error: String(e?.message ?? e),
            },
            { status: 500 }
        );
    }
}
