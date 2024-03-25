import type { Stock } from "@prisma/client";
import Card from "./Card";
export default function Product({ products }: { products: Stock[] }) {
  return (
    <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        return <Card key={product.id} item={product} />;
      })}
    </div>
  );
}
