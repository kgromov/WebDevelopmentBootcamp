# Deploy node.js app to Heroku

## Install heroku:
* Sign up for free https://www.heroku.com/
* Install heroku:
    * `sudo snap install heroku` for Ubuntu
    * .exe installeer for Windows
    * heroku should be added to PATH
    * P.S. git is prerequisite

---
## Update project
* Update your port with comming from env (if it's defined as static):
`const port = process.env.PORT || 9000;`
* To define env properties explicitly:
`heroku config:set ${prop}=${value}`
* Add Procfile to the project root with command:
`web: npm start` or `web: node app.js`
For the first option you need to define `npm start` into **scripts** section of `package.json
* Add engine with your node version:
`"engines": {
    "node": "12.x"
  }`

---
## Init git repository
* Init
* Add .gitignore
* Add and commmit

---
## Deploy
* Login to heroku - type `heroku login` in terminal
* `heroku create`:
    * create app under your heroku account
    * create remote repository and associate with your local one (aka git remote add heroku ${url_to_app})
    * outputs both app url and git remote
* push to heroku:
`git push heroku master`
* Triggers build (execute command specified in Procfile)
* If build successfull - app is reachable by specified url hosted on heroku
* If not - errors could examined with `heroku logs`
* It's still possible to run app locally with command:
`heroku local web` - should be reachable on localhost:5000 