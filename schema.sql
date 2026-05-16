CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY,
  day TEXT NOT NULL,
  payer TEXT NOT NULL,
  amount_jpy REAL NOT NULL,
  original_amount REAL NOT NULL,
  original_currency TEXT NOT NULL,
  category TEXT NOT NULL,
  note TEXT,
  split_with TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_expenses_created_at
ON expenses(created_at);
