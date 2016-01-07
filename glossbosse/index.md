---
layout: page
randomHeader: true
title: Übersicht aller Glossbosse
subtitle: und deren Beiträge
---
{% for a in site.data.glossbosse %}<span data-authorToggle="{{a.name}}" class="secondary_btn">{{a.name}}</span>
{% endfor %}
<ul>
{% for post in site.posts %}
  <li data-author="{{post.author}}"><a href="{{post.url}}">{{post.title}}</a></li>
{% endfor %}
</ul>
