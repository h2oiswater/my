import { PriceFeed } from "@/api/price";

export class Decimal {
  public price: bigint;
  public expo: number;

  constructor(price: string, expo: number) {
    this.price = BigInt(price);
    this.expo = expo;
  }

  static formatPrice(
    price: string | bigint,
    expo: number,
    decimalPlaces: number
  ): string {
    // 将 BigInt 转换为字符串
    let priceStr = BigInt(price).toString();

    // 计算指数位数
    const exponent = -expo;

    // 获取整数部分和小数部分
    let integerPart = "";
    let fractionalPart = "";
    if (exponent >= 0) {
      integerPart = priceStr.slice(0, -exponent) || "0";
      fractionalPart = priceStr
        .slice(-exponent)
        .padStart(decimalPlaces, "0")
        .slice(0, decimalPlaces);
    } else {
      integerPart = "0";
      fractionalPart = priceStr
        .padStart(-exponent, "0")
        .padEnd(decimalPlaces, "0")
        .slice(0, decimalPlaces);
    }

    // 插入小数点
    let result = "";
    if (fractionalPart !== "") {
      result = `${integerPart}.${fractionalPart}`;
    } else {
      result = `${integerPart}.`;
      // 如果小数部分为零，则添加一个零
      if (decimalPlaces > 0) {
        result += "0".repeat(decimalPlaces);
      }
    }

    return result;
  }

  parseToEqual(value: number): bigint {
    // 计算指数位数
    const exponent = -this.expo;
    const equalValue = BigInt(value * Math.pow(10, exponent));
    return equalValue;
  }

  // 将价格格式化为所需的位数
  pretty(decimalPlaces: number): string {
    return Decimal.formatPrice(this.price.toString(), this.expo, decimalPlaces);
  }
}

export const processPriceFeed = (priceFeed: PriceFeed): Decimal => {
  const { price, expo } = priceFeed.price;
  return new Decimal(price, expo);
};
