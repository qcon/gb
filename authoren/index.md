---
layout: page
randomHeader: true
title: Authorenübersicht
---
<script>var authorenPage = true;</script>
{% for a in site.data.authoren %}<span data-authorToggle="{{a.name}}" class="secondary_btn">{{a.name}}</span>
{% endfor %}
<ul>
{% for post in site.posts %}
  <li data-author="{{post.author}}"><a href="{{post.url}}">{{post.title}}</a></li>
{% endfor %}
</ul>
