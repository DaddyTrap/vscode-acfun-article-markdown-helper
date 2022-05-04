// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import acfunArticlePlugin from './acfun_article_md_plugin';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "vscode-markdown-acfun-article-for-paste" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('vscode-markdown-acfun-article-for-paste.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from vscode-markdown-acfun-article-for-paste!');
	// });

	// context.subscriptions.push(disposable);

	return {
		extendMarkdownIt(md: any) {
			return md.use(acfunArticlePlugin);
		}
	};
}

// this method is called when your extension is deactivated
export function deactivate() {}
