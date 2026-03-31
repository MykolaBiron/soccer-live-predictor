import { useState } from "react";

// items : [], heading : string
interface Props {
    items: string[];
    heading: string;
    onSelectItem: (item:string) => void;
}

function ListGroup({items, heading, onSelectItem}: Props) {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    return <>
                <h1>{heading}</h1>
                {items.length === 0 ? <p>No items found</p> : null}
                <ul>
                    {items.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                setSelectedIndex(index);
                                onSelectItem(item);
                            }}
                            style={{ fontWeight: selectedIndex === index ? 700 : 400, cursor: 'pointer' }}>
                            {item}
                        </li>
                    ))}
                </ul>
            </>
}

export default ListGroup
