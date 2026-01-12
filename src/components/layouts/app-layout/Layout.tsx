import { Outlet, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import SideMenu from '../../SideMenu/SideMenu';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';


function Layout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Sidebar variant="inset" />
      <SidebarInset>
        <Header />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;
