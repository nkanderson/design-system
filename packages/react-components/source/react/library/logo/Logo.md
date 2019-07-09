### Overview
The logo component provides easy access to marketing-approved logos in our applications. A full set of official product logos may be specified by strings, in both full and bug variations. Additionally, an arbitrary logo may be rendered with the default puppet bug and a custom product name. Other components in the react component library, most prominently, the [Sidebar](#sidebar) are designed to work out-of-the-box with this component.

The logo component is flexible for use in a variety of contexts. When you use it in the nav, the gutter spacing creates alignment between the wordmark element and the nav item text. 

1. **Bug**: The unique symbol representing the product or property.
2. **Wordmark**: The name of the product or property. The wordmark space flexes to accommodate longer and two-line product names. The wordmark should not exceed 120 pixels in width.
3. **Gutter**: The gutter provides visual space between the bug and the wordmark.

![logo spec](/source/react/library/logo/logo-spec.png)

#### Standard
This variant is for use on white backgrounds.

```jsx
<div style={{ display: 'flex', flexWrap: 'wrap', padding: 10 }}>
  <Logo product="container-registry" style={{ margin: 16 }} />
  <Logo product="discovery" style={{ margin: 16 }} />
  <Logo product="enterprise" style={{ margin: 16 }} />
  <Logo product="insights" style={{ margin: 16 }} />
  <Logo product="pipelines" style={{ margin: 16 }} />
  <Logo product="remediate" style={{ margin: 16 }} />
</div>
```

#### Inverted
This variant is for use on dark backgrounds, such as the [Sidebar](#sidebar) nav. This variant changes the color of the name "puppet" to white.

```jsx
<div
  style={{
    backgroundColor: 'black',
    padding: 10,
    display: 'flex',
    flexWrap: 'wrap',
  }}
>
  <Logo inverted product="container-registry" style={{ margin: 16 }} />
  <Logo inverted product="discovery" style={{ margin: 16 }} />
  <Logo inverted product="enterprise" style={{ margin: 16 }} />
  <Logo inverted product="insights" style={{ margin: 16 }} />
  <Logo inverted product="pipelines" style={{ margin: 16 }} />
  <Logo inverted product="remediate" style={{ margin: 16 }} />
</div>
```

#### Custom
**NOTE: Custom logos should ONLY be used internally. All public facing products should be given official trademarked logos through marketing.**

```jsx
<div style={{ display: 'flex', flexWrap: 'wrap', padding: 10 }}>
  <Logo product="My Product" style={{ margin: 16 }} />
</div>
```

### Bug
Sometimes, you might use only the graphical symbol (called a bug) for a Puppet product.
```jsx
<div style={{ display: 'flex', flexWrap: 'wrap', padding: 10 }}>
  <Logo type="bug" product="container-registry" style={{ margin: 16 }} />
  <Logo type="bug" product="discovery" style={{ margin: 16 }} />
  <Logo type="bug" product="enterprise" style={{ margin: 16 }} />
  <Logo type="bug" product="insights" style={{ margin: 16 }} />
  <Logo type="bug" product="pipelines" style={{ margin: 16 }} />
  <Logo type="bug" product="remediate" style={{ margin: 16 }} />
  <Logo type="bug" product="My Product" style={{ margin: 16 }} />
</div>
```
