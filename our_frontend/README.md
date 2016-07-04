# foodmonkey-frontend application

# NOTE : install foodmonkey-backend application first

foodmonkey application can be found [here](https://github.com/Praveer-Rai/foodmonkey/tree/dev)

## Prerequisites

Both for the back end and front end application check

* nodejs [official website](https://nodejs.org/en/) - nodejs includes [npm](https://www.npmjs.com/) (node package manager)

Just for the backend application:

* mongodb [official installation guide](https://docs.mongodb.org/manual/administration/install-community/)
* mocha cli [installation](https://mochajs.org/#installation)



## Setup (before first run)

go to your project root folder via command line
```
cd path/to/workspace/our-frontend
```

**install node dependencies**

```
npm install
```

## running

execute gulp tasks (and keep watching for further changes)

```
gulp watch
```

start built in web server/ OR use xampp(copy public folder, and modify gulp script to xampp public folder)

```
node node_modules/.bin/http-server
```

**Alternative/Additionally:** you could also use postman [postman](https://www.getpostman.com/)
You need to import the test and environment from `test/rest.json.postman_collection` and `test/localhost.postman_environment`