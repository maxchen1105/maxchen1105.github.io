---
layout: default
title: Home
permalink: /
---

<div class="portfolio-home">
  <section class="hero" aria-labelledby="intro-title">
    <div class="hero-copy">
      <p class="discipline">Mathematics <span aria-hidden="true">·</span> Computer science</p>
      <h1 id="intro-title">Hi, I’m <em>Max.</em></h1>
      <p class="hero-description">I’m a student exploring the mathematics behind machine learning. I like understanding how models work and implementing algorithms from scratch.</p>
      <div class="hero-links">
        <a class="primary-link" href="{{ '/blogs/' | relative_url }}">Read my writing</a>
        <a class="quiet-link" href="https://github.com/maxchen1105">GitHub</a>
      </div>
    </div>
    <figure class="math-figure">
      <img src="{{ '/assets/descent.webp' | relative_url }}" width="1320" height="780" alt="A sequence of gradient descent steps zigzags across elliptical contours and converges on the minimum." fetchpriority="high">
      <figcaption>
        <span>Gradient descent</span>
        <span class="figure-equation"><i>f</i>(<i>x</i>, <i>y</i>) = <i>x</i>² − 2<i>xy</i> + 3<i>y</i>²</span>
      </figcaption>
    </figure>
  </section>

  <section class="home-section" aria-labelledby="interests-title">
    <h2 id="interests-title">What I’m exploring</h2>
    <div class="interest-grid">
      <article class="interest">
        <span class="topic-art topic-art-ml" aria-hidden="true"></span>
        <div>
          <h3>Machine learning</h3>
          <p>Neural networks, representation learning, and the mathematics behind deep learning models.</p>
        </div>
      </article>
      <article class="interest">
        <span class="topic-art topic-art-math" aria-hidden="true"></span>
        <div>
          <h3>Mathematics &amp; algorithms</h3>
          <p>Optimization, algorithm design, and competitive programming.</p>
        </div>
      </article>
    </div>
  </section>

  {% if site.posts.size > 0 %}
  <section class="home-section" aria-labelledby="writing-title">
    <div class="section-heading">
      <h2 id="writing-title">Recent writing</h2>
      <a class="quiet-link" href="{{ '/blogs/' | relative_url }}">All posts</a>
    </div>
    <ul class="recent-posts" role="list">
      {% for post in site.posts limit:3 %}
      <li>
        <time class="post-meta" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%b %-d, %Y' }}</time>
        <div>
          <h3><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h3>
          <p>{{ post.excerpt | strip_html | truncatewords: 28 | escape }}</p>
        </div>
      </li>
      {% endfor %}
    </ul>
  </section>
  {% endif %}

  <section class="online-section" aria-labelledby="contact-title">
    <h2 id="contact-title">Find me online</h2>
    <p>My code lives on <a class="quiet-link" href="https://github.com/maxchen1105">github.com/maxchen1105</a>.</p>
  </section>
</div>
