import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User | null;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'normal' | 'company' | 'admin';
    status: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    companies_count?: number;
    children?: (Category & { companies_count?: number })[];
}

export interface Company {
    id: number;
    name: string;
    slug: string;
    status: 'unclaimed' | 'pending' | 'approved' | 'rejected';
    location?: string | null;
    address?: string | null;
    delivery_coverage?: string | null;
    operating_hours?: string | null;
    latitude?: string | null;
    longitude?: string | null;
    company_type?: string | null;
    supplier_type?: string | null;
    summary?: string | null;
    description?: string | null;
    hero_image?: string | null;
    logo?: string | null;
    website?: string | null;
    contact_email?: string | null;
    contact_phone?: string | null;
    whatsapp?: string | null;
    categories?: Category[];
    products?: Product[];
    campaigns?: Campaign[];
    news_events?: NewsEvent[];
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    summary?: string | null;
    fish_type?: string | null;
    description?: string | null;
    price?: string | null;
    price_unit?: string | null;
    minimum_order?: string | null;
    availability_status?: 'available' | 'limited' | 'out_of_stock' | 'seasonal';
    image?: string | null;
}

export interface Campaign {
    id: number;
    title: string;
    summary?: string | null;
    starts_at?: string | null;
    ends_at?: string | null;
}

export interface NewsEvent {
    id: number;
    title: string;
    summary?: string | null;
    published_on?: string | null;
}

export interface SubscriptionPlan {
    id: number;
    name: string;
    slug: string;
    role_type: 'normal' | 'company';
    price: string;
    duration_days: number;
    features?: string[] | null;
    is_active: boolean;
    sort_order: number;
}

export interface Subscription {
    id: number;
    subscription_plan_id: number;
    subscribable_id: number;
    subscribable_type: string;
    status: 'active' | 'inactive' | 'pending' | 'expired' | 'cancelled';
    payment_status: 'paid' | 'unpaid' | 'pending' | 'refunded';
    start_date?: string | null;
    end_date?: string | null;
    cancelled_at?: string | null;
    plan?: SubscriptionPlan;
}

export interface Lead {
    id: number;
    company_id: number;
    user_id?: number | null;
    name: string;
    email?: string | null;
    phone?: string | null;
    product_interest?: string | null;
    message: string;
    status: 'new' | 'contacted' | 'converted' | 'closed';
    contacted_at?: string | null;
    created_at?: string;
    user?: Pick<User, 'id' | 'name' | 'email'> | null;
}
