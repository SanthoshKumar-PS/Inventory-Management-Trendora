import { Menu, Package } from "lucide-react"
import { Button } from "../ui/button"

type HeaderProps = {
    onMenuClick : () =>void;
}
const Header = ({onMenuClick}:HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="w-full flex h-16 justify-between items-center px-4">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size='icon' className="md:hidden" onClick={onMenuClick}>
                    <Menu className="h-5 w-5"/>
                </Button>
                <Package className="h-6 w-6 text-blue-500"/>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Trendora Inventory
                </h1>
            </div>

            <div className="flex items-center">
                <Button variant='ghost' className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-600 text-white hover:text-white">
                    Logout

                </Button>

            </div>

        </div>
    </header>
  )
}

export default Header