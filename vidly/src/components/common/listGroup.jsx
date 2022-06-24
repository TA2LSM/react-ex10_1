import React from "react";

const ListGroup = (props) => {
  const { items, selectedItem, textProperty, valueProperty, onItemSelect } =
    props;

  //   console.log(items);

  return (
    <div>
      <ul className="list-group" style={{ cursor: "pointer" }}>
        {items.map((item) => (
          <li
            key={item[valueProperty]}
            className={
              item === selectedItem
                ? "list-group-item fst-italic fw-bold active"
                : "list-group-item"
            }
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
