const { series, parallel } = require("gulp");

const genDoc = require("./tasks/jsdoc");
const clean = require("./tasks/clean");

const imagemin = require("./tasks/imagemin");
const tinypngCompress = require("./tasks/tinypng");
const toWebp = require("./tasks/to-webp");
const webp2png = require("./tasks/webp-to-png");

const lighthouse = require("./tasks/lighthouse");

const pug = require("./tasks/pug");
const sass = require("./tasks/sass");
const js = require("./tasks/js");
const html = require("./tasks/html");

const concatJs = require("./tasks/concat-js");
const concatCss = require("./tasks/concat-css");

const watcher = require("./tasks/watch");
const createServer = require("./tasks/server");
const build = require("./tasks/build");

const htmlToPug = require("./tasks/html-to-pug");
const convertEncoding = require("./tasks/convert-encoding");


const setMode = (isProduction) => (cb) => {
	process.env.NODE_ENV = isProduction ? "production" : "development";
	cb();
};

/**
 * @var dev
 * @description Запускает локальный live-сервер, не минифицирует выходные файлы,
 * пропускает все через валидаторы и форматирует код (eslint, beautyfy js, css, html),
 * чтобы в будущем было его легче поддерживать.
 */
exports["dev"] = series(setMode(false), clean, watcher(createServer));
/**
 * @var build
 * @description Собирает и минифицирует код для лучшей производительности
 */
exports["build"] = series(setMode(true), build);
/**
 * @var server
 * @description Запускает локальный сервер.
 */
exports["server"] = series(createServer);
/**
 * @var watch
 * @description Запускает слежку за файлами и выполнение задач.
 */
exports["watch"] = series(watcher());
/**
 * @var imagemin
 * @description Сжимает изображения. Не очень эффективно. Поддерживает файлы: gif,png,jpg,svg,webp.
 * Для лучшего сжатия лучше использовать tinypng.
 */
exports["imagemin"] = parallel(imagemin);
/**
 * @var tinypng
 * @description Сжимает изображения. Очень эффективно. Есть ограничения на 500 файлов в месяц для бесплатного API.
 * Если это число превышенно, то необходимо либо подождать месяц, либо сменить API-KEY для этой задачи,
 * а чуть позже можно снова вернуть старый API-KEY. Поддерживает файлы: png,jpg,webp. Прекрасно подходит для большинство задач.
 */
exports["tinypng"] = parallel(tinypngCompress);
/**
 * @var convert:to-webp
 * @description Конвертирует png,jpg,jpeg,tiff в формат webp.
 */
exports["convert:to-webp"] = parallel(toWebp);
/**
 * @var convert:from-webp
 * @description Конвертирует из webp в png.
 */
exports["convert:from-webp"] = parallel(webp2png);
/**
 * @var lighthouse
 * @description Запускает lighthouse и сохраняет результат проверки в файл.
 */
exports["lighthouse"] = series(lighthouse);
/**
 * @var pug
 * @description Компилятор pug/jade в html. Подключен линтер и БЭМ-валидатор.
 */
exports["pug"] = series(pug);
/**
 * @var sass
 * @description Компилятор sass/scss в css. Подключен автопрефиксер.
 * На выходе имеем обычную версию *.css и минифицированную *.min.css. Sourcemap отключен.
 */
exports["sass"] = series(sass);
/**
 * @var js
 * @description Форматирует и проверяет javascript код.
 * Раставляет правильные отступы, ковычки одного типа ("), раставляет точки с запятой (;).
 * Создает обычную версию *.js и минифицированную *.min.js. Без sourcemap.
 */
exports["js"] = series(js);
/**
 * @var html
 * @description Форматирует и проверяет html код. Подключает другие html файлы. Для подробностей
 * см. настройки данного таска.
 */
exports["html"] = series(html);
/**
 * @var gen:doc
 * @description Генерирует документацию.
 */
exports["gen:doc"] = series(genDoc);
/**
 * @var concat:js
 * @description Объединяет несколько *.js файлов в один минифицированный и не минифицированный файл.
 */
exports["concat:js"] = series(concatJs);
/**
 * @var concat:css
 * @description Объединяет несколько *.css файлов в один минифицированный и не минифицированный файл.
 */
exports["concat:css"] = series(concatCss);
/**
 * @var clean
 * @description Очищает папку с собранным проектом.
 */
exports["clean"] = clean;
/**
 * @var convert:html-to-pug
 * @description Конвертирует html в pug.
 */
exports["convert:html-to-pug"] = series(htmlToPug);
/**
 * @var convert:encode
 * @description Конвертирует кодировку документов.
 */
exports["convert:encode"] = convertEncoding;