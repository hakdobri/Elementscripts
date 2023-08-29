// ==UserScript==
// @name         Фильтрация постов от рекламы на Element(не трогает верифицированых)
// @namespace    http://tampermonkey.net/
// @version      0.3
// @updateURL https://github.com/hakdobri/Elementscripts/raw/main/Deleteads.user.js
// @downloadURL https://github.com/hakdobri/Elementscripts/raw/main/Deleteads.user.js
// @description  Удаляет посты с рекламой хентая и тд
// @author       mrhakulya
// @match        https://element.xaromie.fun/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const prohibitedKeywords = ['https://t.me', 'хентай', 'Хента', 't.me', 'hent', 'hentai', 'http://bit.ly', 'bit.ly', '.ru', '.ly', '.com', '.co', 'https', 'http', '.рф', '.xn--p1ai', '.xn--80adxhks', '.top','.toр','.xyz','.хуз', '.хyз', 'xуz', 'xyз', '.club', '.cluв', '.сом', '.xn--80aswg', 'hеntai', 'hеntaі', 't。me', 'bit。ly'];
    let loggedUsernames = [];

    function hidePosts() {
        const debugInfoTitle = document.querySelector('.DebugInfo-Title').nextSibling.textContent;
        const usernameMatch = debugInfoTitle.match(/\[Username\] => (.+)/);
        const currentUser = usernameMatch ? usernameMatch[1].trim() : '';
        const posts = document.querySelectorAll('.Post');
        posts.forEach(post => {
            const postText = post.querySelector('.PostText');
            const usernameElement = post.querySelector('.PostInfo-Username');
            const verifyIcon = post.querySelector('.UI-USR_ICON[iid="VERIFY"]');
            const altnodesIcon = post.querySelector('.UI-USR_ICON[iid="AN"]');
            // if (usernameElement == ",") {}
            if (postText && usernameElement && !verifyIcon && !altnodesIcon && usernameElement != "Element News" && usernameElement != ",") {
                const textContent = postText.textContent.toLowerCase();
                const username = usernameElement.textContent.trim();
                if (username != currentUser) {
                    if (prohibitedKeywords.some(keyword => textContent.includes(keyword.toLowerCase()))) {
                        if (!loggedUsernames.includes(username)) {
                            console.log(`Удален пост. Его автор: ${username}, текст: ${postText.textContent}`);
                            loggedUsernames.push(username);
                        }
                        post.style.display = 'none';
                    }
                }
            }
        });
    }

    hidePosts();

    setInterval(hidePosts, 1000);
})();
