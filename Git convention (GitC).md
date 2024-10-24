# Branches convention

For git branches, this project uses the [gitflow](https://nvie.com/posts/a-successful-git-branching-model/) model. Below is a brief memo for naming branches.

By default branches name can contain only latin letters in low case, numbers, special symbols \_-/

1. main (master) - branch where the source code of HEAD always reflects a production-ready state

   - may branch off from: -
   - may merge into: -

2. dev (develop) - branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release

   - may branch off from: main
   - may merge into: -

3. feature/<arbitrary_name> - branch used to develop new features for the upcoming or a distant future release

   - may branch off from: dev
   - may merge into: dev
   - naming convention: anything except master, main, develop, dev, release-\*, or hotfix-\*
   - way to merge: `git merge --no-ff`

4. feature/<arbitrary_name>__<owner_nickname>\_wip - branch for saving temporary commits that are not ready to be added to the functional branch

   - may branch off from: feature/<arbitrary_name> (<arbitrary_name> must be the same)
   - may merge into: feature/<arbitrary_name> (<arbitrary_name> must be the same)
   - naming convention: anything except master, main, develop, dev, release-\*, or hotfix-\*
   - way to merge: `git merge --squash`

5. release-<app_version> - branch that support preparation of a new production release

   - may branch off from: dev
   - may merge into: dev, main
   - naming convention: release-<app_version>
   - way to merge: `git merge --no-ff`

6. hotfix-<app_version> - branch to act immediately upon an undesired state of a live production version

   - may branch off from: main
   - may merge into: main, dev, release-\*
   - naming convention: release-<app_version>
   - way to merge: `git merge --no-ff`

# Commits convention

Run git commit without a message or option and it'll open up your default text editor to write a commit message.

To configure your "default" editor:

```bash
git config --global core.editor "code --wait"
```

This would configure Git to use VS Code as your default editor. Replace "VS Code" with "emacs," "vim," or whatever your preference is.

In the opened editor, the first line is the subject (short description), leave a blank line after it, and everything else is the extended description (body).

```bash
<Summarize change(s) in around 50 characters or less>

<More detailed explanatory description of the change wrapped into about 72 characters>
```

There are more rules here:

1.  Specify the type of commit:

    - dev: Feature, using only in development
    - wip: Incomplete feature
    - feat: The new feature you're adding to a particular application
    - fix: A bug fix
    - style: Feature and updates related to styling
    - refactor: Refactoring a specific section of the codebase
    - test: Everything related to testing
    - docs: Everything related to documentation
    - chore: Regular code maintenance
    - temp: Temporary commit for later removal

2.  Separate the subject from the body with a blank line

3.  Your commit message should not contain any whitespace errors

4.  Remove unnecessary punctuation marks

5.  Do not end the subject line with a period

6.  Capitalize the subject line and each paragraph

7.  Use the imperative mood in the subject line

8.  Use the body to explain what changes you have made and why you made them.

9.  Do not assume the reviewer understands what the original problem was, ensure you add it.

10. Do not think your code is self-explanatory
