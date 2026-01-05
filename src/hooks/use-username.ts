import { nanoid } from "nanoid";
import { useEffect, useState } from "react"
const STORAGE_KEY = "chat_username";
const ANIMALS = ["lion", "tiger", "hawk", "ostrich", "deer", "suiiiiiii", "ankara_messi"];

const generateUsername = () => {
    const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    return `anonymous-${word}-${nanoid(5)}`
}

export const useUsername = () => {
    const [username, setUsername] = useState("")

    useEffect(() => {
        const main = () => {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setUsername(stored);
                return;
            }

            const newUsername = generateUsername();
            localStorage.setItem(STORAGE_KEY, newUsername);
            setUsername(newUsername);
        };
        main();
    }, []);

    return { username };
}