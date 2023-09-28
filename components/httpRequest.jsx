import axios from "axios";

const getHeader = (urlHeader = {}, setHeader = true) => {
    const header = { ...urlHeader, authType };
    if (urlHeader) {
        header.authorization = access_token;
    }
    return header;
}

const axiosRequest = async (props) => {
    const { componentUrl, method, headers, data, params } = props;
    let url = process.env.REQUEST_URL + componentUrl;
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
    const { headers, componentUrl, params } = props;
    return axiosRequest({ componentUrl, method: 'GET', headers, params });
}