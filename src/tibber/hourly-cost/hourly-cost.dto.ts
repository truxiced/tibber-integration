export interface HourlyCostDto {
  data: {
    viewer: ViewerDto;
  };
}

export interface ViewerDto {
  homes: HomeDto[];
}

export interface HomeDto {
  currentSubscription: CurrentSubscriptionDto;
}

export interface CurrentSubscriptionDto {
  priceInfo: PriceInfoDto;
}

export interface PriceInfoDto {
  current: CurrentDto;
}

export interface CurrentDto {
  total: number;
  energy: number;
  tax: number;
  startsAt: Date;
}
