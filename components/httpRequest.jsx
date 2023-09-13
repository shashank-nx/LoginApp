import axios from "axios";

const BASE_URL = "https://mockapi.free.beeceptor.com";

const getHeader = (urlHeader = {}, setHeader = true) => {
    const access_token = localStorage.getItem('access_token');
    const authType = localStorage.getItem('authType');
    const header = { ...urlHeader, authType };
    if (setHeader) {
        header.authorization = access_token;
    }
    return header;
}

const axiosRequest = async (props) => {
    const { componentUrl, method, headers, data, params } = props;
    let url = BASE_URL + componentUrl;
    if (params) {
        url += '?' + new URLSearchParams(params).toString();
    }
    try {
        const res = await axios({
            url, method, headers, data
        });
        return { data: res.data, status: res.status };
    } catch (err) {
        return { data: err.message, status: err.code };
    }
}

export const getRequest = (props) => {
    const { urlHeader, componentUrl, setHeader, params } = props;
    const headers = getHeader(urlHeader, setHeader);
    return axiosRequest({ componentUrl, method: 'GET', headers, params });
}