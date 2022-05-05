const cutText = (text) => {
  if (text.split('').length > 140) {
    return text.split('').slice(0, 140).join('') + '...';
  }
  return text;
};

const cutTitle = (text) => {
  if (text.length > 30) {
    return text.split('').slice(0, 30).join('') + '...';
  }
  return text;
};

const getImg = (path) => {
  if (!path) {
    return 'http://s1.iconbird.com/ico/2013/9/430/w256h2561378622483catsleep2.png';
  }
  if (window.screen.width < 1010) {
    return `https://image.tmdb.org/t/p/w92${path}`;
  }
  return `https://image.tmdb.org/t/p/w185${path}`;
};

export { cutText, cutTitle, getImg };
