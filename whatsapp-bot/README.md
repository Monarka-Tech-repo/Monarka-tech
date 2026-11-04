# Monarka WhatsApp bot

A Cloudflare Worker that answers WhatsApp messages for Monarka TECH and books
free discovery calls into Google Calendar. Claude (`claude-opus-5-5`) runs
the conversation, in Spanish or English depending on how the person writes. It
can use two tools:

- `get_available_slots(date)`: business hours minus busy times in the calendar.
- `book_appointment(start, name, topic, email)`: checks the slot against the
  calendar again, then creates the event. The sender's WhatsApp number comes
  from Meta, not from the model.

```
WhatsApp user ─▶ Meta Cloud API ─▶ POST /webhook (this Worker)
                                      ├─ verifies X-Hub-Signature-256
                                      ├─ de-dupes + rate-limits (KV)
                                      ├─ Claude + calendar tools
                                      └─ replies via Graph API
```

## One-time setup

### 1. WhatsApp Business (Meta)
1. Go to <https://developers.facebook.com>, then **Create app**, choose **Business**, and add the **WhatsApp** product.
2. Add a phone number that is **not** registered in the normal WhatsApp or WhatsApp Business app.
   Note its **Phone number ID**.
3. Create a **permanent access token**: Business Settings → System users → add a user →
   assign the app with `whatsapp_business_messaging`, then generate a token.
4. Copy the **App secret** from App settings → Basic.
5. Pick any random string as the **verify token**, for example from `openssl rand -hex 16`.

### 2. Google Calendar
1. In Google Cloud Console, create a project and enable the **Google Calendar API**.
2. Create a **service account**, then create a **JSON key** for it and download the file.
3. In Google Calendar, open the calendar → Settings → **Share with specific people**. Add the
   service account's email with **Make changes to events**.
4. Copy the **Calendar ID** from the same page (for a personal calendar, it's the Gmail address).

### 3. Anthropic
Create an API key at <https://platform.claude.com>.

### 4. Deploy
```bash
cd whatsapp-bot
npm install
npx wrangler kv namespace create BOT_STATE   # paste the id into wrangler.jsonc
# Edit wrangler.jsonc: WHATSAPP_PHONE_NUMBER_ID, GOOGLE_CALENDAR_ID, hours, timezone
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler secret put WHATSAPP_TOKEN
npx wrangler secret put WHATSAPP_APP_SECRET
npx wrangler secret put WHATSAPP_VERIFY_TOKEN
npx wrangler secret put GOOGLE_SERVICE_ACCOUNT_JSON   # paste the whole JSON key file
npm run deploy
```

### 5. Connect the webhook
In the Meta app, open WhatsApp → Configuration → Webhook:
- Callback URL: `https://monarka-whatsapp-bot.<your-subdomain>.workers.dev/webhook`
- Verify token: the same string as `WHATSAPP_VERIFY_TOKEN`
- Subscribe to the **messages** field.

## Configuration (`wrangler.jsonc` vars)

| Var | Default | Meaning |
|---|---|---|
| `TIMEZONE` | `America/Denver` | El Paso time. All slots are in this zone. |
| `BUSINESS_HOURS` | Mon–Fri 09:00–17:00 | JSON, weekday `0`=Sun … `6`=Sat → `["HH:MM","HH:MM"]` |
| `SLOT_MINUTES` | `30` | Call length |
| `MIN_LEAD_MINUTES` | `120` | Minimum notice before a slot |
| `BOOKING_HORIZON_DAYS` | `30` | How far ahead people can book |
| `MESSAGES_PER_HOUR` | `30` | Per-number rate limit |

The bot's business knowledge and tone are set by `SYSTEM_PROMPT` in `src/agent.ts`.

## Development
```bash
npm test          # unit tests (slots, signature, parsing)
npm run typecheck
cp .dev.vars.example .dev.vars && npm run dev   # local Worker
```

## Notes
- Conversation memory is plain text only, the last 20 turns per number, kept for 7 days in KV.
- Meta retries webhooks, so each message ID is handled once.
- If Claude or Google fails, the person gets a short apology that points to hello@monarka.tech.
- Meta charges per conversation. Claude usage is billed to the Anthropic key.
