import axios from 'axios';
import config from './config';
const baseUrl = config.BACKEND_BASE_URL;

export const executeGetMethod = async (url, headers) => {
    try {
        if (!url) {
            throw new Error('Api URL required!');
        }

        let constructedUrl = `${baseUrl}${url}`;
        let responseData = await axios.get(constructedUrl, { headers: headers });
        if (!responseData) {
            throw new Error('Api call failed!');
        }

        return responseData.data;
    } catch (err) {
        throw new Error(err);
    }
};

export const executePostMethod = async (url, data, headers = {}) => {
    try {
        if (!url) {
            throw new Error('Api URL required!');
        }

        let constructedUrl = `${baseUrl}${url}`;
        let responseData = await axios.post(constructedUrl, data, headers);
        if (!responseData) {
            throw new Error('Api call failed!');
        }

        return responseData.data;
    } catch (err) {
        throw new Error(err);
    }
};
