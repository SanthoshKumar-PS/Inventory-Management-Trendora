import { Outlet } from "react-router-dom"
import Header from "../components/layout/Header"
import { useState } from "react"

const IndexPage = () => {
  const [mobileSidebarOpen,setMobileSidebarOpen] = useState<boolean>(false);
  return (
    <div className="min-h-screen">
      <Header onMenuClick= {()=>setMobileSidebarOpen(true)}/>
      <div className="flex">
        {/* Side Bar Navigation */}
        <main>
          <Outlet/>
        </main>


      </div>

    </div>
  )
}

export default IndexPage