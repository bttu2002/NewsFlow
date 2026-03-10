You are a senior frontend engineer.

Create a complete modern News Website for me

2. API
Use the NewsAPI service.

Base URL:
https://newsapi.org/v2

Example endpoint:
https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY

Environment variable:
VITE_NEWS_API_KEY=MY_API_KEY

Create a reusable API service:
src/services/newsService.ts

Functions:
- getTopHeadlines()
- getCategoryNews(category)
- searchNews(keyword)

3. UI Design

Create a LIGHT THEME modern UI similar to a professional news portal.

Design style:
- clean
- minimal
- large typography
- card-based layout
- rounded corners
- soft shadows

Main colors:
- background: #f8f8f8
- text: #111
- accent: #ff4d4f

4. Layout Sections

Create the following sections:

1️⃣ Navbar
- logo "NEWS 24"
- menu: About, Economy, Style, Art, Agency
- search icon
- responsive hamburger menu

2️⃣ Hero Section
- big headline article
- 2 smaller side articles
- image overlay with title

3️⃣ Latest News Section
- list of articles
- image + title + description
- publish date
- responsive grid

4️⃣ Trending News
- sidebar list
- top 5 trending headlines

5️⃣ Staff Writers Section
- grid cards
- avatar
- name
- role

6️⃣ Popular Blogs
- 6 article cards
- image
- title
- reading time

7️⃣ Latest Podcast
- podcast cards
- image
- title
- "Listen Now"

8️⃣ Newsletter Subscription
- dark section
- email input
- subscribe button

9️⃣ Footer
- logo
- navigation links
- categories
- privacy policy
- social icons

5. Pages

Create pages:

/home
/category/:category
/article/:id
/search?q=

6. Components

Organize components like this:

src/
 components/
   Navbar
   HeroNews
   NewsCard
   NewsList
   TrendingSidebar
   StaffWriters
   BlogSection
   PodcastSection
   Newsletter
   Footer

 pages/
   Home
   CategoryPage
   ArticlePage
   SearchPage

 services/
   newsService.ts

7. Features

- fetch news from NewsAPI
- loading skeleton
- error handling
- search news
- filter by category
- responsive layout

8. Responsive Design

Mobile first.

Breakpoints:
- mobile
- tablet
- desktop

Use grid system.

9. Bonus Features

- infinite scroll
- dark mode toggle
- skeleton loading
- article detail page

10. Deliverables

Generate:

- full project structure
- all React components
- API service
- routing setup
- responsive CSS
- example .env file

The UI should look similar to a modern news portal with large hero news and card-based sections like TechCrunch or Medium.