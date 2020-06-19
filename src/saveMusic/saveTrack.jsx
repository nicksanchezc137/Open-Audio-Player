import { Api } from "../services/Api";


export const saveMusic = (data) => {
  return new Promise((resolve, reject) => {
    try {
         Api
        .post("saveMusic.php", data)
          .then(res => {
              console.log("the data for file name is ------",res);
            if(res.data.status == "Success"){
              resolve(res.data.message)
            }else{
              reject("error")
            }
            
          })
          .catch(error => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
  });
};
