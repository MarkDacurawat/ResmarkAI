import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faImage,
  faPenToSquare,
  faCaretRight,
  faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";
import SidebarItem from "./SidebarItem";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useState } from "react";

const ShowHideButton: React.FC<{
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
}> = ({ isSideBarOpen, toggleSideBar }) => {
  return (
    <FontAwesomeIcon
      icon={isSideBarOpen ? faCaretLeft : faCaretRight}
      className="text-[50px] cursor-pointer absolute right-[-40px] top-1/2"
      onClick={toggleSideBar}
    />
  );
};

export default function Sidebar() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [sidebarLeft, setSidebarLeft] = useState(0);

  useEffect(() => {
    // Close sidebar when screen width is a maximum of 950px
    const handleResize = () => {
      if (window.innerWidth <= 950) {
        setIsSideBarOpen(false);
        setSidebarLeft(-250);
      } else {
        setIsSideBarOpen(true);
        setSidebarLeft(0);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
    setSidebarLeft(isSideBarOpen ? -250 : 0);
  };

  return (
    <div
      className={`w-[250px] h-screen fixed left-0 transition-all duration-500 bg-secondary text-secondary-foreground flex flex-col items-center justify-between`}
      style={{ left: `${sidebarLeft}px` }}
    >
      <div className="mt-10">
        <Image
          src="/images/resmarkAIDark.png"
          alt=""
          width={150}
          height={150}
        />
        <ul className="mt-8">
          <SidebarItem
            icon={faComment}
            text="ChatBot"
            href="?tab=chatbot"
            active={!tab || tab === "chatbot"}
          />
          <SidebarItem
            icon={faImage}
            text="Generate Image"
            href="?tab=generate-image"
            active={tab === "generate-image"}
          />
          <SidebarItem
            icon={faPenToSquare}
            text="Mumaker"
            href="?tab=mumaker"
            active={tab === "mumaker"}
          />
        </ul>
      </div>
      <div className="mb-8 text-gray-400">
        <p>© 2024 ResmarkAI</p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ShowHideButton
          isSideBarOpen={isSideBarOpen}
          toggleSideBar={toggleSideBar}
        />
      </Suspense>
    </div>
  );
}
