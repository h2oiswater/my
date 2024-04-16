import axios from "axios";
import useSWR from "swr";
import ids, { getTokenName } from "@/config/hermes";
import {} from "ethers";
import { Decimal, processPriceFeed } from "@/helper/Decimal";

export interface Price {
  price: string;
  conf: string;
  expo: number;
  publish_time: number;
}

export interface PriceFeed {
  id: string;
  price: Price;
  ema_price: Price;
}

interface AdjustedPrice {
  id: string;
  name: string;
  adjustedPrice: Decimal;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const queryString = (ids: Record<string, string>) => {
  return Object.values(ids)
    .map((id) => `ids[]=${id}`)
    .join("&");
};

const processPriceFeeds = (priceFeeds: PriceFeed[]): AdjustedPrice[] => {
  return priceFeeds.map((priceFeed) => {
    const adjustedPrice = processPriceFeed(priceFeed);
    return {
      id: priceFeed.id,
      name: getTokenName(priceFeed.id),
      adjustedPrice,
    };
  });
};

export const useLatestPrices = () => {
  const apiUrl = `https://hermes.pyth.network/api/latest_price_feeds?${queryString(
    ids
  )}`;
  const { data, error } = useSWR<PriceFeed[]>(apiUrl, fetcher);

  const adjustedPrices = data ? processPriceFeeds(data) : null;

  console.log(adjustedPrices);

  return {
    prices: adjustedPrices,
    isLoading: !error && !data,
    isError: error,
  };
};
