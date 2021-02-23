const { series, parallel } = require("gulp");

const genDoc = require("./tasks/jsdoc");
const clean = require("./tasks/clean");

const imagemin = require("./tasks/imagemin");
const tinypngCompress = require("./tasks/tinypng");
const toWebp = require("./tasks/to-webp");
const webp2png = require("./tasks/webp-to-png");
const toSvg = require("./tasks/to-svg");

const lighthouse = require("./tasks/lighthouse");

const pug = require("./tasks/pug");
const sass = require("./tasks/sass");
const js = require("./tasks/js");
const html = require("./tasks/html");
const css = require("./tasks/css");

const concatJs = require("./tasks/concat-js");
const concatCss = require("./tasks/concat-css");

const watcher = require("./tasks/watch");
const createServer = require("./tasks/server");
const build = require("./tasks/build");

const htmlToPug = require("./tasks/html-to-pug");
const convertEncoding = require("./tasks/convert-encoding");
const zip = require("./tasks/zip");


const setMode = (isProduction) => (cb) => {
	process.env.NODE_ENV = isProduction ? "production" : "development";
	cb();
};

/**
 * @var dev
 * @description Запускает локальный live-сервер, не минифицирует выходные файлы,
 * пропускает все через валидаторы и форматирует код (eslint, beautyfy js, css, html),
 * чтобы в будущем было его легче поддерживать.
 * @example
 * gulp dev
 * 
 * [19:30:10] Using gulpfile ~/www/dev/gulp/gulpfile.js
 * [19:30:10] Starting 'dev'...
 * [19:30:10] Finished '<anonymous>' after 1.15 ms
 * ✔ Gulp-html-bem-validator: Success. Filename:index.html
 * [19:30:12] Finished '<anonymous>' after 1.42 s
 * /style.css: Original size:1989
 * /inc/settings.css: Original size:67
 * /style.css: Minified size: 1345
 * [19:30:12] Finished '<anonymous>' after 307 ms
 * [Browsersync] Access URLs:
 * ----------------------------
 * Local: http://localhost:3000
 * ----------------------------
 * UI: http://localhost:3001
 * ----------------------------
 * [Browsersync] Serving files from: /www/dev/gulp/gulpfile.js
 */
exports["dev"] = series(setMode(false), clean, watcher(createServer));
/**
 * @var build
 * @description Собирает и минифицирует код для лучшей производительности
 * @example
 * gulp build
 * 
 * [19:35:48] Using gulpfile ~/www/dev/gulp/gulpfile.js
 * [19:35:48] Starting 'build'...
 * /style.css: Original size:1989
 * /inc/settings.css: Original size:67
 * /style.css: Minified size: 1345
 * ✔ Gulp-html-bem-validator: Success. Filename:index.html
 * [19:35:54] gulp-tinypng-compress [compressing] ✔ jpeg.jpeg (done)
 * [19:35:54] gulp-tinypng-compress [compressing] ✔ jpg.jpg (done)
 * [19:35:54] gulp-tinypng-compress [compressing] ✔ webp.webp (done)
 * [19:35:55] gulp-tinypng-compress [compressing] ✔ png.png (done)
 * [19:35:55] gulp-tinypng-compress Skipped: 0 images, Compressed: 4 images, Savings: 6.41 MB (ratio: 0.214)
 * [19:35:55] Finished 'build' after 6.78 s
 */
exports["build"] = series(setMode(true), build);
/**
 * @var server
 * @description Запускает локальный сервер.
 * @example
 * gulp server
 * 
 * [19:39:23] Using gulpfile ~/www/dev/gulp/gulpfile.js
 * [19:39:23] Starting 'server'...
 * [Browsersync] Access URLs:
 * ----------------------------
 * Local: http://localhost:3000
 * ----------------------------
 * UI: http://localhost:3001
 * ----------------------------
 * [Browsersync] Serving files from: /www/dev/gulp/build
 */
exports["server"] = series(createServer);
/**
 * @var watch
 * @description Запускает слежку за файлами и выполнение задач.
 * @example
 * gulp watch
 */
exports["watch"] = series(watcher());
/**
 * @var imagemin
 * @description Сжимает изображения. Не очень эффективно. Поддерживает файлы: gif,png,jpg,svg,webp.
 * Для лучшего сжатия лучше использовать tinypng.
 * @example
 * gulp imagemin
 */
exports["imagemin"] = parallel(imagemin);
/**
 * @var tinypng
 * @description Сжимает изображения. Очень эффективно. Есть ограничения на 500 файлов в месяц для бесплатного API.
 * Если это число превышенно, то необходимо либо подождать месяц, либо сменить API-KEY для этой задачи,
 * а чуть позже можно снова вернуть старый API-KEY. Поддерживает файлы: png,jpg,webp. Прекрасно подходит для большинство задач.
 * @example
 * gulp tinypng
 */
exports["tinypng"] = parallel(tinypngCompress);
/**
 * @var convert:to-webp
 * @description Конвертирует png,jpg,jpeg,tiff в формат webp.
 * @example
 * gulp convert:to-webp
 */
exports["convert:to-webp"] = parallel(toWebp);
/**
 * @var convert:from-webp
 * @description Конвертирует из webp в png.
 * @example
 * gulp convert:from-webp
 */
exports["convert:from-webp"] = parallel(webp2png);
/**
 * @var lighthouse
 * @description Запускает lighthouse и сохраняет результат проверки в файл.
 * @example
 * gulp lighthouse
 */
exports["lighthouse"] = series(lighthouse);
/**
 * @var pug
 * @description Компилятор pug/jade в html. Подключен линтер и БЭМ-валидатор.
 * @example
 * gulp pug
 */
exports["pug"] = series(pug);
/**
 * @var sass
 * @description Компилятор sass/scss в css. Подключен автопрефиксер.
 * На выходе имеем обычную версию *.css и минифицированную *.min.css. Sourcemap отключен.
 * @example
 * gulp sass
 */
exports["sass"] = series(sass);
/**
 * @var js
 * @description Форматирует и проверяет javascript код.
 * Раставляет правильные отступы, ковычки одного типа ("), раставляет точки с запятой (;).
 * Создает обычную версию *.js и минифицированную *.min.js. Без sourcemap.
 * @example
 * gulp js
 */
exports["js"] = series(js);
/**
 * @var html
 * @description Форматирует и проверяет html код. Подключает другие html файлы. Для подробностей
 * см. настройки данного таска.
 * @example
 * gulp html
 */
exports["html"] = series(html);
/**
 * @var gen:doc
 * @description Генерирует документацию.
 * @example
 * gulp gen:doc
 */
exports["gen:doc"] = series(genDoc);
/**
 * @var concat:js
 * @description Объединяет несколько *.js файлов в один минифицированный и не минифицированный файл.
 * @example
 * gulp concat:js
 */
exports["concat:js"] = series(concatJs);
/**
 * @var concat:css
 * @description Объединяет несколько *.css файлов в один минифицированный и не минифицированный файл.
 * @example
 * gulp concat:css
 */
exports["concat:css"] = series(concatCss);
/**
 * @var clean
 * @description Очищает папку с собранным проектом.
 * @example
 * gulp clean
 */
exports["clean"] = clean;
/**
 * @var convert:html-to-pug
 * @description Конвертирует html в pug.
 * @example
 * gulp convert:html-to-pug
 */
exports["convert:html-to-pug"] = series(htmlToPug);
/**
 * @var convert:encode
 * @description Конвертирует кодировку документов.
 * @example
 * gulp convert:encode
 */
exports["convert:encode"] = convertEncoding;
/**
 * @var convert:to-svg
 * @description Конвертирует PNG,JPG,BMP в SVG.
 * @example
 * gulp convert:to-svg
 */
exports["convert:to-svg"] = toSvg;
/**
 * @var zip
 * @description Архивирует папку с проектом в zip архив.
 * @example
 * gulp zip
 */
exports["zip"] = zip;
/**
 * @var css
 * @description Форматирует css файлы, также есть возможность подключать файлы. См. пример для css: {@link https://www.npmjs.com/package/gulp-include}
 * @example
 * gulp css
 */
exports["css"] = css;