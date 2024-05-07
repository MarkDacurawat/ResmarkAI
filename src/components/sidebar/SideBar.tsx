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
import { FormEvent, useEffect, useState } from "react";

export default function Sidebar() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [sidebarLeft, setSidebarLeft] = useState(0);

  const toggleSideBar = (event: FormEvent) => {
    event.preventDefault();
    setIsSideBarOpen(!isSideBarOpen);
  };

  useEffect(() => {
    if (isSideBarOpen) {
      setSidebarLeft(0);
    } else {
      setSidebarLeft(-250);
    }
  }, [isSideBarOpen]);
  return (
    <div
      className={`w-[250px] h-screen fixed left-0  max-[910px]:left-[${sidebarLeft}px] bg-secondary text-secondary-foreground flex flex-col items-center justify-between transition-all duration-500`}
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
            active={!tab || tab == "chatbot"}
          />
          <SidebarItem
            icon={faImage}
            text="Generate Image"
            href="?tab=generate-image"
            active={tab == "generate-image"}
          />
          <SidebarItem
            icon={faPenToSquare}
            text="Mumaker"
            href="?tab=mumaker"
            active={tab == "mumaker"}
          />
        </ul>
      </div>
      <div className="mb-8 text-gray-400">
        <p>© 2024 ResmarkAI</p>
      </div>
      <FontAwesomeIcon
        icon={isSideBarOpen ? faCaretLeft : faCaretRight}
        className="min-[910px]:hidden text-[50px] cursor-pointer absolute right-[-40px] top-1/2"
        onClick={toggleSideBar}
      />
    </div>
  );
}
