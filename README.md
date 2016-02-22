# Web

#### Install Dependencies:
```bash
## dev env only:
$ sudo npm install

## production env:
$ sudo npm install --production
```

#### Env Variables to Set
```bash
# Dont set this one up, usually set by hosting provider
$ export NODE_PORT || PORT

# Used for assets etc
$ export BASE_URL
$ export ASSET_URL
$ export VERSION
```

#### Dev
```bash
$ gulp dev
$ nodemon --ignore /app/assets --ignore /public --ignore /app/views index.js
```

#### Deploy
- Deployment is done to Modulus.IO
- Make sure you are logged on Modulus.IO

```bash
$ gulp deploy
```
