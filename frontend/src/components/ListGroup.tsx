import { useState } from "react";

// items : [], heading : string
interface Props {
    items: string[];
    heading: string;
    onSelectItem: (item:string) => void;
}

function ListGroup({items, heading, onSelectItem}: Props) {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [name, setName] = useState('');
    return <>
                <h1>List</h1>
                {items.length === 0 ? <p>No items found</p> : null}
                <ul>
                    {items.map((item, index) => <li key={index}></li>)}
                </ul>
            </>
}

export default ListGroup
