# Visual Enter Plugins for Obsidian

Enhance your Obsidian editing experience with Typora-inspired Enter key behavior and visual empty line styling.

## Features

### 1. Enter Mapping Plugin

- **Smart Paragraph Breaks**: Create new paragraphs with two Enter presses
- **List Awareness**: Maintains normal list behavior (bullet points & numbered lists)
- **Shift+Enter Compatibility**: Works alongside standard line breaks

### 2. Enter Styles Plugin

- **Visual Guidance**: Highlights every other empty line
- **Subtle Design**: Minimal visual impact with adjustable styling
- **Live Updates**: Instant reflection of document changes

## Installation

1. **Prerequisites**:
   - Node.js v16+ installed
   - Obsidian v0.12.0+

2. **Terminal Commands**:

```bash
git clone https://github.com/behagoras/copy-files.git
cd typora-obsidian-plugin
npm install
```

3. **Deployment**:

```bash
npm run build:deploy "/path/to/your/vault"
```

## Usage

### Basic Operation

1. **New Paragraph**: Press Enter twice
2. **Normal Line Break**: Shift+Enter
3. **Visual Feedback**: Empty lines show alternating highlighting

### Special Cases

- **Lists**: Normal Enter behavior preserved in lists
- **Code Blocks**: Original formatting maintained
- **Math Blocks**: No interference with equations

## Configuration

### Style Customization

Modify `enter-styles/main.ts` to adjust highlighting:

```ts
style.textContent = `
  .cm-empty-highlight:not(.cm-active) {
    height: 0.6em !important;  // Adjust height
    background-color: #f0f0f0; // Add color
  }
`;
```

### Behavior Tuning

Edit `enter-mapping/main.ts` to change:

- Double Enter detection logic
- Special case handling (lists, code blocks)

## Development

### Project Structure

```
├── enter-mapping/        # Enter behavior logic
├── enter-styles/         # Visual styling components
├── scripts/              # Build/deployment utilities
└── webpack.config.js     # Build configuration
```

### Common Commands

| Command                | Description                |
| ---------------------- | -------------------------- |
| `npm run build`        | Build both plugins         |
| `npm run build:deploy` | Full build + deployment    |
| `npm run move`         | Prepare distribution files |

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes
4. Push to branch
5. Open Pull Request

## License

MIT License - See [LICENSE](LICENSE) for details

## Acknowledgments

- Obsidian team for plugin architecture
- CodeMirror for editor extensions
- Typora for inspiration

---

**Maintained by**: David Behar Lombrozo  