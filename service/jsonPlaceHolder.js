import {jsonPlaceholderClient} from '../utils/axios.js';

/**
 * The apis used here are public API provided by jsonPlaceholder
 * more details can be found here : https://jsonplaceholder.typicode.com/
 */
export const getPosts = async () => {
  try {
    //Log the request
    const {data} = await jsonPlaceholderClient.get ('/posts');
    return data;
  } catch (e) {
    //Log and Handle error
  }
};

export const getUsers = async () => {
  try {
    //Log the request
    const {data} = await jsonPlaceholderClient.get ('/users/');
    return data;
  } catch (e) {
    //Log and handle error
  }
};
