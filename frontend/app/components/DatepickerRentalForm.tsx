import { Datepicker } from "flowbite-react";

import React from "react";

export default function DatepickerRentalForm({ name }: { name: string }) {
  return <Datepicker name={name} autoHide={false} title="Return Date" />;
}
