import { Order } from "@prisma/client";
import Link from "next/link";
import { prisma } from "../lib/prisma";
import OrderCard from "../components/OrderCard";
export default async function OrderList() {
  const orderLists: Order[] = await prisma.order.findMany({
    where: {
      complete: false,
    },
  });
  return (
    <div className="max-w-3xl m-auto pb-8">
      {/* 新增訂單按鈕 */}
      <div className="flex justify-end">
        <button
          type="button"
          className="border-2 border-neutral-600 opacity-70 transition-opacity hover:opacity-100 px-6 py-2 rounded-lg "
        >
          <Link
            href="/admin/create"
            className=" text-orange-900 font-semibold tracking-wider"
          >
            新增訂單
          </Link>
        </button>
      </div>

      {/* 訂單列表 */}
      <div className="flex flex-col gap-4 mt-8">
        {orderLists?.map((order) => {
          return <OrderCard key={order.id} item={order} />;
        })}
      </div>
    </div>
  );
}
