import axios from "axios";

export const getMessages = async (conversationId )=>{
    try {
        const {data} = axios.get(`${process.env.CHAT_SERVICE}/get-messages/${conversationId}`)
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}