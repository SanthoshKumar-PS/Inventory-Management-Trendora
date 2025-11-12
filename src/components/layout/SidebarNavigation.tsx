import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  Package,
  ShoppingCart,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  // SheetHeader,
  // SheetTitle,
  // SheetTrigger,
} from "@/components/ui/sheet"
import { NavLink } from "react-router-dom";

const navigationItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/products", label: "Products", icon: Package },
  { to: "/orders", label: "Orders", icon: ShoppingCart },
  { to: "/stock", label: "Stock Overview", icon: ClipboardList },
  { to: "/alerts", label: "Low Stock", icon: AlertTriangle },
  { to: "/reports", label: "Reports", icon: BarChart3 },
];

type SidebarNavigationProps ={
  mobileSidebarOpen:boolean;
  onMobileMenuClose: () => void;
}

const SidebarNavigation = ({mobileSidebarOpen,onMobileMenuClose} : SidebarNavigationProps) => {
  const commonNavigation = (
    <div className="flex flex-col gap-1 p-4">
        {navigationItems.map(item => {
            const IconName = item.icon;
            return (
                <NavLink 
                    key={item.to}
                    to={item.to}
                    onClick={onMobileMenuClose}
                    className={({isActive})=>cn('flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                        'hover:bg-blue-500/10 hover:text-blue-500',
                        isActive?'bg-blue-500 text-white hover:bg-blue-500 hover:text-white':'text-gray-600/80'
                    )}
                >
                    <IconName className="h-5 w-5"/>
                    <span className="font-medium">{item.label}</span>

                </NavLink>
            )
        })}
    </div>
  );
  return (
  <>
    {/* For medium and large screen */}
    <nav className="hidden md:block w-64 border-r min-h-[cal(100vh-4rem)]">
      {commonNavigation}
    </nav>

    {/* For Small screen */}
  <Sheet open={mobileSidebarOpen} onOpenChange={onMobileMenuClose}>
    <SheetContent side="left" className="w-64 p-0">
      <div className="pt-8">
        {commonNavigation}
      </div>
    </SheetContent>
  </Sheet>

  </>
  );
};

export default SidebarNavigation;
