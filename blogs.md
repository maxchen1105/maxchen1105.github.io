---
layout: default
title: Blogs
permalink: /blogs/
---

<section class="blog-archive" aria-labelledby="blog-heading">
  <header class="blog-archive-header">
    <h1 id="blog-heading">Blog</h1>
    <p>Notes on mathematics, code, and machine learning.</p>
  </header>

  <div class="blog-archive-layout">
    <aside class="blog-legend" aria-label="Post categories">
      <ul role="list">
        <li><span class="blog-swatch blog-swatch--technical" aria-hidden="true"></span>Technical</li>
        <li><span class="blog-swatch blog-swatch--reflection" aria-hidden="true"></span>Reflection</li>
        <li><span class="blog-swatch blog-swatch--article" aria-hidden="true"></span>Article</li>
      </ul>
    </aside>
    {% if site.posts.size > 0 %}
    <ul class="blog-posts" role="list">
      {% assign sorted_posts = site.posts | sort: 'date' | reverse %}
      {% for post in sorted_posts %}
      {% assign post_type = post.blog_type | default: post.category | default: post.categories.first | default: 'technical' | downcase %}
      {% case post_type %}
        {% when 'reflection' %}{% assign post_type = 'reflection' %}
        {% when 'article' %}{% assign post_type = 'article' %}
        {% else %}{% assign post_type = 'technical' %}
      {% endcase %}
      <li class="blog-post blog-post--{{ post_type }}">
        <time class="blog-post-date" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%m-%d-%Y' }}</time>
        <div class="blog-post-detail">
          <a class="blog-post-title" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
          <span class="blog-post-kind">{{ post_type | capitalize }}</span>
        </div>
      </li>
      {% endfor %}
    </ul>
    {% else %}
    <div class="blog-empty">
      <p>No posts yet.</p>
      <a href="https://github.com/maxchen1105">Find my code on GitHub</a>
    </div>
    {% endif %}
  </div>
</section>
