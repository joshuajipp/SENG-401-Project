import { Select } from "flowbite-react";
import { BiCategory } from "react-icons/bi";
import { Category } from "../interfaces/ListItemI";

export default function CategorySelect() {
  return (
    <Select icon={BiCategory} id="category" name="category">
      <option selected disabled hidden>
        Choose a category
      </option>
      {Object.values(Category).map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </Select>
  );
}
