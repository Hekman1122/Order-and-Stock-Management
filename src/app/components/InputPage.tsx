"use client";

type Props = {
  productName: string;
  idName: string;
};
import { usePathname } from "next/navigation";

import Input from "./Input";
export default function InputElement({ productName, idName }: Props) {
  const pathname = usePathname();

  const sizeArray =
    pathname === "/admin/create"
      ? [
          { sizeId: "small", text: "S 版" },
          { sizeId: "medium", text: "M 版" },
        ]
      : [
          { sizeId: "small", text: "S 版" },
          { sizeId: "medium", text: "M 版" },
          { sizeId: "large", text: "L 版" },
        ];
  return (
    <div className="w-full flex flex-col gap-4 my-2">
      <h2 className="font-semibold text-amber-800 text-lg">{productName}</h2>
      <div
        className={`${
          pathname === "/admin/create" ? "justify-around" : ""
        } flex items-center gap-4 md:gap-10 flex-wrap`}
      >
        {sizeArray.map((item) => {
          return (
            <Input
              key={item.sizeId}
              sizeId={item.sizeId}
              idName={idName}
              text={item.text}
            />
          );
        })}
      </div>
    </div>
  );
}
