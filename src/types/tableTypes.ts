export type UserRole = "ADMIN" | "USER" | "SELLER";
export type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "PROCESSED" | "SHIPPED" | "DELIVERED" | "CANCELLED"

export interface Feature {
  label: string;
  value: string;
}
export interface User {
  id: number,
  email: string,
  name?: string,
  image?: string,
  role:UserRole,
  password: string,
  phone?: string,
  createdAt:Date,
  updatedAt: Date,
  address: Address[],
  cart?: Cart,
  orders: Order[],
  rating: Rating[],
  wishlist?: Wishlist
}

export interface Address {
  id: number,
  user_id:number,
  line1:string,
  line2?: string,
  city: string,
  state: string,
  pincode: string,
  createdAt: Date,
  updatedAt: Date,
  name: string,
  phone?: string,
  type?: string,
  user: User,
  orders: Order[]
}

export interface Order {
  id: number,
  orderNo: string,
  orderDate: Date,
  userId: number,
  status: OrderStatus,
  totalAmount:number,
  paymentMethod: string,
  paymentStatus: string,
  deliveryAddressId: number,
  deliveryCharges: number,
  createdAt: Date,
  updatedAt: Date,
  totalActualAmount?: string | number,
  address: Address
  user: User,
  orderDetails: OrderDetails[]
}

export interface OrderDetails {
  id: number,
  orderId: number,
  productId: number,
  actualPrice: number,
  discountedPrice: number,
  quantity: number,
  totalPrice: number,
  order: Order,
  product: Product
}

export interface Product {
  id: number,
  name: string,
  description?: string,
  discountedPrice: number,
  actualPrice: number,
  categoryId: number,
  images: string[],
  createdAt: Date,
  updatedAt: Date,
  avgRating: number,
  features?: Feature[],
  numRating: number,
  discountPercentage?: number,
  orderDetails:OrderDetails[],
  category: Category,
  rating: Rating[],
  carts: Cart[],
  wishlist: Wishlist[],
  quantityInStock: number,
  reorderLevel: number,
  isActive:boolean
}

export interface Category {
  id: number,
  name: string,
  slug: string,
  parentId?: number,
  parent?: Category,
  products: Product[],
  children?: Category[]
}

export interface Cart {
  id: number,
  userId: number,
  createdAt: Date,
  updatedAt: Date,
  user: User,
  products : Product[]
}

export interface Wishlist {
  id: number,
  userId: number,
  createdAt: Date,
  updatedAt: Date,
  user: User,
  products: Product[] 
}

export interface Rating {
  id: number,
  rating: number,
  notes?: string
  productId: number,
  userId: number,
  createdAt: Date,
  updatedAt: Date,
  product: Product,
  user: User,    
}