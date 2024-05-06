import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faImage } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type SidebarItemPropsTypes = {
  icon: IconDefinition;
  text: string;
  href: string;
  active: boolean;
};

export default function SidebarItem({
  icon,
  text,
  href,
  active,
}: SidebarItemPropsTypes) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-4 py-2 px-4 mb-1 rounded-lg cursor-pointer transition-all duration-150 ${
        active
          ? "text-primary-foreground bg-primary"
          : "hover:text-primary-foreground hover:bg-primary"
      }`}
    >
      <FontAwesomeIcon icon={icon} width={20} height={20} />
      <span className="text-base">{text}</span>
    </Link>
  );
}
