import axios from 'axios';
import { useState, useEffect } from 'react';

export function useContent() {
    const [content, setContent] = useState<any[]>([]);
    const [username, setUsername] = useState<string>("");
    function refresh(){
        axios.get("https://brainlybe.onrender.com/api/v1/content", {
            headers: {
                "Authorization": localStorage.getItem("authorization")
            }
        })
            .then((response) => {
                setContent(response.data.contents);
                setUsername(response.data.username);
                console.log(response.data.username);
            })
            .catch((error) => {
                console.error("Error fetching content:", error);
            });

    }
    useEffect(() => {
        refresh();
        let interval = setInterval(() => {
            refresh();
        }   ,10 * 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return {content, refresh, username};
}
