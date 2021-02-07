## Install (require node >=12 and yarn >=1.22.5)
```bash
yarn
```
## Start in dev mod at http://localhost:3000/
```
yarn dev
```
## Start in production at http://localhost:3000/
```
yarn build
yarn start
```
## Run test (run on dev mode)
```
yarn ci
```

## Considerations
- Why I choose materia ui? 
Because it works well, with a lot of components out of the box.
- Why I put redux?
Probably is overkill but in all project I need a global modal/snackbar and redux (or context api) allow me to put a single istance of component
- Why I use next js?
Becase a static site/server side render is more perfomant, and better seo. Next js allows to developer each page based on requirements and choose logic in a easy way. I choosed to load with a static logic the data for airport and airlines. This means that each time data change at database it' s better to build the site again.

## Api from https://react-dev.recruitment.shippypro.com/

## Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
