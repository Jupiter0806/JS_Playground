When a component will be constructed again is depends on where it is, or in other words, what is the hierarchy.

Check those codes

```javascript app.js
<App>
    <MyModal data={data} />
<App>
```

```javascript MyModal.js
<MyModal>
    <div>{this.props.data.item}</div> // error
    <MyPanel data={data} />
</MyModal>
```

```javascript MyPanel.js
<MyPanel> 
    <div>{this.props.data.item}</div> // no error
</MyPanel>
```

When App has rendered, the MyModal will be constructed, but MyPanel will not. MyPanel will be constructed when MyModal is shown.

If the data from App can not be known before user actions, for exampe, MyModal is used to show details of an item in a list in App, attampts to access values in data in MyModal will cause an error saying cannot read this value of an undefiend, but attamps to access values in data in MyPanel will success. This is because, when MyPanel has been constructing, the data should hava a value.