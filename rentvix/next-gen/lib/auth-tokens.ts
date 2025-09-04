// src/lib/auth-tokens.ts
export const TOKENS = {
    company: "rvx_company_token",
    user: "rvx_user_token",
    perms: "rvx_perms",
};

export function setCompanyToken(tok: string) {
    if (tok) localStorage.setItem(TOKENS.company, tok);
}
export function getCompanyToken(): string {
    return localStorage.getItem(TOKENS.company) || "";
}
export function clearCompanyToken() {
    localStorage.removeItem(TOKENS.company);
}

export function setUserToken(tok: string) {
    if (tok) localStorage.setItem(TOKENS.user, tok);
}
export function getUserToken(): string {
    return localStorage.getItem(TOKENS.user) || "";
}
export function clearUserToken() {
    localStorage.removeItem(TOKENS.user);
}

export function setPerms(perms: any[]) {
    localStorage.setItem(TOKENS.perms, JSON.stringify(perms || []));
}
export function getPerms(): any[] {
    try {
        return JSON.parse(localStorage.getItem(TOKENS.perms) || "[]");
    } catch {
        return [];
    }
}
export function clearPerms() {
    localStorage.removeItem(TOKENS.perms);
}

export function clearAllAuth() {
    clearCompanyToken();
    clearUserToken();
    clearPerms();
}

/**
 * Kembalikan header Authorization: Bearer <token> bila token ada.
 * Tidak menyetel header sama sekali bila token kosong (menghindari "Bearer ").
 */
export function authHeaders(typ: "company" | "user"): HeadersInit {
    const token = typ === "company" ? getCompanyToken() : getUserToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}
