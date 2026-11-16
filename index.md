---
layout: page
title: Introduction
permalink: /
---
<div class="portfolio-home">
  <section class="hero" aria-labelledby="intro-title">
    <p class="eyebrow">Mathematics · Computer Science · Machine Learning</p>
    <h1 id="intro-title">Hi, I'm Max.</h1>
    <p class="hero-description">I'm a student exploring the mathematical foundations of AI, understanding deep learning models, and implementing algorithms from scratch.</p>
    <div class="hero-links">
      <a class="button" href="{{ '/blogs/' | relative_url }}">Read my writing <span aria-hidden="true">→</span></a>
      <a class="text-link" href="https://github.com/maxchen1105">GitHub <span aria-hidden="true">↗</span></a>
    </div>
  </section>  <section class="home-section" aria-labelledby="interests-title">
    <h2 id="interests-title">What I'm exploring</h2>
    <div class="focus-grid">
      <article class="focus-card">
        <p class="eyebrow">Learning &amp; experiments</p>
        <h3>Machine learning</h3>
        <p>Neural networks, representation learning, and the mathematics behind deep learning models.</p>
      </article>
      <article class="focus-card">
        <p class="eyebrow">Theory &amp; problem solving</p>
        <h3>Mathematics &amp; algorithms</h3>
        <p>Optimization, algorithm design, and competitive programming.</p>
      </article>
    </div>
  </section>  {% if site.posts.size > 0 %}
  <section class="home-section" aria-labelledby="writing-title">
    <div class="section-heading">
      <h2 id="writing-title">Recent writing</h2>
      <a href="{{ '/blogs/' | relative_url }}">All posts <span aria-hidden="true">→</span></a>
    </div>
    <div class="writing-list">
      {% for post in site.posts limit:3 %}
      <article class="writing-item">
        <time class="post-meta" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h3>
        <p>{{ post.excerpt | strip_html | truncatewords: 28 | escape }}</p>
      </article>
      {% endfor %}
    </div>
  </section>
  {% endif %}  <section class="home-section contact-section" aria-labelledby="contact-title">
    <h2 id="contact-title">Find me online</h2>
    <p>You can find my code and follow what I'm working on at <a href="https://github.com/maxchen1105">github.com/maxchen1105</a>.</p>
  </section>
</div>
