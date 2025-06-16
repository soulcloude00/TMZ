

# ✅ Fullstack Web Dev Standards – Zero-Tolerance Ruleset

## 🔄 Mandatory Project Context Discipline

* **You MUST read `PLANNING.md`** at the start of every work session.

  * Understand architecture, tech stack, naming conventions, folder structure, API contracts, and domain boundaries.
  * If unclear, STOP and ask before coding. **Do not assume**.

* **You MUST check `TASK.md` before beginning any work.**

  * If the task doesn’t exist, create it with:
    `- YYYY-MM-DD: [Short task description]`
  * All subtasks, decisions, and implementation TODOs MUST be tracked there.

---

## 🧱 Code Structure & Modularity – Enforced Boundaries

* **NO file exceeds 500 lines.** Period.

  * Modularize aggressively: split by feature, role, or concern.
  * Use:

    * `components/` for atomic to layout-level React elements
    * `hooks/` for logic reuse
    * `services/` for client-side or server-side business logic
    * `api/` for route handlers or FastAPI routers
    * `lib/` for utilities

* **Absolute clarity in imports:**

  * Use **relative imports inside feature folders**
  * Use **aliases only if defined in `tsconfig.json` or `pyproject.toml`**

* **NEVER mix concerns**: UI, data, and logic should live in separate layers.

  * No side effects in components.
  * No logic in routes.
  * No state in services.

---

## 🧪 Testing is Non-Negotiable

* **Every feature MUST have tests**. No exceptions.

  * Frontend: `Vitest` / `Jest` + `React Testing Library`
  * Backend: `Pytest`, `httpx`, or `TestClient`
* For every new function, component, or route:

  * ✅ 1 test for the expected flow
  * ⚠️ 1 edge case
  * ❌ 1 failure or invalid case
* **Test files mirror the app structure**. Always.

---

## ✅ Task Completion = Process Discipline

* **You MUST update `TASK.md` immediately after completing or discovering tasks.**

  * No undocumented progress.
  * No silent decisions.
  * No TODOs left in code without a mirror in `TASK.md`.

---

## 📎 Code Quality = Non-Negotiable

* **Frontend:**

  * TypeScript, React (function components only)
  * Tailwind CSS for styling
  * Format with `prettier`, lint with `eslint`
  * Use Framer Motion, Radix, ShadCN, Recharts when needed
* **Backend:**

  * Python 3.11+, FastAPI
  * SQLModel / SQLAlchemy for DB
  * Pydantic for all validation
  * Format with `black`, lint with `ruff`

> **Every file must be immediately readable by a mid-level developer.**
> If it’s not, rewrite it.

---

## 📚 Documentation is Law

* **Update `README.md`** for any:

  * New feature
  * Changed setup/bootstrapping step
  * New environment variable or dependency

* **Comment anything non-obvious.**
  Use `// Reason:` or `# Reason:` to justify complex logic.
  Explain “why,” not just “what.”

---

## 🧠 AI / Automation Guardrails

* **NEVER assume. Ask questions.**
* **NEVER invent code, libraries, or filenames.**

  * Only use real, proven, documented APIs and modules.
* **NEVER delete or overwrite production code** unless:

  * You are explicitly instructed
  * Or the change is listed in `TASK.md`

---

## 🚫 Violations = Rework

This is a high-discipline project. Every contributor is expected to uphold these rules **without exceptions**. If any of the above are violated:

* The code will be rejected or reworked.
* You will be asked to rewrite with no shortcuts.


---

## 🔄 Add-on Rule: Third-Party API Rate Limit Enforcement

### 📛 Purpose:

Prevent service disruption, quota exhaustion, or unexpected 429 errors from external APIs like **Google Gemini**, **OpenAI**, **Stripe**, **Supabase**, etc.

---

### 📐 Rule: API Usage Throttling & Rate Compliance

> All API calls to third-party services **must go through a controlled, rate-limited interface**. This includes language models, payment gateways, analytics services, and cloud providers.

#### ✅ Required Practices:

1. **All external API calls must use a centralized wrapper function** (e.g., `callGeminiAPI()`, `queryOpenAI()`) that:

   * Implements **concurrency limits** (e.g., via `asyncio.Semaphore` or `p-limit`)
   * Includes **retry with exponential backoff and jitter**
   * Respects any `Retry-After` or `429` headers
   * Uses **circuit breaking** if too many errors occur in a short period

2. **Set default max requests/token usage per minute**:

   * For example, **Google Gemini Free Tier: 250,000 input tokens/minute**
   * Use a shared counter, queue system, or token bucket model to enforce limits if usage is bursty

3. **DO NOT**:

   * Spam API requests inside `for` or `while` loops
   * Re-try instantly without delay logic
   * Ignore `429 Too Many Requests` errors

4. **Test environments** must simulate rate limits and ensure graceful degradation.

---

### 🧪 Example: Gemini API Throttled Client (Python + FastAPI)

```python
# utils/gemini_client.py
import asyncio
import httpx
from tenacity import retry, wait_exponential_jitter, stop_after_attempt, retry_if_exception_type

RATE_LIMIT = asyncio.Semaphore(2)  # Limit concurrent requests

@retry(
    wait=wait_exponential_jitter(initial=2, max=20),
    stop=stop_after_attempt(5),
    retry=retry_if_exception_type(httpx.HTTPStatusError),
)
async def call_gemini_api(payload: dict) -> dict:
    async with RATE_LIMIT:
        async with httpx.AsyncClient() as client:
            resp = await client.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", json=payload)
            if resp.status_code == 429:
                raise httpx.HTTPStatusError("Quota exceeded", request=resp.request, response=resp)
            resp.raise_for_status()
            return resp.json()
```

---

### 🧱 File Structure Recommendation

```
backend/
  utils/
    gemini_client.py  ← Contains rate-limited wrapper
.clinerules/
  fullstacks.md
  api_limits.md       ← (Optional) contains this add-on rule
```

---

### 📌 Enforce During Review

* [ ] All API calls must go through the rate-limited client
* [ ] Tests must simulate failure and retry logic
* [ ] Quota boundaries must be tracked or estimated per environment

