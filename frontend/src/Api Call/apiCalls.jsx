import axios from 'axios';
async function sendRequest(url, method, body = null) {
    const token = localStorage.getItem('token');
    try {
        const response = await axios({
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
                token: token,
            },
            data: body == null ? null : body,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error.response.data);
        return error.response.data;
    }
}
export default sendRequest;
