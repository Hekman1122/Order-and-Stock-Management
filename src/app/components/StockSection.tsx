import type { Stock } from "@prisma/client";
import Product from "./Product";
import { prisma } from "@/app/lib/prisma";
export default async function StockSection() {
  const products: Stock[] = await prisma.stock.findMany({});
  return (
    <section>
      <h2 className="font-semibold text-neutral-600 text-lg my-8">
        日期 : <span className="ml-4">{new Date().toLocaleDateString()}</span>
      </h2>
      {products.length && <Product products={products} />}
    </section>
  );
}
