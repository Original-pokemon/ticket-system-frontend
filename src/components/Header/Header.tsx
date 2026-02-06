import { RefreshCw } from "lucide-react"
import {
  useLocationDataActions,
  useReferenceDataActions,
  useTicketActions,
  useUserManagementActions,
} from '../../store';
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ModeToggle } from "../ModeToggle/ModeToggle";

type HeaderProperties = {
  className?: string;
};

function Header({ className }: HeaderProperties) {
  const { fetchCategoriesData, fetchStatusesData } = useReferenceDataActions()
  const { fetchPetrolStations } = useLocationDataActions()
  const { fetchTicketsData } = useTicketActions()
  const { fetchUsersData, fetchManagersData, fetchTaskPerformersData } = useUserManagementActions()

  const handleRefresh = () => {
    fetchTaskPerformersData()
    fetchManagersData()
    fetchPetrolStations();
    fetchTicketsData();
    fetchUsersData();
    fetchStatusesData()
    fetchCategoriesData()
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4" />
        <Breadcrumbs />

        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>


        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleRefresh}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Обновить данные</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}

export default Header;