import qs from 'qs';
import axios, { AxiosResponse } from 'axios';

const apiRequest = (apiFunction: string, data: any, method: string = 'POST'): Promise<any> => {
  return new Promise((resolve, reject) => {
    const apiUrl : string = process.env.REACT_APP_API_URL + apiFunction;
    let param: any = {};

    axios({
      params: param,
      method: method,
      headers:  { 'content-type': 'application/x-www-form-urlencoded' },
      url: apiUrl,
      data: qs.stringify(data),
    })
      .then((response: AxiosResponse) => {
        const responseData = response.data;
        const isError = responseData.hasOwnProperty('error');

        if (isError) {
          reject(responseData);
        } else {
          resolve(responseData);
        }
      })
      .catch((err : any) => {
        reject(err);
      });
  });
};

export default apiRequest;