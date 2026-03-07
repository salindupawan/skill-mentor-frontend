import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { AppSidebar } from './components/app-sidebar'
import { Outlet } from 'react-router'
import { Toaster } from './components/ui/sonner'

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
        <Toaster />
      </main>
    </SidebarProvider>
  )
}
