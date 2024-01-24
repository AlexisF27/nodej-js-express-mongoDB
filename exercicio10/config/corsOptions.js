const whiteList = [
  'https://www.yoursite.com', 
  'http://localhost:3500'
];

const corsOption = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin){
      callback(null, true);
    } else {
      callback(new Error(' not allowed by CORS'))
    }
  }, 
  optionSuccessSTatus:200
}

module.exports = corsOption;