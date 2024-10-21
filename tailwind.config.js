const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
          "scrollbar-color": "gray lightgray",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "12px", // Lebih besar untuk menunjukkan bentuk tabung lebih jelas
            "border-radius": "9999px", // Membentuk scroll bar berbentuk kapsul/pil
          },
          "&::-webkit-scrollbar-track": {
            background: "rgb(169,169,169)", // Latar belakang abu biasa
            "border-radius": "9999px", // Membuat track berbentuk kapsul/tabung
          },
          "&::-webkit-scrollbar-thumb": {
            "background-color": "rgb(245, 245, 245)", // Scroll bar abu sangat muda
            "border-radius": "9999px", // Membuat scroll bar berbentuk kapsul/tabung
            border: "2px solid rgb(169,169,169)", // Border luar yang kontras dengan latar
            height: "100px", // Tinggi besar agar bentuk melengkung terlihat
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
});
