-- ============================================
-- CONTROL-GASTOS
-- Base de datos inicial
-- ============================================


-- ============================================
-- TABLA: USERS
-- ============================================

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- TABLA: CATEGORIES
-- ============================================

CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- TABLA: EXPENSES
-- ============================================

CREATE TABLE expenses (
    id BIGSERIAL PRIMARY KEY,

    amount NUMERIC(12, 2) NOT NULL
        CHECK (amount > 0),

    description VARCHAR(255),

    date DATE NOT NULL,

    category_id BIGINT NOT NULL,

    user_id BIGINT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL
        DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_expenses_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_expenses_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- ============================================
-- ÍNDICES: EXPENSES
-- ============================================

CREATE INDEX idx_expenses_date
    ON expenses(date);

CREATE INDEX idx_expenses_category_id
    ON expenses(category_id);

CREATE INDEX idx_expenses_user_id
    ON expenses(user_id);


-- ============================================
-- TABLA: INCOMES
-- ============================================

CREATE TABLE incomes (
    id BIGSERIAL PRIMARY KEY,

    amount NUMERIC(12, 2) NOT NULL
        CHECK (amount > 0),

    description VARCHAR(255),

    date DATE NOT NULL,

    category_id BIGINT NOT NULL,

    user_id BIGINT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL
        DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_incomes_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_incomes_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- ============================================
-- ÍNDICES: INCOMES
-- ============================================

CREATE INDEX idx_incomes_date
    ON incomes(date);

CREATE INDEX idx_incomes_category_id
    ON incomes(category_id);

CREATE INDEX idx_incomes_user_id
    ON incomes(user_id);