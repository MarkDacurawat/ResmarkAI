import Image from "next/image";
import Message from "@/components/Message";
import MessageForm from "@/components/MessageForm";
import { FormEvent, ReactNode } from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

type MessageType = {
  sender: "user" | "bot";
  content: string;
};

type HistoryType = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBotContent() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [historyMessage, setHistoryMessage] = useState<HistoryType[]>([]);
  const [isMessaging, setIsMessaging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  async function sendMessage(message: string) {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", content: message },
    ]);

    setHistoryMessage((prevHistory) => [
      ...prevHistory,
      { role: "user", content: message },
    ]);

    setIsMessaging(true);
    setIsLoading(true);

    const response = await axios.post(
      "/api/ai/g4f",
      {
        message,
        history: historyMessage || [],
      },
      {
        headers: {
          "Content-Type": "application/json", // Ensure proper content type
        },
      }
    );
    const data = await response.data;
    setIsLoading(false);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", content: data },
    ]);
    setHistoryMessage((prevHistory) => [
      ...prevHistory,
      { role: "assistant", content: data },
    ]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message") as string;

    // Reset the form
    if (formRef.current) {
      formRef.current.reset();
    }

    await sendMessage(message);
  }

  useEffect(() => {
    if (messageContainerRef.current) {
      // Scroll to the bottom of the message container
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full h-full flex flex-col justify-end bg-background text-foreground">
      {!isMessaging && (
        <div
          className="w-full h-full p-4 flex flex-col justify-end items-center gap-[20px]"
          id="suggestionsForChatBot"
        >
          <div className="flex gap-3 items-center justify-center">
            <Image src="/images/resmarkAI.png" alt="" width={80} height={80} />
            <h1 className="text-[30px] text-center">Chat with me!</h1>
          </div>
          <div className="w-[620px] h-[160px] grid grid-row-2 grid-cols-2 place-items-center">
            <div
              className="w-[300px] h-[70px] bg-primary text-primary-foreground rounded-lg cursor-pointer p-3"
              onClick={(e) =>
                sendMessage("Test my knowledge on ancient civilization")
              }
            >
              <p>
                Test my knowledge <br /> on ancient civilization
              </p>
            </div>
            <div
              className="w-[300px] h-[70px] bg-primary text-primary-foreground rounded-lg cursor-pointer p-3"
              onClick={(e) =>
                sendMessage("Give me ideas for what to do in my kids art")
              }
            >
              <p>
                Give me ideas <br /> for what to do in my kids art
              </p>
            </div>
            <div
              className="w-[300px] h-[70px] bg-primary text-primary-foreground rounded-lg cursor-pointer p-3"
              onClick={(e) =>
                sendMessage("Write a thankyou note to my interviewer")
              }
            >
              <p>
                Write a thankyou note <br /> to my interviewer
              </p>
            </div>
            <div
              className="w-[300px] h-[70px] bg-primary text-primary-foreground rounded-lg cursor-pointer p-3"
              onClick={(e) =>
                sendMessage(" Tell me a fun fact about the Roman Empire")
              }
            >
              <p>
                Tell me a fun fact <br /> about the Roman Empire
              </p>
            </div>
          </div>
        </div>
      )}

      {isMessaging && (
        <div
          ref={messageContainerRef}
          id="message-output"
          className="w-full p-5 overflow-y-scroll flex flex-col gap-[10px]"
        >
          {messages.map(
            (message: { sender: string; content: string }, index: number) => (
              <Message key={index} sender={message.sender}>
                {message.content}
              </Message>
            )
          )}
          {isLoading && (
            <button
              disabled
              type="button"
              className="self-start text-white p-3 rounded-xl bg-gray-700  inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Replying...
            </button>
          )}
        </div>
      )}

      <MessageForm
        sendMessage={sendMessage}
        formRef={formRef}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
