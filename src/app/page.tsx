"use client";
import Image from "next/image";
import Sidebar from "../components/sidebar/SideBar";
import ChatBotContent from "@/components/content/ChatBotContent";
import GenerateImage from "@/components/content/GenerateImage";
import MumakerContent from "@/components/content/MumakerContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faImage,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import axios from "axios";

export const RenderContent = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  if (tab !== "chatbot" && tab !== "generate-image" && tab !== "mumaker") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-xl text-foreground">404 not found</h1>
      </div>
    );
  }
  switch (tab) {
    case null:
      return <ChatBotContent />;
    case "chatbot":
      return <ChatBotContent />;
    case "generate-image":
      return <GenerateImage />;
    case "mumaker":
      return <MumakerContent />;
  }
};

export default function Home() {
  // Define function to render content based on route

  return (
    <main className="dark w-100 h-screen bg-background text-foreground flex flex-col justify-center items-center">
      <Sidebar />
      <div className="chatBotContainer w-full h-full flex rounded-lg">
        <div className="w-[250px] h-full max-[910px]:hidden"></div>
        <div className="flex-1 bg-pallete-yellow" id="content">
          <Suspense>
            <RenderContent />
          </Suspense>
        </div>
      </div>

      {/* Image by <a href="https://www.freepik.com/free-vector/technology-background-concept_7328095.htm#query=red%20website%20background&position=4&from_view=keyword&track=ais&uuid=3cbe4071-56bd-401a-8e70-c112bc68d861">Freepik</a> */}
    </main>
  );
}
