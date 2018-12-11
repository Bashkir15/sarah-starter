## Starting-Up 

-- First step it to change into this directory and run the following command in the command line

`npm install`

This will install of the project dependencies.

## Running and projet and adding a new one

If you look in the package.json file in the root directory you'll see a scripts
block. These are the scripts to run your projects. To boot up the phone guy app, just run `npm run start-vanilla-phone`

If you need to add a new project you'll create a new directory in the packages directory with the name you want your project to have. This directory
needs to have a src directory that contains an index.js (your javascript entry) and an index.html (you can look at vanilla for an example)

Then to get it setup to build propertly, you can add a script to the package.json file that basically mimics start-vanilla-phone. So if you created silly-package-project

`"start-silly-package": "npm run start-dev-server && project=silly-package-project"`

It is important that you pass the project value and that it matches the name of the directory you created in packages. This is how we find out what files to build for that specific app.

You should be able to look at the console for the URL to navigate to to get to your app. (It will probably be localhost:8080). Your app has hot-reloading. That means any changes your make to your code will auto-refresh your browser.

(There is also support for css and sass imports in your js, but we will talk about that tonight)
