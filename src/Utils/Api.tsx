import axios from 'axios';
import ApiConstants from 'src/Utils/apiConstants';

export const postApicall = async (url: string, payload: any, success: (arg0: any) => void, error: (arg0: any) => void) => {
  axios
    .post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${ApiConstants.TOKEN}`,
      },
    })
    .then(res => {
      if (success) {
        success(res?.data);
      }
    })
    .catch(err => {
      if (err) {
        error(err);
      }
    });
};

export const getApicall = async (url: string, success: (arg0: any) => void) => {
  axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ApiConstants.TOKEN}`,
      },
    })
    .then(res => {
      if (success) {
        success(res?.data);
      }
    })
    .catch(err => {});
};
