---
title: "Building My Portfolio"
excerpt: "Secret sauce behind this project and the tech stack used"
date: "2025-02-12T20:54:02Z"
author: "Aung Min Khant"
tags:
  - Programming
---

![Cover image](/assets/blog/building-my-portfolio/cover.jpg)

### The Tech Stack

This website is built with [Next.js](https://nextjs.org/) and the blog posts are written entirely in [markdown](https://en.wikipedia.org/wiki/Markdown) files that are stored server-side. The markdown files are then retrieved and parsed to HTML before they are rendered.

For styling, I'm using [Neobrutalism](https://www.neobrutalism.dev/)-themed [shadcn/ui](https://ui.shadcn.com/) components with [Tailwind CSS](https://tailwindcss.com/).

Initially this project was written in Javascript. But since then, I've refactored it entirely into Typescript in account of project growth and a better developer experience. In retrospect, I would say that was a great choice and it finally made me learn Typescript.

![Building my Portfolio Step One](/assets/blog/building-my-portfolio/step-1.png)

![Building my Portfolio Step Two](/assets/blog/building-my-portfolio/step-2.png)

As for dark mode, we define CSS variables for colors in both light and dark modes. A click on the dark mode button will toggle the data-theme="dark"attribute in the html tag and color shift happen depending on the attribute.

It's difficult to style a neobrutalism-themed website in dark mode.
