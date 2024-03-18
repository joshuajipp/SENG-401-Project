import Link from "next/link";
import React from "react";

export default function Disclaimer() {
  return (
    <div className="text-center text-xs">
      Toolshed is not responsible for any loss of personal property, liability
      of damage, theft, or crime. To deter and identify potential fraud, spam or
      suspicious behaviour, we anonymize your email address (as applicable) and
      reserve the right to monitor conversations. By sending the message you
      agree to our{" "}
      <Link href="/" className="underline">
        Terms of Use
      </Link>
      {" and "}
      <Link href="/" className="underline">
        Privacy Policy.
      </Link>
    </div>
  );
}
