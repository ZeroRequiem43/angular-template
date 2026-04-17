import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { isDevMode } from '@angular/core';


/**
 * Подготовка окружения перед стартом Angular
 */
async function prepareApp() {
  // Проверяем, что мы в режиме разработки
  if (isDevMode()) {
    // Динамический импорт, чтобы код MSW не попал в продакшн-бандл
    const { worker } = await import('./mocks/browser');

    // Возвращаем промис старта воркера
    return worker.start({
      // Пропускаем запросы к реальным ресурсам (картинки, шрифты, стили)
      onUnhandledRequest: 'bypass',
    });
  }

  return Promise.resolve();
}

// Сначала готовим моки, потом запускаем приложение
prepareApp().then(() => {
  bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
});
