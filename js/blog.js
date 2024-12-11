document.addEventListener("DOMContentLoaded", function() {
    // 页面加载时，默认选中 "all" 排序并为其添加下划线
    setActiveButton('sort-all');
    
    const dataFiles = ['./data/2024.json', './data/2025.json']; // 可扩展的文件列表
    const posts = [];
    const postsContainer = document.getElementById('posts-container');
    const gridContainer = postsContainer.querySelector('.grid');

    // 使用fetch加载所有JSON文件
    Promise.all(dataFiles.map(file => fetch(file).then(response => response.json())))
        .then(results => {
            // 将所有结果合并到posts数组中
            results.forEach(data => {
                posts.push(...data.posts);
            });

            // 默认按照时间排序（日期最近的排在前面）
            posts.sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO));

            // 显示所有文章
            displayPosts(posts);

            // 绑定排序按钮
            document.getElementById('sort-all').addEventListener('click', () => {
                setActiveButton('sort-all');
                displayPosts(posts);
            });

            document.getElementById('sort-life').addEventListener('click', () => {
                setActiveButton('sort-life');
                displayPosts(posts.filter(post => post.tag === 'life'));
            });

            document.getElementById('sort-dev').addEventListener('click', () => {
                setActiveButton('sort-dev');
                displayPosts(posts.filter(post => post.tag === 'notes'));
            });
        })
        .catch(error => {
            console.error('Error loading blog data:', error);
            document.getElementById('blog-count').textContent = 'Failed to load blog data.';
        });

    // 用于显示文章的函数
    function displayPosts(postsToDisplay) {
        // 清空现有内容
        gridContainer.innerHTML = '';

        // 动态生成文章内容
        postsToDisplay.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('bg-white', 'shadow-lg', 'rounded-lg', 'transform', 'transition-transform', 'hover:scale-105', 'p-4', 'text-sm');

            const imgElement = document.createElement('img');
            imgElement.src = post.content[0].src;
            imgElement.alt = post.content[0].alt;
            imgElement.classList.add('w-full', 'h-40', 'object-cover', 'rounded-t-lg');

            const titleElement = document.createElement('h1');
            titleElement.classList.add('text-xl', 'text-gray-700', 'mt-2', 'truncate');
            titleElement.textContent = post.title;

            const infoContainer = document.createElement('div');
            infoContainer.classList.add('flex', 'items-center', 'mt-2', 'text-gray-500');
            const icon = document.createElement('img');
            icon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAUVJREFUaEPtmTESgkAMRcPN4C6UlGortGK55d5FboaiMIMObJKNEBhCS5bk/W8W3CSw8yvZef1gANoORjuQF+d2XLx3NetZ0vVDblbSccHSAqTrDUCqoHQ9yYG8OKUAybUPTtdv2KTy7laG8gZ74Fel9QGGjG3m3b2Zyj8LkBeXEqAd1Ner/ZO58a7OmADf26Qywe4BYO49E/gJbcoBA1BuAZA7wP3WkRJTX3TkHjAApiXmAFUBprDkcGr+4/YAptDS99HP6aULkD7fAKQKSteLHSBvJ5GBGKABRApLXmYOYApo3xf3gAEgZ6uYQOYAeTuJDFzcgci6yMsMgKoAWVJmIDX/cf/QMAVlh//DgcfrVFhhJjDNGnM2uiGA+UFHoAfe05kOQv0KHaqhU0rFQUc/kWmruelMpywKoC4/UoABaDu0eweeQ657QJqJTRAAAAAASUVORK5CYII=";
            icon.alt = "calendar icon";
            icon.classList.add('w-4', 'h-4', 'mr-2');
            const dateElement = document.createElement('p');
            dateElement.textContent = post.date;

            infoContainer.appendChild(icon);
            infoContainer.appendChild(dateElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.classList.add('text-gray-600', 'mt-2', 'break-words');
            descriptionElement.textContent = post.description;

            postElement.appendChild(imgElement);
            postElement.appendChild(titleElement);
            postElement.appendChild(infoContainer);
            postElement.appendChild(descriptionElement);

            gridContainer.appendChild(postElement);
        });
    }

    // 设置活动按钮并移除其他按钮的下划线
    function setActiveButton(activeId) {
        const sortButtons = document.querySelectorAll('.sort-button');
        
        // 先移除所有按钮的下划线
        sortButtons.forEach(button => {
            button.classList.remove('border-b-2', 'border-black', 'pb-1');
        });

        // 为当前选中的按钮添加下划线
        const activeButton = document.getElementById(activeId);
        activeButton.classList.add('border-b-2', 'border-black', 'pb-1');
    }
});
