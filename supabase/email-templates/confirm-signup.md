# Supabase → Authentication → Emails → Confirm signup

Paste **Subject** and **Body** into the Supabase dashboard (after custom SMTP is on).  
Use the **Source** tab for HTML. Keep `{{ .ConfirmationURL }}` exactly as-is.

Matches **About Us** typography: title = `trip-sitter.AI` (h1), heading = `Confirm your email` (same as “Our Mission”).

---

## Subject

```
Confirm your trip-sitter.AI account
```

---

## Body (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;padding:0;background-color:#f8f9fb;font-family:Manrope,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f8f9fb;padding:32px 16px;">
    <tr>
      <td align="left">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:576px;margin:0 auto;background-color:#ffffff;border:1px solid rgba(60,64,67,0.12);border-radius:24px;padding:32px 28px 36px;">
          <tr>
            <td align="left" style="text-align:left;">
              <h1 style="margin:0;padding:0;font-family:Manrope,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:36px;font-weight:600;line-height:1.15;letter-spacing:-0.02em;color:#202124;">trip-sitter.AI</h1>
              <h2 style="margin:40px 0 16px;padding:0;font-family:Manrope,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:22px;font-weight:600;line-height:1.3;letter-spacing:-0.02em;color:#202124;">Confirm your email</h2>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.625;color:#5f6368;">Thanks for signing up. Confirm your email so we can save your Online Courses progress (Peer Support Basics &amp; Train-the-trainer).</p>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">
                <tr>
                  <td align="left" style="border-radius:999px;background-color:#1a73e8;">
                    <a href="{{ .ConfirmationURL }}" style="display:inline-block;padding:12px 24px;font-family:Manrope,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:999px;">Confirm my email</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.625;color:#5f6368;">After confirming, you’ll go to <strong style="color:#202124;font-weight:600;">Online Courses</strong>. If you’re not signed in automatically, use the same email and password on Sign in.</p>
              <p style="margin:0 0 20px;font-size:14px;line-height:1.625;color:#80868b;">Educational peer-support training only — not medical care or emergency services. If you or someone else is in immediate danger, call local emergency services (e.g. 999 / 911).</p>
              <p style="margin:0;font-size:12px;line-height:1.5;color:#80868b;">If you didn’t create an account, you can ignore this email.<br />
              Crisis resources: <a href="https://findahelpline.com" style="color:#202124;text-decoration:underline;">findahelpline.com</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

**Sizing (matches About page Tailwind):**
- `trip-sitter.AI` → h1: 36px semibold (≈ `text-4xl` on mobile; use 42px if you prefer `md:text-5xl`: change `font-size:36px` to `42px`)
- `Confirm your email` → h2: 22px semibold, 40px below title (≈ `mt-10` + `text-xl md:text-2xl` / “Our Mission”)
- Body → 16px `#5f6368` (≈ `text-base text-mist`)

---

## Body (plain text, optional)

```
trip-sitter.AI

Confirm your email

Thanks for signing up. Confirm your email to save Online Courses progress:

{{ .ConfirmationURL }}

After confirming, open Online Courses on the site. Sign in with the same email and password if needed.

Educational only — not medical care or emergency services.

If you didn’t sign up, ignore this email.
findahelpline.com
```
