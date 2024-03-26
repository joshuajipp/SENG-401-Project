import { Datepicker } from "flowbite-react";

import React from "react";

export default function DatepickerRentalForm({
  name,
  date = new Date(),
}: {
  name: string;
  date?: Date;
}) {
  return (
    <Datepicker
      minDate={new Date()}
      name={name}
      defaultDate={date}
      autoHide={false}
      title="Return Date"
    />
  );
}
