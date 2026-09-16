import { collections as collectionSeeds } from "@/components/collections-data";
import type {
  Collection,
  FrameMaterial,
  FrameShape,
  LensType,
  Product,
  ProductFilters,
  ProductSpecification,
  ProductVariant,
  ProductView,
  SortOption,
} from "./store-types";

export const frameMaterials: FrameMaterial[] = [
  { id: 1, name: "Metal", slug: "metal", description: "Frame logam ringan & tahan lama." },
  { id: 2, name: "Titanium", slug: "titanium", description: "Titanium aerospace-grade, ultra ringan." },
  { id: 3, name: "Plastic", slug: "plastic", description: "Plastik acetate premium warna solid." },
  { id: 4, name: "TR90", slug: "tr90", description: "Nylon TR90 fleksibel, tahan benturan tinggi." },
];

export const frameShapes: FrameShape[] = [
  { id: 1, name: "Aviator", slug: "aviator", description: "Bentuk teardrop klasik pilot." },
  { id: 2, name: "Square", slug: "square", description: "Tegas & modern untuk wajah bulat." },
  { id: 3, name: "Round", slug: "round", description: "Lingkaran vintage yang ikonik." },
  { id: 4, name: "Shield", slug: "shield", description: "Lensa penuh proteksi maksimal." },
  { id: 5, name: "Wrap", slug: "wrap", description: "Melengkung mengikuti wajah." },
  { id: 6, name: "Cat-eye", slug: "cat-eye", description: "Feminin retro dengan aksen tajam." },
  { id: 7, name: "Rectangular", slug: "rectangular", description: "Kotak memanjang profesional." },
  { id: 8, name: "Wayfarer", slug: "wayfarer", description: "Klasik bold ikon budaya pop." },
];

export const lensTypes: LensType[] = [
  { id: 1, name: "Polarized", slug: "polarized", is_polarized: true, uv_protection: "UV400", description: "Mengurangi silau & refleksi berbahaya." },
  { id: 2, name: "UV400 Standard", slug: "uv400", is_polarized: false, uv_protection: "UV400", description: "Blokir 100% sinar UVA & UVB." },
  { id: 3, name: "Photochromic", slug: "photochromic", is_polarized: false, uv_protection: "UV400", description: "Lensa berpindah gelap terang otomatis." },
  { id: 4, name: "Mirror", slug: "mirror", is_polarized: false, uv_protection: "UV400", description: "Lapisan cermin tampilan agresif." },
  { id: 5, name: "Blue Filter", slug: "blue-filter", is_polarized: false, uv_protection: "UV400", description: "Menyaring cahaya biru layar digital." },
];

export const collections: Collection[] = collectionSeeds.map((seed, index) => ({
  id: index + 1,
  code: seed.code,
  slug: seed.slug,
  name: seed.name,
  tagline: seed.tagline,
  description: seed.description,
  style_attributes: seed.styleAttributes,
  accent: seed.accent,
  image: seed.image,
}));

export const products: Product[] = [
  { id: 1, collection_id: 1, slug: "summit-pro", name: "Summit Pro", sku: "SM-SUMPRO-001", base_price: 899000, gender: "Men", is_polarized: true, is_prescription_available: true, is_active: true, image: "https://i.pinimg.com/1200x/56/64/bd/5664bdeb66dd45ba7d3686b191b6b3d7.jpg", material_id: 2, shape_id: 5, lens_type_id: 1, description: "Kacamata pendakian dengan frame titanium ultra-ringan dan lensa polarized anti-silau salju." },
  { id: 2, collection_id: 1, slug: "summit-trail", name: "Summit Trail", sku: "SM-SUMTRL-002", base_price: 749000, gender: "Unisex", is_polarized: false, is_prescription_available: true, is_active: true, image: "https://i.pinimg.com/1200x/af/2b/e1/af2be172421c0c5745e7921a42cd91a6.jpg", material_id: 4, shape_id: 4, lens_type_id: 3, description: "Lensa photochromic adaptif untuk medan yang berubah cuaca, dari lembah sampai puncak." },
  { id: 3, collection_id: 2, slug: "coast-aviator", name: "Coast Aviator", sku: "CO-CSAVT-003", base_price: 799000, gender: "Unisex", is_polarized: true, is_prescription_available: true, is_active: true, image: "https://i.pinimg.com/1200x/01/b6/e1/01b6e1fd6f7fb8fad33117cd6c8fc957.jpg", material_id: 1, shape_id: 1, lens_type_id: 1, description: "Aviator metal klasik dengan refleksi lautan—pas untuk cruising menyusuri pesisir." },
  { id: 4, collection_id: 2, slug: "coast-sunset", name: "Coast Sunset", sku: "CO-CSSUN-004", base_price: 649000, gender: "Women", is_polarized: false, is_prescription_available: false, is_active: true, image: "https://i.pinimg.com/1200x/1f/fe/84/1ffe844e5552a72f8198063b9667f525.jpg", material_id: 3, shape_id: 6, lens_type_id: 4, description: "Cat-eye mirror lens dengan gradasi warna senja yang playful untuk liburan pantai." },
  { id: 5, collection_id: 3, slug: "metro-essential", name: "Metro Essential", sku: "MT-MRSESS-005", base_price: 719000, gender: "Men", is_polarized: true, is_prescription_available: true, is_active: true, image: "https://i.pinimg.com/1200x/bd/81/57/bd815762d3f4b478b9b1cbb3d64378db.jpg", material_id: 1, shape_id: 8, lens_type_id: 1, description: "Wayfarer esensial untuk harian kota—clean, modern, dan streetwear-ready." },
  { id: 6, collection_id: 3, slug: "metro-street", name: "Metro Street", sku: "MT-MRSTR-006", base_price: 599000, gender: "Men", is_polarized: false, is_prescription_available: false, is_active: true, image: "https://i.pinimg.com/736x/b4/a3/96/b4a396df05daf1368b6c30690ca17013.jpg", material_id: 3, shape_id: 2, lens_type_id: 2, description: "Square acetate untuk tampilan urban yang tegas tanpa basa-basi." },
  { id: 7, collection_id: 4, slug: "dune-explorer", name: "Dune Explorer", sku: "DU-DNESP-007", base_price: 769000, gender: "Unisex", is_polarized: true, is_prescription_available: true, is_active: true, image: "https://i.pinimg.com/1200x/a8/9b/d8/a89bd841a2ab0ef36710779fcd832043.jpg", material_id: 1, shape_id: 3, lens_type_id: 1, description: "Round metal bergaya vintage untuk penjelajah gurun dan pecinta travel." },
  { id: 8, collection_id: 5, slug: "trail-force", name: "Trail Force", sku: "TR-TRLFRC-008", base_price: 829000, gender: "Men", is_polarized: true, is_prescription_available: true, is_active: true, image: "https://i.pinimg.com/1200x/18/ee/d0/18eed0776b3ee000d1f94b31477a931c.jpg", material_id: 4, shape_id: 5, lens_type_id: 1, description: "Wrap TR90 anti-benturan untuk hiking dan camping melewati medan ekstrem." },
  { id: 9, collection_id: 6, slug: "tide-wave", name: "Tide Wave", sku: "TD-TDEWAV-009", base_price: 879000, gender: "Men", is_polarized: true, is_prescription_available: true, is_active: true, image: "https://i.pinimg.com/1200x/14/7f/76/147f7628988180197dcdc00434bf9465.jpg", material_id: 4, shape_id: 4, lens_type_id: 3, description: "Shield teknis untuk olahraga air—anti slip, apung, dan adaptif terhadap terik matahari." },
  { id: 10, collection_id: 7, slug: "apex-velocity", name: "Apex Velocity", sku: "AP-APXVEL-010", base_price: 949000, gender: "Unisex", is_polarized: true, is_prescription_available: false, is_active: true, image: "https://i.pinimg.com/736x/40/ea/07/40ea074f6018422e1414fc0b9eda3540.jpg", material_id: 3, shape_id: 4, lens_type_id: 4, description: "Shield mirror futuristik terinspirasi motorsport—aerodinamis dan kecepatan murni." },
  { id: 11, collection_id: 8, slug: "noir-allure", name: "Noir Allure", sku: "NR-NRRALR-011", base_price: 699000, gender: "Women", is_polarized: false, is_prescription_available: true, is_active: true, image: "https://i.pinimg.com/1200x/bf/c7/7e/bfc77e950e741a7144d07f871a21b123.jpg", material_id: 1, shape_id: 6, lens_type_id: 2, description: "Sensual dan premium untuk malam hari—cat-eye dengan nuansa misterius." },
  { id: 12, collection_id: 9, slug: "nomad-one", name: "Nomad One", sku: "NM-NMDONE-012", base_price: 859000, gender: "Unisex", is_polarized: true, is_prescription_available: true, is_active: true, image: "https://i.pinimg.com/1200x/06/4c/65/064c65628cd153dedb2d249e7dd5f09c.jpg", material_id: 2, shape_id: 3, lens_type_id: 3, description: "Round titanium serbaguna untuk menemani perjalanan ke mana pun kamu berlabuh." },
  { id: 13, collection_id: 10, slug: "solar-everyday", name: "Solar Everyday", sku: "SL-SLREVY-013", base_price: 549000, gender: "Women", is_polarized: true, is_prescription_available: false, is_active: true, image: "https://i.pinimg.com/1200x/10/ff/d1/10ffd14f579b73a30b2190c3d7155b25.jpg", material_id: 4, shape_id: 2, lens_type_id: 1, description: "TR90 ringan untuk gaya harian tanpa ribet—dari kafe sampai kampus." },
  { id: 14, collection_id: 10, slug: "solar-kids", name: "Solar Kids", sku: "SL-SLRKID-014", base_price: 429000, gender: "Kids", is_polarized: true, is_prescription_available: false, is_active: true, image: "https://i.pinimg.com/1200x/1b/91/17/1b9117b5b7734b7def81b918576e88c8.jpg", material_id: 3, shape_id: 3, lens_type_id: 2, description: "Kacamata anak tangguh dengan frame fleksibel dan tali pengaman." },
];

export const productSpecifications: ProductSpecification[] = [
  { id: 1, product_id: 1, weight_grams: 30, lens_width_mm: 54, bridge_width_mm: 20, temple_length_mm: 145, lens_height_mm: 41, uv_protection: "UV400" },
  { id: 2, product_id: 2, weight_grams: 28, lens_width_mm: 49, bridge_width_mm: 21, temple_length_mm: 143, lens_height_mm: 39, uv_protection: "UV400" },
  { id: 3, product_id: 3, weight_grams: 25, lens_width_mm: 58, bridge_width_mm: 18, temple_length_mm: 145, lens_height_mm: 47, uv_protection: "UV400" },
  { id: 4, product_id: 4, weight_grams: 27, lens_width_mm: 55, bridge_width_mm: 17, temple_length_mm: 140, lens_height_mm: 45, uv_protection: "UV400" },
  { id: 5, product_id: 5, weight_grams: 24, lens_width_mm: 52, bridge_width_mm: 19, temple_length_mm: 142, lens_height_mm: 40, uv_protection: "UV400" },
  { id: 6, product_id: 6, weight_grams: 26, lens_width_mm: 53, bridge_width_mm: 19, temple_length_mm: 148, lens_height_mm: 44, uv_protection: "UV400" },
  { id: 7, product_id: 7, weight_grams: 25, lens_width_mm: 50, bridge_width_mm: 20, temple_length_mm: 142, lens_height_mm: 43, uv_protection: "UV400" },
  { id: 8, product_id: 8, weight_grams: 29, lens_width_mm: 51, bridge_width_mm: 20, temple_length_mm: 146, lens_height_mm: 42, uv_protection: "UV400" },
  { id: 9, product_id: 9, weight_grams: 28, lens_width_mm: 50, bridge_width_mm: 21, temple_length_mm: 145, lens_height_mm: 40, uv_protection: "UV400" },
  { id: 10, product_id: 10, weight_grams: 31, lens_width_mm: 52, bridge_width_mm: 18, temple_length_mm: 144, lens_height_mm: 46, uv_protection: "UV400" },
  { id: 11, product_id: 11, weight_grams: 23, lens_width_mm: 56, bridge_width_mm: 17, temple_length_mm: 140, lens_height_mm: 48, uv_protection: "UV400" },
  { id: 12, product_id: 12, weight_grams: 27, lens_width_mm: 51, bridge_width_mm: 20, temple_length_mm: 143, lens_height_mm: 44, uv_protection: "UV400" },
  { id: 13, product_id: 13, weight_grams: 26, lens_width_mm: 54, bridge_width_mm: 18, temple_length_mm: 142, lens_height_mm: 41, uv_protection: "UV400" },
  { id: 14, product_id: 14, weight_grams: 22, lens_width_mm: 47, bridge_width_mm: 19, temple_length_mm: 130, lens_height_mm: 38, uv_protection: "UV400" },
];

const RAW_VARIANTS: (Omit<ProductVariant, "image"> & { image?: string })[] = [
  { id: 1, product_id: 1, sku: "SM-SUMPRO-001-MB-SM", frame_color: "Matte Black", lens_color: "Smoke", lens_type_id: 1, price: 899000, stock_quantity: 12, image: "https://i.pinimg.com/1200x/56/64/bd/5664bdeb66dd45ba7d3686b191b6b3d7.jpg" },
  { id: 2, product_id: 1, sku: "SM-SUMPRO-001-MB-GR", frame_color: "Matte Black", lens_color: "Green", lens_type_id: 1, price: 899000, stock_quantity: 8, image: "https://i.pinimg.com/736x/77/0b/fd/770bfdf2b28a48059011879bfb7102f6.jpg" },
  { id: 3, product_id: 1, sku: "SM-SUMPRO-001-AG-AM", frame_color: "Army Green", lens_color: "Amber", lens_type_id: 1, price: 899000, stock_quantity: 0, image: "https://i.pinimg.com/1200x/7e/86/c5/7e86c55644886fa031df8df3b6028bcf.jpg" },
  { id: 4, product_id: 1, sku: "SM-SUMPRO-001-GM-BM", frame_color: "Gunmetal", lens_color: "Blue Mirror", lens_type_id: 4, price: 949000, stock_quantity: 5, image: "https://i.pinimg.com/1200x/cc/43/c0/cc43c06cb311f347d78fe132bc76ee17.jpg" },
  { id: 5, product_id: 2, sku: "SM-SUMTRL-002-MB-CY", frame_color: "Matte Black", lens_color: "Clear Yellow", lens_type_id: 3, price: 749000, stock_quantity: 10, image: "https://i.pinimg.com/1200x/af/2b/e1/af2be172421c0c5745e7921a42cd91a6.jpg" },
  { id: 6, product_id: 2, sku: "SM-SUMTRL-002-DS-SM", frame_color: "Desert Sand", lens_color: "Smoke", lens_type_id: 3, price: 749000, stock_quantity: 7, image: "https://i.pinimg.com/1200x/28/43/89/2843890e22d0045f59a0c8be9d3d7386.jpg" },
  { id: 7, product_id: 2, sku: "SM-SUMTRL-002-BO-GB", frame_color: "Burnt Orange", lens_color: "Gradient Brown", lens_type_id: 2, price: 699000, stock_quantity: 4, image: "https://i.pinimg.com/1200x/d2/fd/da/d2fdda8326feb4aad362bb195b6a679b.jpg" },
  { id: 8, product_id: 3, sku: "CO-CSAVT-003-GD-GR", frame_color: "Gold", lens_color: "Green", lens_type_id: 1, price: 799000, stock_quantity: 9, image: "https://i.pinimg.com/1200x/01/b6/e1/01b6e1fd6f7fb8fad33117cd6c8fc957.jpg" },
  { id: 9, product_id: 3, sku: "CO-CSAVT-003-SV-SM", frame_color: "Silver", lens_color: "Smoke", lens_type_id: 1, price: 799000, stock_quantity: 11, image: "https://i.pinimg.com/736x/99/3b/89/993b897f1425fe8da9177429e40907a4.jpg" },
  { id: 10, product_id: 3, sku: "CO-CSAVT-003-GM-CB", frame_color: "Gunmetal", lens_color: "Crystal Blue", lens_type_id: 1, price: 799000, stock_quantity: 6, image: "https://i.pinimg.com/1200x/91/c1/22/91c122fa286051a4014f0ecf988f4135.jpg" },
  { id: 11, product_id: 4, sku: "CO-CSSUN-004-PT-RG", frame_color: "Pink Tortoise", lens_color: "Rose Gradient", lens_type_id: 4, price: 719000, stock_quantity: 8, image: "https://i.pinimg.com/1200x/1f/fe/84/1ffe844e5552a72f8198063b9667f525.jpg" },
  { id: 12, product_id: 4, sku: "CO-CSSUN-004-WH-LV", frame_color: "White", lens_color: "Lavender", lens_type_id: 4, price: 719000, stock_quantity: 5, image: "https://i.pinimg.com/736x/b3/c1/68/b3c16832704784a9b637c8894169161d.jpg" },
  { id: 13, product_id: 4, sku: "CO-CSSUN-004-BK-SM", frame_color: "Black", lens_color: "Smoke", lens_type_id: 2, price: 649000, stock_quantity: 10, image: "https://i.pinimg.com/1200x/5e/70/ed/5e70ede62be1e2daf3a7ed5add7ebe36.jpg" },
  { id: 14, product_id: 5, sku: "MT-MRSESS-005-MB-SM", frame_color: "Matte Black", lens_color: "Smoke", lens_type_id: 1, price: 719000, stock_quantity: 15, image: "https://i.pinimg.com/1200x/bd/81/57/bd815762d3f4b478b9b1cbb3d64378db.jpg" },
  { id: 15, product_id: 5, sku: "MT-MRSESS-005-SV-BL", frame_color: "Silver", lens_color: "Blue", lens_type_id: 1, price: 719000, stock_quantity: 9, image: "https://i.pinimg.com/736x/3d/ac/35/3dac359d05e6f6d773839b40936ea7ce.jpg" },
  { id: 16, product_id: 5, sku: "MT-MRSESS-005-HT-GB", frame_color: "Honey Tortoise", lens_color: "Gradient Brown", lens_type_id: 1, price: 719000, stock_quantity: 7, image: "https://i.pinimg.com/1200x/a5/9e/76/a59e768343ac452a49a971b283eaa662.jpg" },
  { id: 17, product_id: 6, sku: "MT-MRSTR-006-BK-SM", frame_color: "Black", lens_color: "Smoke", lens_type_id: 2, price: 599000, stock_quantity: 14, image: "https://i.pinimg.com/736x/b4/a3/96/b4a396df05daf1368b6c30690ca17013.jpg" },
  { id: 18, product_id: 6, sku: "MT-MRSTR-006-NV-GY", frame_color: "Navy", lens_color: "Grey", lens_type_id: 2, price: 599000, stock_quantity: 10, image: "https://i.pinimg.com/1200x/84/0d/09/840d09c83d684a347a2becfe7a41d4b5.jpg" },
  { id: 19, product_id: 6, sku: "MT-MRSTR-006-TC-AM", frame_color: "Transparent Clear", lens_color: "Amber", lens_type_id: 5, price: 629000, stock_quantity: 6, image: "https://i.pinimg.com/736x/3a/64/3b/3a643bb8f0c5e5787184baab5f543e22.jpg" },
  { id: 20, product_id: 7, sku: "DU-DNESP-007-AG-GR", frame_color: "Antique Gold", lens_color: "Green", lens_type_id: 1, price: 769000, stock_quantity: 10, image: "https://i.pinimg.com/1200x/a8/9b/d8/a89bd841a2ab0ef36710779fcd832043.jpg" },
  { id: 21, product_id: 7, sku: "DU-DNESP-007-SV-SM", frame_color: "Silver", lens_color: "Smoke", lens_type_id: 1, price: 769000, stock_quantity: 8, image: "https://i.pinimg.com/736x/59/5f/cb/595fcb8c88c05f9e561c492b8838851f.jpg" },
  { id: 22, product_id: 7, sku: "DU-DNESP-007-RG-CR", frame_color: "Rose Gold", lens_color: "Crystal", lens_type_id: 4, price: 819000, stock_quantity: 4, image: "https://i.pinimg.com/1200x/3e/3d/80/3e3d80f0abdd304679f78abb03b31d09.jpg" },
  { id: 23, product_id: 8, sku: "TR-TRLFRC-008-MB-SM", frame_color: "Matte Black", lens_color: "Smoke", lens_type_id: 1, price: 829000, stock_quantity: 12, image: "https://i.pinimg.com/1200x/18/ee/d0/18eed0776b3ee000d1f94b31477a931c.jpg" },
  { id: 24, product_id: 8, sku: "TR-TRLFRC-008-CG-AM", frame_color: "Camo Green", lens_color: "Amber", lens_type_id: 1, price: 829000, stock_quantity: 9, image: "https://i.pinimg.com/736x/53/28/d8/5328d87675ba33c7852b68267c6059c0.jpg" },
  { id: 25, product_id: 8, sku: "TR-TRLFRC-008-MB-PH", frame_color: "Matte Black", lens_color: "Photochromic", lens_type_id: 3, price: 879000, stock_quantity: 6, image: "https://i.pinimg.com/736x/16/de/53/16de53cd44e7260e6ceccd01134abe0b.jpg" },
  { id: 26, product_id: 9, sku: "TD-TDEWAV-009-OB-BM", frame_color: "Ocean Blue", lens_color: "Blue Mirror", lens_type_id: 3, price: 879000, stock_quantity: 11, image: "https://i.pinimg.com/1200x/14/7f/76/147f7628988180197dcdc00434bf9465.jpg" },
  { id: 27, product_id: 9, sku: "TD-TDEWAV-009-WH-SM", frame_color: "White", lens_color: "Smoke", lens_type_id: 1, price: 839000, stock_quantity: 13, image: "https://i.pinimg.com/1200x/09/d0/ff/09d0ff2237eee8b4ab52919df1e0b8b9.jpg" },
  { id: 28, product_id: 9, sku: "TD-TDEWAV-009-BK-GR", frame_color: "Black", lens_color: "Green", lens_type_id: 1, price: 839000, stock_quantity: 7, image: "https://i.pinimg.com/736x/3c/a2/74/3ca2746b42d768dbd1bd361b360f9e24.jpg" },
  { id: 29, product_id: 10, sku: "AP-APXVEL-010-CB-RC", frame_color: "Carbon Black", lens_color: "Red Chrome", lens_type_id: 4, price: 949000, stock_quantity: 8, image: "https://i.pinimg.com/736x/40/ea/07/40ea074f6018422e1414fc0b9eda3540.jpg" },
  { id: 30, product_id: 10, sku: "AP-APXVEL-010-WH-BC", frame_color: "White", lens_color: "Blue Chrome", lens_type_id: 4, price: 949000, stock_quantity: 6, image: "https://i.pinimg.com/736x/50/a3/c9/50a3c948bb38b34dd4be178ebd9bdc3b.jpg" },
  { id: 31, product_id: 10, sku: "AP-APXVEL-010-NY-SM", frame_color: "Neon Yellow", lens_color: "Smoke", lens_type_id: 2, price: 899000, stock_quantity: 4, image: "https://i.pinimg.com/1200x/23/a5/a7/23a5a7e61deff502c7fe650b2c041b94.jpg" },
  { id: 32, product_id: 11, sku: "NR-NRRALR-011-MB-SM", frame_color: "Matte Black", lens_color: "Smoke", lens_type_id: 2, price: 699000, stock_quantity: 9, image: "https://i.pinimg.com/1200x/bf/c7/7e/bfc77e950e741a7144d07f871a21b123.jpg" },
  { id: 33, product_id: 11, sku: "NR-NRRALR-011-BG-GG", frame_color: "Burgundy", lens_color: "Gradient Grey", lens_type_id: 2, price: 699000, stock_quantity: 7, image: "https://i.pinimg.com/1200x/60/b9/bc/60b9bc1a1d0c4aa6ccb78f54d5379755.jpg" },
  { id: 34, product_id: 11, sku: "NR-NRRALR-011-TT-CR", frame_color: "Tortoise", lens_color: "Crystal", lens_type_id: 5, price: 729000, stock_quantity: 5, image: "https://i.pinimg.com/736x/42/85/a7/4285a7f693a6c8f159729fb82fe2bffb.jpg" },
  { id: 35, product_id: 12, sku: "NM-NMDONE-012-TG-PH", frame_color: "Titanium Grey", lens_color: "Photochromic", lens_type_id: 3, price: 859000, stock_quantity: 10, image: "https://i.pinimg.com/1200x/06/4c/65/064c65628cd153dedb2d249e7dd5f09c.jpg" },
  { id: 36, product_id: 12, sku: "NM-NMDONE-012-TG-SM", frame_color: "Titanium Grey", lens_color: "Smoke", lens_type_id: 1, price: 819000, stock_quantity: 12, image: "https://i.pinimg.com/236x/31/8a/b3/318ab33ef0d4d2dbafbfa2b288b887c2.jpg" },
  { id: 37, product_id: 12, sku: "NM-NMDONE-012-SV-GR", frame_color: "Silver", lens_color: "Green", lens_type_id: 1, price: 819000, stock_quantity: 8, image: "https://i.pinimg.com/1200x/a7/ef/ed/a7efeddc081a6946a593aba6986196e3.jpg" },
  { id: 38, product_id: 13, sku: "SL-SLREVY-013-MB-SM", frame_color: "Matte Black", lens_color: "Smoke", lens_type_id: 1, price: 549000, stock_quantity: 16, image: "https://i.pinimg.com/1200x/10/ff/d1/10ffd14f579b73a30b2190c3d7155b25.jpg" },
  { id: 39, product_id: 13, sku: "SL-SLREVY-013-RS-CR", frame_color: "Rose", lens_color: "Crystal", lens_type_id: 1, price: 549000, stock_quantity: 12, image: "https://i.pinimg.com/1200x/9e/28/be/9e28beddffe9ce7faf4af0d7a4a9b43d.jpg" },
  { id: 40, product_id: 13, sku: "SL-SLREVY-013-OL-AM", frame_color: "Olive", lens_color: "Amber", lens_type_id: 1, price: 549000, stock_quantity: 9, image: "https://i.pinimg.com/736x/f3/65/62/f365629acc8ee865142b86b893b1ae6a.jpg" },
  { id: 41, product_id: 14, sku: "SL-SLRKID-014-BL-SM", frame_color: "Blue", lens_color: "Smoke", lens_type_id: 2, price: 429000, stock_quantity: 12, image: "https://i.pinimg.com/1200x/2a/a3/5a/2aa35a42dbfe1fd2a18941d8438f34fe.jpg" },
  { id: 42, product_id: 14, sku: "SL-SLRKID-014-RD-CR", frame_color: "Red", lens_color: "Crystal", lens_type_id: 2, price: 429000, stock_quantity: 10, image: "https://i.pinimg.com/1200x/35/b2/be/35b2be14f44aea7fa9b471bda89b4efb.jpg" },
  { id: 43, product_id: 14, sku: "SL-SLRKID-014-GR-AM", frame_color: "Green", lens_color: "Amber", lens_type_id: 2, price: 429000, stock_quantity: 8, image: "https://i.pinimg.com/1200x/6c/ab/6f/6cab6fb370b722853867eb994c5d74f2.jpg" },
];

const VARIANT_IMAGE_POOL = [
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508296695146-3e58822566cd?q=80&w=1000&auto=format&fit=crop",
];

function variantImage(frameColor: string, lensColor: string): string {
  let hash = 0;
  const key = `${frameColor}::${lensColor}`.toLowerCase();
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return VARIANT_IMAGE_POOL[hash % VARIANT_IMAGE_POOL.length];
}

export const productVariants: ProductVariant[] = RAW_VARIANTS.map((v) => ({
  ...v,
  image: v.image ?? variantImage(v.frame_color, v.lens_color),
}));

export function getCollection(id: number): Collection {
  return collections.find((c) => c.id === id) ?? collections[0];
}

export function getMaterial(id: number): FrameMaterial {
  return frameMaterials.find((m) => m.id === id) ?? frameMaterials[0];
}

export function getShape(id: number): FrameShape {
  return frameShapes.find((s) => s.id === id) ?? frameShapes[0];
}

export function getLensType(id: number): LensType {
  return lensTypes.find((l) => l.id === id) ?? lensTypes[0];
}

function variantsFor(productId: number): ProductVariant[] {
  return productVariants.filter((v) => v.product_id === productId);
}

function enrich(product: Product): ProductView {
  const variants = variantsFor(product.id);
  const specifications = productSpecifications.filter(
    (s) => s.product_id === product.id
  );
  const lowest_price = variants.reduce(
    (min, v) => Math.min(min, v.price),
    product.base_price
  );
  const shipped = variants.filter((v) => v.stock_quantity > 0);
  return {
    ...product,
    collection: getCollection(product.collection_id),
    material: getMaterial(product.material_id),
    shape: getShape(product.shape_id),
    lensType: getLensType(product.lens_type_id),
    offeredLensTypeIds: Array.from(
      new Set(
        [product.lens_type_id, ...variants.map((v) => v.lens_type_id)].filter(
          Boolean
        )
      )
    ),
    lowest_price,
    in_stock: shipped.length > 0,
    variants,
    specification: specifications[0] ?? null,
  };
}

export function getProductViews(): ProductView[] {
  return products
    .filter((p) => p.is_active)
    .map(enrich);
}

export function getProductViewById(id: number): ProductView | null {
  const product = products.find((p) => p.id === id);
  return product ? enrich(product) : null;
}

export function getProductViewBySlug(slug: string): ProductView | null {
  const product = products.find((p) => p.slug === slug);
  return product ? enrich(product) : null;
}

export function getRelatedProducts(
  product: ProductView,
  limit = 4
): ProductView[] {
  return getProductViews()
    .filter((p) => p.id !== product.id)
    .filter((p) => p.collection_id === product.collection_id || p.gender === product.gender)
    .slice(0, limit);
}

export function applySort(views: ProductView[], sort: SortOption): ProductView[] {
  switch (sort) {
    case "price-asc":
      return [...views].sort((a, b) => a.lowest_price - b.lowest_price);
    case "price-desc":
      return [...views].sort((a, b) => b.lowest_price - a.lowest_price);
    case "name":
      return [...views].sort((a, b) => a.name.localeCompare(b.name));
    default:
      return views;
  }
}

export function queryProducts(filters: ProductFilters): ProductView[] {
  let views = getProductViews();

  if (filters.collection) {
    views = views.filter((p) => p.collection.slug === filters.collection);
  }

  if (filters.material) {
    views = views.filter(
      (p) => p.material.id === Number(filters.material)
    );
  }

  if (filters.shape) {
    views = views.filter((p) => p.shape.id === Number(filters.shape));
  }

  if (filters.lens) {
    const lensId = Number(filters.lens);
    views = views.filter((p) => p.offeredLensTypeIds.includes(lensId));
  }

  if (filters.polarized) {
    const wanted = filters.polarized === "1";
    views = views.filter((p) => p.is_polarized === wanted);
  }

  if (filters.gender) {
    views = views.filter((p) => p.gender === filters.gender);
  }

  if (filters.q) {
    const q = filters.q.trim().toLowerCase();
    views = views.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.collection.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  return applySort(views, filters.sort ?? "featured");
}