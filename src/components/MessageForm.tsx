import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";

type MessageFormPropsTypes = {
  sendMessage: (message: string) => void;
  formRef: React.RefObject<HTMLFormElement>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function MessageForm({
  sendMessage,
  formRef,
  handleSubmit,
}: MessageFormPropsTypes) {
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      id="messageActions"
      className="w-full p-4 bg-background flex items-center justify-center gap-[25px]"
      autoComplete="off"
    >
      <Input
        type="text"
        name="message"
        placeholder="Type a message here..."
        className="w-[950px] py-2 px-4 rounded-md"
      ></Input>
      <button type="submit" className="">
        <FontAwesomeIcon icon={faPaperPlane} className="text-primary" />
      </button>
    </form>
  );
}
