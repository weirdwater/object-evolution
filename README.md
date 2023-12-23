
## TODO

- [ ] Set up build pipeline
    - [ ] Compile Typescript
    - [ ] Package as Extension
- [ ] Content Script
    - [ ] Registers custom event type
    - [ ] Listens for object generation event
    - [ ] Passes object generation event data to background script
- [ ] Non-persistant background script
    - [ ] Handles new generation message
    - [ ] Compares generation to previous
    - [ ] Stores generation + diff to session storage
- [ ] UI Component
    - [ ] Displays generations from storage
    - [ ] Displays diff between generations

## Requirements
- [ ] Cannot block main thread (offload as much as possible to background script)
    - It seems that FireFox does not support the use of service workers. Which seem to be the main mechanism for offloading the main thread.
- [ ] Publishable to Chrome and Firefox

## Further reading

- [All you ever need to know about chrome extensions](https://itnext.io/all-youll-ever-need-to-know-about-chrome-extensions-ceede9c28836)
- Chrome Developers: [Service Workers](https://developer.chrome.com/docs/extensions/migrating/to-service-workers/)
- [Webpack and extensions](https://medium.com/@bhuvan.gandhi/chrome-extension-set-up-with-typescript-scss-and-webpack-612ed2015b93)
- [React in Extensions](https://blog.logrocket.com/creating-chrome-extension-react-typescript/)