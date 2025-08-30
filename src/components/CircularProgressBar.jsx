const CircularProgressBar = ({
  percentage = 0,
  size = 120,
  strokeWidth = 8,
  color = "#3b82f6",
  backgroundColor = "#e5e7eb",
  showPercentage = true,
  children,
  duration = 1000,
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (animatedPercentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        style={{ transition: `stroke-dashoffset ${duration}ms ease-in-out` }}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: `stroke-dashoffset ${duration}ms ease-in-out`,
            filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.3))",
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children ||
          (showPercentage && (
            <span className="text-lg font-semibold text-gray-700">
              {Math.round(animatedPercentage)}%
            </span>
          ))}
      </div>
    </div>
  );
};

// D
