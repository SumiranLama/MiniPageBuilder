import { useState } from "react";

const Example = () => {

    const [search, setSearch] = useState("");

    function handleInputChange(e) {
        const { name, value } = e.target;

        if (name === "search") {
            setSearch(value);
        }
    }
    return (
        <div>
            <form>
                <label>Add your words:</label>
                <input name="search" value={search ? search: "sumiran"} onChange={handleInputChange}></input>
            </form>
            <p>{search}</p>
        </div>
    );
}

export default Example;