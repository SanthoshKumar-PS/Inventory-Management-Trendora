import { Outlet } from "react-router-dom"
import Header from "../components/layout/Header"
import { useState } from "react"
import SidebarNavigation from "@/components/layout/SidebarNavigation";

const IndexPage = () => {
  const [mobileSidebarOpen,setMobileSidebarOpen] = useState<boolean>(false);
  return (
    <div className="min-h-screen">
      <Header onMenuClick= {()=>setMobileSidebarOpen(true)}/>
      <div className="flex">
        <SidebarNavigation mobileSidebarOpen={mobileSidebarOpen} onMobileMenuClose={()=>setMobileSidebarOpen(false)}/>
        <main>
          <Outlet/>
        </main>


      </div>

    </div>
  )
}

export default IndexPage