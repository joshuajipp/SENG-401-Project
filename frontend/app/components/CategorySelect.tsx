import { Select } from "flowbite-react";
import { BiCategory } from "react-icons/bi";
import { Category, ItemsGetListI } from "../interfaces/ListItemI";

export default function CategorySelect({ item }: { item?: ItemsGetListI }) {
  return (
    <Select icon={BiCategory} id="category" name="category">
      {!item && (
        <option selected disabled hidden>
          Choose a category
        </option>
      )}
      {Object.values(Category).map((cat) => (
        <option key={cat} value={cat} selected={cat == item?.category}>
          {cat}
        </option>
      ))}
    </Select>
  );
}
