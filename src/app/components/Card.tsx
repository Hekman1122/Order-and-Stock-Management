import type { Stock } from "@prisma/client";
export default function Card({ item }: { item: Stock }) {
  const { product, stockAmount, orderAmount } = item;
  return (
    <div className="w-full sm:w-64 border rounded-2xl px-4 py-5 flex flex-col gap-3">
      <h2 className="text-2xl font-semibold text-orange-900 text-center">
        {product}
      </h2>
      <p className="text-sm font-bold text-orange-700">目前庫存</p>
      <ul className="flex flex-col gap-2">
        <li className="flex justify-between items-center ">
          <span>Small : </span>
          <span className="font-bold">{stockAmount.small}</span>
        </li>
        <li className="flex justify-between items-center ">
          <span>Medium : </span>
          <span className="font-bold">{stockAmount.medium}</span>
        </li>
        <li className="flex justify-between items-center ">
          <span>Large : </span>
          <span className="font-bold">{stockAmount.large}</span>
        </li>
      </ul>
      <p className="text-sm font-bold text-orange-700">訂單需求</p>
      <ul className="flex flex-col gap-2">
        <li className="flex justify-between items-center ">
          <span>Small : </span>
          <span className="font-bold">{orderAmount.small}</span>
        </li>
        <li className="flex justify-between items-center ">
          <span>Medium : </span>
          <span className="font-bold">{orderAmount.medium}</span>
        </li>
      </ul>
      <div className="py-3">
        <h2 className="text-lg font-semibold text-neutral-700 text-center">
          扣除訂單剩餘庫存
        </h2>
        <ul className="flex flex-col gap-2 py-2">
          <li className="flex justify-between items-center ">
            <span>Small : </span>
            <span
              className={`${
                stockAmount.small - orderAmount.small > 0
                  ? "text-green-700"
                  : "text-red-700"
              } font-bold`}
            >
              {stockAmount.small - orderAmount.small}
            </span>
          </li>
          <li className="flex justify-between items-center ">
            <span>Medium : </span>
            <span
              className={`${
                stockAmount.medium - orderAmount.medium > 0
                  ? "text-green-700"
                  : "text-red-700"
              } font-bold`}
            >
              {stockAmount.medium - orderAmount.medium}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
