
"use strict";

// =====================================================
// PHONE MDZ - SERVER.JS
// Website bán điện thoại và phụ kiện
// Backend: Express + SQLite
// =====================================================

require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const path = require("path");

const {
    findUserByEmail,
    findUserById,
    createUser,
    testConnection
} = require("./database");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// =====================================================
// 1. MIDDLEWARE
// =====================================================

app.disable("x-powered-by");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    name: "phone_mdz_session",
    secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex"),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// =====================================================
// 2. HÀM HỖ TRỢ
// =====================================================

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function layout(title, content) {
    return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, initial-scale=1.0">

        <title>${escapeHTML(title)} - PHONE MDZ</title>

        <style>
            * {
                box-sizing: border-box;
            }

            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: #f5f5f5;
                color: #333;
            }

            header {
                background: #d70018;
                color: white;
                padding: 18px;
                text-align: center;
                font-size: 23px;
                font-weight: bold;
            }

            .auth-container {
                width: min(440px, calc(100% - 30px));
                margin: 55px auto;
                background: white;
                padding: 30px;
                border-radius: 16px;
                box-shadow: 0 8px 30px rgba(0,0,0,.08);
            }

            h2 {
                text-align: center;
                margin-bottom: 25px;
            }

            label {
                display: block;
                margin: 14px 0 7px;
                font-weight: bold;
                font-size: 14px;
            }

            input {
                width: 100%;
                padding: 12px;
                border: 1px solid #ddd;
                border-radius: 8px;
                font-size: 15px;
            }

            input:focus {
                outline: none;
                border-color: #d70018;
            }

            button {
                width: 100%;
                margin-top: 22px;
                background: #d70018;
                color: white;
                padding: 13px;
                border: none;
                border-radius: 9px;
                font-weight: bold;
                font-size: 15px;
                cursor: pointer;
            }

            button:hover {
                background: #a90013;
            }

            .links {
                text-align: center;
                margin-top: 20px;
                line-height: 2;
            }

            a {
                color: #d70018;
                text-decoration: none;
            }

            .error {
                padding: 12px;
                background: #fff0f0;
                color: #a80000;
                border-radius: 8px;
                margin-bottom: 18px;
            }

            .success {
                padding: 12px;
                background: #e8f8ee;
                color: #137638;
                border-radius: 8px;
                margin-bottom: 18px;
            }

            .account-info {
                line-height: 2;
            }

            .logout-link {
                display: block;
                margin-top: 20px;
                text-align: center;
            }
        </style>
    </head>

    <body>
        <header>📱 PHONE MDZ</header>
        ${content}
    </body>
    </html>`;
}

function errorMessage(message) {
    return `<div class="error">${escapeHTML(message)}</div>`;
}

function formPage(type, error = "") {
    const isRegister = type === "register";

    const title = isRegister
        ? "Đăng ký tài khoản"
        : "Đăng nhập";

    const fields = isRegister ? `
        <label for="fullName">Họ và tên</label>
        <input id="fullName" name="fullName"
               maxlength="100" required>

        <label for="phone">Số điện thoại</label>
        <input id="phone" name="phone"
               type="tel" maxlength="11" required>

        <label for="address">Địa chỉ</label>
        <input id="address" name="address">
    ` : "";

    const content = `
        <div class="auth-container">
            <h2>${title}</h2>

            ${error ? errorMessage(error) : ""}

            <form method="POST" action="/${type}">

                ${fields}

                <label for="email">Email</label>
                <input id="email" type="email"
                       name="email" maxlength="254" required>

                <label for="password">Mật khẩu</label>
                <input id="password" type="password"
                       name="password" minlength="6" required>

                ${isRegister ? `
                    <label for="confirmPassword">
                        Nhập lại mật khẩu
                    </label>
                    <input id="confirmPassword"
                           type="password"
                           name="confirmPassword"
                           minlength="6" required>
                ` : ""}

                <button type="submit">
                    ${title}
                </button>

            </form>

            <div class="links">
                ${
                    isRegister
                        ? '<a href="/login">Đã có tài khoản? Đăng nhập</a>'
                        : '<a href="/register">Chưa có tài khoản? Đăng ký</a>'
                }

                <div>
                    <a href="/">← Về trang chủ</a>
                </div>
            </div>
        </div>
    `;

    return layout(title, content);
}

// =====================================================
// 3. TRANG CHỦ VÀ STATIC FILES
// =====================================================

// Giữ nguyên index.html, style.css, main.js và ảnh cũ
app.use(express.static(path.join(__dirname), {
    index: false,
    dotfiles: "ignore"
}));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// =====================================================
// 4. ĐĂNG KÝ
// =====================================================

app.get("/register", (req, res) => {
    if (req.session.userId) {
        return res.redirect("/account");
    }

    res.send(formPage("register"));
});

app.post("/register", async (req, res) => {
    try {
        const fullName = String(req.body.fullName || "").trim();
        const email = String(req.body.email || "").trim().toLowerCase();
        const phone = String(req.body.phone || "").trim();
        const address = String(req.body.address || "").trim();
        const password = String(req.body.password || "");
        const confirmPassword = String(req.body.confirmPassword || "");

        if (fullName.length < 2 || fullName.length > 100) {
            return res.status(400).send(
                formPage("register", "Họ tên phải có từ 2 đến 100 ký tự.")
            );
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).send(
                formPage("register", "Email không hợp lệ.")
            );
        }

        if (!/^0\d{9,10}$/.test(phone)) {
            return res.status(400).send(
                formPage("register", "Số điện thoại phải có 10–11 chữ số.")
            );
        }

        if (password.length < 6 || password.length > 72) {
            return res.status(400).send(
                formPage("register", "Mật khẩu phải có từ 6 đến 72 ký tự.")
            );
        }

        if (password !== confirmPassword) {
            return res.status(400).send(
                formPage("register", "Mật khẩu nhập lại không khớp.")
            );
        }

        if (findUserByEmail(email)) {
            return res.status(409).send(
                formPage("register", "Email này đã được sử dụng.")
            );
        }

        const passwordHash = await bcrypt.hash(password, 10);

        createUser({
            fullName,
            email,
            phone,
            address,
            passwordHash
        });

        return res.redirect("/login?registered=1");

    } catch (error) {
        console.error("Lỗi đăng ký:", error);

        return res.status(500).send(
            formPage("register", "Không thể đăng ký. Vui lòng thử lại.")
        );
    }
});

// =====================================================
// 5. ĐĂNG NHẬP
// =====================================================

app.get("/login", (req, res) => {
    if (req.session.userId) {
        return res.redirect("/account");
    }

    let html = formPage("login");

    if (req.query.registered === "1") {
        html = html.replace(
            '<form method="POST" action="/login">',
            `<div class="success">
                Đăng ký thành công! Hãy đăng nhập.
            </div>
            <form method="POST" action="/login">`
        );
    }

    res.send(html);
});

app.post("/login", async (req, res) => {
    try {
        const email = String(req.body.email || "").trim().toLowerCase();
        const password = String(req.body.password || "");

        const user = findUserByEmail(email);

        // Tránh xác nhận email có tồn tại hay không
        if (
            !user ||
            !user.is_active ||
            !(await bcrypt.compare(password, user.password_hash))
        ) {
            return res.status(401).send(
                formPage("login", "Email hoặc mật khẩu không đúng.")
            );
        }

        req.session.regenerate(error => {
            if (error) {
                console.error("Lỗi phiên đăng nhập:", error);
                return res.status(500).send(
                    formPage("login", "Không thể đăng nhập.")
                );
            }

            req.session.userId = user.user_id;

            req.session.save(error => {
                if (error) {
                    return res.status(500).send(
                        formPage("login", "Không thể lưu phiên đăng nhập.")
                    );
                }

                return res.redirect("/account");
            });
        });

    } catch (error) {
        console.error("Lỗi đăng nhập:", error);

        return res.status(500).send(
            formPage("login", "Đã xảy ra lỗi. Vui lòng thử lại.")
        );
    }
});

// =====================================================
// 6. TRANG TÀI KHOẢN
// =====================================================

app.get("/account", (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }

    const user = findUserById(req.session.userId);

    if (!user || !user.is_active) {
        return req.session.destroy(() => {
            res.clearCookie("phone_mdz_session");
            res.redirect("/login");
        });
    }

    res.send(layout("Tài khoản của tôi", `
        <div class="auth-container">

            <h2>👤 Tài khoản của tôi</h2>

            <div class="success">
                Bạn đã đăng nhập thành công!
            </div>

            <div class="account-info">
                <p><strong>Họ tên:</strong>
                    ${escapeHTML(user.full_name)}
                </p>

                <p><strong>Email:</strong>
                    ${escapeHTML(user.email)}
                </p>

                <p><strong>Số điện thoại:</strong>
                    ${escapeHTML(user.phone)}
                </p>

                <p><strong>Địa chỉ:</strong>
                    ${escapeHTML(user.address)}
                </p>

                <p><strong>Vai trò:</strong>
                    ${escapeHTML(user.role)}
                </p>
            </div>

            <div class="links">
                <a href="/">← Về trang chủ</a>
            </div>

            <form method="POST" action="/logout">
                <button type="submit">Đăng xuất</button>
            </form>

        </div>
    `));
});

// =====================================================
// 7. ĐĂNG XUẤT
// =====================================================

app.post("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            return res.status(500).send("Không thể đăng xuất.");
        }

        res.clearCookie("phone_mdz_session");
        res.redirect("/login");
    });
});


/* =====================================================
   API KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP
===================================================== */

app.get("/api/me", (req, res) => {
    if (!req.session.userId) {
        return res.json({
            loggedIn: false,
            user: null
        });
    }

    const user = findUserById(req.session.userId);

    if (!user || !user.is_active) {
        return res.json({
            loggedIn: false,
            user: null
        });
    }

    return res.json({
        loggedIn: true,
        user: {
            id: user.user_id,
            fullName: user.full_name,
            email: user.email,
            role: user.role
        }
    });
});

// 8. KHỞI ĐỘNG SERVER
// =====================================================

if (!process.env.SESSION_SECRET) {
    console.warn(
        "CẢNH BÁO: Chưa cấu hình SESSION_SECRET trong .env. " +
        "Phiên đăng nhập sẽ mất hiệu lực khi khởi động lại."
    );
}

app.listen(PORT, "127.0.0.1", () => {
    console.log("======================================");
    console.log("PHONE MDZ - WEBSITE BÁN ĐIỆN THOẠI");
    console.log("SQLite:", testConnection() ? "Đã kết nối" : "Lỗi");
    console.log(`Trang chủ: http://localhost:${PORT}`);
    console.log(`Đăng ký: http://localhost:${PORT}/register`);
    console.log(`Đăng nhập: http://localhost:${PORT}/login`);
    console.log("======================================");
});
