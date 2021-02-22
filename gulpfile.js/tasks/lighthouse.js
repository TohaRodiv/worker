const path = require("path");
const fs = require("fs").promises;
const open = require("open");
const server = require("browser-sync").create();
const del = require("del");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const { write } = require("lighthouse/lighthouse-cli/printer");
const reportGenerator = require("lighthouse/lighthouse-core/report/report-generator");

const config = require("./../config");


const CHROME_LAUNCHER_PORT = 8080;
const REPORT_PATH = config.report;

async function getNameHTMLFiles() {
	const files = await fs.readdir(config.build.html);

	return files.filter(item => item.endsWith(".html"));
}

function startServer() {
	return server.init({
		server: config.build.root,
		port: CHROME_LAUNCHER_PORT,
		notify: false,
		open: false,
		cors: true
	});
}

async function launchChromeAndRunLighthouse(url) {
	const chrome = await chromeLauncher.launch();

	const result = await lighthouse(url, {
		// available options - https://github.com/GoogleChrome/lighthouse/#cli-options
		chromeFlags: ["--show-paint-rects"],
		output: "html",
		port: chrome.port
	},
	{
		extends: "lighthouse:default"
	});

	await chrome.kill();

	return result;
}

async function runLighthouse(fileName) {
	console.log(fileName);
	const result = await launchChromeAndRunLighthouse(`http://localhost:${CHROME_LAUNCHER_PORT}/${fileName}`);

	await write(reportGenerator.generateReportHtml(result.lhr), "html", path.join(REPORT_PATH, fileName));
}

module.exports = async function lighthouse(cb) {
	await del(REPORT_PATH);
	await fs.mkdir(REPORT_PATH);

	startServer();
	const files = await getNameHTMLFiles();

	try {
		for (const file of files) {
			await runLighthouse(file);
		}

		for (const file of files) {
			await open(path.join(REPORT_PATH, file));
		}
		cb();
		process.exit(0); //browser-sync API server.exit() do not work
	} catch (e) {
		cb(e.message);
		process.exit(1); //browser-sync API server.exit() do not work
	}
};
