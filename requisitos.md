# Functional Requirements – MVP (UnlockPack.AI / Global Estudamais)

## Core Flow

1. **User Onboarding**
   - User selects or enters their field of study/career.
   - User selects country (optionally: institution/level).
   - User chooses language (default: English).

2. **Personalized Discovery**
   - The app (powered by GPT-4o) queries and suggests *global benefits*: student packs, licenses, scholarships, discounted/pro plans, competitions, courses, events.
   - Filtering by user profile (field/country/level).

3. **Step-by-Step Activation Guidance**
   - For each benefit, the app provides:
     - Activation requirements/checklist.
     - Step-by-step guide (forms, links, templates, deadlines).
     - Ready-to-use email/application templates.

4. **Progress & Tracking**
   - User marks benefits as “activated”, “in progress”, or “not interested”.
   - Dashboard displays:
     - Total benefits unlocked (with estimated value in local currency).
     - Activation status/history.
     - Suggested next steps.

5. **Value Calculation**
   - Real-time calculation of estimated total savings/unlocked value per user.

6. **Sharing & Referral**
   - Simple “Share your unlocked benefits!” function.
   - Invite friends (email/social).

---

## Bonus/Nice-to-Have (MVP+)

- **Global/Regional Notifications**  
  E.g. “New benefit available for Civil Engineering students in your country!”
- **Multilingual support** (beyond English)
- **Feedback system** (“Couldn’t activate? Tell us why.”)
- **AI-powered Q&A:**  
  Chat with GPT-4o for troubleshooting/extra suggestions.

---

## Administrative/Platform Features

- **Admin dashboard**  
  See what’s being unlocked, value generated, top countries/fields.
- **Benefit database**  
  Editable, expandable via AI/manual curation.

---

## Technical Notes

- **Frontend:**  
  Web app (mobile responsive), simple onboarding, dashboard.
- **Backend:**  
  API to orchestrate user flow + GPT-4o integration.
- **LLM role:**  
   - Map field/country to available benefits (using up-to-date open data and prompt engineering).
   - Generate guides/templates dynamically.
- **Security/Privacy:**  
   - Minimal personal info (no sensitive data unless user wants to track by email).
   - Option for anonymous use.

---

## Functional Requirements – Summary Table

| #  | Feature                                   | Must Have / Nice to Have |
|----|-------------------------------------------|--------------------------|
| 1  | User onboarding (field, country, lang)    | Must                    |
| 2  | Personalized benefit discovery            | Must                    |
| 3  | Step-by-step activation guide             | Must                    |
| 4  | Track benefits & progress                 | Must                    |
| 5  | Value calculation (total savings)         | Must                    |
| 6  | Sharing/referral                          | Must                    |
| 7  | Regional/global notifications             | Nice to Have            |
| 8  | Multilingual support                      | Nice to Have            |
| 9  | Feedback system                           | Nice to Have            |
| 10 | AI-powered Q&A (chat for help)            | Nice to Have            |
| 11 | Admin dashboard/analytics                 | Must (for judges)       |
| 12 | Editable benefit database                 | Must                    |

---

> **Questions? Want user stories or example flows next?**
