import axios from 'axios';
const KEY = 'AIzaSyBN9XWyoreI_AmClWo1etjS3UEOBCc8ZHs';

 const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 50,
        key: KEY
    }
})


export default youtube