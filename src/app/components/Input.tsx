type Props = {
  sizeId: string;
  text: string;
  idName: String;
};

export default function Input({ sizeId, text, idName }: Props) {
  return (
    <div className="flex justify-center items-center gap-4">
      <label
        htmlFor={idName + "-" + sizeId}
        className="font-semibold text-neutral-500"
      >
        {text}
      </label>
      <input
        type="text"
        id={idName + "-" + sizeId}
        className="border-2 border-neutral-400 py-1 px-4 rounded-xl w-20 md:w-28"
        name={idName + "-" + sizeId}
        defaultValue="0"
      />
    </div>
  );
}
