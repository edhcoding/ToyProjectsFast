"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useCallback, useEffect, useRef } from "react";
import Loading from "@/components/Loading";
import { StoreDataType } from "@/interface";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Loader from "@/components/Loader";
import SearchFilter from "@/components/SearchFilter";
import { useRecoilValue } from "recoil";
import { searchState } from "@/atom";
import StoreList from "@/components/StoreList";

export default function StoreListPage() {
  const searchValue = useRecoilValue(searchState);

  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting; // 페이지 하단에 왔는지 안왔는지 확인하기 위해서

  const searchParams = {
    q: searchValue?.q,
    district: searchValue?.district,
  };

  // const {
  //   data: stores,
  //   isLoading,
  //   isError,
  // } = useQuery(`stores-${page}`, async () => {
  //   const { data } = await axios(`/api/stores?page=${page}`);
  //   return data as StoreApiResponse;
  // });

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios("/api/stores", {
      params: {
        page: pageParam,
        limit: 10,
        ...searchParams,
      },
    });

    return data;
  };

  const {
    data: stores,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(["stores", searchParams], fetchStores, {
    getNextPageParam: (lastpage: any) =>
      lastpage.data?.length > 0 ? lastpage.page + 1 : undefined,
    // getNextPageParam. getPreviousPageParam: 다음 및 이전 페이지에 대한 매개 변수를 생성하는 함수
    // getNextPageParam와 getPreviousPageParam 옵션으로 로드할 데이터가 더 있는지 여부와 fetch할 정보를 결정할 수 있습니다. 해당 정보는 query 함수에 추가 매개 변수로 제공됩니다.
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();

    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, hasNextPage, isPageEnd]);

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[30%] text-red-500 text-center font-semibold">
        Error...
      </div>
    );
  }

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      {/* search filter */}
      <SearchFilter />
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.pages?.map((page, i) => (
            <React.Fragment key={i}>
              {page.data.map((store: StoreDataType, i: number) => (
                <StoreList store={store} i={i} key={i} />
              ))}
            </React.Fragment>
          ))
        )}
      </ul>
      {/* {stores?.totalPage && (
        <Pagination totalPage={stores?.totalPage} page={page} />
      )} */}
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  );
}
