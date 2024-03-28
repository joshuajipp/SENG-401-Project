import Notification from "../components/Notification";
import { ItemsGetListI } from "@/app/interfaces/ListItemI";

export default function ItemRequests({ items }: { items: ItemsGetListI[] }) {
  return (
    <>
      {items.length === 0 ? (
        <p>You have 0 item requests!</p>
      ) : (
        <div>
          {items.map(
            (item, index) =>
              item.borrowRequests &&
              item.borrowRequests.map((request, requestIndex) => {
                return (
                  <Notification key={index} request={request} item={item} />
                );
              })
          )}
        </div>
      )}
    </>
  );
}
