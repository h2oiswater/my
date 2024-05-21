const PriceFeedsId = {
  BTC: "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
  ETH: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
  SUI: "0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744",
  ALT: "0x119ff2acf90f68582f5afd6f7d5f12dbae81e4423f165837169d6b94c27fb384",
  BLUR: "0x856aac602516addee497edf6f50d39e8c95ae5fb0da1ed434a8c2ab9c3e877e9",
  SATS: "0x40440d18fb5ad809e2825ce7dfc035cfa57135c13062a04addafe0c7f54425e0",
  BNB: "0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f",
  USDT: "0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b",
  MERL: "0x03e8dbf3e8f02edf5ca898dc7afbbac3f06c7d91c02986c3a8c6ce1a99e90355",
};

export default PriceFeedsId;

export const getTokenName = (id: string): string => {
  return (
    Object.entries(PriceFeedsId).find(
      ([name, token]) => token === `0x${id}`
    )?.[0] ?? "Unknown"
  );
};
