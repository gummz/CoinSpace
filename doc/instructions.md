# SVG

Start logo animation: ???

Start logo: app/index.ejs

Auth widget logo: app/lib/svg/logo_stack.ract

Sidebar widget logo: app/lib/svg/logo.ract

  

{{>svg_xyz}} in .ract files in /widgets/ or /pages/ means:

Fetch partial defined in app/lib/ractive/index.js, which in turn fetches SVG files in app/lib/svg/.

  

# Location for favicon files

app/assets/icons

  

# Location for translations

app/lib/i18n/translations

  

# Instead of npm run server:watch for Windows computers

node -r dotenv/config ./server/Server.js dotenv_config_path=.env.loc MASTER=1 nodemon -w .env.loc -w ./server -x

You can add this to 'scripts' in package.json as for example serverw:watch.

  

# Setting up (Windows)

npm run serverw:watch

npm run client:watch