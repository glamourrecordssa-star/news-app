# Creative Portal South Africa

A responsive culture-news landing page with:

- Breaking News auto-scrolling ticker
- Hero story slider with previous/next controls
- Latest News side rail
- Creative Pulse story cards
- Mobile-friendly layout

## Project Structure

- `index.html` - Creative Portal page structure
- `styles.css` - custom visual style, ticker animation, and responsive rules
- `app.js` - slider, ticker, and story rendering logic

## Run Locally

This project uses plain HTML/CSS/JavaScript, so no install step is required.

1. Open `index.html` in your browser.
2. Or run a simple local server from this folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Customize Content

Update the arrays in `app.js` to change homepage content:

- `breakingNewsItems`
- `heroSlides`
- `latestNews`
- `pulseStories`
