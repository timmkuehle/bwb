<?php

declare(strict_types=1);

/**
 * MNMLST-Child is meant to be used as a child theme of MNMLST.
 * 
 * Public and admin scripts and stylesheets, Gutenberg blocks and Gutenberg plugins are automatically enqueued by the parent theme.
 * 
 * If you want to expand the PHP functionality of the parent theme further, you can use this file directly or include PHP files from other directories.
 * 
 * @link https://github.com/timmkuehle/mnmlst-child
 * 
 * @package MNMLST
 * @subpackage MNMLST-Child
 * 
 * @since MNMLST-Child 0.5.0
 * @since MNMLST-Child 0.7.0 - Asset files are no longer enqueued in this file, but handled by parent theme
 */

//Register custom post types
function mnmlst_register_post_types() {
	foreach (glob(get_stylesheet_directory() . '/post-types/*.php') as $post_type_file) {
		$post_type = 'mnmlst_' . basename($post_type_file, '.php');
		$args = require $post_type_file;

		$args['supports'] = array_merge($args['supports'] ?? [], ['title', 'editor', 'custom-fields']);
		$args['show_in_rest'] = array_key_exists('show_in_rest', $args) ? $args['show_in_rest'] : true;

		register_post_type($post_type, $args);

		add_action('mnmlst_' . $post_type . '_single_header_meta_content', 'mnmlst_post_title', 30, 2);
		add_action('mnmlst_' . $post_type . '_single_header_meta_content', 'mnmlst_post_excerpt', 60, 2);
		add_action('mnmlst_' . $post_type . '_single_entry_header_content', 'mnmlst_post_thumbnail', 30, 1);
		add_action('mnmlst_' . $post_type . '_single_entry_header_content', 'mnmlst_post_header_meta', 60, 2);
	}
}
add_action('init', 'mnmlst_register_post_types');
