import * as MarkdownIt from 'markdown-it';
// import type { RenderRule } from "markdown-it/lib/renderer";
import * as Renderer from 'markdown-it/lib/renderer';
// import StateCore from 'markdown-it/lib/rules_core/state_core';
import * as Token from 'markdown-it/lib/token';

function patchRule(renderer : Renderer, ruleName : string, strBefore : string = '', strBehind : string = '') {
	const oriRule = renderer.rules[ruleName];
	return (tokens: Token[], idx: number, options: MarkdownIt.Options, env: any, self: Renderer) => {
		let token = tokens[idx];
		let render = null;
		if (oriRule) {
			render = () => oriRule(tokens, idx, options, env, self);
		} else {
			render = () => renderer.renderToken(tokens, idx, options);
		}
		if (token.level > 0) {
			// 不处理深层的，不然 blockquote 内的也会被加换行
			return render();
		}
		return strBefore + render() + strBehind;
	};
}

export default function acfunArticlePlugin(md : MarkdownIt) {
	// Renderer
	// 给代码块上下加分割线，下面加换行
	md.renderer.rules.fence = patchRule(md.renderer, 'fence', '<hr>', '<hr><br>');

	// 给段落下面加换行
	md.renderer.rules.paragraph_close = patchRule(md.renderer, 'paragraph_close', '', '<br>');
	md.renderer.rules.heading_close = patchRule(md.renderer, 'heading_close', '', '<br>');
	md.renderer.rules.blockquote_close = patchRule(md.renderer, 'blockquote_close', '', '<br>');
};
