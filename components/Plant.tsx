import { useState, useEffect } from "react";

type Props = { xp: number };

export default function Plant({ xp }: Props) {
  const [plant, setPlant] = useState("🌱");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (xp >= 300) setPlant("🌴");
    else if (xp >= 150) setPlant("🌳");
    else if (xp >= 50) setPlant("🌿");
    else setPlant("🌱");
  }, [xp]);

  return <div className="text-8xl transition-all duration-500">{plant}</div>;
}
