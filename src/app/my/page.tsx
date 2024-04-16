"use client";

import { useLatestPrices } from "@/api/price";
import { Decimal } from "@/helper/Decimal";

const Page = () => {
  const { prices } = useLatestPrices();

  const balance: { [key: string]: number } = {
    BTC: 0.24,
    BNB: 7.12,
    ETH: 3.1,
    USDT: 4785,
    ALT: 3170,
    BLUR: 1481,
    SATS: 156352199,
    SUI: 5440,
  };

  const perWidth = "250px";

  // 计算总价值
  const totalValue = prices?.reduce((acc, value) => {
    const assetBalance = balance[value.name];
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

  // 贷款 80000
  // 公积金 73400
  // 工资 23000
  const loan = 80000;
  const jpInvest = 23000;
  const slInvest = 73400;
  const principle = slInvest + jpInvest + loan;

  const usdtRMBPrice = 7.42;

  return (
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
                value.adjustedPrice.parseToEqual(balance[value.name]) *
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
        <div style={{}}>{((totalValue || 0) * usdtRMBPrice).toFixed(4)}元</div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: perWidth }}>本金：RMB</div>
        <div style={{ width: perWidth }}></div>
        <div style={{ width: perWidth }}></div>
        <div style={{}}>{principle}元</div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: perWidth }}>本金(无贷款) + 浮盈：RMB</div>
        <div style={{ width: perWidth }}></div>
        <div style={{ width: perWidth }}></div>
        <div style={{}}>
          {((totalValue || 0) * usdtRMBPrice - loan).toFixed(4)}元
        </div>
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
  );
};

export default Page;
