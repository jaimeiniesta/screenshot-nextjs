# Screenshot · NextJS · Vercel

This is an example of a simple script to take screenshots using puppeteer, hosted in Vercel.

## Development Setup

You'll need a local chromium which you can get as explained [in the chromium-min readme](https://www.npmjs.com/package/@sparticuz/chromium-min#user-content-running-locally--headlessheadful-mode).

Once you have downloaded chromium, set an ENV variable to define the path where it's located. Take the `.env.local.example` file, save it as `.env.local` and edit the path.

Run `npm install` to install the dependencies, and then you can run the server with `npm run dev`

Visit http://localhost:3000/api/screenshot?url=http://example.com and you'll get your first screenshot.

Optionally, add the `w` and `h` parameters to set the width and height of the viewport:

http://localhost:3000/api/screenshot?url=http://example.com&w=320&h=240

## Host in Vercel

This project runs in Vercel out of the box.
