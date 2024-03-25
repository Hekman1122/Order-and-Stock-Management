import Image from "next/image";
import Logo from "@/app/images/logo.jpg";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="mb-8 border-b-2 border-gray-300 pb-4">
      <div className="w-full flex justify-between items-center md:flex-row gap-4 flex-col">
        <div className="flex justify-center items-center gap-4">
          <Image
            src={Logo}
            width={50}
            height={50}
            alt="Logo"
            className="rounded-full sm:w-12 sm:h-12 w-8 h-8"
          />
          <h1 className="font-semibold text-xl md:text-2xl text-neutral-700 md:tracking-widest">
            格里歐三明治庫存管理
          </h1>
        </div>

        <ul className="flex justify-between items-center gap-8">
          <li className="font-semibold text-amber-700 hover:text-amber-900 duration-300 transition-all">
            <Link href="/">庫存首頁</Link>
          </li>
          <li className="font-semibold text-amber-700 hover:text-amber-900 duration-300 transition-all">
            <Link href="/update">更新庫存</Link>
          </li>
          <li className="font-semibold text-amber-700 hover:text-amber-900 duration-300 transition-all">
            <Link href="/admin">訂單列表</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
