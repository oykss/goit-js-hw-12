import axios from 'axios';

const API_KEY = '46231257-9f78b377890ff4b2ac35cee0f';
const BASE_URL = 'https://pixabay.com/api/';

export const getPhotos = async (requestValue, page = 1) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: requestValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  });
  try {
    const photos = await axios.get(`${BASE_URL}?${searchParams}`);
    return photos.data;
  } catch (error) {
    console.log('🚀 ~ getPhotos ~ error:', error);
  }
};
