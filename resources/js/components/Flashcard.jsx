import React, { useState } from "react";

const Flashcard = ({ finnish, english, example, onSave }) => {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => setFlipped(!flipped);

    const handleSave = (e) => {
        e.stopPropagation(); // Prevent card from flipping when clicking "Save"
        onSave({ finnish, english, example });
    };

    return (
        <div
            onClick={handleFlip}
            style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px",
                width: "200px",
                cursor: "pointer",
                backgroundColor: flipped ? "#f9f9f9" : "#fff",
            }}
        >
            {flipped ? (
                <div>
                    <p>
                        <strong>{english}</strong>
                    </p>
                    <p style={{ fontStyle: "italic", fontSize: "0.9em" }}>
                        {example}
                    </p>
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <p>
                    <strong>{finnish}</strong>
                </p>
            )}
        </div>
    );
};

export default Flashcard;
