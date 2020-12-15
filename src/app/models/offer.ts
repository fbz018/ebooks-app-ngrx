export interface Offer{
    type: 'percentage' | 'minus' | 'slice';
    value: number;
    sliceValue?: number;
}
