import Image from "next/image";

export default function Message(props: any) {
  const { sender, currentTab, imageSource } = props;
  const messageBackgroundColor =
    sender === "user" ? "bg-primary" : "bg-secondary";
  const messageForegroundColor =
    sender === "user" ? "text-primary-foreground" : "text-secondary-foreground";
  const alignMessage = sender === "user" ? "self-end" : "self-start";

  return (
    <div
      className={`${alignMessage} p-3 rounded-xl max-w-[500px] ${messageBackgroundColor}`}
    >
      {props.children}
    </div>
  );
}
