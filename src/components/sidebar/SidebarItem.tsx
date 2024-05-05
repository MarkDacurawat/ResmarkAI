import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faImage } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type SidebarItemPropsTypes = {
  icon: IconDefinition;
  text: string;
  href: string;
};

export default function SidebarItem({
  icon,
  text,
  href,
}: SidebarItemPropsTypes) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 hover:text-primary-foreground hover:bg-primary py-2 px-4 rounded-lg cursor-pointer"
    >
      <FontAwesomeIcon icon={icon} width={20} height={20} />
      <span className="text-base">{text}</span>
    </Link>
  );
}
