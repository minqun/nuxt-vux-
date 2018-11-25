module.exports = {
	root: true,
	parser: 'babel-eslint',
	env: {
		browser: true,
		node: true
	},
	extends: 'standard',
	// required to lint *.vue files
	plugins: [ 'html' ],
	// add your custom rules here
	rules: {
		semi: [ 0, 'always' ], //语句强制分号结尾
		'no-tabs': 'off',
		indent: [ 0, 4 ], //缩进风格
		quotes: [ 0, 'single' ], //引号类型 `` "" ''
		'quote-props': [ 0, 'always' ], //对象字面量中的属性名是否强制双引号
		'space-before-function-paren': [ 0, 'always' ] //函数定义时括号前面要不要有空格
	},
	globals: {}
};
