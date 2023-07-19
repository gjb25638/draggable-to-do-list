# draggable-to-do-list
## The framework used by the project
- frontend build tool: vite
- frontend: vue3
- vue repository and state management: pinia
- css preprocessor: SCSS
- UI component library: element-plus
- css framework: unocss
- draggable module: vuedraggable
- backend: express
- data storage: google firestore

## Environmental requirements
- Node 18.12.1
- Git
- pnpm
- vscode
- Volar

## Directory structure
```shell
.
├── .docker             # docker file & nginx setting
├── config
├── dist
├── server              # back-end
│   ├── controllers     # controller
│   ├── middleware
│   ├── models
│   ├── repositories    # firestore access
│   ├── routes          # backend router
│   └── utils
└── src                 # front-end
    ├── components      # components
    ├── config          # api base url
    ├── mixin
    ├── stores
    │   ├── api         # api
    │   └── modules     # pinia store
    ├── utils
    │   └── request.js  # get, post, put, patch, delete
    └── views           # page
```

## Feature
- The outer layer is called board, and the inner layer is called task
- Drag and drop between boards to swap positions
- In addition to dragging and swapping positions between tasks, you can also drag and drop from the original board to other boards
- Add board or task
- Rename board or task
- Delete board or task
- When the checkbox of the task is pressed, the task can be eliminated, indicating that the task has been completed
- Can show or hide completed tasks
- Press the checkbox of the completed task to restore the task to the working state
- Too many boards or tasks will use scrollbar to hide

## Google firestore connection settings
You need to open the google firestore service first, 
then go to the "project settings" -> "service account" of firestore to generate a new private key first, 
a key file will be generated, 
then add a default.json file under ./config/ and ./server/confing/ under the root directory of the project, 
copy and paste the information in the key file into the default.json file, 
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