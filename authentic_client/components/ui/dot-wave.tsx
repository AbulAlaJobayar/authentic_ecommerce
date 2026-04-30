"use client";

const DotWave = ({ size = 8, color = "bg-primary" }) => {
  return (
    <div className="flex items-center gap-1">
      {[0, 0.2, 0.4].map((delay, i) => (
        <span
          key={i}
          className={`${color} rounded-full animate-dotWave`}
          style={{
            width: size,
            height: size,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default DotWave;