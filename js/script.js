document.addEventListener('DOMContentLoaded', () => {

  // === Определяем базовый путь ===
  const path = window.location.pathname;
  const inSubfolder = path.includes('/alphabet/') || path.includes('/articles/');
  const BASE = inSubfolder ? '../' : '';

  // === Загрузка шапки ===
  (async () => {
    // Создаём контейнер, если его нет
    if (!document.getElementById('headerContainer')) {
      const headerDiv = document.createElement('div');
      headerDiv.id = 'headerContainer';
      document.body.insertBefore(headerDiv, document.body.firstChild);
    }

    try {
      const response = await fetch(BASE + 'includes/header.html');
      if (!response.ok) throw new Error('Шапка не найдена');
      let text = await response.text();
      text = text.replace(/\{BASE\}/g, BASE);
      document.getElementById('headerContainer').innerHTML = text;
    } catch (e) {
      console.warn('Не удалось загрузить шапку:', e);
    }
  })();

  // === Загрузка футера ===
  (async () => {
    if (!document.getElementById('footerContainer')) {
      const footerDiv = document.createElement('div');
      footerDiv.id = 'footerContainer';
      document.body.appendChild(footerDiv);
    }

    try {
      const response = await fetch(BASE + 'includes/footer.html');
      if (!response.ok) throw new Error('Футер не найден');
      const text = await response.text();
      document.getElementById('footerContainer').innerHTML = text;
    } catch (e) {
      console.warn('Не удалось загрузить футер:', e);
    }
  })();

  // === Аккордеон (только если есть) ===
  const mainToggle = document.getElementById('alphabetToggle');
  if (mainToggle) {
    const lettersList = document.getElementById('lettersList');
    const arrowMain = mainToggle.querySelector('.arrow-main');
    const contentPlaceholder = document.getElementById('contentPlaceholder');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const moreLinkContainer = document.getElementById('moreLinkContainer');

    const letterData = {
      alef: {
        content: '<strong>Алеф (א)</strong> — первая буква еврейского алфавита. Наряду с буквой йод не имеет полноценного твёрдого звучания. Символизирует совместное творчество Бога и человека.',
        name: 'Алеф',
        page: 'alphabet/alef.html'
      },
      bet: {
        content: '<strong>Бет (ב)</strong> — вторая буква, первая с твёрдым звуком. Означает «дом» — место заключения завета с Богом. В грамматике — предлог «в».',
        name: 'Бет',
        page: 'alphabet/bet.html'
      },
      gimel: {
        content: '<strong>Гимел (ג)</strong> — третья буква, символ источника Божественного света. Происходит от корня «гамал» — верблюд, мост, благотворительность.',
        name: 'Гимел',
        page: 'alphabet/gimel.html'
      },
      dalet: {
        content: '<strong>Далет (ד)</strong> — четвёртая буква, звук [д]. Числовое значение — 4. Статья готовится.',
        name: 'Далет',
        page: 'alphabet/dalet.html'
      },
      hei: {
        content: '<strong>Хе (ה)</strong> — пятая буква, звук [х] или [h]. Числовое значение — 5. Статья готовится.',
        name: 'Хе',
        page: 'alphabet/hei.html'
      },
      vav: {
        content: '<strong>Вав (ו)</strong> — шестая буква, звук [в] или [у]. Числовое значение — 6. Статья готовится.',
        name: 'Вав',
        page: 'alphabet/vav.html'
      },
      zayin: {
        content: '<strong>Зайин (ז)</strong> — седьмая буква, звук [з]. Числовое значение — 7. Статья готовится.',
        name: 'Зайин',
        page: 'alphabet/zayin.html'
      },
      chet: {
        content: '<strong>Хет (ח)</strong> — восьмая буква, гортанный звук [х]. Числовое значение — 8. Статья готовится.',
        name: 'Хет',
        page: 'alphabet/chet.html'
      },
      tet: {
        content: '<strong>Тет (ט)</strong> — девятая буква, звук [т]. Числовое значение — 9. Статья готовится.',
        name: 'Тет',
        page: 'alphabet/tet.html'
      },
      yod: {
        content: '<strong>Йод (י)</strong> — десятая буква, звук [й]. Числовое значение — 10. Статья готовится.',
        name: 'Йод',
        page: 'alphabet/yod.html'
      }
    };

    mainToggle.addEventListener('click', () => {
      const isOpen = lettersList.classList.contains('open');
      if (!isOpen) {
        lettersList.classList.add('open');
        arrowMain.classList.add('rotated');
      } else {
        lettersList.classList.remove('open');
        arrowMain.classList.remove('rotated');
        if (contentPlaceholder) {
          contentPlaceholder.innerHTML = 'Выберите букву слева, чтобы увидеть описание.';
        }
        if (moreLinkContainer) {
          moreLinkContainer.innerHTML = '';
        }
      }
    });

    document.querySelectorAll('.letter-row').forEach(row => {
      row.addEventListener('click', async () => {
        const key = row.getAttribute('data-letter');
        const data = letterData[key];
        if (data) {
          if (contentPlaceholder) contentPlaceholder.innerHTML = data.content;
          if (loadingIndicator) loadingIndicator.style.display = 'none';
          if (moreLinkContainer) {
            moreLinkContainer.innerHTML = '';
            if (data.page) {
              const link = document.createElement('a');
              link.href = data.page;
              link.className = 'more-btn';
              link.textContent = 'Читать подробнее о букве ' + data.name;
              moreLinkContainer.appendChild(link);
            }
          }
        }
      });
    });
  }
});
