export interface UOrder {
  customerId: string,
  items: {
    itemId : string,
    name : string,
    quantity : number,
    price : number,
    image : string
  },
  Address: string,
  phone : number,
  paymentType: string,
  paymentStatus: Boolean,
}
