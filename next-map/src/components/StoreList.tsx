import { StoreDataType } from "@/interface";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface StoreListProps {
  store?: StoreDataType;
  i: number;
}

export default function StoreList({ store, i }: StoreListProps) {
  const router = useRouter();

  return (
    <li
      key={i}
      className="flex justify-between gap-x-6 py-5 cursor-pointer hover:bg-gray-50"
      onClick={() => router.push(`/stores/${store?.id}`)}
    >
      <div className="flex gap-x-4 ">
        <Image
          src={
            store?.category
              ? `/images/markers/${store.category}.png`
              : "/images/markers/default.png"
          }
          alt="아이콘 이미지"
          width={48}
          height={48}
        />
        <div>
          <div className="text-sm font-semibold leading-6 text-gray-900">
            {store?.name}
          </div>
          <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
            {store?.storeType}
          </div>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <div className="text-sm font-semibold leading-6 text-gray-900">
          {store?.address}
        </div>
        <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
          {store?.phone || "번호없음"} | {store?.foodCertifyName} |{" "}
          {store?.category}
        </div>
      </div>
    </li>
  );
}
