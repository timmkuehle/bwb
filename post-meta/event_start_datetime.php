<?php

declare(strict_types=1);

function sanitize_datetime(string $value): string {
	$sanitized_value = sanitize_text_field($value);

	try {
		$date = new \DateTime($sanitized_value);

		return $date->format('Y-m-d H:i:s');
	} catch (\Exception $e) {
		return date('Y-m-d H:i:s');
	}
}

return [
	'object_subtype' => 'mnmlst_event',
	'type' => 'string',
	'label' => __('Event Start DateTime (UTC)', 'bwb'),
	'description' => __('The starting date and time of the event.', 'bwb'),
	'single' => true,
	'default' => date('Y-m-d H:i:s'),
	'show_in_rest' => true,
	'sanitize_callback' => 'sanitize_datetime',
];
