// User Types
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  is_admin: boolean
  created_at: string
}

// Product Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category_id: string
  created_by: string
  created_at: string
  updated_at: string
}

// Order Types
export interface Order {
  id: string
  user_id: string
  product_id: string
  amount: number
  razorpay_order_id?: string
  razorpay_payment_id?: string
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}

// Cart Types
export interface CartItem {
  product_id: string
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
}
