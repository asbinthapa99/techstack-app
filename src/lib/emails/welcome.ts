export function welcomeEmailHtml(name: string | null, email: string): string {
  const displayName = name ?? email;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Welcome to TechStacker</title>
</head>
<body style="margin:0;padding:0;background:#0f0f14;font-family:system-ui,sans-serif;color:#fff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f14;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:40px;max-width:600px;">
          <tr>
            <td>
              <h1 style="margin:0 0 8px;font-size:28px;font-weight:700;
                background:linear-gradient(135deg,#6C5CE7,#0984E3);
                -webkit-background-clip:text;-webkit-text-fill-color:transparent;">
                Welcome to TechStacker
              </h1>
              <p style="margin:0 0 24px;color:rgba(255,255,255,0.6);font-size:14px;">
                Your growth partner for SEO, social media, and tech talent
              </p>
              <p style="margin:0 0 16px;font-size:16px;">Hi ${displayName},</p>
              <p style="margin:0 0 24px;color:rgba(255,255,255,0.8);line-height:1.6;">
                Thanks for signing up! Your account is ready. Explore our services and upgrade
                your plan whenever you're ready to accelerate your growth.
              </p>
              <a href="${process.env.APP_URL ?? "http://localhost:3000"}/dashboard"
                style="display:inline-block;background:linear-gradient(135deg,#6C5CE7,#0984E3);
                color:#fff;text-decoration:none;padding:12px 28px;border-radius:12px;
                font-weight:600;font-size:15px;">
                Go to Dashboard
              </a>
              <p style="margin:32px 0 0;color:rgba(255,255,255,0.4);font-size:12px;">
                Questions? Reply to this email and we'll help.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
