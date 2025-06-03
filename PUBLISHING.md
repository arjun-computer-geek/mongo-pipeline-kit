# Publishing Guide

This guide provides instructions for publishing the Mongo Pipeline Kit package to npm and GitHub.

## Publishing to npm

1. **Login to npm (if not already):**
   ```bash
   npm login
   ```

2. **Build the package:**
   ```bash
   npm run build
   ```

3. **Publish to npm:**
   ```bash
   npm publish --access public
   ```
   - Make sure your `package.json` has a unique name and correct version.
   - If you update your code, bump the version using `npm version patch|minor|major` before publishing again.

## Publishing to GitHub

1. **Initialize a git repository (if not already):**
   ```bash
   git init
   git remote add origin https://github.com/yourusername/mongo-pipeline-kit.git
   ```

2. **Add and commit your changes:**
   ```bash
   git add .
   git commit -m "Initial commit"
   ```

3. **Push to GitHub:**
   ```bash
   git push -u origin main
   ```
   - If you use a different branch, replace `main` with your branch name.

## Best Practices

- Keep your documentation up to date
- Use semantic versioning for releases
- Tag releases in GitHub for better tracking
- Add tests and CI/CD for robust publishing
- Update CHANGELOG.md with release notes
- Ensure all tests pass before publishing
- Verify the package works in a clean environment

## Version Management

Follow these steps when releasing a new version:

1. Update version in `package.json`:
   ```bash
   npm version patch  # for bug fixes
   npm version minor  # for new features
   npm version major  # for breaking changes
   ```

2. Update CHANGELOG.md with release notes

3. Build and test:
   ```bash
   npm run build
   npm test
   ```

4. Publish to npm:
   ```bash
   npm publish
   ```

5. Create a GitHub release with release notes

## Troubleshooting

If you encounter issues during publishing:

1. Check npm login status:
   ```bash
   npm whoami
   ```

2. Verify package.json configuration:
   - Ensure name is unique
   - Check version number
   - Verify all required fields are present

3. Check for common errors:
   - Package name already taken
   - Invalid version number
   - Missing required fields
   - Build errors

For more help, check the [npm documentation](https://docs.npmjs.com/) or open an issue in the repository. 