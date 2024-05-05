import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faImage } from "@fortawesome/free-solid-svg-icons";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <div className="sidebar w-[250px] h-screen bg-secondary text-secondary-foreground flex flex-col items-center justify-between">
      <div className="mt-10">
        <Image src="/images/resmarkAI.png" alt="" width={150} height={150} />
        <ul className="mt-8">
          <SidebarItem icon={faComment} text="ChatBot" href="?tab=chatbot" />
          <SidebarItem
            icon={faImage}
            text="Generate Image"
            href="?tab=generate-image"
          />
        </ul>
      </div>
      <div className="mb-8 text-gray-400">
        <p>© 2024 YourCompany</p>
      </div>
    </div>
  );
}
