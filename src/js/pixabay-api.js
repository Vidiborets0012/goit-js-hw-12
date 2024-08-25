import axios from "axios";


const BASE_URL = "https://pixabay.com/api/";


export const fetchPhotos = async (searchedQuery, page = 1, per_page = 15) => {
    try {

        const axiosOptions = {
            params: {
                key: "45489972-425dbd0ae29bdd8e452daca41",
                q: searchedQuery,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: "true",
                page: page,
                per_page: per_page,
            },
        };

        const response = await axios.get(`${BASE_URL}`, axiosOptions);
        
        return response.data;

    } catch (error) {
        throw new Error(error.response.status);
    }

};