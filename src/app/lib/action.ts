"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import {
  getValue,
  getRidOfZeroes,
  objectMerge,
  getValueORder,
  stringToArray,
  orderMerge,
  stockOrderMerge,
} from "./helper";

export async function updateAction(formData: FormData) {
  let { user, reason, products } = getValue(formData);

  //建立修改紀錄至資料庫並移除數量為0的品項
  const rewriteProducts = getRidOfZeroes(products);

  //新增修改紀錄
  const truthyValue = JSON.stringify(rewriteProducts);
  await prisma.updateStock.create({
    data: {
      user: user,
      reason: reason,
      updateProducts: truthyValue,
    },
  });

  //修改庫存
  const alterNames = Object.keys(rewriteProducts);
  alterNames.forEach(async (alterName) => {
    const productData = await prisma.stock.findUnique({
      where: {
        alterName: alterName,
      },
    });
    let newStock = {};
    if (productData) {
      let originalStockAmount = productData.stockAmount;
      let amountChange = rewriteProducts[alterName];

      newStock = objectMerge(originalStockAmount, amountChange);
    }

    await prisma.stock.update({
      where: {
        alterName: alterName,
      },
      data: {
        stockAmount: newStock,
      },
    });
  });

  revalidatePath("/");
  redirect("/");
}

//新增訂單至庫存
export async function CreateOrderAction(formData: FormData) {
  let { orderClient, orderNumber, products } = getValueORder(formData);
  const rewriteProducts = getRidOfZeroes(products);
  const truthyValue = JSON.stringify(rewriteProducts);

  // 新增訂單紀錄;
  await prisma.order.create({
    data: {
      orderNumber: orderNumber,
      orderClient: orderClient,
      orderProducts: truthyValue,
    },
  });

  const alterNames = Object.keys(rewriteProducts);
  alterNames.forEach(async (alterName) => {
    const productData = await prisma.stock.findUnique({
      where: {
        alterName: alterName,
      },
    });
    let newOrderAmount = {};
    if (productData) {
      let originalOrderAmount = productData.orderAmount;
      let amountChange = rewriteProducts[alterName];

      const a = objectMerge(originalOrderAmount, amountChange);
      const { small, medium } = a;
      newOrderAmount = {
        small: small,
        medium: medium,
      };
    }
    //修改庫存
    await prisma.stock.update({
      where: {
        alterName: alterName,
      },
      data: {
        orderAmount: newOrderAmount,
      },
    });
  });

  revalidatePath("/admin");
  redirect("/admin");
}

//訂單完成
export async function completeAction(formData: FormData) {
  const orderId = formData.get("orderId") as string;
  //該筆訂單的產品內容
  const orderProducts = formData.get("orderProducts") as string;
  const objProducts = stringToArray(orderProducts);

  //修改訂單狀態
  await prisma.order.update({
    where: { id: orderId },
    data: {
      complete: true,
    },
  });

  //修改庫存中的訂單數量
  objProducts.forEach(async (p) => {
    const { small, medium } = p;
    //amount 訂單中產品數量的變化量
    let amountChange = { small, medium };
    const originalP = await prisma.stock.findFirst({
      where: {
        product: p.name,
      },
      select: {
        orderAmount: true,
        stockAmount: true,
      },
    });
    //originalP 為一物件 用 originalP.orderAmount 取得原始物件當中的值
    // { orderAmount: { medium: 10, small: 12 } }
    if (originalP) {
      const newOrderStock = orderMerge(originalP.orderAmount, amountChange);
      const newStockAmount = stockOrderMerge(
        originalP.stockAmount,
        amountChange
      );
      // 訂單合併;
      await prisma.stock.update({
        where: {
          product: p.name,
        },
        data: {
          orderAmount: newOrderStock,
          stockAmount: newStockAmount,
        },
      });
    }
  });

  revalidatePath("/admin");
  redirect("/admin");
}
