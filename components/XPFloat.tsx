type XPFloatProps = {
  amount: number;
};

export default function XPFloat({ amount }: XPFloatProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="animate-xp-float text-emerald-400 font-bold text-2xl drop-shadow-lg">
        +{amount} XP
      </div>
    </div>
  );
}
