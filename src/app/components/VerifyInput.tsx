"use client";
type Props = {
  verify: string;
};
import { useState } from "react";
import { useFormStatus } from "react-dom";
export default function VerifyCollection({ verify }: Props) {
  const [pass, setPass] = useState<string>("");
  const { pending } = useFormStatus();
  return (
    <div className="flex justify-between items-center flex-wrap my-6">
      <input
        type="text"
        placeholder="請輸入驗證碼"
        className="border-2 border-neutral-400 py-1 px-4 rounded-xl md:w-60"
        onChange={(e) => {
          setPass(e.target.value);
        }}
      />
      {pass === verify ? (
        <button
          type="submit"
          className={`${
            pending ? "opacity-15 cursor-not-allowed" : ""
          } border-2 border-neutral-700 px-4 py-2 rounded-xl w-48 my-6 text-amber-700 font-semibold  duration-300 transition-opacity self-end opacity-75 hover:opacity-100 cursor-pointer`}
          disabled={pending ? true : false}
        >
          送出
        </button>
      ) : (
        <p className="font-semibold text-orange-700">請先輸入驗證碼</p>
      )}
    </div>
  );
}
