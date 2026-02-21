export function paymentConfirmationEmailHtml(
  name: string | null,
  email: string,
  amountCents: number,
  orderId: string
): string {
  const displayName = name ?? email;
  const amountFormatted = `$${(amountCents / 100).toFixed(2)}`;
  const orderShort = orderId.slice(-8).toUpperCase();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Payment Confirmed</title>
</head>
<body style="margin:0;padding:0;background:#0f0f14;font-family:system-ui,sans-serif;color:#fff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f14;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:40px;max-width:600px;">
          <tr>
            <td>
              <div style="width:48px;height:48px;background:rgba(0,206,201,0.15);border-radius:50%;
                display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
                <span style="font-size:24px;">✓</span>
              </div>
              <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#00CEC9;">
                Payment Confirmed
              </h1>
              <p style="margin:0 0 24px;color:rgba(255,255,255,0.6);font-size:14px;">
                Your order has been processed successfully
              </p>
              <p style="margin:0 0 16px;font-size:16px;">Hi ${displayName},</p>
              <p style="margin:0 0 24px;color:rgba(255,255,255,0.8);line-height:1.6;">
                We've received your payment of <strong>${amountFormatted}</strong>.
                Your services will be activated shortly.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);
                border-radius:12px;padding:20px;margin-bottom:24px;">
                <tr>
                  <td style="color:rgba(255,255,255,0.5);font-size:13px;padding-bottom:8px;">ORDER ID</td>
                  <td align="right" style="font-size:13px;font-family:monospace;">#${orderShort}</td>
                </tr>
                <tr>
                  <td style="color:rgba(255,255,255,0.5);font-size:13px;padding-bottom:8px;">AMOUNT</td>
                  <td align="right" style="font-size:13px;">${amountFormatted}</td>
                </tr>
                <tr>
                  <td style="color:rgba(255,255,255,0.5);font-size:13px;">STATUS</td>
                  <td align="right">
                    <span style="background:rgba(0,206,201,0.15);color:#00CEC9;
                      padding:2px 10px;border-radius:999px;font-size:12px;">Paid</span>
                  </td>
                </tr>
              </table>
              <a href="${process.env.APP_URL ?? "http://localhost:3000"}/dashboard"
                style="display:inline-block;background:linear-gradient(135deg,#6C5CE7,#0984E3);
                color:#fff;text-decoration:none;padding:12px 28px;border-radius:12px;
                font-weight:600;font-size:15px;">
                View Dashboard
              </a>
              <p style="margin:32px 0 0;color:rgba(255,255,255,0.4);font-size:12px;">
                Questions about your order? Reply to this email.
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
