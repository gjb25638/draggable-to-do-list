# draggable-to-do-list
## The framework used by the project
- front-end build tool: vite
- front-end: vue3
- back-end: express
- db: google firestore

## Environmental requirements
- Node 18.12.1
- Git
- pnpm
- vscode
- Volar

## Google firestore connection settings
You need to open the google firestore service first, 
then go to the project settings/service account of firestore to generate a new private key first, 
a key file will be generated, 
and then add a .env file in the root directory of this project, 
put the key file in the Fill in the information in the .env file, 
.env key name can refer to the settings in server/db.ts in the project, 
so that the backend can connect to the firestore to access the data

## Install pnpm
```PowerShell
npm i -g pnpm
```

## Install node dependency module
```PowerShell
pnpm i
```

## Development environment
```PowerShell
git checkout master
pnpm serve
```

## Output production
```PowerShell
pnpm build
```

## Docker environment
```PowerShell
git checkout add_docker
make up
```