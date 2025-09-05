### Access token vs Refresh token — how they work together

- Access token
  - Short life (e.g., 15 minutes).
  - Sent with each protected request (in your app via `token` HTTP-only cookie).
  - If leaked, damage is limited by the short expiry.
  - Not stored server-side.

- Refresh token
  - Long life (e.g., 7 days).
  - Used only to get a new access token when it expires (in your app via `refreshToken` cookie).
  - Stored server-side (DB) to allow revocation and rotation.
  - Rotated on each refresh to reduce replay risk.

### Example lifecycle (theory)

1) Login
- Server issues:
  - Access token (15m) → set as `token` cookie.
  - Refresh token (7d) → set as `refreshToken` cookie and saved in DB.

2) Calling protected APIs
- Browser sends `token` cookie automatically.
- Server verifies it; if valid and not expired → allow.

3) Access token expires (after ~15m)
- Client calls POST /refresh (sends `refreshToken` cookie).
- Server checks DB for that refresh token and verifies its signature/expiry.
- If valid:
  - Issue new access token (15m) and a new refresh token (7d).
  - Save the new refresh token in DB and delete the old one (rotation).
  - Update both cookies.

4) Logout
- Server deletes refresh token from DB and clears both cookies.
- Optionally blacklist the current access token until it naturally expires.

### Why both?
- Short-lived access token limits exposure window.
- Refresh token provides seamless re-auth without re-login, but with server control (revoke/rotate).