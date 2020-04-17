const Axios = require("axios");

function getEmployees(){
    return Axios.get("https://randomuser.me/api/?results=20&nat=us");
}


module.exports={getEmployees}