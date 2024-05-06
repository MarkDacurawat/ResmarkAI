import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faImage,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import SidebarItem from "./SidebarItem";
import { useSearchParams } from "next/navigation";

export default function Sidebar() {
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");

  return (
    <div className="w-[250px] h-screen bg-secondary text-secondary-foreground flex flex-col items-center justify-between">
      <div className="mt-10">
        <Image src="/images/resmarkAI.png" alt="" width={150} height={150} />
        <ul className="mt-8">
          <SidebarItem
            icon={faComment}
            text="ChatBot"
            href="?tab=chatbot"
            active={tab == "chatbot"}
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
        <p>© 2024 YourCompany</p>
      </div>
    </div>
  );
}
