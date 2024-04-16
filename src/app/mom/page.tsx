"use client";

import { useLatestPrices } from "@/api/price";
import { Decimal } from "@/helper/Decimal";
import { useState } from "react";

const Page = () => {
  const { prices } = useLatestPrices();

  const [usdtRMBPrice, setUsdtRMBPrice] = useState(7.42);

  const balance: { [key: string]: number } = {
    BTC: 0.25261,
    ETH: 4.07,
    USDT: 9959,
  };

  const perWidth = "250px";

  // 计算总价值
  const totalValue = prices?.reduce((acc, value) => {
    const assetBalance = balance[value.name] || 0;
    const assetPrice =
      value.adjustedPrice.parseToEqual(assetBalance) *
      value.adjustedPrice.price;
    const assetTotalValue = Decimal.formatPrice(
      assetPrice,
      value.adjustedPrice.expo * 2,
      4
    );
    return acc + parseFloat(assetTotalValue);
  }, 0);

  const principle = 300000;

  return (
    <div>
      <div>
        <span>当前U价</span>
        <input
          value={usdtRMBPrice}
          onChange={(value) =>
            setUsdtRMBPrice(parseFloat(value.target.value) || 0)
          }
        />
      </div>
      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex" }}>
          <div style={{ width: perWidth }}>Token</div>
          <div style={{ width: perWidth }}>价格</div>
          <div style={{ width: perWidth }}>数量</div>
          <div style={{ width: perWidth }}>价值</div>
        </div>
        {prices?.map((value) => {
          return (
            <div key={value.id} style={{ display: "flex" }}>
              <div style={{ width: perWidth }}>{value.name}</div>
              <div style={{ width: perWidth }}>
                {value.adjustedPrice.pretty(4)}
              </div>
              <div style={{ width: perWidth }}>
                {balance[value.name]?.toString()}
              </div>
              <div style={{ width: perWidth }}>
                {Decimal.formatPrice(
                  value.adjustedPrice.parseToEqual(balance?.[value.name] || 0) *
                    value.adjustedPrice.price,
                  value.adjustedPrice.expo * 2,
                  4
                )}
              </div>
            </div>
          );
        })}
        <div style={{ display: "flex" }}>
          <div style={{ width: perWidth }}>合计：USD</div>
          <div style={{ width: perWidth }}></div>
          <div style={{ width: perWidth }}></div>
          <div style={{}}>{totalValue?.toFixed(4)}</div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: perWidth }}>合计：RMB</div>
          <div style={{ width: perWidth }}></div>
          <div style={{ width: perWidth }}></div>
          <div style={{}}>
            {((totalValue || 0) * usdtRMBPrice).toFixed(4)}元
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: perWidth }}>本金：RMB</div>
          <div style={{ width: perWidth }}></div>
          <div style={{ width: perWidth }}></div>
          <div style={{}}>{principle}元</div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: perWidth }}>浮盈：RMB</div>
          <div style={{ width: perWidth }}></div>
          <div style={{ width: perWidth }}></div>
          <div style={{}}>
            {((totalValue || 0) * usdtRMBPrice - principle).toFixed(4)}元
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
