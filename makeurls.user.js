// ==UserScript==
// @name         MakeURLs Element
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Делает ссылки кликабельными
// @author       markusha and mrhakulya
// @match        https://element.xaromie.fun/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const processedPosts = new Set();

    function makeurls(post) {
        const postHTML = post.innerHTML;
        const replacedHTML = postHTML.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" style="text-decoration: underline; color: #ccc;" target="_blank">$1</a>');
        post.innerHTML = replacedHTML;
        console.log("Сделана ссылка кликабельной");
    }

    function processNewPosts() {
        const posts = document.querySelectorAll('.PostText');

        posts.forEach(post => {
            if (!processedPosts.has(post)) {
                makeurls(post);
                processedPosts.add(post);
            }
        });
    }

    processNewPosts();
    setInterval(processNewPosts, 1000);

})();
