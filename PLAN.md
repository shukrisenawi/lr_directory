# AGENTS.md

## Project Name

Fish Supplier Directory Website

## Project Purpose

Build a directory website for finding fish suppliers, fishermen, wholesalers, and seafood-related companies. The website connects normal users/buyers with suppliers so they can search, view supplier profiles, contact suppliers, and save favorite suppliers.

The platform should support three main roles:

1. **Normal User / Buyer**

   * Browse fish suppliers and fishermen.
   * Search suppliers by category, location, fish type, company type, and other filters.
   * Save favorite suppliers.
   * Contact suppliers through forms or chat.
   * Track search history.

2. **Supplier / Company / Fisherman**

   * Register as a supplier.
   * Create and update supplier profile.
   * Upload fish/product photos.
   * Manage product listings.
   * Receive messages or leads from users.
   * Track profile views, leads, and favorites.
   * Publish campaigns, promotions, news, or events.

3. **Admin / Master Dashboard**

   * Manage all users and suppliers.
   * Approve or review supplier registrations.
   * Manage subscription plans.
   * Monitor platform statistics.
   * Moderate profiles, products, campaigns, messages, and content if needed.

---

## Core Business Concept

This website is similar to a business directory, but focused on the fish and seafood supply chain.

Examples of supplier types:

* Nelayan / fishermen
* Pemborong ikan
* Pembekal ikan segar
* Supplier seafood
* Kolam ikan / aquaculture farms
* Frozen seafood supplier
* Pasar borong supplier
* Restaurant seafood supplier
* Fish processing company

The website should make it easy for buyers to find suitable suppliers quickly.

---

## Main User Flow

### 1. Landing Page

The landing page should explain the platform clearly.

Main hero section should communicate:

* Find trusted fish suppliers and fishermen.
* Search by location, fish type, category, or supplier type.
* Connect directly with suppliers.

Suggested hero CTA buttons:

* `Cari Supplier Ikan`
* `Daftar Sebagai Supplier`

Landing page sections:

* Hero section
* Search preview / supplier directory preview
* Why use this platform
* Supplier categories
* Featured suppliers
* Subscription plan section
* FAQ
* Footer

---

### 2. Sign In / Register Flow

All users should be able to sign in or register before accessing full dashboard features.

Registration should support role selection:

* Normal User / Buyer
* Supplier / Company

After registration, redirect user based on role.

Normal user goes to normal user dashboard.
Supplier goes to supplier dashboard.
Admin goes to master dashboard.

---

### 3. Subscription Selection

The platform supports subscription-based access.

There should be subscription plans for:

* Normal User Subscription
* Supplier / Company Subscription

Subscription system can initially be built with manual or dummy payment status, then later integrate real payment gateway.

Subscription status should be stored in the database.

Possible subscription statuses:

* active
* inactive
* pending
* expired
* cancelled

---

## Role-Based Features

## Normal User / Buyer Dashboard

### Main Menu

* Dashboard Overview
* Directory Search
* Favorite Suppliers
* Inbox / Chat
* Search History
* Profile Update
* Subscription Status

### Features

#### Dashboard Overview

Show summary cards:

* Total favorite suppliers
* Recent searches
* Unread messages
* Suggested suppliers

#### Directory Page

User can browse and search suppliers.

Search and filters should include:

* Supplier name
* Location
* Fish type
* Seafood category
* Supplier type
* Company type
* Availability
* Delivery area
* Price range if available

Example filters:

* Ikan kembung
* Mackerel
* Red snapper
* Shrimp
* Squid
* Crab
* Fresh fish
* Frozen seafood
* Tuna
* Salmon
* Cod
* Global fisheries
* Local fisherman
* Wholesaler
* Retail supplier
* Aquaculture farm

#### Supplier Profile Page

Each supplier profile should show:

* Supplier name
* Logo or profile image
* Location
* Supplier type
* Fish/product categories
* Product images
* Contact information if allowed
* WhatsApp link if provided
* Social media links
* Business description
* News/events/promotions
* Rating/review area if added later
* Contact form or chat button
* Add to favorites button

#### Favorite Suppliers

Users can add and remove suppliers from favorites.

#### Inbox / Chat

Users can message suppliers.

Minimum chat fields:

* sender_id
* receiver_id
* message
* read status
* timestamp

#### Search History

Store user search activity.

Useful for:

* Showing recent searches
* Suggesting suppliers
* Analytics

---

## Supplier / Company Dashboard

### Main Menu

* Dashboard Overview
* Inbox / Leads
* Supplier Profile Update
* Product Management
* Campaign Management
* News & Events
* Analytics & Statistics
* Subscription Status

### Features

#### Dashboard Overview

Show summary cards:

* Profile page views
* Total leads
* Total users who added supplier to favorites
* Unread messages
* Active products
* Active campaigns

#### Supplier Profile Update

Supplier can update:

* Business / supplier name
* Owner/contact person name
* Phone number
* WhatsApp number
* Email
* Address/location
* Business type
* Supplier type
* Description
* Product categories
* Delivery coverage
* Operating hours
* Social media links
* Profile image/logo

#### Product Management

Supplier can add products or fish listings.

Product fields:

* Product name
* Fish/seafood type
* Description
* Price or price range
* Unit type: kg, box, crate, bundle, piece
* Availability status
* Minimum order quantity
* Product images

Product availability statuses:

* available
* limited
* out_of_stock
* seasonal

#### Campaign Management

Supplier can create promotions or campaigns.

Campaign fields:

* Campaign title
* Description
* Start date
* End date
* Campaign image
* Status

#### News & Events Management

Supplier can publish news or updates.

Examples:

* New fish stock arrived
* Seasonal seafood available
* Promotion announcement
* Supplier event
* Market schedule

#### Inbox / Leads

Supplier can receive messages from normal users.

Lead data should include:

* User name
* User contact
* Message content
* Product/supplier interest
* Status
* Created date

Lead statuses:

* new
* contacted
* converted
* closed

#### Analytics & Statistics

Track:

* Profile views
* Product views
* Number of favorites
* Number of leads
* Search appearances
* Message count

Avoid heavy live queries. Store analytics events and aggregate when needed.

---

## Admin / Master Dashboard

### Main Menu

* Dashboard Overview
* User Management
* Supplier Management
* Supplier Approval
* Subscription Management
* Product Management
* Campaign Management
* News & Events Management
* Message Moderation
* Analytics & Reports
* Settings

### Features

#### Dashboard Overview

Show platform-wide statistics:

* Total users
* Total suppliers
* Pending supplier approvals
* Active subscriptions
* Total messages
* Total leads
* Total products
* Total profile views

#### User Management

Admin can:

* View all normal users
* Search users
* Update user status
* Suspend users if needed

#### Supplier Management

Admin can:

* View all suppliers
* Approve or reject supplier registration
* Edit supplier status
* Verify supplier profile
* Moderate supplier products and campaigns

Supplier statuses:

* pending
* approved
* rejected
* suspended

#### Subscription Management

Admin can:

* Create subscription plans
* Edit subscription price/features
* View active subscriptions
* Manually activate/deactivate subscriptions

#### Content Moderation

Admin can review:

* Supplier profiles
* Products
* Campaigns
* News/events
* Messages if moderation is required

---

## Functional Requirements

### Authentication

Required for all roles.

Features:

* Sign up
* Sign in
* Password reset
* Email verification if possible
* Role-based access control

### Role-Based Routing

Each user must only access pages allowed by their role.

Examples:

* Normal user cannot access supplier dashboard.
* Supplier cannot access admin dashboard.
* Admin can access master dashboard.

### Directory Search

Directory search must support pagination or infinite scroll.

Search should be fast and scalable.

Suggested filters:

* keyword
* location
* supplier type
* fish type
* seafood category
* company type
* availability
* delivery area

### Favorites

Normal users can favorite suppliers.

### Messaging / Inbox

Normal users and suppliers can communicate.

Add rate limiting to prevent spam.

### Analytics

Track key events:

* supplier_profile_viewed
* product_viewed
* supplier_favorited
* lead_created
* message_sent
* search_performed

Analytics should not slow down normal page loading.

### Logging

Log critical actions:

* registration
* login
* supplier approval/rejection
* subscription changes
* lead creation
* campaign creation
* profile update

---

## Suggested Database Tables

### users

Stores all user accounts.

Suggested fields:

* id
* name
* email
* password
* role: normal_user, supplier, admin
* phone
* status
* email_verified_at
* created_at
* updated_at

### supplier_profiles

Stores supplier/company/fisherman profile data.

Suggested fields:

* id
* user_id
* business_name
* slug
* description
* supplier_type
* company_type
* location
* address
* latitude
* longitude
* phone
* whatsapp
* email
* website
* facebook_url
* tiktok_url
* instagram_url
* logo_path
* cover_image_path
* approval_status
* subscription_status
* created_at
* updated_at

### subscription_plans

Stores subscription plan options.

Suggested fields:

* id
* name
* role_type
* price
* duration_days
* features_json
* status
* created_at
* updated_at

### subscriptions

Stores user subscription records.

Suggested fields:

* id
* user_id
* plan_id
* status
* start_date
* end_date
* payment_status
* created_at
* updated_at

### products

Stores supplier fish/product listings.

Suggested fields:

* id
* supplier_profile_id
* name
* category
* fish_type
* description
* price
* price_unit
* minimum_order
* availability_status
* created_at
* updated_at

### product_images

Stores product images.

Suggested fields:

* id
* product_id
* image_path
* sort_order
* created_at
* updated_at

### favorites

Stores normal user favorite suppliers.

Suggested fields:

* id
* user_id
* supplier_profile_id
* created_at

### messages

Stores chat messages.

Suggested fields:

* id
* sender_id
* receiver_id
* supplier_profile_id
* message
* is_read
* created_at
* updated_at

### leads

Stores user enquiries/leads.

Suggested fields:

* id
* user_id
* supplier_profile_id
* product_id
* name
* phone
* email
* message
* status
* created_at
* updated_at

### campaigns

Stores supplier promotions.

Suggested fields:

* id
* supplier_profile_id
* title
* description
* image_path
* start_date
* end_date
* status
* created_at
* updated_at

### news_events

Stores supplier updates/news/events.

Suggested fields:

* id
* supplier_profile_id
* title
* content
* image_path
* published_at
* status
* created_at
* updated_at

### search_histories

Stores normal user search history.

Suggested fields:

* id
* user_id
* keyword
* filters_json
* created_at

### analytics_events

Stores platform analytics events.

Suggested fields:

* id
* user_id
* supplier_profile_id
* product_id
* event_type
* metadata_json
* ip_address
* user_agent
* created_at

---

## Suggested Pages / Routes

## Public Pages

* `/`

  * Landing page

* `/login`

  * Sign in page

* `/register`

  * Register page with role selection

* `/plans`

  * Subscription plans page

* `/directory`

  * Public or protected directory listing page

* `/suppliers/{slug}`

  * Supplier profile page

---

## Normal User Routes

* `/user/dashboard`
* `/user/directory`
* `/user/favorites`
* `/user/inbox`
* `/user/search-history`
* `/user/profile`
* `/user/subscription`

---

## Supplier Routes

* `/supplier/dashboard`
* `/supplier/profile`
* `/supplier/products`
* `/supplier/campaigns`
* `/supplier/news-events`
* `/supplier/inbox`
* `/supplier/leads`
* `/supplier/analytics`
* `/supplier/subscription`

---

## Admin Routes

* `/admin/dashboard`
* `/admin/users`
* `/admin/suppliers`
* `/admin/supplier-approvals`
* `/admin/subscriptions`
* `/admin/products`
* `/admin/campaigns`
* `/admin/news-events`
* `/admin/messages`
* `/admin/analytics`
* `/admin/settings`

---

## UI / Design Direction

Use a clean, modern, professional design.

Visual theme:

* Blue ocean color palette
* White background
* Fresh seafood imagery
* Clean card-based layout
* Rounded corners
* Clear search bar
* Simple icons
* Mobile responsive

Hero image direction:

* Wide 16:9 banner
* Harbor / sea / fishermen / seafood supplier theme
* Digital directory elements like search bar, map pin, supplier network
* Leave suitable area for headline and CTA overlay

Important UI principles:

* Make search easy and obvious.
* Supplier cards must be clean and readable.
* Dashboard must not be crowded.
* Use clear status badges.
* Make CTAs obvious.

---

## Supplier Card Requirements

Each supplier card should show:

* Supplier logo/image
* Supplier name
* Location
* Supplier type
* Main fish/seafood categories
* Short description
* Favorite button
* View profile button
* Contact button if allowed

Optional badges:

* Verified
* New supplier
* Featured
* Active promotion

---

## Search Result Behavior

When user searches:

1. Save search keyword and filters to `search_histories` if logged in.
2. Return paginated supplier results.
3. Show applied filters.
4. Allow user to reset filters.
5. Show empty state if no supplier found.

Empty state message example:

`Tiada supplier dijumpai. Cuba tukar lokasi, jenis ikan, atau kategori carian.`

---

## Development Rules for Agent

When working on this project, follow these rules:

1. Always respect role-based access control.
2. Keep normal user, supplier, and admin modules separated.
3. Use reusable components for dashboard cards, tables, forms, filters, and supplier cards.
4. Do not hardcode business data unless for seed/demo data.
5. Use pagination for supplier directory listing.
6. Validate all form inputs.
7. Sanitize user-generated content.
8. Hash passwords securely.
9. Protect admin routes.
10. Add database indexes for search-related columns.
11. Avoid heavy analytics queries on live pages.
12. Store uploaded images properly and validate file types.
13. Make the design responsive for mobile and desktop.
14. Keep code modular and easy to maintain.
15. Prefer clear naming for database tables, routes, components, and services.

---

## Suggested Tech Stack

Use the stack selected by the project owner. If not specified, suggested options are:

### Frontend

* React.js, Vue.js, or Laravel Blade
* Tailwind CSS for styling
* Responsive layout

### Backend

* Laravel preferred if the project owner wants PHP ecosystem
* Node.js or Django acceptable if specified

### Database

* MySQL or PostgreSQL

### Optional Integrations

* Email notifications
* WhatsApp link integration
* Payment gateway for subscriptions
* Social media link validation
* Map/location support

---

## MVP Scope

Build the first version with these minimum features:

1. Landing page
2. Register/login
3. Role selection
4. Subscription plan page
5. Normal user dashboard
6. Supplier dashboard
7. Admin dashboard
8. Supplier directory search
9. Supplier profile page
10. Favorites
11. Contact form or simple messaging
12. Supplier product upload
13. Admin supplier approval

Advanced features like real-time chat, payment gateway, reviews, and map search can be added after MVP.

---

## Future Enhancements

Possible future features:

* Real-time chat
* Supplier verification badge
* User reviews and ratings
* Map-based supplier search
* Payment gateway
* Featured supplier ads
* Bulk product upload
* WhatsApp order button
* AI supplier recommendation
* Mobile app
* Multi-language support

---

## Important Reminder

The main goal is to make it easy for users to find trusted fish suppliers and fishermen, while giving suppliers a simple way to showcase their business, products, promotions, and contact channels.

Build the system step by step. Start with stable MVP modules before adding advanced features.
