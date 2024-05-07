import Image from "next/image";
import Message from "@/components/Message";
import MessageForm from "@/components/MessageForm";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const textpro = [
  {
    theme: "thunder",
    url: "https://textpro.me/create-3d-thunder-text-effects-online-1147.html",
  },
  {
    theme: "shadow",
    url: "https://textpro.me/create-a-gradient-text-shadow-effect-online-1141.html",
  },
  {
    theme: "blackpink",
    url: "https://textpro.me/create-neon-light-blackpink-logo-text-effect-online-1081.html",
  },
  {
    theme: "sliced",
    url: "https://textpro.me/create-light-glow-sliced-text-effect-online-1068.html",
  },
  {
    theme: "batman",
    url: "https://textpro.me/make-a-batman-logo-online-free-1066.html",
  },
  {
    theme: "demon",
    url: "https://textpro.me/create-green-horror-style-text-effect-online-1036.html",
  },
  {
    theme: "magma",
    url: "https://textpro.me/create-a-magma-hot-text-effect-online-1030.html",
  },
  {
    theme: "neon light",
    url: "https://textpro.me/create-3d-neon-light-text-effect-online-1028.html",
  },
  {
    theme: "glitch",
    url: "https://textpro.me/create-impressive-glitch-text-effects-online-1027.html",
  },
  {
    theme: "blackpink 2",
    url: "https://textpro.me/create-blackpink-logo-style-online-1001.html",
  },
  {
    theme: "neon light 2",
    url: "https://textpro.me/neon-light-text-effect-with-galaxy-style-981.html",
  },
  {
    theme: "matrix",
    url: "https://textpro.me/matrix-style-text-effect-online-884.html",
  },
  {
    theme: "thunder",
    url: "https://textpro.me/create-thunder-text-effect-online-881.html",
  },
  {
    theme: "neon",
    url: "https://textpro.me/neon-text-effect-online-879.html",
  },
  {
    theme: "bokeh",
    url: "https://textpro.me/bokeh-text-effect-876.html",
  },
  {
    theme: "green neon",
    url: "https://textpro.me/green-neon-text-effect-874.html",
  },
];

const photooxy = [
  {
    theme: "blackpink",
    url: "https://photooxy.com/create-blackpink-style-logo-effects-online-for-free-417.html",
  },
  {
    theme: "blackneon",
    url: "https://photooxy.com/elegant-3d-neon-dark-metal-text-effect-online-free-416.html",
  },
  {
    theme: "glitch",
    url: "https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html",
  },
  {
    theme: "wolf metal",
    url: "https://photooxy.com/logo-and-text-effects/create-a-wolf-metal-text-effect-365.html",
  },
  {
    theme: "glowing neon",
    url: "https://photooxy.com/logo-and-text-effects/make-smoky-neon-glow-effect-343.html",
  },
  {
    theme: "flaming",
    url: "https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html",
  },
  {
    theme: "embroidery (hello kitty style)",
    url: "https://photooxy.com/logo-and-text-effects/create-embroidery-text-online-191.html",
  },
  {
    theme: "gold metalic",
    url: "https://photooxy.com/other-design/create-metallic-text-glow-online-188.html",
  },
  {
    theme: "neon metalic",
    url: "https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html",
  },
  {
    theme: "harry potter",
    url: "https://photooxy.com/logo-and-text-effects/create-harry-potter-text-on-horror-background-178.html",
  },
  {
    theme: "text under orchids flower",
    url: "https://photooxy.com/logo-and-text-effects/text-under-flower-165.html",
  },
  {
    theme: "naruto",
    url: "https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html",
  },
  {
    theme: "graffiti",
    url: "https://photooxy.com/banner-cover/graffiti-text-cover-222.html",
  },
];

export default function GenerateImage() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isMessaging, setIsMessaging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [designUrl, setDesignUrl] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  async function generateImage(message: string) {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", content: message },
    ]);

    setIsMessaging(true);
    setIsLoading(true);

    if (designUrl.includes("https://textpro.me")) {
      const response = await axios.post(
        "/api/ai/mumaker/textpro",
        {
          designUrl,
          message,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure proper content type
          },
        }
      );

      const data = await response.data;
      const { image } = await data.data;
      setIsLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", content: image },
      ]);
    }

    if (designUrl.includes("https://photooxy.com")) {
      const response = await axios.post(
        "/api/ai/mumaker/photooxy",
        {
          designUrl,
          message,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure proper content type
          },
        }
      );

      const data = await response.data;
      const { image } = await data.data;

      setIsLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", content: image },
      ]);
    }

    return;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message") as string;

    // Reset the form
    if (formRef.current) {
      formRef.current.reset();
    }

    await generateImage(message);
  }

  async function handleSelectChange(value: string) {
    setDesignUrl(value);
    console.log(value);
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
            <Image
              src="/images/resmarkAIDark.png"
              alt=""
              width={80}
              height={80}
            />
            <h1 className="text-[30px] text-center">
              Generate text with different attractive effects.
            </h1>
          </div>
          <div className="w-full min-h-[100px] grid grid-cols-2 max-[640px]:grid-cols-1 place-items-center">
            <Image
              src="/images/mumaker/batman.png"
              width={200}
              height={200}
              alt="batman"
              draggable="false"
              className="border"
            />
            <Image
              src="/images/mumaker/sliced.png"
              width={200}
              height={200}
              alt="sliced"
              draggable="false"
              className="border"
            />
          </div>
        </div>
      )}

      {isMessaging && (
        <div
          ref={messageContainerRef}
          id="message-output"
          className="w-full p-5 overflow-y-scroll flex flex-col gap-[10px]"
        >
          {messages.map((message, index) => {
            if (message.sender === "user") {
              return (
                <div
                  key={index}
                  className="self-end p-3 rounded-xl max-w-[500px] bg-pallete-red bg-primary text-primary-foreground"
                >
                  {message.content}
                </div>
              );
            } else if (message.sender === "bot") {
              return (
                <div
                  key={index}
                  className="self-start rounded-xl max-w-[500px]"
                >
                  <Image
                    src={message.content}
                    width={400}
                    height={400}
                    alt="Generated Image"
                    className="rounded-lg"
                  />
                </div>
              );
            }
            return null; // Handle other cases if any
          })}
          {isLoading && (
            <button
              disabled
              type="button"
              className="self-start text-secondary-foreground p-3 rounded-xl bg-secondary  inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 animate-spin"
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
              Generating...
            </button>
          )}
        </div>
      )}

      <MessageForm
        sendMessage={generateImage}
        formRef={formRef}
        handleSubmit={handleSubmit}
        max={12}
      >
        <Select onValueChange={handleSelectChange} required>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Design" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Textpro</SelectLabel>
              {textpro.map((item, index) => (
                <SelectItem key={index} value={item.url}>
                  {item.theme.toUpperCase()}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Photooxy</SelectLabel>
              {photooxy.map((item, index) => (
                <SelectItem key={index} value={item.url}>
                  {item.theme.toUpperCase()}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </MessageForm>
    </div>
  );
}
