document.addEventListener("DOMContentLoaded", function () {
    const selectedPostJSON = localStorage.getItem('selectedPost');
    if (!selectedPostJSON) {
        console.error('No selectedPost data found in localStorage');
        return;
    }

    const selectedPost = JSON.parse(selectedPostJSON);
    if (!selectedPost.id || !selectedPost.fileYear) {
        console.error('Invalid selectedPost data:', selectedPost);
        return;
    }

    const { id, fileYear } = selectedPost;

    const dataFile = `./data/${selectedPost.fileYear}.json`;
    fetch(dataFile)
        .then(response => response.json())
        .then(data => {
            const post = data.posts.find(post => post.id == id);
            if (!post) {
                console.error('Post not found in data file:', data.posts);
                return;
            }
            displayPostDetails(post);
        })
        .catch(error => {
            console.error('Error loading post details:', error);
        });
});

function displayPostDetails(post) {
    const section = document.querySelector('main section');
    if (!section) {
        console.error('Section element not found');
        return;
    }

    section.classList.add('mx-auto', 'w-full', 'sm:w-4/5', 'md:w-3/4', 'lg:w-1/2', 'p-4');

    const titleElement = document.createElement('h1');
    titleElement.textContent = post.title;
    titleElement.classList.add('text-gray-700', 'text-3xl', 'font-bold', 'mb-4');
    section.appendChild(titleElement);

    const dateAndBackContainer = document.createElement('div');
    dateAndBackContainer.classList.add('flex', 'justify-between', 'items-center', 'mb-6', 'text-gray-600');

    const dateContainer = document.createElement('div');
    dateContainer.classList.add('flex', 'items-center');

    const icon = document.createElement('img');
    icon.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAUVJREFUaEPtmTESgkAMRcPN4C6UlGortGK55d5FboaiMIMObJKNEBhCS5bk/W8W3CSw8yvZef1gANoORjuQF+d2XLx3NetZ0vVDblbSccHSAqTrDUCqoHQ9yYG8OKUAybUPTtdv2KTy7laG8gZ74Fel9QGGjG3m3b2Zyj8LkBeXEqAd1Ner/ZO58a7OmADf26Qywe4BYO49E/gJbcoBA1BuAZA7wP3WkRJTX3TkHjAApiXmAFUBprDkcGr+4/YAptDS99HP6aULkD7fAKQKSteLHSBvJ5GBGKABRApLXmYOYApo3xf3gAEgZ6uYQOYAeTuJDFzcgci6yMsMgKoAWVJmIDX/cf/QMAVlh//DgcfrVFhhJjDNGnM2uiGA+UFHoAfe05kOQv0KHaqhU0rFQUc/kWmruelMpywKoC4/UoABaDu0eweeQ657QJqJTRAAAAAASUVORK5CYII=";
    icon.alt = "calendar icon";
    icon.classList.add('w-4', 'h-4', 'mr-2');

    const dateElement = document.createElement('p');
    dateElement.textContent = post.date;

    dateContainer.appendChild(icon);
    dateContainer.appendChild(dateElement);

    const backLink = document.createElement('a');
    backLink.textContent = "Back to previous page";
    backLink.href = "javascript:history.back()";
    backLink.classList.add('text-gray-700', 'border-b-2', 'hover:text-gray-900');

    dateAndBackContainer.appendChild(dateContainer);
    dateAndBackContainer.appendChild(backLink);
    section.appendChild(dateAndBackContainer);

    const descriptionElement = document.createElement('blockquote');
    descriptionElement.textContent = post.description;
    descriptionElement.classList.add(
        'border-l-4',
        'border-gray-500',
        'pl-4',
        'italic',
        'text-gray-600',
        'bg-gray-100',
        'p-4',
        'rounded-md',
        'mb-6'
    );
    section.appendChild(descriptionElement);

    post.content.forEach((item) => {
        if (item.type === "text") {
            const textElement = document.createElement("p");
            textElement.textContent = item.content;
            textElement.classList.add("text-gray-800", "mb-4", "leading-relaxed");
            section.appendChild(textElement);
        } else if (item.type === "image") {
            const imgContainer = document.createElement("div");
            imgContainer.classList.add("flex", "justify-center", "mb-6");

            const imgElement = document.createElement("img");
            imgElement.src = item.src;
            imgElement.alt = item.alt;
            imgElement.classList.add("rounded-lg", "shadow-md", "max-w-full", "w-full", "sm:w-3/5");
            imgContainer.appendChild(imgElement);

            section.appendChild(imgContainer);
        }
    });
}
