"use server";
import { prisma } from "@/app/lib/prisma";
import type { Stock } from "@prisma/client";
import InputPage from "@/app/components/InputPage";
import VerifyCollection from "../components/VerifyInput";
import { updateAction } from "@/app/lib/action";
import Select from "@/app/components/Select";

export default async function Update() {
  const verify = process.env.verifiedCode as string;
  const userArray = [
    "Brandon",
    "Hebe",
    "Abby",
    "Chung-Wei",
    "Yu-Mei",
    "Han-Wei",
  ];
  const reasonArray = ["當天製作入庫", "前場販售需求", "出貨需求"];

  const products: Stock[] = await prisma.stock.findMany({});
  return (
    <div className="md:max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-semibold text-neutral-800 mt-4">
        請輸入需要調整的數量
      </h2>
      <p className="text-sm font-semibold text-amber-700 mt-1 mb-6 ">
        例如 : +24 或者 -10
      </p>
      <form className="flex flex-col gap-6" action={updateAction}>
        <div className="flex justify-between items-center">
          <Select dataArray={userArray} title="資料輸入人" typeForData="user" />
          <Select
            dataArray={reasonArray}
            title="更新資料原因"
            typeForData="reason"
          />
        </div>
        {products.map((item) => {
          return (
            <InputPage
              key={item.id}
              productName={item.product}
              idName={item.alterName}
            />
          );
        })}
        <VerifyCollection verify={verify} />
      </form>
    </div>
  );
}
