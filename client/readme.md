# Concordium Minting Wizard

node: v21.2.0

yarn: 1.22.19

Description...

## Start the app

### start the development server
```bash
yarn nx serve home
```
Open your browser and navigate to http://localhost:4200/.

### build and run the app
```bash
yarn nx build home
```

### build and preview the app
```bash
yarn nx preview home
```
Open your browser and navigate to http://localhost:4300/.

### start the development Storybook
```bash
yarn nx serve storybook
```
Open your browser and navigate to http://localhost:4400/.

### build and run the storybook
```bash
yarn nx build storybook
live-server .\dist\apps\storybook --port=4500
```
Open your browser and navigate to http://localhost:4500/.


## Executors

### CI
```bash
yarn nx run-many -t ci --fix --parallel=8
```

### Lint
```bash
yarn nx lint home --fix
```

### Lint many
```bash
yarn nx run-many -t lint --fix --parallel=8
```  

### Prettier many
```bash
yarn nx run-many -t prettier --fix --parallel=8
```  
## Generators

### Generate slice
```bash
yarn nx g @my/plugin:slice [name] [layer]
```

### Generate component (deprecated)
```bash
yarn nx g @my/plugin:component your-page --directory=libs/home-layers/src/pages/your-page
```
