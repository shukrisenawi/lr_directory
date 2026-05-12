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
    children?: (Category & { companies_count?: number })[];
}

export interface Company {
    id: number;
    name: string;
    slug: string;
    status: 'unclaimed' | 'pending' | 'approved' | 'rejected';
    location?: string | null;
    company_type?: string | null;
    summary?: string | null;
    description?: string | null;
    hero_image?: string | null;
    logo?: string | null;
    website?: string | null;
    contact_email?: string | null;
    contact_phone?: string | null;
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
