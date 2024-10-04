export const renderPhotos = photos => {
  return photos.hits
    .map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
      return `<li class="photo inactive">
      <a href="${largeImageURL}">
        <img
        src="${webformatURL}" 
        alt="${tags}" 
        width="360" 
        height="152">
      </a>
      <ul class="list-value">
        <li class="list-item">
          <p class="title">Likes</p>
          <p class="value">${likes}</p>
        </li>
        <li class="list-item">
          <p class="title">Views</p>
          <p class="value">${views}</p>
        </li>
        <li class="list-item">
          <p class="title">Comments</p>
          <p class="value">${comments}</p>
        </li>
        <li class="list-item">
          <p class="title">Downloads</p>
          <p class="value">${downloads}</p>
        </li>
      </ul>
      </li>`;
    })
    .join('');
};
