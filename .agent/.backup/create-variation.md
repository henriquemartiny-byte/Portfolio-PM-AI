---
description: Create a variation of the current project by cloning it to a new directory
---

This workflow helps you create a new variation of your project in a separate folder.

1. Identifies the current project directory.
2. Prompts for a new variation name.
3. Clones the contents (excluding `node_modules` and `.git` if they exist to keep it clean, or clones everything).
4. Sets the new folder as the active workspace.

// turbo
To run this variation creation:
1. Make sure you are in the source project directory.
2. Run: `cp -Recurse . -Destination ../<new-variation-name> -Exclude node_modules, .git` (on Windows/PowerShell)
