// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        beat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
      },
      animation: {
        "beat-fast": "beat 0.4s infinite",
        "beat-normal": "beat 0.8s infinite",
        "beat-slow": "beat 1.2s infinite",
      },
    },
  },
  plugins: [],
};
