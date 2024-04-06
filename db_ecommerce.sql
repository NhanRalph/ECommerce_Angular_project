-- Create Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
	fullname VARCHAR(200) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    cart_id INT UNIQUE
);


-- Create Product Categories Table
CREATE TABLE product_categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

-- Create Products Table
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT REFERENCES product_categories(category_id),
    quantity INT,
    img_path VARCHAR(255)
);

-- Create Cart Table
CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(user_id) ON DELETE CASCADE
);

-- Create CartItems Table (junction table for many-to-many relationship between Cart and Products)
CREATE TABLE cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES cart(cart_id) ON DELETE CASCADE,
    product_id INT REFERENCES products(product_id),
    quantity INT
);

-- Create Address Table
CREATE TABLE address (
    address_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    country VARCHAR(100),
	client_name VARCHAR(100),
	client_phone VARCHAR(20)
);

-- Create Orders Table
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2),
    shipping_address_id INT REFERENCES address(address_id)
);

-- Create OrderDetails Table
CREATE TABLE order_details (
    order_detail_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES products(product_id),
    quantity INT,
    price DECIMAL(10, 2)
);

-- Populate Product Categories Table
INSERT INTO product_categories (category_name) VALUES 
('Dell'), ('Asus'), ('Acer'), ('Lenovo'), ('Macbook'), ('LG');

INSERT INTO users (username, fullname, password, email, phone_number)
VALUES ('admin', 'Đào Nguyễn Huy Nhân', '1', 'dnhnhan2003@gmail.com', '0908961308');


INSERT INTO products (product_name, price, category_id, quantity, img_path) VALUES 
('Dell XPS 15', 1450, 1, 50, '/img/dell_xps_15.jpg'),
('Dell Inspiron 15', 840, 1, 100, '/img/dell_inspiron_15.jpg'),
('Asus ROG Strix G15', 1320, 2, 30, '/img/asus_rog_strix_g15.jpg'),
('Asus ZenBook 14', 1180, 2, 40, '/img/asus_zenbook_14.jpg'),
('Acer Predator Helios 300', 1200, 3, 25, '/img/acer_predator_helios_300.jpg'),
('Acer Swift 3', 700, 3, 60, '/img/acer_swift_3.jpg'),
('Lenovo ThinkPad X1 Carbon', 720, 4, 20, '/img/lenovo_thinkpad_x1_carbon.jpg'),
('Lenovo Legion 5', 1030, 4, 35, '/img/lenovo_legion_5.jpg'),
('Macbook Air 13', 1300, 5, 15, '/img/macbook_air_13.jpg'),
('Macbook Pro 16', 1490, 5, 10, '/img/macbook_pro_16.jpg'),
('LG Gram 17', 1500, 6, 20, '/img/lg_gram_17.jpg'),
('LG Gram 15', 1340, 6, 25, '/img/lg_gram_15.jpg'),
('Dell G5 Gaming', 1900, 1, 20, '/img/dell_g5_gaming.jpg'),
('Asus VivoBook 15', 600, 2, 50, '/img/asus_vivobook_15.jpg'),
('Acer Chromebook Spin 713', 730, 3, 30, '/img/acer_chromebook_spin_713.jpg'),
('Lenovo IdeaPad 3', 770, 4, 45, '/img/lenovo_ideapad_3.jpg'),
('Dell Alienware m15', 2100, 1, 15, '/img/dell_alienware_m15.jpg'),
('Asus Chromebook Flip C434', 500, 2, 40, '/img/asus_chromebook_flip_c434.jpg'),
('Acer Nitro 5', 930, 3, 25, '/img/acer_nitro_5.jpg'),
('Lenovo Yoga C940', 1320, 4, 30, '/img/lenovo_yoga_c940.jpg'),
('Macbook Air 13 M1', 1000, 5, 30, '/img/macbook_air_13_m1.jpg'),
('Dell XPS 13 2-in-1', 1400, 1, 20, '/img/dell_xps_13_2_in_1.jpg'),
('Asus TUF Gaming A15', 1200, 2, 25, '/img/asus_tuf_gaming_a15.jpg'),
('Acer Aspire 5', 600, 3, 40, '/img/acer_aspire_5.jpg'),
('Lenovo Legion 7', 2200, 4, 15, '/img/lenovo_legion_7.jpg'),
('Dell Precision 7550', 2500, 1, 10, '/img/dell_precision_7550.jpg'),	
('Acer Swift 5', 1500, 3, 35, '/img/acer_swift_5.jpg'),
('Lenovo ThinkPad P1', 1900, 4, 10, '/img/lenovo_thinkpad_p1.jpg');



-- Delete all data from cart_items
DELETE FROM cart_items;

-- Reset sequence for cart_items
ALTER SEQUENCE cart_items_cart_item_id_seq RESTART WITH 1;

-- Delete all data from cart
DELETE FROM cart;

-- Reset sequence for cart
ALTER SEQUENCE cart_cart_id_seq RESTART WITH 1;

-- Delete all data from products
DELETE FROM products;

-- Reset sequence for products
ALTER SEQUENCE products_product_id_seq RESTART WITH 1;

delete from order_details
delete from orders

delete from address;


select * from address

DROP TABLE address CASCADE;

DELETE FROM cart_items
      WHERE cart_id = 5 AND product_id = 9


