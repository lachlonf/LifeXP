import { useEffect, useState } from "react";

const messages = [
  "Keep going, you’re doing great! ✨",
  "Every step counts 💪",
  "Your progress is real 🌱",
  "Small actions lead to big change 🌟"
];

export default function Encouragement() {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const randomMessage =
      messages[Math.floor(Math.random() * messages.length)];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessage(randomMessage);
  }, []);

  return <p className="text-center text-lg italic mt-2">{message}</p>;
}
