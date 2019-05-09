const prod = process.env.NODE_ENV === "production";
console.log("enviroment: ", process.env.NODE_ENV);
module.exports = {
  //API_URL: prod ? "http://api.subastasconwaste.com" : "http://localhost:3001"
  //API_URL: prod ? "http://159.65.91.214:3001" : "http://localhost:3001"
  API_URL: prod ? "https://conwaste-subasta-api-ruuwxmnlzz.now.sh" : "https://conwaste-subasta-api-ruuwxmnlzz.now.sh"
};
