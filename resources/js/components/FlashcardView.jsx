import React, { useEffect, useState } from "react";
import axios from "axios";
import Flashcard from "./Flashcard";

const FlashcardView = () => {
    const [words, setWords] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchWords();
    }, []);

    const fetchWords = async () => {
        try {
            const response = await axios.get("/api/finnish-words");
            setWords(response.data);
        } catch (error) {
            console.error("Failed to fetch words:", error);
            setMessage("Failed to fetch flashcards.");
        }
    };

    const handleSave = async (word) => {
        try {
            await axios.post("/api/words", word);
            setMessage(`Saved: ${word.finnish}`);
        } catch (error) {
            console.error("Save failed:", error);
            setMessage("Failed to save word.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Finnish Flashcards</h2>
            {message && <p>{message}</p>}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {words.map((word) => (
                    <Flashcard
                        key={word.id}
                        finnish={word.finnish}
                        english={word.english}
                        example={word.example}
                        onSave={handleSave}
                    />
                ))}
            </div>
        </div>
    );
};

export default FlashcardView;
