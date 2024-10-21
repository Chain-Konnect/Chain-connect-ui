import axios from "axios";


const OPEN_AI_KEY = import.meta.env.VITE_OPEN_AI_KEY;

const instance = axios.create({
  headers: {

  },
});

instance.interceptors.request.use(
  (req) => {

    req.headers["x-api-key"] = "t-65252b95b3eaad0020ed99be-796004d8d03c4ebc87b4e690"
    req.headers["accept"] = "application/json"
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


export const timeAgo = (bigIntValue) => {
  // Convert BigInt to number and then to milliseconds (assuming it's in seconds)
  const timestampMilliseconds = Number(bigIntValue) * 1000;  // If the BigInt is in seconds
  const date = new Date(timestampMilliseconds);

  // Get current time in milliseconds
  const currentTime = Date.now();

  // Calculate the difference in milliseconds
  const differenceMilliseconds = currentTime - timestampMilliseconds;

  // Calculate differences in various time units
  const seconds = Math.floor(differenceMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Return the appropriate time unit
  if (days > 0) {
    return `${days} day(s) ago`;
  } else if (hours > 0) {
    return `${hours} hour(s) ago`;
  } else if (minutes > 0) {
    return `${minutes} minute(s) ago`;
  } else {
    return `${seconds} second(s) ago`;
  }
}







