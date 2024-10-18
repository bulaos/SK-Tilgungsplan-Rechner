import Image from "next/image";
import sparkasseLogo from "../Logo/assets/sparkasse_logo.svg";

export function SparkasseLogo(): JSX.Element {
  return <Image alt="Logo" height={48} src={sparkasseLogo} />;
}
