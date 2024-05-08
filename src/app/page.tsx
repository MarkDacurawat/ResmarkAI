"use client";
import { NextPage } from "next";
import Sidebar from "../components/sidebar/SideBar";
import ChatBotContent from "@/components/content/ChatBotContent";
import GenerateImage from "@/components/content/GenerateImage";
import MumakerContent from "@/components/content/MumakerContent";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const RenderContent: React.FC = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  switch (tab) {
    case null:
      return <ChatBotContent />;
    case "chatbot":
      return <ChatBotContent />;
    case "generate-image":
      return <GenerateImage />;
    case "mumaker":
      return <MumakerContent />;
    default:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-xl text-foreground">404 not found</h1>
        </div>
      );
  }
};

const Home: NextPage = () => {
  return (
    <main className="dark w-100 h-screen bg-background text-foreground flex flex-col justify-center items-center">
      <Sidebar />
      <div className="chatBotContainer w-full h-full flex rounded-lg">
        <div className="w-[250px] h-full max-[910px]:hidden"></div>
        <div className="flex-1 bg-pallete-yellow" id="content">
          <Suspense fallback={<div>Loading...</div>}>
            <RenderContent />
          </Suspense>
        </div>
      </div>

      {/* Image by <a href="https://www.freepik.com/free-vector/technology-background-concept_7328095.htm#query=red%20website%20background&position=4&from_view=keyword&track=ais&uuid=3cbe4071-56bd-401a-8e70-c112bc68d861">Freepik</a> */}
    </main>
  );
};

export default Home;
