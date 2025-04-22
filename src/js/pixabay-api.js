import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export { getImagesByQuery }

const API_KEY = "49643182-9754596b7a63617f9fa0f6656";
// axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common["key"] = API_KEY;
// let page = 2;
export default async function getImagesByQuery(query, page) {
    return await axios.get('https://pixabay.com/api/', {
        params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: 15
    }})
}