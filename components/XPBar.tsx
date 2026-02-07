import { useEffect, useState } from "react";

type Props = { xp: number };

export default function XPBar({ xp }: Props) {
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    setProgressWidth((xp % 100) / 100 * 100);
  }, [xp]);

  return (
    <div className="w-full max-w-md">
      <div className="h-3 bg-gray-200 rounded">
        <div
          className="h-3 bg-green-500 rounded transition-all"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
}
