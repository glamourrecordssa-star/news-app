# ArtBeat Activities

A clean, responsive arts-activities website with:

- Activity type filter chips
- Instant activity search
- Animated activity cards
- Mobile-friendly layout
- Artist self-registration and posting
- Post preview before publish
- Super admin moderation for artist posts

## Project Structure

- `index.html` - page layout and semantic sections
- `styles.css` - visual style, animations, and responsive behavior
- `app.js` - sample activity data, filtering, and search logic

## Run Locally

This project uses plain HTML/CSS/JavaScript, so no install step is required.

1. Open `index.html` in your browser.
2. Or run a simple local server from this folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Customize Content

Edit the `stories` array in `app.js` and replace the sample data with your own arts activities and event details.

## Artist Posting and Super Admin

- Open the Artist Hub section to register and create an activity post.
- Select `Preview Post` to see how your post card will look before publishing.
- Select `Register & Publish` to save the artist profile and post.
- Super admin can login and moderate posts (delete single posts or clear all).

Default super admin credentials:

- Username: `superadmin`
- Password: `ArtBeat@2026`
