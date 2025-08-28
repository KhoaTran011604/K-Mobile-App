
import axios from 'axios';
import { BaseResponse, MetaDataStruct } from './BaseResponse';

const Localhost = "https://server-next-socialmedia.onrender.com/api"
export const Proxy = async <T = any>(
  method: string,
  endpoint: string,
  request: any = {},
  isUseToken = true
): Promise<BaseResponse<T>> => {
  try {
    const config = {
      headers: {} as Record<string, any>,
    };

    // if (isUseToken) {
    //   const accessToken = localStorage.getItem('@accessToken');
    //   if (accessToken) {
    //     config.headers['Authorization'] = `Bearer ${accessToken}`;
    //   }
    // }

    // if (method.toLowerCase() === 'post_multi') {
    //   config.headers['Content-Type'] = 'multipart/form-data';
    // }

    let response = {} as BaseResponse<T>;
    let tmpRes
    switch (method.toLowerCase()) {
      case 'get':
        tmpRes = await axios.get(process.env.BACKEND_URL || Localhost + endpoint);
        response.success = tmpRes.data?.success || false;
        response.data = tmpRes?.data?.data;
        break;
      case 'post':

        tmpRes = await axios.post(process.env.BACKEND_URL || Localhost + endpoint, request, config);


        response.success = tmpRes.data?.success || false;
        response.data = tmpRes?.data?.data;
        break;
      case 'post_multi':
        tmpRes = await axios.postForm(process.env.BACKEND_URL || Localhost + endpoint, request, config);
        response.success = tmpRes.data?.success || false;
        response.data = tmpRes?.data?.data;
        break;
      case 'put':
        tmpRes = await axios.put(process.env.BACKEND_URL || Localhost + endpoint, request, config);
        response.success = tmpRes.data?.success || false;
        response.data = tmpRes?.data?.data;
        break;
      case 'delete':
        tmpRes = await axios.delete(process.env.BACKEND_URL || Localhost + endpoint, { data: request, ...config });
        response.success = tmpRes.data?.success || false;
        response.data = tmpRes?.data?.data;
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return new BaseResponse<T>(
      response?.success,
      '',
      response?.data,
      response?.metaData || new MetaDataStruct()
    );
  } catch (err: any) {
    console.log(err);

    return new BaseResponse<T>(
      false,
      err?.response?.data?.message || 'Request failed',
      null,
      new MetaDataStruct()
    );
  }
};
