# Monarka TECH — Website

Before implementing any non-trivial change, read the shared Monarka engineering rulebook at `D:\MONARKA\Monarka_AI_Rules\`, starting with `00_START_HERE.txt` for load order. It applies to all Monarka projects (this site, CATA app, etc.) and covers architecture, security, performance, testing, release, and token-optimization standards. Files are short plain text — read them fresh rather than relying on a summary.

This project is static HTML/CSS/JS (no build system, no framework), so apply the framework-agnostic rules directly; the frontend rule file assumes Expo/React Native and is written for the CATA mobile app, not this site — treat its principles (accessibility, dark mode, no hardcoded text, loading/error/empty states) as applicable even where the stack specifics don't match.

Also read `AI_COLLABORATION.md` in this repo's root before starting work — it's the shared task board and coordination log between Codex, Claude, and Rubén.
