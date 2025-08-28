"use client"

import { useState, useEffect } from "react"
import { LoginPage } from "@/components/login-page"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { StatisticsTable } from "@/components/dashboard/statistics-table"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { SmartSuggestions } from "@/components/dashboard/smart-suggestions"
import { WelcomeBanner } from "@/components/dashboard/welcome-banner"
import { MobileMenuCards } from "@/components/mobile-menu-cards"
import { BottomNavigation } from "@/components/bottom-navigation"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { FloatingActionButton } from "@/components/floating-action-button"
import { useLanguage } from "@/lib/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, Car, Users, BarChart3, FileText } from "lucide-react"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { Suspense } from "react"
import { EarlyWarningReminder } from "@/components/early-warning-reminder"
import { useMediaQuery } from "@/hooks/use-media-query"

const quickActions = [
  { icon: Plus, label: "New Booking", labelId: "Booking Baru", href: "/bookings/new" },
  { icon: Car, label: "Add Vehicle", labelId: "Tambah Kendaraan", href: "/vehicles/new" },
  { icon: Users, label: "Add Customer", labelId: "Tambah Pelanggan", href: "/customers/new" },
  { icon: Calendar, label: "Schedule", labelId: "Jadwal", href: "/schedule" },
  { icon: BarChart3, label: "Reports", labelId: "Laporan", href: "/reports" },
  { icon: FileText, label: "Contracts", labelId: "Kontrak", href: "/contracts" },
]

function DashboardContent() {
  const { t, language } = useLanguage()
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border">
          <TopNavbar />
        </div>
        <main className="main-content flex-1 space-y-6 p-4 md:p-6 custom-scrollbar bg-background text-foreground min-h-screen pb-24 md:pb-6">
          {/* PWA Install Prompt */}
          <div className="animate-fade-in">
            <PWAInstallPrompt />
          </div>

          {/* Welcome Banner */}
          <div className="animate-fade-in">
            <WelcomeBanner />
          </div>

          {/* KPI Cards */}
          <div className="animate-fade-in">
            <Suspense fallback={<div className="animate-pulse bg-muted h-32 rounded-lg" />}>
              <KpiCards />
            </Suspense>
          </div>

          {/* Dashboard Charts - Main Feature */}
          <div className="animate-fade-in">
            <Suspense fallback={<div className="animate-pulse bg-muted h-96 rounded-lg" />}>
              <DashboardCharts />
            </Suspense>
          </div>

          {/* Quick Actions - Desktop only */}
          <div className="hidden md:flex flex-wrap gap-3 animate-fade-in">
            {quickActions.map((action) => (
              <Button
                key={action.href}
                variant="outline"
                size="sm"
                className="gap-2 bg-background text-foreground hover:bg-accent hover:text-accent-foreground border-border hover:border-primary/30 transition-all duration-300 shadow-sm"
                asChild
              >
                <a href={action.href}>
                  <action.icon className="h-4 w-4" />
                  {language === "id" ? action.labelId : action.label}
                </a>
              </Button>
            ))}
          </div>

          {/* Mobile Menu Cards - Mobile only */}
          <div className="md:hidden animate-fade-in">
            <MobileMenuCards />
          </div>

          {/* Main Content Grid - Desktop only */}
          <div className="hidden md:grid gap-6 lg:grid-cols-2 animate-fade-in">
            <div className="space-y-6">
              <Suspense fallback={<div className="animate-pulse bg-muted h-64 rounded-lg" />}>
                <RecentActivity />
              </Suspense>
            </div>
            <div className="space-y-6">
              <Suspense fallback={<div className="animate-pulse bg-muted h-64 rounded-lg" />}>
                <SmartSuggestions />
              </Suspense>
            </div>
          </div>

          {/* Mobile-specific content */}
          <div className="md:hidden space-y-4 animate-fade-in">
            <div className="bg-card text-card-foreground border border-border rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-3 text-sm text-card-foreground">{t("recentActivity")}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-card-foreground">New booking - Toyota Avanza</span>
                  <span className="text-muted-foreground ml-auto">2m ago</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-card-foreground">Payment received - Rp 1,500,000</span>
                  <span className="text-muted-foreground ml-auto">15m ago</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-card-foreground">Maintenance completed</span>
                  <span className="text-muted-foreground ml-auto">1h ago</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-card-foreground">Vehicle returned - Honda Civic</span>
                  <span className="text-muted-foreground ml-auto">2h ago</span>
                </div>
              </div>
            </div>

            {/* Mobile Smart Suggestions */}
            <div className="bg-card text-card-foreground border border-border rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-3 text-sm text-card-foreground">
                {language === "id" ? "Perlu Perhatian" : "Needs Attention"}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs p-2 bg-red-50 dark:bg-red-950/50 rounded border border-red-200 dark:border-red-800">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-red-800 dark:text-red-200 flex-1">2 overdue returns</span>
                  <Button size="sm" variant="outline" className="h-6 text-xs px-2 bg-background border-border">
                    {language === "id" ? "Cek" : "Check"}
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-xs p-2 bg-orange-50 dark:bg-orange-950/50 rounded border border-orange-200 dark:border-orange-800">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-800 dark:text-orange-200 flex-1">3 vehicles need maintenance</span>
                  <Button size="sm" variant="outline" className="h-6 text-xs px-2 bg-background border-border">
                    {language === "id" ? "Jadwal" : "Schedule"}
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-xs p-2 bg-blue-50 dark:bg-blue-950/50 rounded border border-blue-200 dark:border-blue-800">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-800 dark:text-blue-200 flex-1">5 pending approvals</span>
                  <Button size="sm" variant="outline" className="h-6 text-xs px-2 bg-background border-border">
                    {language === "id" ? "Review" : "Review"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Dashboard Content - Desktop only */}
          <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            <div className="bg-card text-card-foreground border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold mb-4 text-card-foreground">
                {language === "id" ? "Kendaraan Populer" : "Popular Vehicles"}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Toyota Avanza</span>
                  <span className="text-sm font-medium text-primary">24 bookings</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Honda Civic</span>
                  <span className="text-sm font-medium text-primary">18 bookings</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Suzuki Ertiga</span>
                  <span className="text-sm font-medium text-primary">15 bookings</span>
                </div>
              </div>
            </div>

            <div className="bg-card text-card-foreground border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold mb-4 text-card-foreground">
                {language === "id" ? "Statistik Bulan Ini" : "This Month Stats"}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Bookings</span>
                  <span className="text-sm font-medium text-primary">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Revenue</span>
                  <span className="text-sm font-medium text-primary">Rp 45,200,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">New Customers</span>
                  <span className="text-sm font-medium text-primary">23</span>
                </div>
              </div>
            </div>

            <div className="bg-card text-card-foreground border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold mb-4 text-card-foreground">
                {language === "id" ? "Status Armada" : "Fleet Status"}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-600 dark:text-green-400">Available</span>
                  <span className="text-sm font-medium text-muted-foreground">18 vehicles</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-600 dark:text-blue-400">Rented</span>
                  <span className="text-sm font-medium text-muted-foreground">24 vehicles</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-orange-600 dark:text-orange-400">Maintenance</span>
                  <span className="text-sm font-medium text-muted-foreground">3 vehicles</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Table */}
          <div className="animate-fade-in">
            <Suspense fallback={<div className="animate-pulse bg-muted h-64 rounded-lg" />}>
              <StatisticsTable />
            </Suspense>
          </div>
        </main>
      </SidebarInset>

      {/* Mobile Bottom Navigation */}
      {isMobile && <BottomNavigation />}

      {/* Floating Action Button */}
      {!isMobile && <FloatingActionButton />}
      <EarlyWarningReminder />
    </>
  )
}

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Check authentication status on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    } else {
      // For demo purposes, auto-authenticate after a short delay
      const timer = setTimeout(() => {
        setIsAuthenticated(true)
        localStorage.setItem("isAuthenticated", "true")
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem("isAuthenticated", "true")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("isAuthenticated")
    sessionStorage.clear()
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border">
          <TopNavbar onLogout={handleLogout} />
        </div>
        <main className="flex-1 space-y-6 p-4 md:p-6 bg-background text-foreground min-h-screen pb-24 md:pb-6">
          <WelcomeBanner />
          <Suspense fallback={<div className="animate-pulse bg-muted h-32 rounded-lg" />}>
            <KpiCards />
          </Suspense>
          <DashboardCharts />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivity />
            <SmartSuggestions />
          </div>

          <StatisticsTable />
          <EarlyWarningReminder />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
