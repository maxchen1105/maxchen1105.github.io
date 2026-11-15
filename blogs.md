---
layout: page
title: Blogs
permalink: /blogs/
---

# Machine Learning Blog

Welcome to my blog!

I write about the mathematics, algorithms,
and ideas behind machine learning.

My posts include mathematical derivations,
implementations, paper reviews, and experiments.

---

## All Posts

{% for post in site.posts %}
### [{{ post.title }}]({{ post.url | relative_url }})

{{ post.date | date: "%B %d, %Y" }}

{{ post.excerpt | strip_html | truncatewords: 35 }}

---

{% endfor %}
