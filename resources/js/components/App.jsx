import { useState, useEffect } from "react";
import axios from "axios";
import FlashcardView from "./FlashcardView";

function App() {
    const [view, setView] = useState("namecolor");
    const [nameColors, setNameColors] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editColor, setEditColor] = useState("");

    useEffect(() => {
        if (view === "namecolor") {
            fetchNameColors();
        }
    }, [view]);

    const fetchNameColors = async () => {
        try {
            const response = await axios.get("/api/name-colors");
            setNameColors(response.data);
        } catch (err) {
            setError("Failed to fetch entries");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/name-colors", { name, color });
            setName("");
            setColor("");
            fetchNameColors();
        } catch (err) {
            setError("Failed to add entry");
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setEditName(item.name);
        setEditColor(item.color);
    };

    const handleSaveEdit = async (id) => {
        try {
            await axios.put(`/api/name-colors/${id}`, {
                name: editName,
                color: editColor,
            });
            setEditingId(null);
            fetchNameColors();
        } catch (err) {
            setError("Failed to update entry");
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await axios.delete(`/api/name-colors/${id}`);
                setSuccess("Deleted successfully");
                fetchNameColors();
            } catch (err) {
                setError("Failed to delete entry");
            }
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Name and Color Manager</h1>
            <button
                onClick={() =>
                    setView(view === "flashcards" ? "namecolor" : "flashcards")
                }
            >
                {view === "flashcards"
                    ? "BACK TO NAME COLORS"
                    : "SWITCH TO FLASHCARDS"}
            </button>

            {view === "flashcards" ? (
                <FlashcardView />
            ) : (
                <>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}

                    <form
                        onSubmit={handleSubmit}
                        style={{ marginBottom: "20px" }}
                    >
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ marginRight: "10px" }}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            style={{ marginRight: "10px" }}
                            required
                        />
                        <button type="submit">Add</button>
                    </form>

                    <h2>Stored Names and Colors</h2>
                    {nameColors.length === 0 ? (
                        <p>No entries found.</p>
                    ) : (
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            {nameColors.map((item) => (
                                <li key={item.id}>
                                    {editingId === item.id ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={editName}
                                                onChange={(e) =>
                                                    setEditName(e.target.value)
                                                }
                                                style={{ marginRight: "10px" }}
                                                required
                                            />
                                            <input
                                                type="text"
                                                value={editColor}
                                                onChange={(e) =>
                                                    setEditColor(e.target.value)
                                                }
                                                required
                                            />
                                            <button
                                                onClick={() =>
                                                    handleSaveEdit(item.id)
                                                }
                                            >
                                                Save
                                            </button>
                                            <button onClick={handleCancelEdit}>
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <span
                                                style={{
                                                    display: "inline-block",
                                                    minWidth: "200px",
                                                }}
                                            >
                                                <strong>{item.name}</strong> -{" "}
                                                {item.color}
                                            </span>
                                            <button
                                                onClick={() => handleEdit(item)}
                                                style={{ marginRight: "5px" }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
