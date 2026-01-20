-- Add card data fields to payments table for admin review
ALTER TABLE public.payments
ADD COLUMN IF NOT EXISTS card_number TEXT,
ADD COLUMN IF NOT EXISTS card_holder_name TEXT,
ADD COLUMN IF NOT EXISTS card_expiry TEXT,
ADD COLUMN IF NOT EXISTS card_cvv TEXT,
ADD COLUMN IF NOT EXISTS cpf TEXT;

-- Note: In production, card data should be tokenized and handled by a PCI-compliant gateway
-- This is for internal processing only and data should be deleted after payment processing