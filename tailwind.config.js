module.exports = {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}","./node_modules/flowbite/**/*.js"],
  theme: {
    colors: {
      'mint-cream': '#F1F7ED',
      'msu-green': '#243E36',
      'matcha-green': '#7CA982',
      'nyanza': '#E0EEC6',
      'metalic-gold': '#C2A83E',
      'metalic-gold-hover': '#a38d34',
      'red-pomo': '#924B4B',
      'blue-pomo': '#506384',
      'green-pomo': '#50847B',
      'purple-pomo': '#816494',
      'purple-card': '#4b406a',
      'pink-card': '#cf9080',
      'pink-button': {
        normal: '#ab5f63',
        hover: '#9d5357'
      },
      'purple-button': '#494467',
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
