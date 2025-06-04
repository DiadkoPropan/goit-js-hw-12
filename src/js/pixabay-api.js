import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import axios from "axios";

export async function getImagesByQuery(query, page = 1, options = {}) {
  const perPage = options.perPage || 15;

  try {
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: "49643182-9754596b7a63617f9fa0f6656",
        q: query,
        page,
        per_page: perPage,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        ...options.extraParams, // додаткові параметри, якщо треба
      },
    });

    const data = response.data;

    if (data.hits.length === 0) {
      iziToast.show({
        title: "No results",
        message: "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
        backgroundColor: "#ef4040",
        messageColor: "#fff",
        timeout: 5000,
        progressBar: false,
        close: true,
        transitionIn: "fadeInDown",
        transitionOut: "fadeOutUp",
      });
    }

    return {
      images: data.hits,
      totalHits: data.totalHits,
    };

  } catch (error) {
    iziToast.show({
      title: "Error",
      message: "Something went wrong. Please try again later.",
      position: "topRight",
      backgroundColor: "#ef4040",
      messageColor: "#fff",
      timeout: 5000,
      progressBar: false,
      close: true,
      transitionIn: "fadeInDown",
      transitionOut: "fadeOutUp",
    });

    console.error("API Error:", error);
    throw error;
  }
}