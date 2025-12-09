import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  transactionId: String,
  date: Date,
  customerId: String,
  customerName: String,
  phoneNumber: String,
  gender: String,
  age: Number,
  customerRegion: String,
  customerType: String,
  productId: String,
  productName: String,
  brand: String,
  productCategory: String,
  tags: [String],
  quantity: Number,
  pricePerUnit: Number,
  discountPercentage: Number,
  totalAmount: Number,
  finalAmount: Number,
  paymentMethod: String,
  orderStatus: String,
  deliveryType: String,
  storeId: String,
  storeLocation: String,
  salespersonId: String,
  employeeName: String
}, { strict: false });

TransactionSchema.index({ customerName: "text", phoneNumber: "text" });
TransactionSchema.index({ date: -1 });
TransactionSchema.index({ customerRegion: 1 });
TransactionSchema.index({ productCategory: 1 });
TransactionSchema.index({ tags: 1 });

export default mongoose.model('Transaction', TransactionSchema);
