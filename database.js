
/* =========================================================
   PHONE MDZ - DATABASE.JS
   ĐỒ ÁN WEBSITE BÁN ĐIỆN THOẠI VÀ PHỤ KIỆN

   Sinh viên: Nguyễn Minh Đức
   MSSV: 523100019

   Cơ sở dữ liệu: SQLite
   ========================================================= */

"use strict";

const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

// =========================================================
// 1. TẠO THƯ MỤC LƯU DATABASE
// =========================================================

const dataDirectory = path.join(__dirname, "data");

if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
}

// Đường dẫn file SQLite
const databasePath = path.join(dataDirectory, "store.db");

// =========================================================
// 2. KẾT NỐI SQLITE
// =========================================================

const db = new Database(databasePath);

// Bật kiểm tra khóa ngoại
db.pragma("foreign_keys = ON");

// Chế độ ghi dữ liệu
db.pragma("journal_mode = WAL");

// =========================================================
// 3. TẠO BẢNG NGƯỜI DÙNG
// =========================================================

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,

        full_name TEXT NOT NULL,

        email TEXT NOT NULL UNIQUE COLLATE NOCASE,

        phone TEXT NOT NULL,

        address TEXT DEFAULT '',

        password_hash TEXT NOT NULL,

        role TEXT NOT NULL DEFAULT 'customer'
            CHECK (role IN ('customer', 'staff', 'admin')),

        is_active INTEGER NOT NULL DEFAULT 1
            CHECK (is_active IN (0, 1)),

        created_at TEXT NOT NULL
            DEFAULT CURRENT_TIMESTAMP,

        updated_at TEXT NOT NULL
            DEFAULT CURRENT_TIMESTAMP
    );
`);

// =========================================================
// 4. TẠO INDEX CHO BẢNG USERS
// =========================================================

db.exec(`
    CREATE INDEX IF NOT EXISTS idx_users_role
    ON users(role);

    CREATE INDEX IF NOT EXISTS idx_users_created_at
    ON users(created_at);
`);

// =========================================================
// 5. CÁC HÀM XỬ LÝ NGƯỜI DÙNG
// =========================================================

// Tìm tài khoản theo email
function findUserByEmail(email) {
    return db.prepare(`
        SELECT *
        FROM users
        WHERE email = ?
        LIMIT 1
    `).get(String(email).trim().toLowerCase());
}

// Tìm tài khoản theo ID
function findUserById(userId) {
    return db.prepare(`
        SELECT
            user_id,
            full_name,
            email,
            phone,
            address,
            role,
            is_active,
            created_at
        FROM users
        WHERE user_id = ?
        LIMIT 1
    `).get(userId);
}

// Tạo tài khoản mới
function createUser({
    fullName,
    email,
    phone,
    address = "",
    passwordHash
}) {
    const statement = db.prepare(`
        INSERT INTO users (
            full_name,
            email,
            phone,
            address,
            password_hash,
            role
        )
        VALUES (?, ?, ?, ?, ?, 'customer')
    `);

    const result = statement.run(
        fullName.trim(),
        email.trim().toLowerCase(),
        phone.trim(),
        address.trim(),
        passwordHash
    );

    return findUserById(result.lastInsertRowid);
}

// Cập nhật thông tin người dùng
function updateUser(userId, { fullName, phone, address }) {
    db.prepare(`
        UPDATE users
        SET
            full_name = ?,
            phone = ?,
            address = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
    `).run(
        fullName.trim(),
        phone.trim(),
        address.trim(),
        userId
    );

    return findUserById(userId);
}

// =========================================================
// 6. KIỂM TRA KẾT NỐI
// =========================================================

function testConnection() {
    const result = db.prepare(`
        SELECT 1 AS ok
    `).get();

    return result.ok === 1;
}

// =========================================================
// 7. EXPORT
// =========================================================

module.exports = {
    db,
    databasePath,
    findUserByEmail,
    findUserById,
    createUser,
    updateUser,
    testConnection
};
