import axios from "axios";


const instance = axios.create({
    headers: {
      
    },
});

instance.interceptors.request.use(
    (req) => {
     
      req.headers["x-api-key"] ="t-65252b95b3eaad0020ed99be-796004d8d03c4ebc87b4e690" 
      req.headers["accept"] =  "application/json"
      req.headers["content-type"] = "multipart/form-data"
  
      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  instance.interceptors.response.use(
    (res) => {
      const api_response = decode(JSON.stringify(res));
      return JSON.parse(api_response);
    },
    async (err) => {
      const error = err.config;
  
      if (err.response) {
        if (err.response.status === 401) {
          return instance(error);
        }
      }
  
      return Promise.reject(err);
    }
  );
  
  export const axiosInstance = instance;





