// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
updateDarkModeButton(currentTheme);

darkModeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateDarkModeButton(newTheme);
});

function updateDarkModeButton(theme) {
    const icon = darkModeToggle.querySelector('i');
    const text = darkModeToggle.querySelector('span');
    
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        text.textContent = 'Светлая тема';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        text.textContent = 'Темная тема';
    }
}

// Search Functionality
const searchInput = document.getElementById('searchInput');
const transcript = document.querySelector('.transcript');
let originalContent = transcript.innerHTML;

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        transcript.innerHTML = originalContent;
        return;
    }
    
    // Reset to original content
    transcript.innerHTML = originalContent;
    
    // Find and highlight matches
    const sections = transcript.querySelectorAll('.section');
    let matchCount = 0;
    
    sections.forEach(section => {
        const textContent = section.textContent.toLowerCase();
        
        if (textContent.includes(searchTerm)) {
            matchCount++;
            highlightText(section, searchTerm);
        }
    });
    
    // Scroll to first match
    if (matchCount > 0) {
        const firstMatch = transcript.querySelector('.highlight');
        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

function highlightText(element, searchTerm) {
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const nodesToReplace = [];
    let node;
    
    while (node = walker.nextNode()) {
        const text = node.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            nodesToReplace.push(node);
        }
    }
    
    nodesToReplace.forEach(node => {
        const parent = node.parentNode;
        if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') return;
        
        const text = node.textContent;
        const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
        const parts = text.split(regex);
        
        const fragment = document.createDocumentFragment();
        
        parts.forEach(part => {
            if (part.toLowerCase() === searchTerm.toLowerCase()) {
                const mark = document.createElement('mark');
                mark.className = 'highlight';
                mark.textContent = part;
                fragment.appendChild(mark);
            } else {
                fragment.appendChild(document.createTextNode(part));
            }
        });
        
        parent.replaceChild(fragment, node);
    });
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Clear search on Escape key
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchInput.value = '';
        transcript.innerHTML = originalContent;
    }
});

// Progress Bar
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
    progressBar.style.width = scrollPercentage + '%';
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for Navigation Links
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 160;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(l => l.style.fontWeight = 'normal');
            link.style.fontWeight = '600';
        }
    });
});

// Highlight active section in navigation
const sections = document.querySelectorAll('.section');
const navLinksArray = Array.from(navLinks);

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.style.fontWeight = 'normal';
        link.style.color = 'var(--text-secondary)';
        
        if (link.getAttribute('href') === '#' + current) {
            link.style.fontWeight = '600';
            link.style.color = 'var(--primary-color)';
        }
    });
});

// Print Button
const printBtn = document.getElementById('printBtn');

printBtn.addEventListener('click', () => {
    window.print();
});

// Share Button
const shareBtn = document.getElementById('shareBtn');

shareBtn.addEventListener('click', async () => {
    const shareData = {
        title: 'Контекстная инженерия для AI-агентов с LangChain и Manus',
        text: 'Подробный транскрипт вебинара о современных подходах к управлению контекстом в AI-агентах',
        url: window.location.href
    };
    
    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(window.location.href);
            alert('Ссылка скопирована в буфер обмена!');
        }
    } catch (err) {
        console.error('Error sharing:', err);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Ctrl/Cmd + D for dark mode toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        darkModeToggle.click();
    }
});

// Add keyboard shortcut hints
const searchBox = document.querySelector('.search-box');
const hintText = document.createElement('small');
hintText.style.position = 'absolute';
hintText.style.bottom = '-20px';
hintText.style.left = '0';
hintText.style.fontSize = '0.75rem';
hintText.style.color = 'var(--text-secondary)';
hintText.style.opacity = '0.7';
hintText.textContent = 'Ctrl/Cmd + K для поиска, Ctrl/Cmd + D для смены темы';
searchBox.style.position = 'relative';
searchBox.appendChild(hintText);

// Lazy load animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add copy button to code blocks
const codeBlocks = document.querySelectorAll('pre code');

codeBlocks.forEach(codeBlock => {
    const pre = codeBlock.parentElement;
    pre.style.position = 'relative';
    
    const copyBtn = document.createElement('button');
    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
    copyBtn.style.position = 'absolute';
    copyBtn.style.top = '0.5rem';
    copyBtn.style.right = '0.5rem';
    copyBtn.style.padding = '0.5rem';
    copyBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    copyBtn.style.border = 'none';
    copyBtn.style.borderRadius = '0.25rem';
    copyBtn.style.color = 'white';
    copyBtn.style.cursor = 'pointer';
    copyBtn.style.opacity = '0.7';
    copyBtn.style.transition = 'opacity 0.3s ease';
    
    copyBtn.addEventListener('mouseenter', () => {
        copyBtn.style.opacity = '1';
    });
    
    copyBtn.addEventListener('mouseleave', () => {
        copyBtn.style.opacity = '0.7';
    });
    
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(codeBlock.textContent);
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });
    
    pre.appendChild(copyBtn);
});

// Update original content after all modifications
setTimeout(() => {
    originalContent = transcript.innerHTML;
}, 1000);

// Console easter egg
console.log('%c🤖 Контекстная инженерия для AI-агентов', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cТранскрипт подготовлен Дмитрием Жечковым', 'font-size: 14px; color: #6b7280;');
console.log('%cTelegram: https://t.me/llm_notes', 'font-size: 12px; color: #7c3aed;');
console.log('%c\nИспользуйте клавиши:', 'font-size: 12px; font-weight: bold;');
console.log('- Ctrl/Cmd + K: Поиск');
console.log('- Ctrl/Cmd + D: Смена темы');
console.log('- Esc: Очистить поиск');
