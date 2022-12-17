const aws_url="https://ttrhadjzqkfbvbzsafvutaaxzu0ujuvg.lambda-url.us-east-2.on.aws";
function isjson(item){
  item = typeof item !== "string"
       ? JSON.stringify(item)
       : item;
  console.log(typeof item);
  console.log(item);
   try {
       item = JSON.parse(item);
   } catch (e) {
       return false;
   }
   if (typeof item === "object" && item !== null) {
     if(Object.keys(item).length === 0){
       return false;
     }
       return true;
   }
   return false;
}

function github_get_gallery(path){  
  return fetch('https://api.github.com/repos/gasparuribe/gasparuribe.cl/contents/img/galeria/'+path)
    .catch(function(error) {
      // Handle any errors
      console.log("FUCKHUB!");
      console.log(error);
    })
    .then(function(response) {
      return response.json();
    });
}
