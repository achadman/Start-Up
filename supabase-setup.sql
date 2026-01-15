-- ============================================
-- ELO Database Setup Script
-- ============================================
-- Jalankan script ini di Supabase SQL Editor
-- Dashboard > SQL Editor > New Query

-- ============================================
-- 1. Buat Tabel Vendors
-- ============================================
CREATE TABLE IF NOT EXISTS public.vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    vendor_name TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- ============================================
-- 2. Buat Index untuk Performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_vendors_user_id ON public.vendors(user_id);
CREATE INDEX IF NOT EXISTS idx_vendors_email ON public.vendors(email);

-- ============================================
-- 3. Enable Row Level Security (RLS)
-- ============================================
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. Buat Policies untuk RLS
-- ============================================

-- Policy: Users can view their own vendor data
CREATE POLICY "Users can view own vendor"
    ON public.vendors
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Users can update their own vendor data
CREATE POLICY "Users can update own vendor"
    ON public.vendors
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Policy: Users can insert their own vendor data
CREATE POLICY "Users can insert own vendor"
    ON public.vendors
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 5. Buat Function untuk Auto-Update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Buat Trigger untuk updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.vendors
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- 6. Buat Function untuk Auto-Insert Vendor saat User Register
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.vendors (
        user_id,
        vendor_name,
        owner_name,
        email
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'vendor_name', 'Vendor'),
        COALESCE(NEW.raw_user_meta_data->>'owner_name', 'Owner'),
        NEW.email
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Buat Trigger untuk auto-insert vendor saat user register
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 7. Buat Tabel untuk Products (untuk inventory)
-- ============================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER DEFAULT 0,
    unit TEXT DEFAULT 'pcs',
    category TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_vendor_id ON public.products(vendor_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own products"
    ON public.products
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.vendors
            WHERE vendors.id = products.vendor_id
            AND vendors.user_id = auth.uid()
        )
    );

CREATE TRIGGER set_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- 8. Buat Tabel untuk Orders
-- ============================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
    order_number TEXT NOT NULL UNIQUE,
    customer_name TEXT,
    customer_phone TEXT,
    table_number TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    payment_method TEXT CHECK (payment_method IN ('cash', 'qris', 'bank_transfer', 'other')),
    payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_vendor_id ON public.orders(vendor_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own orders"
    ON public.orders
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.vendors
            WHERE vendors.id = orders.vendor_id
            AND vendors.user_id = auth.uid()
        )
    );

CREATE TRIGGER set_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- 9. Buat Tabel untuk Order Items
-- ============================================
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items"
    ON public.order_items
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            JOIN public.vendors ON vendors.id = orders.vendor_id
            WHERE orders.id = order_items.order_id
            AND vendors.user_id = auth.uid()
        )
    );

-- ============================================
-- Selesai!
-- ============================================
-- Setelah menjalankan script ini:
-- 1. Cek di Table Editor bahwa tabel vendors sudah dibuat
-- 2. Cek di Authentication > Policies bahwa RLS sudah aktif
-- 3. Test registrasi user baru, data akan otomatis masuk ke tabel vendors
