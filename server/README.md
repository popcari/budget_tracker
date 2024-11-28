-Bước 1:
DownLoad DBeaver :https://dbeaver.io/download/ giải nén và cài đặt
-Bước 2:
Download file mysql.yml :https://drive.google.com/file/d/1DfSjZTM8RYXbKCde5gRg_HYl3YJWNtGa/view 
-Bước 3 :
Tải và bật docker 
-Bước 4 :
Tạo folder và ném file yml vào và bật cmd chạy câu lệnh : docker compose -f mysql.yml -p nodejs-sql up -d
-Bước 5:
Tạo connection trong DBeaver  PORT: 3307 Username/password: root/123456
(DBeaver không phải là database, nó là phần mềm giúp truy cập và sử dụng database.
Database được tạo bên trong Docker)
-Bước 6 :
cài đặt mysql2 
npm install --save-exact mysql2@3.11.4
-Bước 7:
vào DBeaver tạo table cho database
CREATE TABLE Users (
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
email varchar(255),
name varchar(255),
city varchar(255),
password varchar(255),
dob varchar(255),
gender varchar(255)
);
-Bước 8 :
cấu hình trong file database folder config