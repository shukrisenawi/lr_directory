# AGENTS.md — IDXI Directory

## Stack

- **Laravel 12** + **React 19** SPA via **Inertia 2** — no Blade/Livewire except root `app.blade.php`.
- **Tailwind CSS v4** (`@import 'tailwindcss'` + `@theme` directive) — no `tailwind.config.js` content, all theme vars in `resources/css/app.css`.
- **shadcn/ui** with Radix primitives, `class-variance-authority`, `tailwind-merge`. Alias: `@/components/ui/*`.
- **Laravel Reverb** for WebSocket (not Pusher). Config via `VITE_REVERB_*` env vars.
- **Database driver** for queue, cache, and session (not Redis by default).
- **MySQL/MariaDB** via XAMPP in dev; **SQLite :memory:** in tests.
- **Ziggy** (`tightenco/ziggy`) makes Laravel routes available as `route()` in JS.

## Architecture (backend)

```
Controller (thin, Inertia::render) → FormRequest → Service → Repository (interface → Eloquent impl)
```

New classes live under:
- `app/Enums/` — PHP 8.1 backed enums (UserRole, CompanyStatus, ClaimStatus, EventType)
- `app/DTOs/` — `readonly class` DTOs (SearchDto, CompanyProfileDto, ...)
- `app/Repositories/Contracts/` — interfaces
- `app/Repositories/Eloquent/` — implementations extend `BaseRepository`
- `app/Services/` — business logic, injected via constructor
- `app/Events/` + `app/Listeners/` — domain events
- `app/Jobs/` — queue jobs
- `app/Notifications/` — mail + database notifications
- `app/Http/Requests/` — FormRequest per operation (not inline `validate()`)
- `app/Http/Controllers/` — thin, delegates to services

Bindings in `AppServiceProvider`. Events auto-discovered via `->withEvents(discover: [...])` in `bootstrap/app.php`.

## Key commands

| Command | Action |
|---------|--------|
| `composer dev` | Runs 4 processes: `php artisan serve`, `queue:listen`, `pail`, `vite` |
| `npm run dev` | Vite dev server only |
| `npm run build` | Vite production build |
| `npm run build:ssr` | Build + SSR build |
| `npm run lint` | ESLint `resources/` |
| `npm run format` | Prettier `resources/` |
| `php artisan migrate` | Run migrations (MySQL in dev) |
| `php artisan test` | PHPUnit (SQLite :memory:) |
| `php artisan test --parallel` | Parallel tests |
| `php artisan reverb:start` | Start WebSocket server (port 8080) |
| `php artisan queue:work` | Process queue jobs |
| `composer dump-autoload` | After adding new class directories |

## Frontend conventions

- Pages: `resources/js/pages/{name}.tsx` — resolved automatically by Inertia via `resolvePageComponent`.
- Layouts: `app-layout.tsx` (auth), `auth-layout.tsx` (guest). Set via `<AuthenticatedLayout>` wrapper in page components.
- TypeScript path alias: `@/` → `resources/js/`. Import shadcn components from `@/components/ui/button`.
- Types: `resources/js/types/index.ts` — `User`, `Company`, `Category`, `Product`, `Campaign`, `NewsEvent`.
- Styling: Tailwind v4 utility classes + CSS variables in `resources/css/app.css`. Ocean Current theme: deep ocean (`#0a2647`), sunrise amber (`#f59e0b`), coral cyan (`#06b6d4`).
- `cn()` utility from `@/lib/utils` for class merging (uses `clsx` + `tailwind-merge`).
- Prettier: 4-space tabs, single quotes, 150 print width.
- ESLint: TypeScript strict, React 19 JSX transform (no `import React` needed).

## Auth & roles

- Custom `role` middleware alias in `bootstrap/app.php`. Usage: `middleware('role:admin')`.
- Three roles: `normal`, `company`, `admin` — stored in `users.role` string column.
- Role-based dashboard in `DashboardController`: match on `$user->role`.
- Registration via `RegisteredUserController`: if `role=company`, auto-creates a pending `Company` profile.

## Routes

| Area | File |
|------|------|
| Web (all pages) | `routes/web.php` |
| Auth (login, register, reset) | `routes/auth.php` |
| Settings (profile, password, appearance) | `routes/settings.php` |
| Channels (WebSocket) | `routes/channels.php` |
| Console (scheduled jobs) | `routes/console.php` |

No `routes/api.php` exists yet (planned).

## Real-time messaging

- `Conversation` + `Message` models. Private channel: `conversation.{id}`.
- Authorization in `routes/channels.php`: user must be participant or company owner.
- `MessageSent` event broadcasts as `message.sent`. Echo client in `resources/js/echo.ts`.
- `broadcast(new MessageSent($message))->toOthers()` (skip sender).
- Guard: `if (! app()->environment('testing'))` around broadcast in tests.

## Testing

- PHPUnit with SQLite in-memory. Config in `phpunit.xml`.
- Two suites: `tests/Unit` + `tests/Feature`.
- No tests exist yet — write them when touching business logic.
- Use `RefreshDatabase` trait in feature tests.
- `QUEUE_CONNECTION=sync` and `CACHE_STORE=array` in test env — jobs run synchronously.
- Broadcasts should be gated with `app()->environment('testing')`.

## Common gotchas

- After adding new directories under `app/` (e.g., `Enums/`, `DTOs/`, `Repositories/`), run `composer dump-autoload` since PSR-4 autoloading needs to discover them.
- `readonly class` DTOs require PHP 8.2+. This project runs PHP 8.3 — safe.
- When adding new events/listeners, register them in `EventServiceProvider` or use `->withEvents(discover: [...])` in `bootstrap/app.php`.
- `Tailwind v4` does NOT use `tailwind.config.js` for content paths. Use `@source` directives in CSS instead.
- The `@theme` block in CSS uses `--var()` syntax for CSS variables — don't try to use Tailwind v3 config-style theme overrides.
- `concurrently` (from `composer dev`) requires `npx` — ensure Node.js is available.
- SSR entry: `resources/js/ssr.jsx`. If SSR issues arise, check `vite.config.js` input config.
- `plan/` directory contains Malay-language design docs — reference when unsure about feature intent.
