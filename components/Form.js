import axios from "axios";
import { useState } from "react";

export default function Form() {
    const [name, setName] = useState("");
    const handleClick = async (e) => {
        try {
            await axios.post("/api/message", {
                first_name: name,
            });
            // console.log(data);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <input value={name} onChange={(e) => setName(e.target.value)} />
                <button type="submit" onClick={handleClick}>
                    enter
                </button>
            </form>
        </div>
    );
}
