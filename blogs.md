---
layout: page
title: Blogs
permalink: /blogs/
---
<div class="writing-page">
  <header class="page-intro">
    <p class="eyebrow">Notes &amp; experiments</p>
    <h1>Writing</h1>
    <p class="page-description">Exploring the mathematics, algorithms, and ideas behind machine learning.</p>
  </header>  {% if site.posts.size > 0 %}
  <div class="writing-list">
    {% for post in site.posts %}
    <article class="writing-item">
      <time class="post-meta" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h2>
      <p>{{ post.excerpt | strip_html | truncatewords: 35 | escape }}</p>
    </article>
    {% endfor %}
  </div>
  {% else %}
  <div class="empty-state">
    <h2>More to come</h2>
    <p>Notes, implementations, and experiments will appear here as I publish them.</p>
    <a href="https://github.com/maxchen1105">Explore my GitHub <span aria-hidden="true">↗</span></a>
  </div>
  {% endif %}
</div>
