
const BASE_URL = 'https://pixabay.com/api/';

export const fetchPhotos = searchedQuery => {
  const urlParams = new URLSearchParams({
    key: "45489972-425dbd0ae29bdd8e452daca41",
    q: searchedQuery,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
  });

  return fetch(`${BASE_URL}?${urlParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};