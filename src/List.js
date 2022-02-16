import React from 'react'
import { FaEdit,FaTrash } from 'react-icons/fa'
function List({ items, clearItem, editItem }) {
  return (
    <div>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id}>
            <p>{title}</p>
            <button
              onClick={() => editItem(id)}
              style={{
                width: "35px",
                height: "40px",
                backgroundColor: "blue",
                display: "inline",
              }}
            >
              <FaEdit />
            </button>
            <button
              onClick={() => clearItem(id)}
              style={{
                width: "35px",
                height: "40px",
                backgroundColor: "green",
                display: "inline",
              }}
            >
              <FaTrash />
            </button>
          </article>
        );
      })}
    </div>
  );
}

export default List