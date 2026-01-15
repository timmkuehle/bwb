<?php

declare(strict_types=1);

$post_type = $attributes['postType'] ?? 'post';
$post_type_supports_categories = in_array('category', get_object_taxonomies($post_type));

$category_ids = $post_type_supports_categories
	? array_map(fn($cat) => $cat['id'], $attributes['selectedCategories'] ?? [])
	: [];

$number_of_items = $attributes['numberOfItems'] ?? 5;

$show_post_content = $attributes['showPostContent'] ?? false;

$query = new \WP_Query([
	'post_type' => $post_type,
	'post_status' => 'publish',
	'category__in' => $category_ids,
	'posts_per_page' => $number_of_items,
]);

if ($query->have_posts()) :
	$archive_classes = ['mnmlst_post-archive'];
	if (!$show_post_content) {
		$archive_classes[] = 'no-content';
	} ?>

    <section class="<?= esc_attr(join(' ', $archive_classes)); ?>">

	<?php while ($query->have_posts()) : $query->the_post();
		$post_id = get_the_ID();

		$title = get_the_title();

		$excerpt = get_the_excerpt();
		$truncatedExcerpt = $show_post_content
			? join(' ', array_slice(explode(' ', get_the_excerpt()), 0, 30))
			: null;

		$featured_media_id = get_post_meta($post_id, '_mnmlst_featured_media', true)['id'];

		$categories = $post_type_supports_categories ? get_the_category() : [];

		$post_classes = ['mnmlst_post-wrapper'];
		if ($featured_media_id === 0) {
			$post_classes[] = 'no-featured-media';
		} ?>

		<article id="post-<?= esc_attr($post_id); ?>" <?php post_class($post_classes); ?>>
            <header class="mnmlst_entry-header">

                <?php if ($featured_media_id) : ?>

                    <a class="mnmlst_thumbnail-figure" href="<?= the_permalink(); ?>">

                        <?= wp_get_attachment_image($featured_media_id, 'post-thumbnail', false); ?>
                            
                    </a>

                <?php endif; ?>

                <h3 class="mnmlst_post-title"><?= esc_html($title); ?></h3>

                <?php if (!empty($categories)) : ?>

                <div class="mnmlst_post-categories">

                    <?php foreach ($categories as $category) : ?>

                        <div class="mnmlst_post-category <?= $category->slug; ?>"><?= $category->name; ?></div>

                    <?php endforeach; ?>
                
                </div>

                <?php endif; ?>

            </header>
            <div class="mnmlst_entry-content">

                <?php if ($show_post_content && !empty($excerpt)) : ?>

                    <p class="mnmlst_post-excerpt"><?= esc_html($truncatedExcerpt !== $excerpt ? $truncatedExcerpt . ' […]' : $excerpt); ?></p>
                    
                <?php endif; ?>

            </div>
            <footer class="mnmlst_entry-footer">
                <a class="mnmlst_post-link" href="<?php the_permalink(); ?>">
                    <span class="mnmlst_post-link-text"><?= __('Learn more', 'bwb'); ?></span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="mnmlst_post-link-icon">
			            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
		            </svg>
                </a>
            </footer>
        </article>

        <?php endwhile; ?>

    </section>

<?php endif;

wp_reset_postdata();
