
import Feed from "@/components/ui/feed";
import AddFeedForm from "@/components/ui/feedForm";
import LeftSidebar from "@/components/ui/leftSideBar";
import RightSidebar from "@/components/ui/rightSidebar";


const Home = () =>{
    return (
        <div className="min-h-screen bg-gray-100">
  
        <div className="container mx-auto flex pt-6 space-x-6">
          {/* Sidebar Kiri */}
          <div className="w-1/4">
            <LeftSidebar />
          </div>
  
          {/* Feed */}
          <div className="w-1/2">
           <AddFeedForm />
            <Feed />
          </div>
  
          {/* Sidebar Kanan */}
          <div className="w-1/4">
            <RightSidebar />
          </div>
        </div>
      </div>
    );
    
}

export default Home