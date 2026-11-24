const header = document.querySelector('header');
const links = Array.from(header.querySelectorAll('nav a'));
const sections = links.map(link => document.getElementById(link.hash.slice(1)));

function markCurrentSection() {
  const headerBottom = header.getBoundingClientRect().bottom;
  let current = sections.filter(section => section.getBoundingClientRect().top <= headerBottom + 2).pop();

  // The last two headings can share the viewport when the page reaches its end.
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    const target = sections.find(section => '#' + section.id === location.hash);
    current = target && target.getBoundingClientRect().top >= headerBottom - 2
      ? target : sections[sections.length - 1];
  }
  links.forEach((link, index) => {
    if (sections[index] === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

function measureHeader() {
  document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
  markCurrentSection();
}

measureHeader();
new ResizeObserver(measureHeader).observe(header);
window.addEventListener('scroll', markCurrentSection, { passive: true });
window.addEventListener('hashchange', markCurrentSection);
window.addEventListener('pageshow', markCurrentSection);
