// import 'bootstrap/dist/js/bootstrap.js';
// import './index.scss';
import ace from 'Ace/ace';
import 'Ace/ext-language_tools';
import 'Ace/mode-php';
import 'Ace/theme-twilight';

ace.config.set('basePath', './');

// trigger extension
ace.require("ace/ext/language_tools");
const editor = ace.edit("editor");
editor.session.setMode("ace/mode/php");
editor.setTheme("ace/theme/twilight");
// enable autocompletion and snippets
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: false,
    fontSize: 13,
    fontFamily: 'JetBrains Mono',
});