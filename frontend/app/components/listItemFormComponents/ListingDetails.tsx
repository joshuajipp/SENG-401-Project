import { Select, Label, TextInput, Textarea } from "flowbite-react";
import { Condition, ItemsGetListI } from "@/app/interfaces/ListItemI";
import ListItemFormTemplate from "./ListItemFormTemplate";
import TagsComponent from "./TagsComponent";
import CategorySelect from "../CategorySelect";
import { CiViewList } from "react-icons/ci";

export default function ListingDetails({ item }: { item?: ItemsGetListI }) {
  return (
    <ListItemFormTemplate formNumber={1} formHeader={"ListingDetails"}>
      <div>
        <div className="mb-2 block font-bold">
          <Label htmlFor="category" value="Category: " />
        </div>
        <CategorySelect item={item} />
      </div>
      <div>
        <div className="mb-2 block font-bold">
          <Label htmlFor="condition" value="Condition: " />
        </div>
        <Select
          icon={CiViewList}
          id="condition"
          name="condition"
          required
          defaultValue={item ? item.condition : ""}
        >
          <option disabled hidden value="">
            Choose a condition
          </option>
          {Object.values(Condition).map((cond) => (
            <option key={cond} value={cond}>
              {cond}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <div className="mb-2 block font-bold">
          <Label htmlFor="listingTitle" value="Listing title" />
        </div>
        <TextInput
          id="listingTitle"
          type="text"
          required
          name="listingTitle"
          defaultValue={item?.itemName}
        />
      </div>
      <div>
        <div className="mb-2 block font-bold">
          <Label htmlFor="description" value="Description" />
        </div>
        <Textarea
          id="description"
          placeholder="Enter a description"
          rows={4}
          name="description"
          defaultValue={item?.description}
        />
      </div>
      <TagsComponent></TagsComponent>
    </ListItemFormTemplate>
  );
}
