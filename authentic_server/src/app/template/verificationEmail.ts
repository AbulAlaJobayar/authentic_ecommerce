const verificationEmailTemplate = (
  verificationLink: string,
  title: string,
  otp?: string,
  companyName: string = 'Authentic Surgical'
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email</title>
  <style>
    /* Base Styles */
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', Arial, sans-serif;
      background-color: #f8fafc;
      color: #334155;
      line-height: 1.5;
    }
    
    /* Container */
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 48px;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      border: 1px solid #e2e8f0;
    }
    
    /* Logo */
    .logo {
      font-size: 24px;
      font-weight: 700;
      color: #10b981;
      margin-bottom: 24px;
      display: inline-block;
    }
    
    /* Typography */
    h2 {
      margin: 0 0 16px;
      color: #0f172a;
      font-size: 24px;
      font-weight: 600;
    }
    
    p {
      color: #475569;
      margin: 0 0 32px;
      font-size: 16px;
    }
    
    /* Button */
    .btn {
      background-color: #10b981;
      color: #ffffff;
      padding: 16px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      display: inline-block;
      margin-bottom: 32px;
      transition: all 0.2s ease;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }
    
    .btn:hover {
      background-color: #059669;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    /* Link */
    .link {
      font-size: 14px;
      color: #64748b;
      margin-bottom: 40px;
      word-break: break-all;
      background-color: #f1f5f9;
      padding: 16px;
      border-radius: 6px;
    }
    
    .link a {
      color: #3b82f6;
      text-decoration: none;
    }
    
    /* Footer */
    .footer {
      font-size: 12px;
      color: #94a3b8;
      text-align: center;
      padding: 24px 0 0;
      border-top: 1px solid #e2e8f0;
      margin-top: 32px;
    }
    
    .footer-logo {
      margin-top: 12px;
      font-size: 16px;
      font-weight: 700;
      color: #94a3b8;
    }
    
    /* Responsive */
    @media (max-width: 640px) {
      .container {
        margin: 20px auto;
        padding: 32px 24px;
        border-radius: 0;
      }
      
      h2 {
        font-size: 20px;
      }
      
      p {
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">${companyName}</div>
    <h2>Verify your email address</h2>
    <p>
      Please confirm this email for your ${companyName} account. Once verified, you'll be able to start purchasing products!
    </p>

  ${
    otp
      ? `
      <div style="
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 8px;
  color: #0f172a;
  background: #f1f5f9;
  padding: 20px 0;
  border-radius: 8px;
  margin: 24px auto;
  max-width: 240px;
  text-align: center;
">
  ${otp}
</div>`
      : ''
  }
  <a href="${verificationLink}" class="btn" style="color: #ffffff; font-weight: 800; text-decoration: none;">${title}</a>
    <div class="link">
      Or paste this link into your browser:<br>
      <a href="${verificationLink}">${verificationLink}</a>
    </div>
  </div>
  <div class="footer">
    &copy; 2025 - ${new Date().getFullYear()} ${companyName}. All rights reserved.<br />
    77 Jashore Road, Khulna, Bangladesh - 9100
    <div class="footer-logo">Made by Dexnivo Tech 01928210545</div>
  </div>
</body>
</html>
`;
};
export default verificationEmailTemplate;
