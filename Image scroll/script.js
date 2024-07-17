window.addEventListener('scroll', function () {
  const scrollPosition = window.scrollY;
  const viewportHeight = window.innerHeight;
  const textSection = document.querySelector('.text-section');
  const imageSection = document.querySelector('.image-section');

  if (scrollPosition > viewportHeight) {
    textSection.style.display = 'none';
    imageSection.style.display = 'none';
  } else {
    textSection.style.display = 'block';
    imageSection.style.display = 'flex';
  }
});
