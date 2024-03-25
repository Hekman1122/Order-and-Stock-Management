import InputPage from "@/app/components/InputPage";
import { prisma } from "@/app/lib/prisma";
import type { Stock } from "@prisma/client";
import { CreateOrderAction } from "@/app/lib/action";
import VerifyCollection from "@/app/components/VerifyInput";
export default async function CreateOrder() {
  const products: Stock[] = await prisma.stock.findMany({});
  const verify = process.env.verifiedCode as string;
  return (
    <div className="md:max-w-2xl mx-auto my-6">
      <h2 className="text-2xl font-semibold text-neutral-800 my-4">新增訂單</h2>
      <form className="flex flex-col gap-6" action={CreateOrderAction}>
        {/* 客戶資料 */}
        <div className="flex justify-between items-center flex-wrap gap-4 md:gap-0">
          <div className="flex items-center gap-4">
            <label htmlFor="client" className="font-semibold text-neutral-600">
              客戶名稱
            </label>
            <input
              type="text"
              name="orderClient"
              id="client"
              className="border-2 border-neutral-400 py-1 px-4 rounded-xl w-28 md:w-40"
            />
          </div>
          <div className="flex items-center gap-4">
            <label
              htmlFor="orderNumber"
              className="font-semibold text-neutral-600"
            >
              訂單編號
            </label>
            <input
              type="text"
              name="orderNumber"
              id="orderNumber"
              className="border-2 border-neutral-400 py-1 px-4 rounded-xl w-28 md:w-40"
            />
          </div>
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
