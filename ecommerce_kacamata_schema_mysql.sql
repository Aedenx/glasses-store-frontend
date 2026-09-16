-- ============================================================================
-- SKEMA DATABASE E-COMMERCE KACAMATA LIFESTYLE & OUTDOOR
-- VERSI: MySQL 8.0+ (khusus phpMyAdmin / MySQL, InnoDB engine)
-- ============================================================================
-- CARA IMPORT DI phpMyAdmin:
-- 1. Buat database baru dulu (klik "New" di sidebar kiri, kasih nama misal
--    "ecommerce_kacamata"), atau jalankan baris CREATE DATABASE di bawah ini.
-- 2. Klik database tsb sampai aktif/terpilih (namanya muncul di breadcrumb atas).
-- 3. Baru masuk tab Import dan upload file ini.
-- ============================================================================

CREATE DATABASE IF NOT EXISTS ecommerce_kacamata
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ecommerce_kacamata;


-- ============================================================================
-- BAGIAN 1: MASTER DATA / LOOKUP TABLES
-- ============================================================================

CREATE TABLE collections (
    collection_id       INT AUTO_INCREMENT PRIMARY KEY,
    code                 VARCHAR(20)  NOT NULL UNIQUE,
    name                 VARCHAR(100) NOT NULL,
    tagline              VARCHAR(255),
    description          TEXT,
    style_attributes     VARCHAR(255),
    banner_image_url     VARCHAR(500),
    thumbnail_image_url  VARCHAR(500),
    is_active            TINYINT(1) NOT NULL DEFAULT 1,
    display_order        INT DEFAULT 0,
    created_at           TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE frame_materials (
    material_id   INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(50) NOT NULL UNIQUE,
    description   VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE frame_shapes (
    shape_id      INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(50) NOT NULL UNIQUE,
    description   VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE lens_types (
    lens_type_id  INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(50) NOT NULL UNIQUE,
    description   VARCHAR(255)
) ENGINE=InnoDB;


-- ============================================================================
-- BAGIAN 2: PRODUK & VARIAN
-- ============================================================================

CREATE TABLE products (
    product_id        INT AUTO_INCREMENT PRIMARY KEY,
    sku_base          VARCHAR(50) NOT NULL UNIQUE,
    name              VARCHAR(150) NOT NULL,
    slug              VARCHAR(180) NOT NULL UNIQUE,
    description       TEXT,
    material_id       INT NOT NULL,
    shape_id          INT NOT NULL,
    gender_target     VARCHAR(20) DEFAULT 'unisex'
                        CHECK (gender_target IN ('men','women','unisex','kids')),
    base_price        DECIMAL(12,2) NOT NULL CHECK (base_price >= 0),
    is_active         TINYINT(1) NOT NULL DEFAULT 1,
    is_featured       TINYINT(1) NOT NULL DEFAULT 0,
    created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_products_material FOREIGN KEY (material_id) REFERENCES frame_materials(material_id),
    CONSTRAINT fk_products_shape FOREIGN KEY (shape_id) REFERENCES frame_shapes(shape_id)
) ENGINE=InnoDB;

CREATE TABLE product_collections (
    product_id      INT NOT NULL,
    collection_id   INT NOT NULL,
    PRIMARY KEY (product_id, collection_id),
    CONSTRAINT fk_pc_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    CONSTRAINT fk_pc_collection FOREIGN KEY (collection_id) REFERENCES collections(collection_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE product_specifications (
    product_id        INT PRIMARY KEY,
    weight_grams       DECIMAL(6,2),
    lens_width_mm      DECIMAL(5,2),
    bridge_width_mm    DECIMAL(5,2),
    temple_length_mm   DECIMAL(5,2),
    lens_height_mm     DECIMAL(5,2),
    uv_protection       VARCHAR(50),
    additional_notes    TEXT,
    CONSTRAINT fk_specs_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE product_variants (
    variant_id        INT AUTO_INCREMENT PRIMARY KEY,
    product_id        INT NOT NULL,
    sku_variant       VARCHAR(60) NOT NULL UNIQUE,
    frame_color       VARCHAR(50) NOT NULL,
    lens_color        VARCHAR(50) NOT NULL,
    lens_type_id      INT NOT NULL,
    is_polarized      TINYINT(1) NOT NULL DEFAULT 0,
    price             DECIMAL(12,2) NOT NULL CHECK (price >= 0),
    stock_quantity    INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    weight_grams      DECIMAL(6,2),
    is_active         TINYINT(1) NOT NULL DEFAULT 1,
    created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_variants_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    CONSTRAINT fk_variants_lenstype FOREIGN KEY (lens_type_id) REFERENCES lens_types(lens_type_id)
) ENGINE=InnoDB;

CREATE TABLE product_images (
    image_id      INT AUTO_INCREMENT PRIMARY KEY,
    variant_id    INT NOT NULL,
    image_url     VARCHAR(500) NOT NULL,
    alt_text      VARCHAR(255),
    is_primary    TINYINT(1) NOT NULL DEFAULT 0,
    display_order INT DEFAULT 0,
    CONSTRAINT fk_images_variant FOREIGN KEY (variant_id) REFERENCES product_variants(variant_id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- ============================================================================
-- BAGIAN 3: USER, ALAMAT, RESEP MATA
-- ============================================================================

CREATE TABLE users (
    user_id         INT AUTO_INCREMENT PRIMARY KEY,
    full_name       VARCHAR(150) NOT NULL,
    email           VARCHAR(150) NOT NULL UNIQUE,
    phone           VARCHAR(30),
    password_hash   VARCHAR(255) NOT NULL,
    role            VARCHAR(20) NOT NULL DEFAULT 'customer'
                        CHECK (role IN ('customer','admin','staff')),
    is_active       TINYINT(1) NOT NULL DEFAULT 1,
    email_verified_at TIMESTAMP NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE addresses (
    address_id      INT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT NOT NULL,
    label           VARCHAR(50),
    recipient_name  VARCHAR(150) NOT NULL,
    phone           VARCHAR(30) NOT NULL,
    address_line1   VARCHAR(255) NOT NULL,
    address_line2   VARCHAR(255),
    city            VARCHAR(100) NOT NULL,
    province        VARCHAR(100) NOT NULL,
    postal_code     VARCHAR(20) NOT NULL,
    country         VARCHAR(100) NOT NULL DEFAULT 'Indonesia',
    is_default      TINYINT(1) NOT NULL DEFAULT 0,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_addresses_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE prescriptions (
    prescription_id   INT AUTO_INCREMENT PRIMARY KEY,
    user_id           INT NOT NULL,
    label             VARCHAR(100),
    od_sphere         DECIMAL(4,2),
    od_cylinder       DECIMAL(4,2),
    od_axis           INT CHECK (od_axis BETWEEN 0 AND 180),
    os_sphere         DECIMAL(4,2),
    os_cylinder       DECIMAL(4,2),
    os_axis           INT CHECK (os_axis BETWEEN 0 AND 180),
    pd_mm             DECIMAL(4,1),
    notes             TEXT,
    created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_prescriptions_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- ============================================================================
-- BAGIAN 4: KERANJANG & WISHLIST
-- ============================================================================

CREATE TABLE carts (
    cart_id       INT AUTO_INCREMENT PRIMARY KEY,
    user_id       INT NOT NULL,
    created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_carts_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE cart_items (
    cart_item_id     INT AUTO_INCREMENT PRIMARY KEY,
    cart_id          INT NOT NULL,
    variant_id       INT NOT NULL,
    prescription_id  INT NULL,
    quantity         INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    added_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_cart_variant_presc (cart_id, variant_id, prescription_id),
    CONSTRAINT fk_cartitems_cart FOREIGN KEY (cart_id) REFERENCES carts(cart_id) ON DELETE CASCADE,
    CONSTRAINT fk_cartitems_variant FOREIGN KEY (variant_id) REFERENCES product_variants(variant_id),
    CONSTRAINT fk_cartitems_presc FOREIGN KEY (prescription_id) REFERENCES prescriptions(prescription_id)
) ENGINE=InnoDB;

CREATE TABLE wishlists (
    wishlist_id   INT AUTO_INCREMENT PRIMARY KEY,
    user_id       INT NOT NULL,
    variant_id    INT NOT NULL,
    added_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_wishlist_user_variant (user_id, variant_id),
    CONSTRAINT fk_wishlist_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_wishlist_variant FOREIGN KEY (variant_id) REFERENCES product_variants(variant_id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- ============================================================================
-- BAGIAN 5: ORDERS, PAYMENTS, SHIPMENTS
-- ============================================================================

CREATE TABLE orders (
    order_id            INT AUTO_INCREMENT PRIMARY KEY,
    order_number         VARCHAR(30) NOT NULL UNIQUE,
    user_id              INT NOT NULL,

    shipping_recipient_name VARCHAR(150) NOT NULL,
    shipping_phone          VARCHAR(30) NOT NULL,
    shipping_address_line1  VARCHAR(255) NOT NULL,
    shipping_address_line2  VARCHAR(255),
    shipping_city            VARCHAR(100) NOT NULL,
    shipping_province        VARCHAR(100) NOT NULL,
    shipping_postal_code     VARCHAR(20) NOT NULL,
    shipping_country         VARCHAR(100) NOT NULL,

    subtotal_amount      DECIMAL(14,2) NOT NULL CHECK (subtotal_amount >= 0),
    shipping_cost         DECIMAL(12,2) NOT NULL DEFAULT 0,
    discount_amount        DECIMAL(12,2) NOT NULL DEFAULT 0,
    total_amount          DECIMAL(14,2) NOT NULL CHECK (total_amount >= 0),

    order_status          VARCHAR(30) NOT NULL DEFAULT 'pending'
                              CHECK (order_status IN
                                ('pending','processing','shipped','delivered','completed','cancelled','refunded')),
    payment_status         VARCHAR(20) NOT NULL DEFAULT 'unpaid'
                              CHECK (payment_status IN ('unpaid','paid','failed','refunded')),
    shipping_status         VARCHAR(20) NOT NULL DEFAULT 'not_shipped'
                              CHECK (shipping_status IN ('not_shipped','packed','shipped','in_transit','delivered','returned')),

    notes                  TEXT,
    created_at             TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at             TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(user_id)
) ENGINE=InnoDB;

CREATE TABLE order_items (
    order_item_id       INT AUTO_INCREMENT PRIMARY KEY,
    order_id            INT NOT NULL,
    variant_id          INT NOT NULL,
    prescription_id     INT NULL,

    product_name_snapshot   VARCHAR(150) NOT NULL,
    collection_snapshot      VARCHAR(100),
    frame_color_snapshot     VARCHAR(50) NOT NULL,
    lens_color_snapshot      VARCHAR(50) NOT NULL,
    lens_type_snapshot       VARCHAR(50) NOT NULL,
    sku_variant_snapshot     VARCHAR(60) NOT NULL,

    unit_price           DECIMAL(12,2) NOT NULL CHECK (unit_price >= 0),
    quantity              INT NOT NULL CHECK (quantity > 0),
    line_subtotal          DECIMAL(14,2) NOT NULL CHECK (line_subtotal >= 0),

    created_at             TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orderitems_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    CONSTRAINT fk_orderitems_variant FOREIGN KEY (variant_id) REFERENCES product_variants(variant_id),
    CONSTRAINT fk_orderitems_presc FOREIGN KEY (prescription_id) REFERENCES prescriptions(prescription_id)
) ENGINE=InnoDB;

CREATE TABLE payments (
    payment_id         INT AUTO_INCREMENT PRIMARY KEY,
    order_id           INT NOT NULL,
    payment_method      VARCHAR(50) NOT NULL,
    amount               DECIMAL(14,2) NOT NULL CHECK (amount >= 0),
    status                VARCHAR(20) NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending','paid','failed','refunded')),
    transaction_reference VARCHAR(150),
    paid_at               TIMESTAMP NULL,
    created_at             TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_payments_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE shipments (
    shipment_id       INT AUTO_INCREMENT PRIMARY KEY,
    order_id          INT NOT NULL,
    courier            VARCHAR(50),
    tracking_number     VARCHAR(100),
    status               VARCHAR(20) NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending','packed','shipped','in_transit','delivered','returned')),
    shipped_at           TIMESTAMP NULL,
    delivered_at          TIMESTAMP NULL,
    created_at             TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_shipments_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
) ENGINE=InnoDB;


-- ============================================================================
-- BAGIAN 6: INDEX YANG DIREKOMENDASIKAN
-- ============================================================================

CREATE INDEX idx_product_collections_collection ON product_collections(collection_id);
CREATE INDEX idx_product_collections_product   ON product_collections(product_id);

CREATE INDEX idx_products_shape     ON products(shape_id);
CREATE INDEX idx_products_material  ON products(material_id);
CREATE INDEX idx_products_active    ON products(is_active);

CREATE INDEX idx_variants_product      ON product_variants(product_id);
CREATE INDEX idx_variants_lens_type    ON product_variants(lens_type_id);
-- MySQL tidak mendukung partial index (WHERE) seperti PostgreSQL, jadi index biasa:
CREATE INDEX idx_variants_polarized    ON product_variants(is_polarized);
CREATE INDEX idx_variants_active_stock ON product_variants(is_active, stock_quantity);

-- Full text search nama produk (pengganti to_tsvector/GIN di PostgreSQL)
ALTER TABLE products ADD FULLTEXT INDEX ft_products_name (name);

CREATE INDEX idx_orders_user       ON orders(user_id);
CREATE INDEX idx_orders_status     ON orders(order_status);
CREATE INDEX idx_orders_payment    ON orders(payment_status);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_variant ON order_items(variant_id);

CREATE INDEX idx_cart_items_cart   ON cart_items(cart_id);
CREATE INDEX idx_wishlists_user    ON wishlists(user_id);

CREATE INDEX idx_addresses_user       ON addresses(user_id);
CREATE INDEX idx_prescriptions_user   ON prescriptions(user_id);


-- ============================================================================
-- BAGIAN 7: SEED DATA UNTUK 10 KOLEKSI
-- ============================================================================

INSERT INTO collections (code, name, tagline, description, style_attributes, display_order) VALUES
('SUMMIT', 'Summit', 'Conquer every peak',        'Koleksi untuk pendakian gunung/hiking dengan lensa polarized tahan banting.', 'Rugged, Sporty, Polarized', 1),
('COAST',  'Coast',  'Catch the horizon',          'Koleksi bertema pantai/laut dengan warna cerah dan nuansa santai.', 'Relaxed, Fresh, Colorful', 2),
('METRO',  'Metro',  'Own the streets',            'Koleksi urban/kota dengan desain modern dan clean-cut streetwear.', 'Clean, Modern, Streetwear', 3),
('DUNE',   'Dune',   'Wander the wild',            'Koleksi bertema gurun/travel dengan nuansa earthy dan bentuk oversized vintage.', 'Earthy, Vintage, Oversized', 4),
('TRAIL',  'Trail',  'Built for the outdoors',     'Koleksi outdoor/camping dengan desain fungsional.', 'Functional, Outdoorsy', 5),
('TIDE',   'Tide',   'Ride every wave',            'Koleksi untuk olahraga air dengan performa teknis tinggi.', 'Technical, Performance', 6),
('APEX',   'Apex',   'Speed redefined',            'Koleksi bertema motorsport/kecepatan dengan desain aerodinamis futuristik.', 'Aerodynamic, Futuristic', 7),
('NOIR',   'Noir',   'Embrace the night',          'Koleksi fashion malam hari dengan kesan misterius dan premium.', 'Mysterious, Premium, Bold', 8),
('NOMAD',  'Nomad',  'Wherever you roam',          'Koleksi travel serbaguna dengan gaya timeless.', 'Versatile, Timeless', 9),
('SOLAR',  'Solar',  'Everyday essential',         'Koleksi lifestyle harian dengan desain minimalis.', 'Minimal, Daily Wear', 10);
