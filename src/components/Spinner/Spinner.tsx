type SpinnerProperties = {
  fullscreen: boolean; // Если true, спиннер будет блокировать весь экран
  size?: number;
};

function Spinner({
  fullscreen = false,
  size = 40,
}: SpinnerProperties) {
  return (
    <div
      className={
        fullscreen
          ? 'fixed inset-0 w-screen h-screen bg-black/50 flex items-center justify-center z-1000'
          : 'relative w-full h-full flex items-center justify-center'
      }
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        className="animate-spin"
        style={{ color: 'var(--primary)' }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="90, 150"
        />
      </svg>
    </div>
  );
}

export default Spinner;
