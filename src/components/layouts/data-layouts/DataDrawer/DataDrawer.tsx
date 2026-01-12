import { ReactElement } from 'react';
import {
  SheetTitle,
  Sheet,
  SheetContent,
  SheetHeader,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/components/hooks/use-mobile';

type DataDrawerProperties = {
  open: boolean;
  onClose: () => void;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  fullScreen?: boolean;
  className?: string;
  maxSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  children: ReactElement | ReactElement[];
};

function DataDrawer({
  open,
  onClose,
  direction = 'right',
  children,
}: DataDrawerProperties) {

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side={direction}
      >
        {children}
      </SheetContent>
    </Sheet>
  );
}

type DrawerHeaderProperties = {
  children?: React.ReactNode;
};



type HeaderTitleProperties = {
  children?: React.ReactNode;
};

function HeaderTitle({ children }: HeaderTitleProperties) {
  return (
    <SheetTitle className="font-semibold">
      {children}
    </SheetTitle>
  );
}

type HeaderActionProperties = {
  children: React.ReactNode;
};

function HeaderAction({ children }: HeaderActionProperties) {
  return <div className="flex items-center gap-2">{children}</div>;
}

function DrawerHeader({ children }: DrawerHeaderProperties) {
  return (
    <>
      <SheetHeader className="flex flex-row justify-between items-center p-2 pb-3 -mx-6 px-6 mt-0">
        {children}
      </SheetHeader>
      <Separator className="mb-3" />
    </>
  );
}

type DrawerBodyProperties = {
  children: React.ReactNode;
};

function DrawerBody({ children }: DrawerBodyProperties) {
  return <div className="flex-1 overflow-y-auto p-2 h-full" >{children}</div>;
}

type DrawerActionsProperties = {
  children: React.ReactNode;
};

function DrawerActions({ children }: DrawerActionsProperties) {
  return <div className="p-4 border-t border-border mt-auto">{children}</div>;
}

DrawerHeader.Title = HeaderTitle;
DrawerHeader.Action = HeaderAction;

DataDrawer.Header = DrawerHeader;
DataDrawer.Body = DrawerBody;
DataDrawer.Actions = DrawerActions;

export default DataDrawer;
