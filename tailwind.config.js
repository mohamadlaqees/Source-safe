import scrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#282e33",
        light_main: "#ffffff",
        light_secondary: "#74b5e0",
        secondary: "#18191d",
        fourth: "#3d444b",
        fourth_light: "#f1f1f1",
        message: "#707172",
        message_light: "#999999",
        text_light: "#222222",
      },
      height: {
        groupList: "90%",
        fileList: "75%",
      },
      minWidth: {
        leftSide: "480px",
      },
      screens: {
        smallLeft: "880px",
        aboveMobile: "400px",
      },
    },
  },
  plugins: [scrollbar],
};
