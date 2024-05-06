import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";

type MessageFormPropsTypes = {
  sendMessage: (message: string) => void;
  formRef: React.RefObject<HTMLFormElement>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  inputWidth?: number;
  max?: number;
};

export default function MessageForm(props: any) {
  const {
    sendMessage,
    formRef,
    handleSubmit,
    inputWidth,
    max,
  }: MessageFormPropsTypes = props;

  const width = inputWidth || 950;
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      id="messageActions"
      className="w-full p-4 px-10 bg-background flex items-center justify-center gap-[25px]"
      autoComplete="off"
    >
      {props.children}
      <Input
        type="text"
        name="message"
        placeholder="Type a message here..."
        className={`flex-1 py-2 px-4 rounded-md`}
        maxLength={max || 1000}
        required
      ></Input>
      <button type="submit" className="">
        <FontAwesomeIcon icon={faPaperPlane} className="text-primary" />
      </button>
    </form>
  );
}
