module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
    },
    'extends': 'eslint:recommended',
    'overrides': [
        {
            'env': {
                'node': true,
            },
            'files': [
                '.eslintrc.{js,cjs}',
            ],
            'parserOptions': {
                'sourceType': 'script',
            },
        },
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'rules': {
        'indent': ['warn', 4],
        'quotes': ['warn', 'single'],
        'comma-dangle': ['warn', {
            'arrays': 'always-multiline',
            'objects': 'ignore',
            'imports': 'ignore',
            'exports': 'ignore',
            'functions': 'ignore',
        }],
        'semi': ['warn', 'always'],
    },
};
