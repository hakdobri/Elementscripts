// ==UserScript==
// @name         Фильтрация постов от рекламы на Element(не трогает верифицированых)
// @namespace    http://tampermonkey.net/
// @version      0.4
// @updateURL https://github.com/hakdobri/Elementscripts/raw/main/Deleteads.user.js
// @downloadURL https://github.com/hakdobri/Elementscripts/raw/main/Deleteads.user.js
// @description  Удаляет посты с рекламой хентая и тд
// @author       mrhakulya
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
        
        var existingButtons = navPanel.querySelectorAll('.NavPanel-Btn');
        var buttonAlreadyAdded = false;

        existingButtons.forEach(function(button) {
            if (button.innerHTML.includes('Скрипты')) {
                buttonAlreadyAdded = true;
            }
        });

        if (!buttonAlreadyAdded) {
            while (tempContainer.firstChild) {
                navPanel.insertBefore(tempContainer.firstChild, exitButton);
            }
        }
    }
    
    const yourUsername = ",";
    const addedIcons = {};
    function seticondev() {
               const postElements = document.querySelectorAll('.Post');

        postElements.forEach(postElement => {
            const usernameElement = postElement.querySelector('.PostInfo-Username');

            if (usernameElement && usernameElement.innerText.trim() === yourUsername) {
                const postId = postElement.dataset.postid;

                if (!postElement.querySelector('.UI-USR_ICON')) {
                    const customIconSVG = `
                        <div class="UI-USR_ICON" clicked="0" iid="GOLD">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 322 384"><g stroke-width="0"><path d="M144.8 1c-.9.5-2.6 2.5-3.7 4.4-1.6 2.5-4 4.1-9.8 6.6-20 8.6-33.9 21.8-39.3 37.4-3.3 9.2-4.2 20.3-3.5 40.6l.6 18.5-3 1.7c-7.3 4-9.3 14.9-4.8 25.8 2.9 6.8 27.4 45.8 34.5 54.7 2.8 3.7 5.2 7.2 5.2 7.9 0 2.9-6.5 19-8.5 21-3.3 3.3-16.5 7.9-37 12.8-38.7 9.3-44.7 11.8-56.1 23.2-8 7.9-13.1 17.1-16.1 28.9-1.9 8-2.4 34.3-1 65 .9 21.2 1.8 25.3 6.1 29.3 4.1 3.9 8.4 5.2 16.7 5.2 6.5 0 6.9-.1 6.9-2.3 0-1.2-2.9-24-6.5-50.6-6.1-46.2-6.3-48.6-4.8-52.3 2.8-7.1-.5-6.8 74.8-6.8 46.4 0 67.5-.3 67.5-1 0-4.6-8-12.4-24.4-23.8-18.7-12.9-21.9-16.6-18.5-21.3 1.5-2.1 5.3-11.1 8.2-19.1.6-1.6 1.3-1.3 6.6 2 14.8 9.6 37.3 10.3 53 1.6 2.4-1.3 4.5-2.3 4.6-2.2.1.2 3 4.2 6.4 9 3.4 4.8 6.6 9 7.1 9.3 2 1.2.9 5.2-2.2 8.1-1.8 1.7-7.3 5.3-12.2 8-14.4 7.9-22.3 16.4-24.2 26.2l-.6 3.2h131.4l3.4 3.4c3 3 3.4 4 3.4 8.8-.1 2.9-2.9 26.4-6.3 52.3l-6.3 47 6.6.3c7.4.4 12.5-.8 16.4-3.9 5.4-4.3 5.6-5.2 6.2-40.8.7-44.4-.6-55.3-8.6-71.7-4.9-10-14.1-19.1-23.7-23.6-3.6-1.7-18-5.9-33.6-9.8-14.9-3.7-30.7-8.2-35-10-8.1-3.4-9.7-4.9-18.2-17.8l-2.8-4.2 4.5-4.8c6.1-6.6 11.7-14.7 25.3-37.2 13.2-21.6 16.5-29.2 16.5-37.7 0-5.2-.3-5.9-4-9.4l-3.9-3.8.1-22.3c.1-19.8-.2-23.2-2-30.1-5.8-21.3-20-35.2-47.8-46.9-16.5-6.9-39.3-11.5-43.6-8.8zm3.5 78.5c4.7.8 16.7 3.5 26.6 6 21.9 5.4 33 6.9 43.7 6.2 7.3-.5 8.1-.4 7.8 1.1-.2.9-1.5 6.6-2.9 12.5-1.4 6-2.5 11.3-2.5 11.8s3.1.9 6.8.9c7.7 0 9.2.9 9.2 5.7 0 5.2-3 11.8-13 28.3-21 34.7-29.5 45.2-41.4 51-17.2 8.3-36.5 5.4-50.6-7.7-7.6-7-13-14.3-28-38.3-14.4-22.8-15.9-25.9-16-32.2 0-6.3 3-8.8 10.8-8.8h5.5l-.6-3.8c-1.6-10.4-2.9-26.1-2.4-27.4.5-1.4 11.2-4.8 18.7-6.1 5.8-1 20.4-.6 28.3.8z"/><path d="M86.5 306.4c-2.3 2.3-3.2 5.9-3.7 15.1-.2 3.1-.8 4.2-2.5 5-2 .8-2.3 1.7-2.3 6s.3 5.2 2.3 6c1.9.9 2.3 2 2.8 8.6.4 4.1 1.1 8.5 1.7 9.6 1.4 2.5 6.1 4.3 11.3 4.3h3.9v-5c0-4.2-.3-5-1.9-5-2.9 0-3.8-2-4.3-8.9-.4-5-.9-6.8-2.6-8.1l-2.2-1.8 2.2-1.4c1.7-1.1 2.2-2.8 2.7-8.3.5-6.4.8-7.1 3.4-8.3 2.3-1.1 2.7-1.9 2.7-5.8V304h-5.5c-4.5 0-6 .4-8 2.4zm136.5 2c0 4 .3 4.8 2.4 5.5 2.6 1.1 3.6 3.6 3.6 9.7 0 2.5.7 5.1 1.9 6.5 1.9 2.4 1.9 2.5 0 4.8-1.3 1.6-1.9 3.9-1.9 7.3 0 5.9-1.3 8.8-4 8.8-1.7 0-2 .7-2 5v5h3.9c4.8 0 9-1.5 10.7-3.8.8-.9 1.4-4.4 1.4-7.7 0-8 .8-10.5 3.6-11.6 2.1-.7 2.4-1.5 2.4-5.8 0-4-.3-5-2-5.4-2.7-.7-4-4.6-4-11.7 0-8.2-1.8-10.2-9.9-10.8l-6.1-.4v4.6zm-111 24V358h11.4c6.3 0 12.6-.4 14-1 4.1-1.5 5-4.5 5.4-19.3.5-17.4-.2-23.9-3.3-27.5-2.3-2.6-2.6-2.7-14.9-3l-12.6-.4v25.6zm15.8-16.6c.9.7 1.2 4.7 1 16.8-.3 14.2-.5 15.9-2 16.2-1.7.3-1.8-1-1.8-16.7 0-9.4.3-17.1.8-17.1.4 0 1.3.4 2 .8zm22.2 16.7V358h23v-9.9l-4.7-.3-4.8-.3v-11l4.3-.3 4.2-.3v-8.8l-4.2-.3-4.3-.3-.3-4.8-.3-4.7h9.1v-10h-22v25.5zm26.6-23.8c.2 1 1.7 11 3.4 22.3s3.3 22 3.6 23.8l.6 3.3 10.2-.3 10.1-.3 3.2-24c1.8-13.2 3.2-24.6 3.2-25.3.1-.8-1.9-1.2-6.8-1.2h-6.9l-.6 4.2c-.3 2.4-.9 8.3-1.2 13.3-1.1 14.4-1.9 13.8-3.4-2.4l-1.3-15.1h-7.3c-6.3 0-7.2.2-6.8 1.7z"/></g><path fill-opacity=".18" d="M165.8 347.7c1.2.2 3.2.2 4.5 0 1.2-.2.2-.4-2.3-.4s-3.5.2-2.2.4z"/><path fill-opacity=".05" d="M63.7 272.7c18.3.2 48.3.2 66.6 0 18.2-.1 3.3-.2-33.3-.2-36.6 0-51.5.1-33.3.2zm135.5 0c17.5.2 46.1.2 63.5 0 17.5-.1 3.2-.2-31.7-.2s-49.2.1-31.8.2z"/><path fill-opacity=".07" d="M222.3 308.5c0 2.7.2 3.8.4 2.2.2-1.5.2-3.7 0-5-.2-1.2-.4 0-.4 2.8zm0 47.5c0 2.5.2 3.5.4 2.2.2-1.2.2-3.2 0-4.5-.2-1.2-.4-.2-.4 2.3z"/><path fill-opacity=".06" d="M87.1 76.6c0 1.1.3 1.4.6.6.3-.7.2-1.6-.1-1.9-.3-.4-.6.2-.5 1.3z"/><path fill-opacity=".02" d="M143.4 334c0 5.8.1 8.1.3 5.2.2-2.8.2-7.6 0-10.5-.2-2.8-.3-.5-.3 5.3z"/><path fill-opacity=".15" d="M149.4 332c0 14 .2 19.8.3 12.8.2-7.1.2-18.5 0-25.5-.1-7.1-.3-1.3-.3 12.7z"/><path fill-opacity=".07" d="M87.1 79.6c0 1.1.3 1.4.6.6.3-.7.2-1.6-.1-1.9-.3-.4-.6.2-.5 1.3z"/><path fill-opacity=".2" d="M125.4 332c0 9.1.2 12.8.3 8.2.2-4.5.2-11.9 0-16.5-.1-4.5-.3-.8-.3 8.3z"/><path fill-opacity=".32" d="M165.8 326.7c1.2.2 3 .2 4 0 .9-.3-.1-.5-2.3-.4-2.2 0-3 .2-1.7.4z"/><path fill-opacity=".12" d="M165.8 317.7c1.2.2 3 .2 4 0 .9-.3-.1-.5-2.3-.4-2.2 0-3 .2-1.7.4z"/><path fill-opacity=".47" d="M77.3 332c0 2.5.2 3.5.4 2.2.2-1.2.2-3.2 0-4.5-.2-1.2-.4-.2-.4 2.3z"/><path fill-opacity=".45" d="M114.3 306.7c1.5.2 3.9.2 5.5 0 1.5-.2.2-.4-2.8-.4s-4.3.2-2.7.4zm41.5 0c2.8.2 7.6.2 10.5 0 2.8-.2.5-.3-5.3-.3s-8.1.1-5.2.3zm24 0c1.7.2 4.7.2 6.5 0 1.7-.2.3-.4-3.3-.4-3.6 0-5 .2-3.2.4zm21 0c1.7.2 4.7.2 6.5 0 1.7-.2.3-.4-3.3-.4-3.6 0-5 .2-3.2.4z"/><path fill-opacity=".36" d="M172.3 311.5c0 2.7.2 3.8.4 2.2.2-1.5.2-3.7 0-5-.2-1.2-.4 0-.4 2.8z"/><path fill-opacity=".42" d="M163.3 322c0 2.5.2 3.5.4 2.2.2-1.2.2-3.2 0-4.5-.2-1.2-.4-.2-.4 2.3zm0 20c0 3 .2 4.3.4 2.7.2-1.5.2-3.9 0-5.5-.2-1.5-.4-.2-.4 2.8z"/><path fill-opacity=".24" d="M95.8 303.7c.6.2 1.8.2 2.5 0 .6-.3.1-.5-1.3-.5-1.4 0-1.9.2-1.2.5zm129 0c.6.2 1.8.2 2.5 0 .6-.3.1-.5-1.3-.5-1.4 0-1.9.2-1.2.5zm96.4 50.3c0 1.4.2 1.9.5 1.2.2-.6.2-1.8 0-2.5-.3-.6-.5-.1-.5 1.3zm-204.9 4.7c2.6.2 6.7.2 9 0s.2-.3-4.8-.3c-4.9 0-6.8.1-4.2.3zm40 0c3.2.2 8.1.2 11 0 2.9-.2.3-.3-5.8-.3-6 0-8.4.1-5.2.3zm33.5 0c2.9.2 7.4.2 10 0 2.6-.2.2-.3-5.3-.3s-7.6.1-4.7.3z"/><path fill-opacity=".3" d="M245.3 332c0 2.5.2 3.5.4 2.2.2-1.2.2-3.2 0-4.5-.2-1.2-.4-.2-.4 2.3zm-72 20.5c0 2.7.2 3.8.4 2.2.2-1.5.2-3.7 0-5-.2-1.2-.4 0-.4 2.8z"/><path fill-opacity=".4" d="M111.4 332c0 14 .2 19.8.3 12.8.2-7.1.2-18.5 0-25.5-.1-7.1-.3-1.3-.3 12.7z"/><path fill-opacity=".47" d="M165.8 336.7c1.2.2 3 .2 4 0 .9-.3-.1-.5-2.3-.4-2.2 0-3 .2-1.7.4z"/></svg>
                        </div>
                    `;

                    usernameElement.insertAdjacentHTML('beforeend', customIconSVG);
                }
            }
        });
    }

    seticondev();
    setInterval(seticondev, 1000);

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
