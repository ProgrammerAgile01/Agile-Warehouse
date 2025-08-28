"use client"

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
} from "lucide-react"

import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from "@/components/ui/sidebar"
import { useLanguage } from "@/lib/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const menuItems = [
  {
    id: "transactions",
    icon: Car,
    labelKey: "transactions" as const,
    description: "Manage bookings and payments",
    descriptionId: "Kelola booking dan pembayaran",
    color: "from-blue-500 to-cyan-500",
    iconBg: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-200 dark:border-blue-800",
    hoverBorder: "hover:border-blue-300 dark:hover:border-blue-700",
    activeBorder: "border-blue-400 dark:border-blue-600",
    count: 24,
    items: [
      { icon: Calendar, labelKey: "bookingRental" as const, href: "/bookings" },
      { icon: Calendar, labelKey: "rentalSchedule" as const, href: "/schedule" },
      { icon: FileText, labelKey: "digitalContract" as const, href: "/contracts" },
      { icon: ArrowRightLeft, labelKey: "vehicleHandover" as const, href: "/handover" },
      { icon: RotateCcw, labelKey: "vehicleReturn" as const, href: "/returns" },
      { icon: CreditCard, labelKey: "invoicePayment" as const, href: "/invoices" },
    ],
  },
  {
    id: "operations",
    icon: Wrench,
    labelKey: "operations" as const,
    description: "Vehicle and driver management",
    descriptionId: "Manajemen kendaraan dan driver",
    color: "from-green-500 to-emerald-500",
    iconBg: "bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950/50 dark:to-green-900/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-700",
    activeBorder: "border-emerald-400 dark:border-emerald-600",
    count: 18,
    items: [
      { icon: Car, labelKey: "vehicleManagement" as const, href: "/vehicle" },
      { icon: Calendar, labelKey: "maintenanceSchedule" as const, href: "/maintenance/schedule" },
      { icon: History, labelKey: "maintenanceHistory" as const, href: "/maintenance/history" },
      { icon: UserCheck, labelKey: "driverCrew" as const, href: "/drivers" },
      { icon: Wallet, labelKey: "driverAllowance" as const, href: "/driver-allowance" },
      { icon: Fuel, labelKey: "fuelMonitoring" as const, href: "/fuel-monitoring" },
    ],
  },
  {
    id: "reports",
    icon: BarChart3,
    labelKey: "reports" as const,
    description: "Analytics and reports",
    descriptionId: "Analitik dan laporan",
    color: "from-purple-500 to-violet-500",
    iconBg: "bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-950/50 dark:to-purple-900/50",
    iconColor: "text-violet-600 dark:text-violet-400",
    borderColor: "border-violet-200 dark:border-violet-800",
    hoverBorder: "hover:border-violet-300 dark:hover:border-violet-700",
    activeBorder: "border-violet-400 dark:border-violet-600",
    count: 12,
    items: [
      { icon: TrendingUp, labelKey: "transactionReports" as const, href: "/reports/transactions" },
      { icon: Car, labelKey: "vehicleUsageReports" as const, href: "/reports/usage" },
      { icon: DollarSign, labelKey: "financialReports" as const, href: "/reports/financial" },
      { icon: PieChart, labelKey: "profitLossPerUnit" as const, href: "/reports/profit-loss" },
      { icon: Activity, labelKey: "fleetKpiStats" as const, href: "/reports/kpi" },
    ],
  },
  {
    id: "master-data",
    icon: Package,
    labelKey: "masterData" as const,
    description: "Master data configuration",
    descriptionId: "Konfigurasi data master",
    color: "from-indigo-500 to-blue-500",
    iconBg: "bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-950/50 dark:to-blue-900/50",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    borderColor: "border-indigo-200 dark:border-indigo-800",
    hoverBorder: "hover:border-indigo-300 dark:hover:border-indigo-700",
    activeBorder: "border-indigo-400 dark:border-indigo-600",
    count: 15,
    isNested: true,
    nestedItems: [
      {
        id: "vehicles-master",
        icon: Car,
        label: "Kendaraan",
        items: [
          { icon: Car, label: "Tipe Kendaraan", href: "/master-data/vehicle-types" },
          { icon: Fuel, label: "Jenis BBM", href: "/master-data/fuel-types" },
          { icon: Zap, label: "Jenis Transmisi", href: "/master-data/transmission-types" },
          { icon: Palette, label: "Warna Kendaraan", href: "/master-data/vehicle-colors" },
        ],
      },
      {
        id: "customers-master",
        icon: Users,
        label: "Pelanggan",
        items: [{ icon: Users, label: "Data Pelanggan", href: "/master-data/customers" }],
      },
      {
        id: "drivers-master",
        icon: UserCheck,
        label: "Driver",
        items: [
          { icon: IdCard, label: "Jenis SIM", href: "/master-data/license-types" },
          { icon: Star, label: "Level Driver", href: "/master-data/driver-levels" },
        ],
      },
      {
        id: "finance-master",
        icon: DollarSign,
        label: "Keuangan",
        items: [
          { icon: Wallet, label: "Kategori Kas", href: "/master-data/cash-categories" },
          { icon: Building, label: "Bank Tujuan", href: "/master-data/banks" },
        ],
      },
    ],
  },
  {
    id: "users",
    icon: UserCog,
    labelKey: "users" as const,
    description: "Manage user access and permissions",
    descriptionId: "Kelola akses dan izin pengguna",
    color: "from-slate-500 to-gray-500",
    iconBg: "bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-950/50 dark:to-gray-900/50",
    iconColor: "text-slate-600 dark:text-slate-400",
    borderColor: "border-slate-200 dark:border-slate-800",
    hoverBorder: "hover:border-slate-300 dark:hover:border-slate-700",
    activeBorder: "border-slate-400 dark:border-slate-600",
    count: 3,
    items: [
      { icon: Shield, labelKey: "userLevels" as const, href: "/users/levels" },
      { icon: Lock, labelKey: "accessControl" as const, href: "/users/access-control" },
      { icon: UserPlus, labelKey: "userData" as const, href: "/users/data" },
    ],
  },
  {
    id: "settings",
    icon: Settings,
    labelKey: "settings" as const,
    description: "System configuration",
    descriptionId: "Konfigurasi sistem",
    color: "from-orange-500 to-red-500",
    iconBg: "bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/50 dark:to-orange-900/50",
    iconColor: "text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-200 dark:border-amber-800",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
    activeBorder: "border-amber-400 dark:border-amber-600",
    count: 8,
    items: [
      { icon: Receipt, labelKey: "rentalPricing" as const, href: "/settings/pricing" },
      { icon: Shield, labelKey: "accessRights" as const, href: "/settings/access" },
      { icon: MessageSquare, labelKey: "whatsappSender" as const, href: "/settings/whatsapp" },
      { icon: Bell, labelKey: "remindersNotifications" as const, href: "/settings/notifications" },
      { icon: FileText, labelKey: "contractTemplates" as const, href: "/settings/templates" },
    ],
  },
  {
    id: "customers",
    icon: Users,
    labelKey: "customers" as const,
    description: "Customer management",
    descriptionId: "Manajemen pelanggan",
    color: "from-pink-500 to-rose-500",
    iconBg: "bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-950/50 dark:to-pink-900/50",
    iconColor: "text-rose-600 dark:text-rose-400",
    borderColor: "border-rose-200 dark:border-rose-800",
    hoverBorder: "hover:border-rose-300 dark:hover:border-rose-700",
    activeBorder: "border-rose-400 dark:border-rose-600",
    count: 156,
    items: [
      { icon: Database, labelKey: "customerData" as const, href: "/customers" },
      { icon: LogIn, labelKey: "customerLogin" as const, href: "/customers/login" },
      { icon: History, labelKey: "bookingHistory" as const, href: "/customers/history" },
      { icon: Gift, labelKey: "couponsRewards" as const, href: "/customers/rewards" },
      { icon: Share2, labelKey: "shareApp" as const, href: "/customers/share" },
    ],
  },
  {
    id: "support",
    icon: HelpCircle,
    labelKey: "support" as const,
    description: "Help and documentation",
    descriptionId: "Bantuan dan dokumentasi",
    color: "from-teal-500 to-cyan-500",
    iconBg: "bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-950/50 dark:to-cyan-900/50",
    iconColor: "text-teal-600 dark:text-teal-400",
    borderColor: "border-teal-200 dark:border-teal-800",
    hoverBorder: "hover:border-teal-300 dark:hover:border-teal-700",
    activeBorder: "border-teal-400 dark:border-teal-600",
    count: 4,
    items: [
      { icon: BookOpen, labelKey: "manualBook" as const, href: "/support/manual" },
      { icon: HelpCircle, labelKey: "faq" as const, href: "/support/faq" },
      { icon: Video, labelKey: "tutorialVideos" as const, href: "/support/tutorials" },
      { icon: MessageCircle, labelKey: "contactSupport" as const, href: "/support/contact" },
    ],
  },
]

// Shared Sidebar Component (used for both mobile and desktop)
function SharedSidebar() {
  const { t, language } = useLanguage()
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [expandedNestedItems, setExpandedNestedItems] = useState<string[]>([])
  const router = useRouter()
  const pathname = usePathname()
  const { isMobile, state } = useSidebar()

  // Auto-select the module based on the current path
  useEffect(() => {
    // Check if we're in a customer page
    if (pathname.startsWith("/customers")) {
      setSelectedModule("customers")
    } else if (pathname.startsWith("/master-data")) {
      setSelectedModule("master-data")
    } else if (pathname.startsWith("/users")) {
      setSelectedModule("users")
    } else {
      // Check other modules
      for (const module of menuItems) {
        if (module.items) {
          const isInModule = module.items.some((item) => pathname.startsWith(item.href))
          if (isInModule) {
            setSelectedModule(module.id)
            break
          }
        }
      }
    }
  }, [pathname])

  const handleNavigation = (href: string) => {
    router.push(href)
    // Close sidebar after navigation on mobile
    if (isMobile) {
      const sidebarTrigger = document.querySelector('[data-sidebar="trigger"]') as HTMLButtonElement
      if (sidebarTrigger) {
        sidebarTrigger.click()
      }
    }
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const toggleNestedItem = (itemId: string) => {
    setExpandedNestedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  // Master Data Nested Submenu View
  if (selectedModule === "master-data") {
    const module = menuItems.find((m) => m.id === selectedModule)
    if (!module) return null

    return (
      <div className="flex flex-col h-full bg-background text-foreground">
        <SidebarHeader className="border-b border-border/50 p-4 bg-gradient-to-r from-muted/30 to-muted/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedModule(null)}
              className="p-2 hover:bg-muted/60 text-foreground hover:text-foreground rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className={`p-2.5 rounded-xl ${module.iconBg} shadow-sm`}>
              <module.icon className={`h-5 w-5 ${module.iconColor}`} />
            </div>
            {(!isMobile || state === "expanded") && (
              <div>
                <h3 className="font-semibold text-foreground text-sm">Master Data</h3>
                <p className="text-xs text-muted-foreground">
                  {language === "id" ? module.descriptionId : module.description}
                </p>
              </div>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className="p-4 flex-1 overflow-y-auto sidebar-scrollbar bg-background">
          <div className="space-y-2">
            {module.nestedItems?.map((nestedItem) => (
              <Collapsible
                key={nestedItem.id}
                open={expandedNestedItems.includes(nestedItem.id)}
                onOpenChange={() => toggleNestedItem(nestedItem.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-12 rounded-xl transition-all duration-200 text-foreground hover:bg-muted/60 hover:text-foreground"
                  >
                    <nestedItem.icon className="h-4 w-4" />
                    {(!isMobile || state === "expanded") && (
                      <>
                        <span className="text-sm font-medium flex-1 text-left">{nestedItem.label}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            expandedNestedItems.includes(nestedItem.id) ? "rotate-180" : ""
                          }`}
                        />
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-1">
                  {nestedItem.items.map((subItem) => (
                    <Button
                      key={subItem.href}
                      variant="ghost"
                      className={`w-full justify-start gap-3 h-10 rounded-lg ml-6 transition-all duration-200 ${
                        isActive(subItem.href)
                          ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 shadow-sm"
                          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                      }`}
                      onClick={() => handleNavigation(subItem.href)}
                    >
                      <subItem.icon className={`h-3.5 w-3.5 ${isActive(subItem.href) ? "text-primary" : ""}`} />
                      {(!isMobile || state === "expanded") && (
                        <>
                          <span className="text-xs font-medium">{subItem.label}</span>
                          {isActive(subItem.href) && <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full" />}
                        </>
                      )}
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </SidebarContent>
      </div>
    )
  }

  // Regular Submenu View (for other modules)
  if (selectedModule && selectedModule !== "master-data") {
    const module = menuItems.find((m) => m.id === selectedModule)
    if (!module || !module.items) return null

    return (
      <div className="flex flex-col h-full bg-background text-foreground">
        <SidebarHeader className="border-b border-border/50 p-4 bg-gradient-to-r from-muted/30 to-muted/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedModule(null)}
              className="p-2 hover:bg-muted/60 text-foreground hover:text-foreground rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className={`p-2.5 rounded-xl ${module.iconBg} shadow-sm`}>
              <module.icon className={`h-5 w-5 ${module.iconColor}`} />
            </div>
            {(!isMobile || state === "expanded") && (
              <div>
                <h3 className="font-semibold text-foreground text-sm">{t(module.labelKey)}</h3>
                <p className="text-xs text-muted-foreground">
                  {language === "id" ? module.descriptionId : module.description}
                </p>
              </div>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className="p-4 flex-1 overflow-y-auto sidebar-scrollbar bg-background">
          <div className="space-y-2">
            {module.items.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className={`w-full justify-start gap-3 h-12 rounded-xl transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 shadow-sm"
                    : "text-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
                onClick={() => handleNavigation(item.href)}
              >
                <item.icon className={`h-4 w-4 ${isActive(item.href) ? "text-primary" : ""}`} />
                {(!isMobile || state === "expanded") && (
                  <>
                    <span className="text-sm font-medium">{t(item.labelKey)}</span>
                    {isActive(item.href) && <div className="ml-auto w-2 h-2 bg-primary rounded-full" />}
                  </>
                )}
              </Button>
            ))}
          </div>
        </SidebarContent>
      </div>
    )
  }

  // Main Menu View
  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <SidebarHeader className="border-b border-border/50 p-4 bg-gradient-to-r from-muted/30 to-muted/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary shadow-lg ring-2 ring-primary/20">
            <img src="/rentvix-logo.png" alt="RentVix" className="h-7 w-7 object-contain" />
          </div>
          {(!isMobile || state === "expanded") && (
            <div>
              <h2 className="text-base font-bold text-foreground font-space-grotesk tracking-tight">RentVix</h2>
              <p className="text-xs text-muted-foreground font-manrope">Pro Dashboard</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto sidebar-scrollbar bg-background">
        <div className="p-4">
          {/* Dashboard Card */}
          <Card
            className={`mb-6 cursor-pointer transition-all duration-300 rounded-xl shadow-sm hover:shadow-md bg-card border-border ${
              isActive("/")
                ? "border-primary/40 bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/60"
                : "hover:border-primary/30 hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10"
            }`}
            onClick={() => handleNavigation("/")}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/30 shadow-sm">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                {(!isMobile || state === "expanded") && (
                  <>
                    <div className="flex-1">
                      <h3 className="font-semibold text-card-foreground text-sm">{t("dashboard")}</h3>
                      <p className="text-xs text-muted-foreground">
                        {language === "id" ? "Ringkasan dan statistik" : "Overview and statistics"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isActive("/") && <div className="w-2 h-2 bg-primary rounded-full" />}
                      <ChevronRight
                        className={`h-4 w-4 transition-colors ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}
                      />
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Module Cards */}
          <div className="space-y-3">
            {menuItems.map((module) => {
              const hasActiveItem = module.items
                ? module.items.some((item) => isActive(item.href))
                : (module.id === "master-data" && pathname.startsWith("/master-data")) ||
                  (module.id === "users" && pathname.startsWith("/users"))

              return (
                <Card
                  key={module.id}
                  className={`cursor-pointer transition-all duration-300 group rounded-xl shadow-sm hover:shadow-md bg-card border-border ${
                    hasActiveItem
                      ? `${module.activeBorder} bg-gradient-to-br from-muted/30 to-muted/10 hover:${module.hoverBorder}`
                      : `${module.borderColor} ${module.hoverBorder} hover:bg-gradient-to-br hover:from-muted/20 hover:to-muted/5`
                  }`}
                  onClick={() => setSelectedModule(module.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${module.iconBg} shadow-sm`}>
                        <module.icon className={`h-5 w-5 ${module.iconColor}`} />
                      </div>
                      {(!isMobile || state === "expanded") && (
                        <>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-card-foreground text-sm truncate">
                                {module.id === "master-data" ? "Master Data" : t(module.labelKey)}
                              </h3>
                              <Badge
                                variant="secondary"
                                className="text-xs px-2 py-0.5 bg-muted/60 text-foreground border-0 font-medium"
                              >
                                {module.count}
                              </Badge>
                              {hasActiveItem && <div className="w-2 h-2 bg-primary rounded-full" />}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {language === "id" ? module.descriptionId : module.description}
                            </p>
                            <p className="text-xs text-muted-foreground/80 mt-1">
                              {module.items ? module.items.length : module.nestedItems?.length || 0}{" "}
                              {language === "id" ? "fitur" : "features"}
                            </p>
                          </div>
                          <ChevronRight
                            className={`h-4 w-4 transition-colors flex-shrink-0 ${
                              hasActiveItem ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                            }`}
                          />
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </SidebarContent>
    </div>
  )
}

export function AppSidebar() {
  return (
    <Sidebar variant="inset" className="border-r border-border/50 bg-background text-foreground">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-hidden sidebar-scrollbar">
          <SharedSidebar />
        </div>
      </div>
    </Sidebar>
  )
}
