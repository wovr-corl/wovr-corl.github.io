const scrollButton = document.getElementById('scrollToTopButton');
const bibtexButton = document.getElementById('copyBibtexButton');
const bibtexCode = document.getElementById('bibtex-code');

function updateScrollButton() {
  if (!scrollButton) {
    return;
  }

  if (window.scrollY > 320) {
    scrollButton.classList.add('visible');
  } else {
    scrollButton.classList.remove('visible');
  }
}

function copyBibtex() {
  if (!bibtexButton || !bibtexCode) {
    return;
  }

  const code = bibtexCode.textContent;
  const copyText = bibtexButton.querySelector('.copy-text');

  navigator.clipboard.writeText(code).then(() => {
    bibtexButton.classList.add('copied');
    if (copyText) {
      copyText.textContent = 'Copied';
    }

    window.setTimeout(() => {
      bibtexButton.classList.remove('copied');
      if (copyText) {
        copyText.textContent = 'Copy';
      }
    }, 1800);
  }).catch(() => {
    const temp = document.createElement('textarea');
    temp.value = code;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);

    bibtexButton.classList.add('copied');
    if (copyText) {
      copyText.textContent = 'Copied';
    }

    window.setTimeout(() => {
      bibtexButton.classList.remove('copied');
      if (copyText) {
        copyText.textContent = 'Copy';
      }
    }, 1800);
  });
}

if (scrollButton) {
  scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (bibtexButton) {
  bibtexButton.addEventListener('click', copyBibtex);
}

window.addEventListener('scroll', updateScrollButton, { passive: true });
window.addEventListener('load', updateScrollButton);
