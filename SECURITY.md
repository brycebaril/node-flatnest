# Security Policy

## Reporting a Vulnerability

If you believe you have found a security vulnerability in this package, please report it responsibly.

**Preferred method:** Use GitHub's private vulnerability reporting so we can coordinate a fix and a CVE/advisory if warranted:

> **Security → Report a vulnerability** on the repository, or
> https://github.com/brycebaril/node-flatnest/security/advisories/new

**Alternatively,** email the maintainer directly: bryce.baril@gmail.com

Please do **not** open a public issue for a suspected vulnerability. Include as much detail as you can — especially a minimal reproduction — and a suggested patch if you have one.

## Scope

- `flatten(obj)` / `nest(obj)` / `seek(obj, path)` — anything reachable by untrusted input.
- Prototype-pollution vectors (e.g. keys like `__proto__`, `constructor`, `prototype`) are in scope and treated as vulnerabilities.

## Disclosure expectations

- You'll receive an acknowledgment within a few days.
- We'll work with you toward a fix and a coordinated disclosure (CVE/GHSA) where appropriate.
- Credit will be given to the reporter unless you ask to remain anonymous.