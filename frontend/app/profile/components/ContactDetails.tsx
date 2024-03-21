import { DetailField } from "./DetailField";

export default async function ContactDetails({
  email,
  phoneNum,
}: {
  email: string;
  phoneNum?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-medium">Contact Details</h1>
      <div className="flex flex-col gap-4 text-black dark:text-white">
        {phoneNum && <DetailField title={"phoneNum"} value={phoneNum} />}
        <DetailField title={"email"} value={email} />
      </div>
    </div>
  );
}
