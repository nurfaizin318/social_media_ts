# Setup Project

Create .env file

```
DATABASE_URL="mysql://root:@localhost:3306/belajar_typescript_restful_api"
```

```shell

npm install

npx prisma migrate dev

npx prisma generate

npm run build

npm run start

```
# CI/ CD step

- create file .gitlab-ci.yml
- check node js version in your device and search in docker hub
- push your code to git lab
