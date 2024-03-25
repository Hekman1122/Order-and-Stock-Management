enum ProductName {
  cheese = "經典原味起司",
  margaret = "義式瑪格麗特",
  chicken = "地中海烤雞",
  beef = "費城牛肉",
  mexico = "墨西哥費城牛肉",
  bbq = "BBQ手撕豬肉",
  basil = "青醬雞肉",
  potato = "馬鈴薯蛋沙拉",
  reuben = "魯本牛肉",
}
import { Order } from "@prisma/client";
import { stringToArray } from "@/app/lib/helper";
import { completeAction } from "@/app/lib/action";
type Props = {
  item: Order;
};
export default function OrderCard({ item }: Props) {
  const { orderClient, orderNumber, orderProducts, updateTime } = item;
  const orderContent = stringToArray(orderProducts);

  return (
    <div className="border-2 border-neutral-800 p-4 rounded-xl">
      {/* 公司名稱 + 訂單編號 */}
      <div className="flex justify-between items-center flex-wrap">
        <p className="text-lg font-semibold text-orange-700">{orderClient}</p>
        <span className="font-semibold text-lg text-neutral-600">
          {orderNumber}
        </span>
        <span className="text-sm font-semibold text-neutral-600">
          {updateTime.toLocaleDateString()}
        </span>
      </div>
      {/* 訂單內容 */}
      <div className="flex flex-col gap-4 mt-4 ">
        {orderContent.map((item) => {
          return (
            <div
              key={item.name}
              className="flex justify-between items-center gap-2 flex-wrap"
            >
              <p className="w-32 text-lg md:text-sm font-semibold text-neutral-900">
                {item.name}
              </p>
              <p className="w-32">
                Small :{" "}
                <span className="font-semibold text-neutral-700 ml-3">
                  {item.small}
                </span>
              </p>
              <p className="w-32">
                Medium :
                <span className="font-semibold text-neutral-700 ml-3">
                  {item.medium}
                </span>{" "}
              </p>
            </div>
          );
        })}
      </div>

      <form action={completeAction} className="flex w-full justify-end mt-4">
        <input type="hidden" defaultValue={item.id} name="orderId" />
        <input
          type="hidden"
          defaultValue={orderProducts}
          name="orderProducts"
        />
        <button
          type="submit"
          className="border-2 border-neutral-600 opacity-70 transition-opacity hover:opacity-100 px-6 py-2 rounded-lg text-orange-800 text-sm font-bold"
        >
          此訂單出貨完成
        </button>
      </form>
    </div>
  );
}
