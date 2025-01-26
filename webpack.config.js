import path from 'path';
import { fileURLToPath } from 'url';

// Manually define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  mode: 'production',
  entry: {}, // No need for an entry, we're just copying files
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'enter-mapping/dist'),
          to: path.resolve(__dirname, 'dist/enter-mapping'),
        },
        {
          from: path.resolve(__dirname, 'style-enters/dist'),
          to: path.resolve(__dirname, 'dist/style-enters'),
        },
      ],
    }),
  ],
  target: 'node', // Required for Obsidian plugins
};