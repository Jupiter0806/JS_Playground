About the css positioning, or about the actual widht of a component, it seems that it depends on its parent positioning.

Check out this.

```html
<div class="container1">
  <div class="item">should margin to right</div>
</div>

<div class="container2">
  <div class="item">should margin to right</div>
</div>
```

```css
  .container1 {
    width: 50%;
    position: relative;
    height: 100px;
  }

  .container2 {
    width: 100%;
    height: 100px;
  }

  .item {
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: flex-end;
  }
```

item in container1 will have width same as container1, but item in container2 will have width that event greater than container2.

A HTML file is created. Check the poistion there.

So what cause this? Have no idea now.