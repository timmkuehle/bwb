# MNMLST Child

A starter project for WordPress child theme development using [MNMLST](https://github.com/timmkuehle/mnmlst). This repository provides a complete development environment with webpack build system, TypeScript support, and modern tooling for extending the MNMLST parent theme.

## Overview

MNMLST child themes inherit the MNMLST build architecture and asset management system, allowing you to focus on extending functionality without worrying about configuration. The child theme automatically benefits from:

- **Modern JavaScript/TypeScript** with webpack compilation
- **CSS/Sass/SCSS** preprocessing
- **Automatic asset enqueuing** by the parent theme
- **Gutenberg blocks and plugins** with automatic registration
- **i18n support** with translation extraction tools
- **Modern linting and code formatting** using ESLint, Prettier and PHP-CS-Fixer

## Prerequisites

> **Note:** The annotated version numbers are the oldest versions tested with MNMLST. Older versions might work but are not guaranteed.

- [PHP](https://www.php.net/) (Version 8.3 or higher)
- [Composer](https://getcomposer.org/) (Version 2.9.2 or higher)
- [NodeJS](https://nodejs.org/) (Version 22.21.1 or higher)
- A local PHP development setup running [MySQL](https://www.mysql.com/de/) or [MariaDB](https://mariadb.org/)
  - For manual setup, there are great tutorials for setting up local Apache servers on macOS and Linux
  - For a ready-made solution, try [MAMP](https://www.mamp.info/) or [XAMPP](https://www.apachefriends.org/)
- A local [WordPress](https://wordpress.org/) installation

> **Note:** The installation processes for these tools will differ depending on your operating system. The provided links should include information on how to install them for your specific OS

## Installation

### 1. Install MNMLST parent theme

Download the _Tar-GZ_ or _ZIP_ archive of the [latest MNMLST release](https://github.com/timmkuehle/mnmlst/releases/latest) and extract it into your WordPress installation's `themes` directory.

> **Note:** Remove the version suffix from the folder name:

```bash
mv mnmlst-Release-0.7.0 path/to/wordpress/wp-content/themes/mnmlst
```

### 2. Set Up the Child Theme

Clone this repository into the same `themes` directory, right next to the parent theme:

```bash
# Go to themes directory of WordPress installation
cd /path/to/wordpress/wp-content/themes

# Clone the repo
git clone git@github.com:timmkuehle/mnmlst-child.git
```

### 3. _Optional:_ Initialize your own Git repository

1. Remove the existing `.git` folder to disconnect from this repository:

```bash
# Remove existing git history
rm -rf .git
```

2. Initialize a new Git repository:

```bash
# Initialize Git repo
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit"
```

### 4. Provide your own theme meta information

Open [style.css](./style.css) and customize the theme metadata:

1. Set your preferred theme name:

   ```txt
   Theme Name: My Awesome Theme
   ```

2. Set your project description:

   ```txt
   Description: My Awesome Theme is an awesome WordPress theme
   ```

3. Provide project author information:

   ```txt
   Author: John Doe
   Author URI: https://example.com
   ```

4. Set your own version number (requires [semantic versioning](https://semver.org/)):

   ```txt
   Version: 1.2.3;
   ```

5. Set your preferred text domain (only lowercase letters and hyphens allowed):

   ```txt
   Text Domain: my-awesome-theme
   ```

Learn more about text domains in the [WordPress Developer Resources](https://developer.wordpress.org/themes/classic-themes/functionality/internationalization/#text-domain).

### 5. Install Dependencies

Install PHP and NodeJS dependencies:

```bash
# Install PHP dependencies
composer install

# Install NodeJS dependencies
npm install
```

### 6. Start Development

Start the webpack development server with watch mode:

```bash
npm start
```

Or build for production:

```bash
npm run build
```

### 7. Activate the Child Theme

In your WordPress admin panel, go to **Appearance → Themes** and activate the **MNMLST-Child** theme.

## Project Structure

The child theme follows the same structure as the parent theme:

```
mnmlst-child/
├── assets/
│   ├── src/
│   │   ├── scripts/
│   │   │   ├── public/        # Front-end scripts
│   │   │   └── admin/         # Admin scripts
│   │   └── styles/
│   │       ├── public.scss    # Front-end styles
│   │       └── admin.scss     # Admin styles
│   └── dist/                  # Compiled assets (auto-generated)
├── blocks/                    # Custom Gutenberg blocks
├── plugins/                   # Custom Gutenberg plugins
├── template-parts/            # Override parent template parts
├── languages/                 # Translation files
├── functions.php              # Theme functions
└── style.css                  # Theme header (required)
```

## Development Workflow

### Writing Scripts

Create JavaScript/TypeScript files in the appropriate directory:

- **Front-end scripts:** `assets/src/scripts/public/`
- **Admin scripts:** `assets/src/scripts/admin/`

The main entry point files are:

- `assets/src/scripts/public/index.{js,jsx,ts,tsx}` compiles to → `assets/dist/public.js`
- `assets/src/scripts/admin/index.{js,jsx,ts,tsx}` compiles to → `assets/dist/admin.js`

> **Note:** These assets are **automatically enqueued** by the parent theme – no need to manually register or enqueue them.

### Writing Styles

Create stylesheets in the appropriate directory:

- **Front-end styles:** `assets/src/styles/public.{scss,sass,css}` compiles to → `assets/dist/public.css`
- **Admin styles:** `assets/src/styles/admin.{scss,sass,css}` compiles to → `assets/dist/admin.css`

> **Note** As with [scripts](#writing-scripts), these stylesheets are **automatically enqueued** by the parent theme.

### Creating Gutenberg Blocks

1. Create a new directory under `blocks/your-block-name/`
2. Add a `block.json` file with block metadata
3. Create your block files:
   - `index.{js,jsx,ts,tsx}` - Editor script (contains `registerBlockType`)
   - `script.{js,jsx,ts,tsx}` - Front-end and editor script
   - `viewScript.{js,jsx,ts,tsx}` - Front-end only script
   - `style.{scss,sass,css}` - Front-end and editor styles
   - `editorStyle.{scss,sass,css}` - Editor only styles

> **Note:** The parent theme automatically registers and enqueues all blocks in the [blocks](./blocks) directory.

See the [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/) for more information.

### Creating Gutenberg Plugins

1. Create a new plugin directory under `plugins/your-plugin-name/`
2. Create your plugin files:
   - `index.{js,jsx,ts,tsx}` - Plugin script (contains `registerPlugin`)
   - `style.{scss,sass,css}` - Plugin styles

> **Note:** The parent theme automatically enqueues all plugins in the [plugins](./plugins) directory.

While there is documentation around Gutenberg plugins in WordPress's [Block Editor Handbook](https://developer.wordpress.org/block-editor/), it is not clearly separated into a specific part of the handbook. The [PluginSidebar section](https://developer.wordpress.org/block-editor/how-to-guides/plugin-sidebar-0/) might be a good place to start your research.

### Overriding Template Parts

To override a parent theme template part, create a PHP file at the exact same path in your child theme. For example, to override the post thumbnail template:

```
Parent: mnmlst/template-parts/post/post-thumbnail-img.php
Child:  mnmlst-child/template-parts/post/post-thumbnail-img.php
```

Take a look at the [template-parts directory of the MNMLST parent theme](https://github.com/timmkuehle/mnmlst/tree/main/template-parts) to see all overridable

### Extending PHP Functionality

Add custom PHP code to [functions.php](functions.php) or create new PHP files in an `inc/` directory and include them from `functions.php`.

## Translation (i18n)

The child theme inherits the parent theme's text domain (`mnmlst`).

1. Extract translatable strings:

   ```bash
   npm run extract-translations
   ```

2. Translate the generated `.po` file in the `languages/` directory

3. Generate JSON translations for usage in JavaScript code:
   ```bash
   npm run translate-js
   ```

If you're interested in a more detailed breakdown of these i18n scripts, take a look at the [MNMLST README](https://github.com/timmkuehle/mnmlst/?tab=readme-ov-file#internationalization)

## Key Features of the MNMLST Parent Theme

Your child theme automatically has access to these MNMLST parent theme features:

### MNMLST Featured Media

Set videos as featured media (not just images) using custom post meta and UI.

### MNMLST Menu Item Icons

Add custom icons to menu items via the WordPress menu editor.

### MNMLST Fullscreen Video Player

JavaScript component for fullscreen video playback.

### MNMLST Dynamic Header

Automatically adds a `.solid` class to the header when scrolling, enabling transparent-to-opaque header transitions.

Refer to the [MNMLST README](https://github.com/timmkuehle/mnmlst/?tab=readme-ov-file#features) for detailed documentation on parent theme features.

## Type safety, linting and code formatting

The project includes pre-configured tools for type safety, linting and code formatting:

- **ESLint** for JavaScript/TypeScript linting
- **Prettier** for code formatting
- **PHP-CS-Fixer** for PHP code formatting
- **TypeScript** for type checking

### Configuration files:

- [eslint.config.js](./eslint.config.js)
- [prettier.config.js](./prettier.config.js)
- [tsconfig.json](./tsconfig.json)

### Linting and formatting commands:

```bash
# Run linters (TypeScript + ESLint)
npm run lint

# Format code (PHP-CS-Fixer + Prettier)
npm run format
```

Check out the [MNMLST README](https://github.com/timmkuehle/mnmlst/?tab=readme-ov-file#type-safety-linting-and-code-formatting) for deeper insights into how MNMLST integrates these tools and how you can use them directly in your IDE.

## GitHub Workflows

MNMLST-Child includes GitHub Actions workflows to automate deployment and release management. Before using these workflows, you'll need to configure them for your specific setup.

### Available Workflows

#### 1. Enforce Merge Policy

**File:** [.github/workflows/enforce-merge-policy.yml](.github/workflows/enforce-merge-policy.yml)

Prevents direct merges into the main branch from any branch except staging, ensuring a controlled deployment pipeline.

**Configuration:**

Replace the placeholder branch names in the workflow file:

- `MAIN_BRANCH_NAME` - Your main/production branch name (e.g., `main` or `master`)
- `STAGING_BRANCH_NAME` - Your staging branch name (e.g., `staging` or `develop`)

#### 2. Deploy Staging

**File:** [.github/workflows/deploy-staging.yml](.github/workflows/deploy-staging.yml)

Automatically builds and deploys your theme to a staging server when changes are pushed to the staging branch.

**Configuration:**

1. Set up the following GitHub secrets (Settings → Secrets and variables → Actions → Secrets):
   - `SSH_KEY_STAGING` - Private SSH key for staging server access
   - `SSH_HOST_STAGING` - Staging server hostname or IP
   - `SSH_USER_STAGING` - SSH username for staging server

2. Set up the following GitHub variable (Settings → Secrets and variables → Actions → Variables):
   - `SSH_DEST_DIR_STAGING` - Absolute path to WordPress installation on staging server (e.g., `/var/www/html`)

3. Replace `STAGING_BRANCH_NAME` in the [workflow file](./.github/workflows/deploy-staging.yml#L6) with your staging branch name

**How it works:**

- Checks out the `staging` branch
- Installs dependencies and builds the project
- Deploys via SSH/rsync to `[SSH_DEST_DIR_STAGING]/wp-content/themes/mnmlst-child`

#### 3. Deploy Live

**File:** [.github/workflows/deploy-live.yml](.github/workflows/deploy-live.yml)

Automatically builds and deploys your theme to the live server when changes are pushed to the main branch.

**Configuration:**

1. Set up the following GitHub secrets:
   - `SSH_KEY_LIVE` - Private SSH key for live server access
   - `SSH_HOST_LIVE` - Live server hostname or IP
   - `SSH_USER_LIVE` - SSH username for live server

2. Set up the following GitHub variable:
   - `SSH_DEST_DIR_LIVE` - Absolute path to WordPress installation on live server

3. Replace `MAIN_BRANCH_NAME` in the [workflow file](./.github/workflows/deploy-live.yml#L6) with your main branch name

**How it works:**

- Checks out the `main` branch
- Installs dependencies and builds the project
- Deploys via SSH/rsync to `[SSH_DEST_DIR_LIVE]/wp-content/themes/mnmlst-child`

#### 4. Create Release

**File:** [.github/workflows/create-release.yml](.github/workflows/create-release.yml)

Creates a GitHub release with automatically generated release notes when you push a version tag.

**Configuration:**

No configuration needed! This workflow works out of the box.

**Usage:**

```bash
# Create version tag
git tag v1.0.0

# Push tag to remote repo
git push origin v1.0.0
```

The workflow will automatically create a GitHub release at https://github.com/YOUR_USERNAME/YOUR_REPO/releases

> **Note:** If you cannot use the [Deploy Staging](#2-deploy-staging) and/or [Deploy Live](#3-deploy-live) workflows, downloading the _Tar-GZ_ or _ZIP_ archive that is created alongside the release and deploying manually (for example via [FTP](https://de.wikipedia.org/wiki/File_Transfer_Protocol)) is a good alternative.

### Recommended Workflow

1. **Develop** on feature branches
2. **Merge** feature branches into `staging` branch
3. **Test** on staging server (auto-deployed by [Deploy Staging](#2-deploy-staging) workflow)
4. **Merge** `staging` into `main` via pull request (enforced by merge policy)
5. **Deploy** to production (auto-deployed by [Deploy Live](#3-deploy-live) workflow)
6. **Tag** the release to create a GitHub release

### Disabling Workflows

If you don't need automated deployments, you can safely delete the workflow files you don't use. The project will work fine without them.

## Resources

- [MNMLST Parent Theme](https://github.com/timmkuehle/mnmlst)
- [WordPress Theme Development](https://developer.wordpress.org/themes/)
- [WordPress Child Themes](https://developer.wordpress.org/themes/advanced-topics/child-themes/)
- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
