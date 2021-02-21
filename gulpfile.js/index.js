const { series, parallel, } = require("gulp");

const genDoc = require("./tasks/jsdoc");
const clean = require("./tasks/clean");

const imageMinify = require("./tasks/imageMinify");
const tinypngCompress = require("./tasks/tinypngCompress");
const toWebp = require("./tasks/toWebp");

const lighthouse = require("./tasks/lighthouse");

const pugToHtml = require("./tasks/pugToHtml");
const sass = require("./tasks/sass");
const js = require("./tasks/script");
const concatJs = require("./tasks/concatJs");
const concatCss = require("./tasks/concat-css");


const setMode = isProduction => cb => {
	process.env.NODE_ENV = isProduction ? "production" : "development";
	cb();
};


/**
 * @var dev
 * @description Запускает локальный live-сервер, не минифицирует выходные файлы,
 * пропускает все через валидаторы и форматирует код (eslint, beautyfy js, css, html),
 * чтобы в будущем было его легче поддерживать.
 */
exports["dev"] = series(setMode (false), clean);

/**
 * @var build
 * @description Собирает и минифицирует код для лучшей производительности
 */
exports["build"] = series(setMode(true), clean);

/**
 * @var imagemin
 * @description Сжимает изображения. Не очень эффективно. Поддерживает файлы: gif,png,jpg,svg,webp.
 * Для лучшего сжатия лучше использовать tinypng.
 */
exports["imagemin"] = parallel(imageMinify);
/**
 * @var tinypng
 * @description Сжимает изображения. Очень эффективно. Есть ограничения на 500 файлов в месяц для бесплатного API.
 * Если это число превышенно, то необходимо либо подождать месяц, либо сменить API-KEY для этой задачи,
 * а чуть позже можно снова вернуть старый API-KEY. Поддерживает файлы: png,jpg,webp. Прекрасно подходит для большинство задач.
 */
exports["tinypng"] = parallel(tinypngCompress);
/**
 * @var to-webp
 * @description Конвертирует png,jpg,jpeg,tiff в формат webp.
 */
exports["to-webp"] = parallel(toWebp);
exports["lighthouse"] = series(lighthouse); // todo: check work
/**
 * @var pug
 * @description Компилятор pug/jade в html. Подключен линтер и БЭМ-валидатор.
 */
exports["pug"] = series (pugToHtml);
/**
 * @var sass
 * @description Компилятор sass/scss в css. Подключен автопрефиксер.
 * На выходе имеем обычную версию *.css и минифицированную *.min.css. Sourcemap отключен.
 */
exports["sass"] = series (sass);
/**
 * @var js
 * @description Форматирует и проверяет javascript код.
 * Раставляет правильные отступы, ковычки одного типа ("), раставляет точки с запятой (;).
 * Создает обычную версию *.js и минифицированную *.min.js. Без sourcemap.
 */
exports["js"] = series (js);
/**
 * @var gen-doc
 * @description Генерирует документацию эту документацию из gulpfile.js/index.js
 */
exports["gen-doc"] = series (genDoc);
/**
 * @var concat-js
 * @description Объединяет несколько *.js файлов в один минифицированный и не минифицированный файл.
 */
exports["concat-js"] = series (concatJs);
/**
 * @var concat-css
 * @description Объединяет несколько *.css файлов в один минифицированный и не минифицированный файл.
 */
exports["concat-css"] = series (concatCss);