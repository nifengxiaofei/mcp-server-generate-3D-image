# mcp-server-3Dpicture MCP Server

generate a 3D picture for a given image with people

This is a TypeScript-based MCP server help you change picture form 2D to 3D.

![result preview](/preview.png)

# Features

## Tools

- generate_3Dpicture
  - url: The picture url send to tool, Required
  - text: Text under the photo frame, Optional

## Development

Install dependencies:

```
npm install
```

Build the server:

```
npm run build
```

For development with auto-rebuild:

```
npm run watch
```

## Installation

To use with Cursor, add the server config:

On MacOS: `~/.cursor/mcp.json`

```json
{
  "mcpServers": {
    "mcp-server-3Dpicture": {
      "command": "node",
      "args": [" mcp-server-3Dpicture/build/index.js"],
      "env": {
        "OPENAI_API_KEY": "xxx",
        "OPENAI_BASE_URL": "xxx"
      },
      "toolCallTimeoutMillis": 180000
    }
  }
}
```

Find Your OPENAI_API_KEY and OPENAI_BASE_URL [here](https://platform.openai.com/api-keys)

## Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
