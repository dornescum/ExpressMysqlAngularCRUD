create table `ionic-app`
(
    id        int auto_increment
        primary key,
    title     varchar(255) charset utf8mb3 not null,
    tag       varchar(55) charset utf8mb3  null,
    favorite  tinyint(1)                   not null,
    price     int                          not null,
    rating    int                          null,
    flashSale tinyint(1)                   null,
    img       varchar(255) charset utf8mb3 null,
    `desc`    varchar(255) charset utf8mb3 null,
    constraint `ionic-app_pk2`
        unique (title)
);

# 27.08
# CREATE TABLE products
# (
#     id         INT AUTO_INCREMENT PRIMARY KEY,
#     favorite   BOOLEAN,
#     price      DECIMAL(10, 2),
#     name       VARCHAR(255),
#     quantity   INT,
#     brand      VARCHAR(255),
#     category   VARCHAR(255),
#     text       TEXT,
#     uid        INT,
#     storage    INT         default 1,
#     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
#     codebar    VARCHAR(512),
#     FOREIGN KEY(uid) REFERENCES users(id)
# );

# DELIMITER //
# CREATE TRIGGER generate_codebar
#     BEFORE INSERT ON products
#     FOR EACH ROW
# BEGIN
#     SET NEW.codebar = CONCAT(NEW.id, NEW.brand, NEW.category, NEW.created_at, NEW.storage);
# END;
# //
# DELIMITER ;

# FIXME from work 28/08
# create table brands
# (
#     brand_id   INTEGER primary key auto_increment,
#     brand_name text not null unique,
#     brand_img  text
# );

create table brands
(
    brand_id   INTEGER primary key auto_increment,
    brand_name varchar(55) not null unique,
    brand_img  varchar(255)
);

create table categories
(
    category_id   INTEGER primary key auto_increment,
    category_name varchar(55) not null
);

INSERT INTO brands (brand_id, brand_name, brand_img) VALUES (1, 'apple', 'https://unsplash.com/photos/bIgpii04UIg');
INSERT INTO brands (brand_id, brand_name, brand_img) VALUES (2, 'samsung', 'https://unsplash.com/photos/s6Z3d1pRa2o');
INSERT INTO brands (brand_id, brand_name, brand_img) VALUES (3, 'nokia', 'https://unsplash.com/photos/0pKGmISCzRE');
INSERT INTO brands (brand_id, brand_name, brand_img) VALUES (5, 'lenovo', 'https://www.pexels.com/photo/black-and-silver-laptop-computer-3550482/');
INSERT INTO brands (brand_id, brand_name, brand_img) VALUES (6, 'dell', 'https://www.pexels.com/photo/photo-of-a-gray-dell-laptop-displaying-pexels-webpage-811587/');
INSERT INTO brands (brand_id, brand_name, brand_img) VALUES (7, 'hp', 'https://www.pexels.com/photo/close-up-shot-of-a-smartphone-on-top-of-a-hp-laptop-11129922/');
INSERT INTO brands (brand_id, brand_name, brand_img) VALUES (8, 'asus', 'https://www.pexels.com/photo/computer-motherboard-on-a-white-surface-5766819/');
INSERT INTO brands (brand_id, brand_name, brand_img) VALUES (9, 'huawei', 'https://www.pexels.com/photo/a-guitar-pick-drumsticks-and-portable-speaker-on-a-yellow-surface-14434438/');
INSERT INTO brands (brand_id, brand_name, brand_img) VALUES (10, 'sony', 'https://1000logos.net/nokia-logo/');
INSERT INTO brands (brand_id, brand_name, brand_img) VALUES (11, 'lg', 'https://1000logos.net/lg-logo/');

INSERT INTO categories (category_id, category_name) VALUES (1, 'phone');
INSERT INTO categories (category_id, category_name) VALUES (2, 'tablet');
INSERT INTO categories (category_id, category_name) VALUES (3, 'tv');
INSERT INTO categories (category_id, category_name) VALUES (4, 'laptop');
INSERT INTO categories (category_id, category_name) VALUES (5, 'pc');

# ============================
# change privileges on work pc
GRANT SUPER ON *.* TO 'miki'@'localhost';
FLUSH PRIVILEGES;
# IMPORTANT !!!
# ============================

# 29/08 merge pe win nu si pe mini
DELIMITER //
CREATE PROCEDURE GetProductsByUID(IN user_id INT)
BEGIN
    SELECT * FROM products WHERE uid = user_id;
END;
//
DELIMITER ;

create table products
(
    id         int auto_increment
        primary key,
    favorite   enum ('true', 'false')                null,
    price      decimal(10, 2)                        null,
    name       varchar(255)                          null,
    quantity   int                                   null,
    brand      varchar(255)                          null,
    category   varchar(255)                          null,
    text       text                                  null,
    uid        int                                   null,
    storage    int       default 1                   null,
    created_at timestamp default current_timestamp() not null,
    updated_at timestamp default current_timestamp() not null on update current_timestamp(),
    codebar    varchar(512)                          null,
    constraint products_ibfk_1
        foreign key (uid) references users (id)
)