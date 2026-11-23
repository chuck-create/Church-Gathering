# The Gathering app (app.gatheringtc.com)

The phone and desktop app for The Gathering. It shows your church's App page
(https://www.gatheringtc.com/app) full screen and handles notifications for it,
which the church website itself can't do. It holds no account data; signing in
happens on the App page.

- `index.html`: the app; opens the App page and asks about notifications
- `sw.js`: shows notifications and opens the right screen when one is tapped
- `manifest.webmanifest`: lets people install it (Add to Home Screen / Install app)
- `bible/index.html`: the free public Bible (read, search, reading plans, notes), open to anyone
- `CNAME`: serves it at app.gatheringtc.com (GitHub Pages)
