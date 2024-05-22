

import axios from 'axios';
import { GetAuthToken,PutAuthToken } from './localStorage/localStorage';





// Create Axios instance




// Add response interceptor


export const ApiCall = (url, method, data, fileUpload) => {
  let headers = {
    'content-type': fileUpload ? 'multipart/form-data' : 'application/json',
  };

  const config = {
    method: method,
    url: url,
    headers: headers,
    data: data,
  };
  console.log('configToken', config);
  return axios(config)
    .then(response => {
      if (response) {
        // console.log('api success', response);
        return response;
      }
    })
    .catch(error => {
      console.log('api error', error);
      throw error;
    });
};

