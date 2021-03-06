import Partner from "@modules/partners/entities/Partner";

export default interface ICreateSaleServiceDTO {
  order: number;
  product_id: number;
  quantity: number;
  cost_price: number;
  sale_price: number;
  customer: Partner;
  seller: Partner;
  date: Date;
}
