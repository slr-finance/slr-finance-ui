## Icons
In the first step install `vite-plugin-svg-icons` and use config:
```js
  ...
  plugins: [
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [
        path.resolve(process.cwd(), 'PATH_TO_UI_KIT/UiIcon/icons'),
        path.resolve(process.cwd(), 'PATH_TO_UI_KIT/UiIcon/icons/pools'),
        path.resolve(process.cwd(), 'PATH_TO_UI_KIT/UiIcon/icons/wallets'),
        path.resolve(process.cwd(), 'PATH_TO_UI_KIT/UiIcon/icons/currency'),
        path.resolve(process.cwd(), 'PATH_TO_UI_KIT/UiIcon/icons/card'),
        path.resolve(process.cwd(), 'PATH_TO_UI_KIT/UiIcon/icons/social'),
      ],
      inject: 'body-last',
      symbolId: 'ui-icon-[dir]-[name]',
    }),
  ],
  ...
```

Then, introduce the registration script in `src/main.ts`
```js
import 'virtual:svg-icons-register'
```
Here the svg sprite map has been generated.