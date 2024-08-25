import axios from "axios";


const BASE_URL = "https://pixabay.com/api/";


export const fetchPhotos = async (searchedQuery) => {
    try {

        const axiosOptions = {
            params: {
                key: "45489972-425dbd0ae29bdd8e452daca41",
                q: searchedQuery,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: "true",
            },
        };

        const response = await axios.get(`${BASE_URL}`, axiosOptions);
        
        return response.data;

    } catch (error) {
        throw new Error(error.response.status);
    }

};