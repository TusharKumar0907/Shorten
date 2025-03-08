import axios from 'axios';
const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export const registerUser = (user) => {
    return axios.post(BackendUrl + "/" + "api" + "/" + "auth" + "/" + "public" + "/" + "register", user);
}

export const loginUser = (user) => {
    // console.log(user);
    return axios.post(BackendUrl + "/" + "api" + "/" + "auth" + "/" + "public" + "/" + "login", user);
}

export const getUserUrls = () => {
   
    // JSON.parse removes "" from the string
    const token = JSON.parse(localStorage.getItem("JWT_TOKEN"));
    console.log(token);
    const AuthStr = 'Bearer '.concat(token); 
    return axios.get(BackendUrl + '/api/urls/myurls', { headers: { Authorization: AuthStr } })

}

export const shortUrl = (longUrl) => {
    const newURL = BackendUrl + '/api/urls/shorten';
    const token = JSON.parse(localStorage.getItem("JWT_TOKEN"));
    const AuthStr = 'Bearer '.concat(token); 
    console.log(longUrl);
    return axios.post(
        newURL, 
        { originalUrl : longUrl.originalUrl }, // Request body
        {
            headers: {
                Authorization: AuthStr,
                'Content-Type': 'application/json',
            },
        }
    );
}

