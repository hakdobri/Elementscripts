// ==UserScript==
// @name         MakeURLs Element
// @namespace    http://tampermonkey.net/
// @version      0.1
// @updateURL https://github.com/hakdobri/Elementscripts/raw/main/makeurls.user.js
// @downloadURL https://github.com/hakdobri/Elementscripts/raw/main/makeurls.user.js
// @description  Делает ссылки кликабельными
// @author       markusha and mrhakulya
// @match        https://element.xaromie.fun/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var newButtonHTML = '<a href="https://diurl.site" target="_blank"><button class="NavPanel-Btn">Скрипты</button></a><div style="height: 5px;"></div>';
    var navPanel = document.querySelector('.NavPanel');
    if (navPanel) {
        var tempContainer = document.createElement('div');
        tempContainer.innerHTML = newButtonHTML;
        var exitButton = navPanel.querySelector('a[href="/выход"]');
        while (tempContainer.firstChild) {
            navPanel.insertBefore(tempContainer.firstChild, exitButton);
        }
    }
    
    const processedPosts = new Set();

    function makeurls(post) {
        const postHTML = post.innerHTML;
        const replacedHTML = postHTML.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" style="text-decoration: underline; color: #ccc;" target="_blank">$1</a>');
        post.innerHTML = replacedHTML;
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
