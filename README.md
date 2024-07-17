```markdown
# URL Query Parameter Adder

This TypeScript package provides a utility function to add query parameters to a given URL. It handles various types of values including strings, numbers, booleans, dates, and arrays of these types. It also ensures the URL does not exceed typical browser length limits.

## Installation

To install the package, you can use npm or yarn:

```bash
npm install url-search-query
```

Or with yarn:

```bash
yarn add url-search-query
```

## Usage

### addQueryToUrl

The `addQueryToUrl` function appends query parameters to a URL.

#### Parameters

- `url` (string): The base URL to which query parameters will be added.
- `query` (Record<string, any>): An object representing the query parameters to be added.

#### Returns

- A string representing the final URL with the added query parameters.

#### Example

```typescript
import { addQueryToUrl } from 'url-search-query';

const query = { 
  view: 'dashboard', 
  component: 'widget', 
  users: ['1', '2'], 
  count: 5, 
  isActive: true, 
  date: new Date('2024-07-17'), 
  invalidProp: { key: 'value' }, 
  func: () => {} 
};
const url = 'https://example.com/?model=gpt-4o';
const newUrl = addQueryToUrl(url, query);

console.log(newUrl);
// Output: https://example.com/?model=gpt-4o&view=dashboard&component=widget&users=1&users=2&count=5&isActive=true&date=2024-07-17T00:00:00.000Z
```

## Development

### Prerequisites

- Node.js
- npm or yarn

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/MariannaMilovanova/url-search-query.git
cd url-search-query
npm install
```

Or with yarn:

```bash
yarn install
```

### Running Tests

To run the tests, use the following command:

```bash
npm test
```

Or with yarn:

```bash
yarn test
```

### Building

To build the project, use the following command:

```bash
npm run build
```

Or with yarn:

```bash
yarn build
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
