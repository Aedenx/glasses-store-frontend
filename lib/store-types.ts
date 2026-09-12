export type GenderTarget = "Men" | "Women" | "Unisex" | "Kids";

export interface FrameMaterial {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface FrameShape {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface LensType {
  id: number;
  name: string;
  slug: string;
  is_polarized: boolean;
  uv_protection: string;
  description: string;
}

export interface Collection {
  id: number;
  code: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  style_attributes: string;
  accent: string;
  image: string;
}

export interface Product {
  id: number;
  collection_id: number;
  slug: string;
  name: string;
  sku: string;
  description: string;
  base_price: number;
  gender: GenderTarget;
  is_polarized: boolean;
  is_prescription_available: boolean;
  is_active: boolean;
  image: string;
  material_id: number;
  shape_id: number;
  lens_type_id: number;
}

export interface ProductSpecification {
  id: number;
  product_id: number;
  weight_grams: number;
  lens_width_mm: number;
  bridge_width_mm: number;
  temple_length_mm: number;
  lens_height_mm: number;
  uv_protection: string;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  sku: string;
  frame_color: string;
  lens_color: string;
  lens_type_id: number;
  price: number;
  stock_quantity: number;
}

export interface Prescription {
  sphere_od: number;
  cylinder_od: number;
  axis_od: number;
  sphere_os: number;
  cylinder_os: number;
  axis_os: number;
  pd_mm: number;
}

export interface CartItemSnapshot {
  product_id: number;
  product_slug: string;
  product_name: string;
  product_image: string;
  variant_id: number;
  frame_color: string;
  lens_color: string;
  lens_type: string;
  quantity: number;
  unit_price: number;
  prescription: Prescription | null;
}

export interface CartTotals {
  subtotal_amount: number;
  shipping_cost: number;
  total_amount: number;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postal_code: string;
}

export interface Order {
  id: string;
  items: CartItemSnapshot[];
  address: Address;
  totals: CartTotals;
  status: "pending" | "paid" | "shipped" | "delivered";
  created_at: string;
}

export type SortOption = "featured" | "price-asc" | "price-desc" | "name";

export type ProductFilterKeys =
  | "material"
  | "shape"
  | "lens"
  | "polarized"
  | "gender"
  | "collection"
  | "sort";

export interface ProductView extends Product {
  collection: Collection;
  material: FrameMaterial;
  shape: FrameShape;
  lensType: LensType;
  offeredLensTypeIds: number[];
  lowest_price: number;
  in_stock: boolean;
  variants: ProductVariant[];
  specification: ProductSpecification | null;
}

export interface ProductFilters {
  material?: string;
  shape?: string;
  lens?: string;
  polarized?: string;
  gender?: string;
  collection?: string;
  q?: string;
  sort?: SortOption;
}

export function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}