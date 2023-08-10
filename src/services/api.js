import axios from 'axios';

const API_KEY = '37546000-163427a723a8f35beaea42345';
const URL = 'https://pixabay.com/api/';

export const fetchAllData = async (searchQuery, page) => {
  const response = await axios.get(URL, {
    params: {
      key: API_KEY,
      page,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return response.data;
};
