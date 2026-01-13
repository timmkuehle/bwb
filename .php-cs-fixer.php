<?php

declare(strict_types=1);

use PhpCsFixer\AbstractFixer;
use PhpCsFixer\Config;
use PhpCsFixer\Finder;
use PhpCsFixer\FixerDefinition\FixerDefinition;
use PhpCsFixer\FixerDefinition\FixerDefinitionInterface;
use PhpCsFixer\Tokenizer\Token;
use PhpCsFixer\Tokenizer\Tokens;

/**
 * Custom fixer class for closing PHP tag alignment
 * Ensures that closing PHP tags in template files are aligned correctly
 */
final class AlignClosingTagFixer extends AbstractFixer {
	public function getName(): string {
		return 'TimMKuehle/align_closing_tag';
	}

	public function getDefinition(): FixerDefinitionInterface {
		return new FixerDefinition('Ensure closing PHP tags in template files are aligned correctly.', []);
	}

	public function isCandidate(Tokens $tokens): bool {
		return $tokens->isTokenKindFound(T_CLOSE_TAG);
	}

	public function applyFix(\SplFileInfo $file, Tokens $tokens): void {
		foreach ($tokens as $index => $token) {
			if ($token->isGivenKind(T_CLOSE_TAG)) {
				if ($tokens[$index - 1]->isWhitespace()) {
					$tokens[$index - 1] = new Token([T_WHITESPACE, ' ']);
				}
			}
		}
	}
}

$rules = [
	/** Alias */
	'no_mixed_echo_print' => true,

	/** Array notation */
	'array_syntax' => true,
	'no_multiline_whitespace_around_double_arrow' => true,
	'no_whitespace_before_comma_in_array' => true,
	'normalize_index_brace' => true,
	'trim_array_spaces' => true,
	'whitespace_after_comma_in_array' => [
		'ensure_single_space' => true
	],

	/** Basic */
	'braces_position' => [
		'classes_opening_brace' => 'same_line',
		'functions_opening_brace' => 'same_line'
	],
	'no_multiple_statements_per_line' => true,
	'no_trailing_comma_in_singleline' => [
		'elements' => [
			'arguments',
			'array',
			'array_destructuring',
			'group_import'
		]
	],

	/** Casing */
	'class_reference_name_casing' => true,
	'constant_case' => true,
	'lowercase_keywords' => true,
	'lowercase_static_reference' => true,
	'magic_constant_casing' => true,
	'magic_method_casing' => true,
	'native_function_casing' => true,
	'native_type_declaration_casing' => true,

	/** Cast notation */
	'cast_spaces' => true,
	'lowercase_cast' => true,

	/** Class notation */
	'class_attributes_separation' => [
		'elements' => [
			'const' => 'one',
			'method' => 'one',
			'property' => 'none',
			'trait_import' => 'none',
			'case' => 'none'
		]
	],
	'class_definition' => true,
	'no_null_property_initialization' => true,
	'ordered_types' => true,
	'visibility_required' => true,

	/** Control structure */
	'control_structure_continuation_position' => true,
	'elseif' => true,
	'empty_loop_body' => [
		'style' => 'braces'
	],
	'empty_loop_condition' => true,
	'include' => true,
	'no_break_comment' => true,
	'no_superfluous_elseif' => true,
	'no_unneeded_braces' => true,
	'no_unneeded_control_parentheses' => true,
	'no_useless_else' => true,
	'switch_case_semicolon_to_colon' => true,
	'switch_case_space' => true,
	'switch_continue_to_break' => true,
	'trailing_comma_in_multiline' => [
		'after_heredoc' => false,
		'elements' => []
	],

	/** Function notation */
	'function_declaration' => [
		'closure_fn_spacing' => 'none',
		'closure_function_spacing' => 'none'
	],
	'method_argument_space' => true,
	'no_spaces_after_function_name' => true,
	'nullable_type_declaration_for_default_null_value' => true,
	'return_type_declaration' => true,
	'single_line_throw' => true,

	/** Import */
	'fully_qualified_strict_types' => [
		'import_symbols' => true,
		'leading_backslash_in_global_namespace' => true
	],
	'global_namespace_import' => true,
	'no_leading_import_slash' => true,
	'no_unneeded_import_alias' => true,
	'no_unused_imports' => true,
	'ordered_imports' => true,
	'single_import_per_statement' => true,
	'single_line_after_imports' => true,

	/** Language construct */
	'combine_consecutive_issets' => true,
	'combine_consecutive_unsets' => true,
	'declare_equal_normalize' => true,
	'declare_parentheses' => true,
	'explicit_indirect_variable' => true,
	'nullable_type_declaration' => true,
	'single_space_around_construct' => true,

	/** List notation */
	'list_syntax' => true,

	/** Namespace notation */
	'blank_line_after_namespace' => true,
	'blank_lines_before_namespace' => true,
	'clean_namespace' => true,
	'no_leading_namespace_whitespace' => true,

	/** Operator */
	'assign_null_coalescing_to_coalesce_equal' => true,
	'binary_operator_spaces' => true,
	'concat_space' => [
		'spacing' => 'one'
	],
	'increment_style' => [
		'style' => 'post'
	],
	'new_with_parentheses' => true,
	'no_space_around_double_colon' => true,
	'no_useless_concat_operator' => true,
	'no_useless_nullsafe_operator' => true,
	'object_operator_without_whitespace' => true,
	'operator_linebreak' => true,
	'standardize_increment' => true,
	'standardize_not_equals' => true,
	'ternary_operator_spaces' => true,
	'ternary_to_null_coalescing' => true,
	'unary_operator_spaces' => true,

	/** PHP tag */
	'blank_line_after_opening_tag' => true,
	'echo_tag_syntax' => [
		'format' => 'short'
	],
	'full_opening_tag' => true,
	'no_closing_tag' => true,

	/** Return notation */
	'no_useless_return' => true,
	'return_assignment' => true,

	/** Semicolon */
	'multiline_whitespace_before_semicolons' => true,
	'no_empty_statement' => true,
	'no_singleline_whitespace_before_semicolons' => true,
	'semicolon_after_instruction' => true,
	'space_after_semicolon' => true,

	/** Strict */
	'declare_strict_types' => true,

	/** String notation */
	'explicit_string_variable' => true,
	'single_quote' => true,

	/** Whitespace */
	'array_indentation' => true,
	'blank_line_before_statement' => [
		'statements' => [
			'return',
			'phpdoc'
		]
	],
	'compact_nullable_type_declaration' => true,
	'indentation_type' => true,
	'line_ending' => true,
	'method_chaining_indentation' => true,
	'no_extra_blank_lines' => [
		'tokens' => [
			'curly_brace_block',
			'square_brace_block',
			'case',
			'continue',
			'return',
			'switch',
			'throw',
			'use',
			'extra'
		]
	],
	'no_spaces_around_offset' => true,
	'no_trailing_whitespace' => true,
	'no_whitespace_in_blank_line' => true,
	'single_blank_line_at_eof' => true,
	'spaces_inside_parentheses' => true,
	'statement_indentation' => true,
	'type_declaration_spaces' => true,
	'types_spaces' => true,

	/* Custom rules */
	'TimMKuehle/align_closing_tag' => true,
];

$finder = Finder::create();
$finder->in(__DIR__);
$finder->name('*.php');

$config = new Config();
$config->setFinder($finder);
$config->setRiskyAllowed(true);
$config->setRules($rules);
$config->setIndent("\t");
$config->registerCustomFixers([new \AlignClosingTagFixer()]);

return $config;
